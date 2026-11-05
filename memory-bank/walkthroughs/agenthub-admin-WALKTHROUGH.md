# AgentHub Admin Console Walkthrough

## Table of contents

- [Overview](#overview)
- [Running example](#running-example)
- [Logic flow](#logic-flow)
- [Key changes](#key-changes)
- [Lessons](#lessons)
  - [1. Derive dashboard totals from records](#1-derive-dashboard-totals-from-records)
  - [2. Build UI text safely](#2-build-ui-text-safely)
  - [3. Connect records by stable IDs](#3-connect-records-by-stable-ids)
  - [4. Keep demo changes temporary](#4-keep-demo-changes-temporary)
- [Verification](#verification)
- [Glossary](#glossary)
- [Further reading](#further-reading)
- [Revision 2026-11-05](#revision-2026-11-05)

## Overview

AgentHub is a responsive, single-page admin prototype for inspecting fictional users, agents, skills, rental contracts, and execution errors. Its browser-only JavaScript renders the sections, calculates dashboard values, and provides temporary demo interactions.

**Start here:** the console helps an administrator quickly see which agents are healthy, what rentals earned, and which errors need attention.

## Running example

The examples below reuse this set of November 2026 contract fixtures from [`contracts` in `app.js`](../../app.js):

| Contract | Paid date | Total paid | Discount |
|---|---|---:|---:|
| c1 | Nov 01, 2026 | $250 | $15 |
| c2 | Nov 01, 2026 | $200 | $0 |
| c3 | Nov 01, 2026 | $250 | $10 |

Contract c4 was paid in October and is not part of the November dashboard calculation.

## Logic flow

1. The page loads its theme preference, styles, and [`app.js`](../../app.js). Example: a saved `dark` preference adds the `dark` class before the app appears.
2. JavaScript defines local fixture arrays, then builds the shared page shell and selects Dashboard. Example: the contracts array includes c1 through c4.
3. The dashboard filters November-paid contracts and sums their totals and discounts. Example: c1 + c2 + c3 gives $700 revenue and $25 discounts.
4. Navigation changes the selected section and renders its table or cards from the matching arrays. Example: choosing Skills shows each catalog skill and its current agent count.
5. Details, resolution, and deletion actions operate on the chosen record. Example: resolving e1 updates its acknowledgement while leaving the agent's Failing status unchanged.
6. The record edits stay in memory; only the theme preference is saved in browser storage. Example: reloading resets a resolved error but keeps the chosen theme if storage is available.

**Dashboard calculation: contract records become two November totals.**

```text
Contract[] -> filter(paidDate starts with 2026-11) -> Contract[]
Contract[] -> sum(total) -> USD number
Contract[] -> sum(discount) -> USD number
```

**A selected navigation button chooses which collection is rendered.**

```text
section button -> section key -> render function -> DOM nodes
```

**A row action identifies a fixture, then updates or displays that record.**

```text
{ kind, id } -> fixture lookup -> record -> dialog or updated in-memory array
```

## Key changes

| File / function | What it does | Example: input -> output |
|---|---|---|
| [`index.html`](../../index.html), theme bootstrap | Starts the theme before app rendering and loads Tailwind and local assets. | saved theme `light` -> root has no `dark` class |
| [`app.js`](../../app.js), `renderDashboard()` | Derives revenue, discounts, agent counts, and renders sample activity. | c1, c2, c3 -> `$700` revenue |
| [`app.js`](../../app.js), `renderUsers()`, `renderAgents()`, `renderSkills()`, `renderContracts()`, `renderErrors()` | Builds the six section views from fixture arrays. | section `skills` -> skill cards with derived counts |
| [`app.js`](../../app.js), `openDialog()` and `show*()` | Opens the reusable detail dialog and fills it with record data. | error e1 -> severity, UTC timestamp, and trace details |
| [`app.js`](../../app.js), `dependencyMessage()` and `performDelete()` | Blocks unsafe dependency deletions and removes allowed records from memory. | delete agent a4 -> allowed; historical contract c4 stays |
| [`styles/custom-styles.css`](../../styles/custom-styles.css) | Applies the Obsidian Synthetics compact dark-first visual styling. | `.dashboard-agents` -> a compact agent-status table |
| [`SPECS.md`](../../SPECS.md) | Records the product requirements and manual acceptance checklist. | checklist -> expected responsive and interaction behavior |

## Lessons

### 1. Derive dashboard totals from records

**Concept**: The dashboard calculates money totals from the contract array instead of repeating precomputed values. This keeps the cards consistent with the demo records when an allowed in-memory deletion changes what should be shown.

**Code reference**: [`renderDashboard()` in `app.js`](../../app.js)

```js
const paidNovember = contracts.filter((contract) => contract.paidDate.startsWith("2026-11"));
const metrics = [
  ["$", "Revenue this month", money(paidNovember.reduce((sum, item) => sum + item.total, 0)), "November 2026 · contracts paid"],
  ["−", "Discounts & coupons", money(paidNovember.reduce((sum, item) => sum + item.discount, 0)), "November 2026 · discounts applied"],
```

`filter(...)` keeps records whose paid date begins with the reporting month. Each `reduce(...)` starts at zero and adds one field from every matching record. `money(...)` formats the result as USD.

**Example**: input c1, c2, and c3 -> revenue `250 + 200 + 250 = $700`; discounts `15 + 0 + 10 = $25`. c4 is excluded because its paid date starts with `2026-10`.

**Without this**:

| Hard-coded card | Derived card |
|---|---|
| Delete a November contract, but revenue still says `$700`. | The next render sums the remaining November contracts. |

**Takeaway**: When a displayed value summarizes records, calculate it from those records.

### 2. Build UI text safely

**Concept**: The app creates elements and assigns displayed strings through `textContent`, rather than treating record text as HTML. This keeps names, descriptions, and traces as text, even if a value contains characters such as `<` or `>`.

**Code reference**: [`make()` in `app.js`](../../app.js)

```js
const make = (tag, className = "", text = null) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== null) node.textContent = text;
  return node;
};
```

`createElement` makes an element of the requested type. `className` adds styling hooks. `textContent` inserts plain text instead of parsing the string as markup.

**Example**: input error description `CRM connector rejected credentials` -> a text node inside the error row. If a fictional description were `<img src=x>`, the browser would show those characters instead of creating an image element.

**Without this**:

| HTML-string insertion | Text insertion |
|---|---|
| Record text could be interpreted as markup. | Record text remains visible text and cannot add HTML elements. |

**Takeaway**: Treat fixture values as text unless the app intentionally creates markup itself.

### 3. Connect records by stable IDs

**Concept**: Agents refer to their owners and skills by IDs, and actions carry both a record kind and ID. An ID stays the same even if a person’s display name changes, so lookups do not depend on table row order or labels.

**Code reference**: [`byId()` and `dependencyMessage()` in `app.js`](../../app.js)

```js
const byId = (list, id) => list.find((item) => item.id === id);
function dependencyMessage(kind, record) {
  if (kind === "user") {
    const owned = agents.filter((agent) => agent.ownerId === record.id);
    if (owned.length) return `Cannot delete ${record.name}: remove owned agent${owned.length > 1 ? "s" : ""} (${owned.map((agent) => agent.name).join(", ")}) first.`;
```

`find(...)` returns the matching record. `filter(...)` collects every agent whose `ownerId` matches the user’s ID. If the result is non-empty, deletion is blocked with a useful explanation.

**Example**: input user u1 -> agent a1 has `ownerId: "u1"` -> deletion is blocked until that agent is removed.

**Without this**:

| Lookup by row position or name | Lookup by ID |
|---|---|
| Reordering rows or renaming a user can connect the wrong records. | User u1 continues to match agents whose `ownerId` is u1. |

**Takeaway**: Use stable IDs to connect related records and validate dependencies.

### 4. Keep demo changes temporary

**Concept**: Business-record edits are held in JavaScript arrays, while the theme alone is saved in `localStorage`. This matches the prototype’s demo-only promise: users can explore interactions, but a reload restores sample records.

**Code reference**: [`performDelete()` and the theme toggle in `app.js`](../../app.js)

```js
list.splice(list.findIndex((item) => item.id === id), 1);
if (kind === "agent") expandedAgents.delete(id);
render();
```

`findIndex(...)` locates the record by ID, `splice(...)` removes it from the in-memory array, and `render()` refreshes the current view. There is no persistence call in this deletion path.

**Example**: delete a4 -> agent a4 disappears for this page session; reloading restores the original fixture a4. The theme toggle separately uses `localStorage.setItem(...)` to remember light or dark mode when storage is available.

**Without this**:

| Save all demo changes | Keep record changes in memory |
|---|---|
| Reload would preserve a deletion, contrary to the reset notice. | Reload restores fixtures while the theme can still persist. |

**Takeaway**: Persist only the state the product explicitly promises to keep.

## Verification

The student manually checked the prototype interactions and reported that everything seems to work. JavaScript syntax and whitespace checks also passed; these checks confirm parsing and patch cleanliness, not every browser or viewport behavior.

## Glossary

- **Disclosure popover**: a small panel opened by a button to reveal record actions; see [`actionControl()` in `app.js`](../../app.js).
- **Fixture**: fictional local data used for a demo; see the arrays at the top of [`app.js`](../../app.js).
- **In-memory state**: values held by the running page that disappear on reload; see [`performDelete()` in `app.js`](../../app.js).
- **Local storage**: browser storage used here for the theme preference; see the theme bootstrap in [`index.html`](../../index.html).
- **Stable ID**: a fixed record key used to find related items; see [`byId()` in `app.js`](../../app.js).
- **Text node**: plain displayed text that the browser does not parse as HTML; see [`make()` in `app.js`](../../app.js).

## Further reading

- [`README.md`](../../README.md) — local setup and file responsibilities.
- [`SPECS.md`](../../SPECS.md) — full feature requirements and acceptance checklist.
- [`assets/DESIGN.md`](../../assets/DESIGN.md) — visual design tokens and component guidance.

## Revision 2026-11-05

The student declared the project complete after reporting that the manual browser checks worked. The submission branch was verified on GitHub at commit `9031aa1bf9727d33d54dd6e7ba08d3750b7f6a6a`.

Submission: [AgentHub project on GitHub](https://github.com/La2ryx/html-hello/tree/agenthub-submission). This completion note was added afterward and is not included in that verified commit.
