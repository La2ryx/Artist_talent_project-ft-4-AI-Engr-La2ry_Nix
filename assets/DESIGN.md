---
name: Obsidian Synthetics
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.375rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style
The design system delivers an architectural, high-precision desktop interface engineered for AI systems operators, prompt engineers, and operations leads orchestrating autonomous multi-agent pipelines.

The aesthetic is grounded in **Technical Minimalism with Precision Detailing**: high information density, structural layout discipline, razor-thin perimeter boundaries, and deep chromatic focus. It eschews decorative fluff, heavy drop shadows, and oversized border radii in favor of compact tabular layouts, micro-metrics, telemetry counters, and high-readability monospaced telemetry tokens.

Key emotional attributes:
- **Autonomous & Controlled**: Conveys stable orchestration of complex agent workloads without chaotic visual noise.
- **Architectural**: Rigid alignment grids, hairline dividing strokes, and intentional spatial distribution.
- **Instrument-grade**: Built like high-end flight decks or developer IDEs—prioritizing situational awareness, latency metrics, token consumption counts, and immediate state recognition.

## Colors
The color architecture utilizes an intentional dark mode default designed for prolonged desktop operational monitoring. It features high contrast legibility across multiple structural layers.

### Palette Architecture
- **Primary (`#6366F1` - Electric Indigo)**: Anchors interactive triggers, active breadcrumbs, active agent flow lines, and primary invocation buttons.
- **Secondary (`#06B6D4` - Cyan Metric)**: Designated strictly for data transmission indicators, I/O rates, vector query streams, and telemetry curves.
- **Tertiary (`#10B981` - Emerald Node)**: System operational health, live execution threads, and positive evaluation thresholds.
- **Neutral Foundation (`#0F172A` - Base Slate)**: The foundation layer extends from pure void background `#020617`, elevation surface `#0B0F19`, card container `#111827`, to hairline border slate `#1E293B` and active hover boundary `#334155`.

### Status & Telemetry Accents
- **Warning / Degraded (`#F59E0B`)**: Token limit warnings, slow response rate, rate-limit thresholds.
- **Destructive / Halted (`#EF4444`)**: Execution failure, loop overflow, unhandled model exceptions.
- **Standby / Cold Storage (`#64748B`)**: Idle agents, dormant scheduled runs.

### Data Visualization Rules
Use discrete chromatic bands for multi-agent traces: Agent Alpha (`#6366F1`), Agent Beta (`#06B6D4`), Agent Gamma (`#A855F7`), Evaluation Critic (`#F43F5E`). Use filled areas with max 8% alpha transparency underneath sparklines to avoid visual obstruction.

## Typography
Typography is tuned for technical legibility and information density.

### Typographic Roles
- **Headlines & Interface UI (`Geist`)**: Delivers geometric clarity with low character width variation, ensuring clean alignment across dense desktop sidebars, contextual drawers, and multi-column tables.
- **Telemetry & Machine Identifiers (`JetBrains Mono`)**: Strict monospace formatting reserved for agent hash IDs, token consumption counters, latency timestamps (`ms`), JSON payloads, prompt templates, and status tags.
- **Numbers & Metrics**: Tabular figures (`font-variant-numeric: tabular-nums`) must be active on all numeric instances across data grids, tables, and top-line stat counters to prevent horizontal jitter during real-time streaming updates.

## Layout & Spacing
The layout model employs a fluid, high-density desktop grid designed for screens from 1280px to ultra-wide displays (2560px+).

### Desktop Structure
- **Persistent Left Command Rail**: Fixed width of 64px (collapsed) or 220px (expanded), containing global workspace switching, top-level agent directories, and cluster metrics.
- **Workspace Canvas**: Fluid container dividing into primary data views, execution trees, and collateral telemetry drawers.
- **Split-Pane Ergonomics**: Resizable split panels utilizing hairline borders (`1px`) without drag shadows, prioritizing workspace real estate.

### Spacing Density
Padding inside cells and metrics uses compact vertical bounds (`space-xs` and `space-sm`) paired with moderate horizontal breathing room (`space-md`). Multi-card grid sections utilize a tight 16px gutter (`gutter-desktop`) to ensure at least 4 key telemetry cards sit within typical 1080p viewport heights above the fold.

## Elevation & Depth
This design system avoids traditional blurry drop shadows and floating skeuomorphic planes. Visual hierarchy is established strictly via **Tonal Stacking** and **Hairline Outlines**.

### Elevation Hierarchy
1. **Canvas Base (`#030712`)**: The outermost desktop viewport backdrop.
2. **Structural Tier 1 (`#0B0F17`)**: Side navigation bars, breadcrumb ribbons, and top action bars. Border right/bottom: `1px solid #1E293B`.
3. **Container Tier 2 (`#111827`)**: Table modules, metric stat cards, pipeline canvas surfaces. Surrounded by `1px solid #1F2937`.
4. **Interactive Overlays & Flyouts Tier 3 (`#1E293B`)**: Modal inspectors, agent debug drawers, prompt diff drawers. Outlined by `1px solid #334155` accompanied by a hyper-focused ambient contact shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.65)`.

### Border Discipline
Every panel, module, and table row partition is separated by a 1px solid rule using `#1E293B`. No element floats disconnected from structural visual grounding.

## Shapes
The shape system uses a compact, soft geometric standard (`roundedness: 1`). Radii are deliberate and tight to preserve usable pixel space inside compact desktop tables and dense grids.

### Radius Assignments
- **Input Fields, Table Rows, and Small Badges**: `0.25rem` (4px).
- **Cards, Drawers, Code Blocks, and Popover Menus**: `0.375rem` to `0.5rem` (6px to 8px max).
- **Status Indicators & Active Beacon Rings**: Exact circles (`9999px`) restricted to 6px–8px dot diameters.
- Buttons, inputs, and chips never exceed `0.375rem`; rounded-pill shapes are prohibited to avoid looking consumer-oriented.

## Components

### Buttons
- **Primary**: Solid `#6366F1` background, white label, 0.25rem border-radius, height 32px (compact) or 36px (regular). Hover: `#4F46E5`. Active: `#4338CA`.
- **Secondary / Ghost**: Background transparent, border `1px solid #334155`, text `#F8FAFC`. Hover: `#1E293B` background with border `#475569`.
- **Destructive**: Background `#7F1D1D` at 20% opacity, border `1px solid #991B1B`, text `#F87171`. Hover: background `#991B1B` at 40%.

### Status Badges & Chips
- **Micro Telemetry Badges**: Height 20px, font `JetBrains Mono` 10px, padding horizontal 6px, border-radius 3px.
  - *Active Run*: `#064E3B` background (40%), `#34D399` text, `1px solid #059669`. Includes a 5px pulsing neon emerald indicator dot.
  - *Queued*: `#1E293B` background, `#94A3B8` text, `1px solid #334155`.
  - *Error*: `#450A0A` background (40%), `#F87171` text, `1px solid #DC2626`.
- **Model Tag Chips**: Monospace text displaying model weights (e.g., `gpt-4o`, `claude-3-5-sonnet`), subtle `#1E293B` fill, `#CBD5E1` text, no hover state.

### Data Tables
- **Header**: Background `#0B0F17`, text `#64748B`, font `JetBrains Mono` 11px uppercase, border-bottom `1px solid #1E293B`.
- **Row Heights**: Fixed 36px (dense mode) or 44px (default mode).
- **Row Separation**: `1px solid #141D2E` dividing borders. Hover state applies `#0F172A` tint across the row with zero latency transition.
- **Cell Alignment**: Metric values right-aligned with monospace formatting; agent IDs and names left-aligned in standard UI font.

### Form Inputs & Prompts
- **Inputs**: Background `#0B0F17`, border `1px solid #1E293B`, height 32px, text `#F8FAFC`. Focus: border `#6366F1` with an ultra-thin 1px glow (`box-shadow: 0 0 0 1px #6366F1`).
- **Prompt Playgrounds / Code Inputs**: Darkened surface `#050811`, border `1px solid #1E293B`, font `JetBrains Mono` 12px, line numbers in `#475569`.

### Telemetry Cards
Compact modules holding metrics such as "Tokens / Sec", "P99 Latency", "Cost / Invocation". Metric values styled with Geist semi-bold at 22px tabular numbers, accompanied by micro inline sparklines (height 16px, line thickness 1.5px, zero axes).
