# AgentHub Admin Console

A responsive, single-page prototype for managing an AI agent rental platform. The six in-page sections cover the dashboard, users, agents, skills, contracts, and the error log.

## Run locally

From the project directory, start the included static server:

```bash
python3 -m http.server 3000
```

Open `http://localhost:3000`. Tailwind CSS v4 is loaded through its browser CDN and requires an internet connection. The prototype has no framework, build step, backend, or API dependency.

## Files

- `index.html` provides the page entry point, theme bootstrap, Tailwind CDN, and dark-mode variant.
- `app.js` contains fictional fixture data, rendering, navigation, dialogs, and demo-only interactions.
- `styles/custom-styles.css` applies the Obsidian Synthetics visual system to the shared admin UI.
- `assets/DESIGN.md` stores the supplied design-system reference.
- `assets/Google_Stitch_screenshot.png` stores the supplied Stitch dashboard reference image.
- [`SPECS.md`](SPECS.md) defines the requirements, fixed sample data, and acceptance checklist.

## Visual direction

The provided Obsidian Synthetics design-system reference is saved in [`assets/DESIGN.md`](assets/DESIGN.md) and applied through `styles/custom-styles.css`. It informs the compact technical typography, dark-first slate surfaces, cyan data accents, hairline borders, and precise component shapes. The supplied Google Stitch dashboard reference is available at [`assets/Google_Stitch_screenshot.png`](assets/Google_Stitch_screenshot.png).

## Demo behavior

Record edits, prompt drafts, and error resolutions stay in memory while navigating and reset on reload. Only the light/dark theme preference is saved in local storage. System prompt edits are drafts and are discarded when their dialog closes. All people, organizations, traces, and records are fictional.
