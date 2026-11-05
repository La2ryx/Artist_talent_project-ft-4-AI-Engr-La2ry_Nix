# AgentHub Admin Panel Specification

## 1. Purpose and delivery order

Build a professional, responsive HTML prototype for administrators of an AI
agent rental platform. Administrators can monitor revenue and failures, inspect
users, agents, skills, rental contracts, and execution errors.

This specification must be committed separately before creating any HTML.
Next, use this document as the prompt for a Google Stitch visual proposal.
Review that proposal and adapt it to these requirements before implementation.
No Stitch proposal has been supplied or generated at specification time; the
visual direction below is the baseline, not a claim of Stitch output.

## 2. Scope and implementation

- Use `index.html`, `app.js`, and optional `styles.css` at repository root.
- Use semantic HTML, Tailwind CSS via the official browser CDN
  (`https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`), and vanilla JavaScript.
- Configure Tailwind v4's class-based dark variant with
  `@custom-variant dark (&:where(.dark, .dark *));` in a `text/tailwindcss`
  style block. Apply `dark:` utilities throughout the interface.
- No frameworks, jQuery, package manager, bundler, API requests, or backend
  integration. The Tailwind CDN requires an internet connection.
- Keep all example data in local JavaScript arrays. Clearly label the panel
  "Demo workspace" and explain that edits reset on reload.
- Navigation switches six in-page sections; no routing library or real page
  navigation is required. Start on Dashboard.
- Searches, account authentication, form submission, exports, creating records,
  and editing system prompts are out of scope. Do not display dead controls
  suggesting these capabilities.
- Use the existing static server or `python3 -m http.server 3000` for preview.
- Update the English README with setup, file responsibilities, demo behavior,
  CDN requirements, and a link to this specification during implementation.

## 3. Visual direction and responsive layout

Use a polished, restrained SaaS aesthetic: indigo primary accents, neutral
surfaces, generous whitespace, subtle borders, rounded cards, and a system
sans-serif stack. No external photos or font dependencies are needed.

- Desktop (1024px and up): persistent 240px left sidebar, flexible main area,
  and a top bar containing workspace identity and a theme toggle.
- Sidebar: AgentHub wordmark, "Admin console" subtitle, six navigation buttons,
  an unmistakable active state, and a bottom demo-workspace indicator.
- Main area: section heading and short supporting text, then section content.
  Keep comfortable 24-32px desktop padding and a maximum content width of 1440px.
- Tablet/mobile (below 1024px): retain a compact, always-available navigation
  rail with accessible icon buttons; visually hide labels if needed. Do not
  hide navigation behind an unimplemented menu. Use 16px main-area padding.
- Metric cards use four columns on desktop, two on tablet, one on narrow mobile.
  Catalog cards use three, two, then one column.
- Tables scroll horizontally inside their own containers, never forcing the
  entire viewport to scroll horizontally. Keep action menus within the
  container's usable area without clipping.
- Light mode: slate-50 page background, white cards/sidebar, slate-900 text,
  slate-500 secondary text, slate-200 borders, indigo-600 actions.
- Dark mode: slate-950 page background, slate-900 surfaces, slate-100 text,
  slate-400 secondary text, slate-800 borders, indigo-400 accents.
- Use green for active/resolved, gray for inactive/past, amber for warnings,
  red for failures/critical errors. Always include a text label, not just color.
- Inline SVG icons are decorative (`aria-hidden="true"`); icon-only controls
  have accessible names.

## 4. Data contract and fixed sample data

Use stable IDs and reference records by ID, never by row position or display
name. Render referenced names from the related arrays. All names, emails,
prompts, and traces are fictional. Use USD, English labels, and UTC timestamps.
Format currency with `Intl.NumberFormat`. Show unambiguous dates such as
"Nov 01, 2026" and label error timestamps UTC.

### Users

Each user has ID, name, email, company, plan, status, and joined date.

| ID | Name | Email | Company | Plan | Status | Joined |
|---|---|---|---|---|---|---|
| u1 | Maya Chen | maya@example.com | Northstar Studio | Enterprise | Active | 2026-08-12 |
| u2 | James Wilson | james@example.com | Orbit Labs | Pro | Active | 2026-09-03 |
| u3 | Sofia Rivera | sofia@example.com | Bloom Commerce | Starter | Suspended | 2026-10-15 |
| u4 | Noah Patel | noah@example.com | Northstar Studio | Pro | Active | 2026-10-21 |

### Skills

Each skill has ID, name, description, and monthly USD price. Enabled-agent
counts are derived from agent skill IDs, including inactive/failing agents.

| ID | Name | Description | Monthly price |
|---|---|---|---|
| s1 | Web browsing | Find and summarize public web information. | 40 |
| s2 | Document reading | Extract information from supplied documents. | 25 |
| s3 | Calendar management | Organize appointments and scheduling requests. | 30 |
| s4 | Email drafting | Prepare email replies for human review. | 20 |
| s5 | Data analysis | Summarize datasets and identify trends. | 50 |
| s6 | CRM updates | Maintain customer records and activity notes. | 35 |

### Agents

Each agent has ID, name, owner ID, status, skill IDs, and a system prompt.
Store the following complete prompts, not placeholder text.

| ID | Name | Owner | Status | Skills | System prompt |
|---|---|---|---|---|---|
| a1 | Research Scout | u1 | Active | s1, s2 | Research public sources and supplied documents. Summarize findings with sources and distinguish facts from uncertainty. |
| a2 | Schedule Pilot | u2 | Active | s3, s4 | Organize scheduling requests and draft confirmation emails. Ask for approval before changing appointments or sending messages. |
| a3 | Support Compass | u3 | Failing | s2, s4, s6 | Use supplied documentation to draft helpful customer replies. Flag missing information and request human review before updating CRM records. |
| a4 | Insight Engine | u4 | Inactive | s2, s5 | Analyze supplied datasets and documents. Explain assumptions, report limitations, and never invent missing observations. |

### Contracts

Store immutable snapshots of client/agent names, base charge, itemized skill
names/prices, discount, dates, status, and amount paid. Later catalog changes
must not rewrite historical financial records. These fixtures each cover one
billing period. Dates are inclusive; no prorating or renewal logic is required.

| ID | Client / user | Agent | Status | Start / end | Base | Skill items | Discount | Paid date | Total paid |
|---|---|---|---|---|---|---|---|---|---|
| c1 | Northstar Studio / u1 | Research Scout | Active | 2026-11-01 / 2026-11-30 | 200 | Web browsing 40; Document reading 25 | 15 | 2026-11-01 | 250 |
| c2 | Orbit Labs / u2 | Schedule Pilot | Active | 2026-11-01 / 2026-11-30 | 150 | Calendar management 30; Email drafting 20 | 0 | 2026-11-01 | 200 |
| c3 | Bloom Commerce / u3 | Support Compass | Active | 2026-11-01 / 2026-11-30 | 180 | Document reading 25; Email drafting 20; CRM updates 35 | 10 | 2026-11-01 | 250 |
| c4 | Northstar Studio / u4 | Insight Engine | Past | 2026-10-01 / 2026-10-31 | 200 | Document reading 25; Data analysis 50 | 25 | 2026-10-01 | 250 |

Total paid equals base plus skill prices minus discount. Active contracts do
not imply an agent is currently operational.

### Errors

Each error has ID, UTC timestamp, agent ID, severity, type, description,
multiline full trace, and resolution state. All start unresolved.

| ID | Timestamp | Agent | Severity | Type | Description |
|---|---|---|---|---|---|
| e1 | 2026-11-05 09:42:18 | a3 | Critical | Authentication | CRM connector rejected the configured credentials. |
| e2 | 2026-11-05 08:15:03 | a1 | Warning | Timeout | Public source exceeded the response time limit. |
| e3 | 2026-11-04 16:30:45 | a2 | Error | Rate limit | Calendar provider temporarily rejected additional requests. |

Hardcode fictional traces containing the error message, agent ID, operation,
and at least two stack frames with synthetic file/line references. Include no
real credentials, tokens, private URLs, or external user data.

## 5. Section requirements

### Dashboard

- Four visible metric cards: "Revenue this month", "Discounts & coupons",
  "Active agents", and "Failing agents".
- Anchor the prototype reporting month to November 2026; explicitly display
  that month rather than silently depending on the viewer's current date.
- Derive revenue ($700) and discount losses ($25) from contracts paid in
  November 2026. Show active-agent count 2 and failing-agent count 1 from
  current agent statuses. Derive these values rather than duplicating constants.
- Below the cards show a large "Weekly activity" placeholder with a seven-day
  grid or decorative bars, a legend, and an explicit "Chart placeholder -
  sample activity, not live analytics" label. No chart library is required.

### User Management

- Table columns: name, email, plan, status, actions.
- Each row has a vertical-ellipsis button opening "View detail" and "Delete".
- Detail modal shows every user field including ID, company, and joined date.

### Agent Management

- Show all agents with name, owner name, status badge, skill count/expand
  control, and action dropdown ("Configure", "Delete").
- Skills start collapsed. Expand reveals every associated skill as labeled
  chips, with a 200-250ms grid-row/opacity transition; collapse animates too.
- Expansion controls expose `aria-expanded` and `aria-controls`. Hidden
  contents must not remain keyboard focusable.
- Configure opens a modal showing name, owner, status, and the complete system
  prompt in a read-only text block labeled "System prompt".

### Skills

- Display: "Skills are capabilities that can be attached to an agent, such as
  browsing the web, reading documents, or managing calendars."
- Catalog cards show skill name, short description, enabled-agent count, and
  action dropdown ("View detail", "Delete").
- Detail modal shows ID, name, description, monthly price, and enabled count.
  Initially counts are s1: 1, s2: 3, s3: 1, s4: 2, s5: 1, s6: 1.

### Agent Contracts

- Table columns: client, rented agent, contracted skills, dates, status,
  total paid, actions. Include both active and past records.
- Each action dropdown includes "View detail".
- Detail modal shows contract ID, client, agent, status, dates, payment date,
  base charge, every contracted skill and its individual price, discount, and
  final total. Amounts must reconcile exactly with the corresponding row.

### Error Log

- Table columns: timestamp (UTC), agent name, severity/type, short description,
  resolution state, and actions.
- Severity badges: Critical red, Error orange, Warning amber. Resolution is a
  separate text badge and must not replace the error's original severity.
- Dropdown actions: "View detail", "Mark as resolved".
- Detail modal includes all fields and the entire trace in a scrollable,
  wrapping `pre` block. Resolved rows remain visible.
- Resolving updates the row, displays a confirmation status message, and
  disables the resolve action with a "Resolved" label. It does not change the
  agent's status: resolution is acknowledgement, not automatic recovery.

## 6. Shared behavior and state rules

### Navigation and menus

- Only one section is visible at a time; update heading and active navigation
  style plus `aria-current`. Close dropdowns when switching sections.
- Treat dropdowns as accessible disclosure popovers containing native buttons,
  not ARIA menus requiring a custom arrow-key implementation.
- Only one dropdown is open globally. Clicking its trigger again, another
  trigger, outside the menu, an action, or Escape closes it.
- Buttons expose `aria-expanded` and `aria-controls`. Tab reaches each action.
  Escape restores focus to the dropdown trigger.

### Modals

- Use a reusable native `dialog` opened with `showModal()`, styled with a
  dimmed backdrop. Give it a visible title and `aria-labelledby`.
- Close using a labeled close button, Escape, or a true backdrop click.
  Clicking or dragging inside the modal must not dismiss it.
- Move focus inside on open, trap focus using native dialog behavior, and
  restore focus to the originating row trigger on close. If that row was
  deleted, focus its section heading instead. Prevent background scrolling
  while open; long content scrolls within the modal.
- Use text-safe DOM insertion (`textContent`) for record values and traces.
  Never interpolate user-controlled HTML into markup.

### Deletion

- Delete opens an explicit confirmation dialog naming the record and noting
  that changes are demo-only. Cancel does nothing; confirm removes the record
  from the in-memory array and rerenders affected metrics, counts, and lists.
- Prevent deleting a user who owns any agent; explain that agents must be
  removed first. Prevent deleting an agent referenced by an active contract;
  show a clear explanation instead of pretending deletion succeeded.
- Prevent deleting a skill assigned to any agent. Historical contract
  snapshots never block deletion and never lose their itemized information.
- Errors preserve an agent-name snapshot so past errors remain readable if
  an otherwise deletable agent is removed.
- Successful deletion announces a status message. Empty sections show a
  descriptive empty state, not an unexplained blank table.

### Theme and persistence

- The top-bar theme button toggles the root `dark` class across every section,
  dropdown, modal, table, and badge. Update its accessible name to describe
  the next action.
- Persist only theme preference in `localStorage`; on first visit use
  `prefers-color-scheme`. Initialize theme before visible content to minimize
  flashing. If storage is unavailable, still allow in-memory theme switching
  and show a nonblocking message that the preference cannot be saved.
- All record changes and error resolutions reset on reload. Retain them while
  navigating sections within the same page session.

## 7. Accessibility and quality

- Provide a skip-to-main link, main landmark, descriptive page title, logical
  heading hierarchy, table headers with scopes, and visible keyboard focus.
- Every action is usable without a mouse. Status feedback uses an
  `aria-live="polite"` region; destructive confirmation has clear button labels.
- Maintain readable contrast in both themes and approximately 40px minimum
  icon-button targets. Never use color alone to communicate state.
- Honor `prefers-reduced-motion` by disabling collapsible animations.
- Do not add automated test dependencies or a test suite. Verify manually
  using the following acceptance checklist and browser console.

## 8. Acceptance checklist

1. Git history contains this specification's commit before the first HTML
   commit. A Stitch proposal is reviewed before implementation, or its absence
   is explicitly reported and an alternative visual direction approved.
2. Opening the served page displays Dashboard, six sidebar destinations, four
   correctly calculated cards, and the labeled weekly-chart placeholder.
3. Each destination displays all required fields and fictional fixture records.
4. Every row/card action dropdown toggles, closes outside/on Escape, and closes
   competing menus. Actions operate on the selected record, not another row.
5. User, agent, skill, contract, and error detail modals show complete matching
   information. All close methods and keyboard focus restoration work.
6. Every agent starts with hidden skills; expanding/collapsing is smooth.
   Reduced-motion mode suppresses animation.
7. Contract c1 shows 200 + 40 + 25 - 15 = $250; the other totals reconcile too.
8. Resolve e1: its resolved badge appears, resolve is disabled, full trace
   remains available, and failing-agent count stays 1.
9. Deleting u1, a1, or s2 explains their respective dependency blocks.
   Deleting a4 succeeds, updates s2/s5 counts, and leaves c4 intact; u4 can
   then be deleted and unused s5 can be deleted.
10. Theme changes every surface, survives reload when storage works, and has
    no unreadable light-only dropdowns or modals.
11. At 375px, 768px, and 1440px viewport widths, navigation remains available,
    dialogs fit, tables scroll locally, and the page has no horizontal overflow.
12. Tab, Shift+Tab, Enter/Space, and Escape cover navigation, dropdowns, theme,
    collapsibles, confirmation, and modal interactions without focus escaping
    an open modal. No browser-console errors occur.
13. Reload restores fixtures and retains only saved theme preference. No
    backend or API connection is needed; no framework/build tooling is present.
