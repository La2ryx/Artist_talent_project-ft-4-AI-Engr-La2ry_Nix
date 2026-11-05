"use strict";

const users = [
  { id: "u1", name: "Maya Chen", email: "maya@example.com", company: "Northstar Studio", plan: "Enterprise", status: "Active", joined: "2026-08-12" },
  { id: "u2", name: "James Wilson", email: "james@example.com", company: "Orbit Labs", plan: "Pro", status: "Active", joined: "2026-09-03" },
  { id: "u3", name: "Sofia Rivera", email: "sofia@example.com", company: "Bloom Commerce", plan: "Starter", status: "Suspended", joined: "2026-10-15" },
  { id: "u4", name: "Noah Patel", email: "noah@example.com", company: "Northstar Studio", plan: "Pro", status: "Active", joined: "2026-10-21" },
  { id: "u5", name: "Olivia Brooks", email: "olivia@example.com", company: "Cedar Works", plan: "Starter", status: "Active", joined: "2026-10-28" }
];
const skills = [
  { id: "s1", name: "Web browsing", description: "Find and summarize public web information.", price: 40 },
  { id: "s2", name: "Document reading", description: "Extract information from supplied documents.", price: 25 },
  { id: "s3", name: "Calendar management", description: "Organize appointments and scheduling requests.", price: 30 },
  { id: "s4", name: "Email drafting", description: "Prepare email replies for human review.", price: 20 },
  { id: "s5", name: "Data analysis", description: "Summarize datasets and identify trends.", price: 50 },
  { id: "s6", name: "CRM updates", description: "Maintain customer records and activity notes.", price: 35 }
];
const agents = [
  { id: "a1", name: "Research Scout", ownerId: "u1", status: "Active", skillIds: ["s1", "s2"], prompt: "Research public sources and supplied documents. Summarize findings with sources and distinguish facts from uncertainty." },
  { id: "a2", name: "Schedule Pilot", ownerId: "u2", status: "Active", skillIds: ["s3", "s4"], prompt: "Organize scheduling requests and draft confirmation emails. Ask for approval before changing appointments or sending messages." },
  { id: "a3", name: "Support Compass", ownerId: "u3", status: "Failing", skillIds: ["s2", "s4", "s6"], prompt: "Use supplied documentation to draft helpful customer replies. Flag missing information and request human review before updating CRM records." },
  { id: "a4", name: "Insight Engine", ownerId: "u4", status: "Inactive", skillIds: ["s2", "s5"], prompt: "Analyze supplied datasets and documents. Explain assumptions, report limitations, and never invent missing observations." }
];
const contracts = [
  { id: "c1", clientId: "u1", clientSnapshot: "Northstar Studio", agentId: "a1", agentSnapshot: "Research Scout", status: "Active", start: "2026-11-01", end: "2026-11-30", base: 200, skillItems: [{ name: "Web browsing", price: 40 }, { name: "Document reading", price: 25 }], discount: 15, paidDate: "2026-11-01", total: 250 },
  { id: "c2", clientId: "u2", clientSnapshot: "Orbit Labs", agentId: "a2", agentSnapshot: "Schedule Pilot", status: "Active", start: "2026-11-01", end: "2026-11-30", base: 150, skillItems: [{ name: "Calendar management", price: 30 }, { name: "Email drafting", price: 20 }], discount: 0, paidDate: "2026-11-01", total: 200 },
  { id: "c3", clientId: "u3", clientSnapshot: "Bloom Commerce", agentId: "a3", agentSnapshot: "Support Compass", status: "Active", start: "2026-11-01", end: "2026-11-30", base: 180, skillItems: [{ name: "Document reading", price: 25 }, { name: "Email drafting", price: 20 }, { name: "CRM updates", price: 35 }], discount: 10, paidDate: "2026-11-01", total: 250 },
  { id: "c4", clientId: "u4", clientSnapshot: "Northstar Studio", agentId: "a4", agentSnapshot: "Insight Engine", status: "Past", start: "2026-10-01", end: "2026-10-31", base: 200, skillItems: [{ name: "Document reading", price: 25 }, { name: "Data analysis", price: 50 }], discount: 25, paidDate: "2026-10-01", total: 250 }
];
const errors = [
  { id: "e1", timestamp: "2026-11-05 09:42:18", agentId: "a3", agentSnapshot: "Support Compass", severity: "Critical", type: "Authentication", description: "CRM connector rejected the configured credentials.", trace: "AuthenticationError: CRM connector rejected the configured credentials.\nagentId=a3 operation=connectCRM\n  at connectCRM (connectors/crm.js:42:11)\n  at runTask (runtime/agent-runner.js:118:7)\n  at processQueue (runtime/queue.js:63:5)" },
  { id: "e2", timestamp: "2026-11-05 08:15:03", agentId: "a1", agentSnapshot: "Research Scout", severity: "Warning", type: "Timeout", description: "Public source exceeded the response time limit.", trace: "TimeoutError: Public source exceeded the response time limit.\nagentId=a1 operation=fetchSource\n  at fetchSource (connectors/web.js:87:13)\n  at collectResults (agents/research.js:54:9)\n  at runTask (runtime/agent-runner.js:118:7)" },
  { id: "e3", timestamp: "2026-11-04 16:30:45", agentId: "a2", agentSnapshot: "Schedule Pilot", severity: "Error", type: "Rate limit", description: "Calendar provider temporarily rejected additional requests.", trace: "RateLimitError: Calendar provider temporarily rejected additional requests.\nagentId=a2 operation=listEvents\n  at listEvents (connectors/calendar.js:103:15)\n  at planSchedule (agents/scheduler.js:72:9)\n  at runTask (runtime/agent-runner.js:118:7)" },
  { id: "e4", timestamp: "2026-11-04 14:12:09", agentId: "a4", agentSnapshot: "Insight Engine", severity: "Error", type: "Validation", description: "Supplied dataset is missing a required date column.", trace: "ValidationError: Supplied dataset is missing a required date column.\nagentId=a4 operation=validateColumns\n  at validateColumns (runtime/data.js:35:11)\n  at analyzeDataset (agents/insights.js:91:7)\n  at runTask (runtime/agent-runner.js:118:7)" },
  { id: "e5", timestamp: "2026-11-04 11:05:22", agentId: "a3", agentSnapshot: "Support Compass", severity: "Warning", type: "Document parsing", description: "A supplied document contains an unreadable page.", trace: "DocumentParseWarning: A supplied document contains an unreadable page.\nagentId=a3 operation=readPage\n  at readPage (runtime/documents.js:66:13)\n  at extractText (runtime/documents.js:103:9)\n  at runTask (runtime/agent-runner.js:118:7)" },
  { id: "e6", timestamp: "2026-11-03 17:48:31", agentId: "a1", agentSnapshot: "Research Scout", severity: "Error", type: "Connection", description: "Public source disconnected before the response completed.", trace: "ConnectionError: Public source disconnected before the response completed.\nagentId=a1 operation=readResponse\n  at readResponse (connectors/web.js:121:17)\n  at fetchSource (connectors/web.js:92:9)\n  at runTask (runtime/agent-runner.js:118:7)" }
].map((error) => ({ ...error, resolved: false }));

const sections = {
  dashboard: ["Dashboard", "November 2026 reporting · A snapshot of platform activity and agent health."],
  users: ["User management", "Customer accounts and subscription status."],
  agents: ["Agent management", "Owners, capabilities, and local prompt configuration drafts."],
  skills: ["Skills catalog", "Reusable capabilities available to your agents."],
  contracts: ["Agent contracts", "Current and historical rental agreements with itemized pricing."],
  errors: ["Error log", "Execution issues and resolution acknowledgements. Timestamps are UTC."]
};

// The shell is static; all fixture values below are added with textContent.
document.body.innerHTML = `
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="app-shell flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <aside class="sidebar flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div class="brand"><span class="brand-mark" aria-hidden="true">AH</span><div class="brand-copy"><strong>AgentHub</strong><span>Admin console</span></div></div>
      <nav id="navigation" aria-label="Main navigation" class="navigation">
        <button data-section="dashboard" aria-current="page"><span aria-hidden="true">OV</span><b>Dashboard</b></button>
        <button data-section="users"><span aria-hidden="true">US</span><b>Users</b></button>
        <button data-section="agents"><span aria-hidden="true">AG</span><b>Agents</b></button>
        <button data-section="skills"><span aria-hidden="true">SK</span><b>Skills</b></button>
        <button data-section="contracts"><span aria-hidden="true">CT</span><b>Contracts</b></button>
        <button data-section="errors"><span aria-hidden="true">ER</span><b>Error log</b></button>
      </nav>
      <div class="workspace"><i aria-hidden="true"></i><div><strong>Demo workspace</strong><span>Edits reset on reload</span></div></div>
    </aside>
    <div class="main-column">
      <header class="topbar flex h-16 items-center justify-between border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><div><span>DEMO WORKSPACE</span><strong>AgentHub operations</strong></div><button id="theme-toggle" type="button" aria-label="Switch to dark mode">Dark mode</button></header>
      <main id="main" class="main-content mx-auto w-full max-w-[1440px]">
        <div class="page-heading"><div><span>ADMINISTRATION</span><h1 id="section-heading" tabindex="-1">Dashboard</h1><p id="section-description"></p></div><p class="sample-note">Fictional sample data · Changes reset on reload</p></div>
        <div id="content"></div>
        <p id="status-message" class="sr-only" role="status" aria-live="polite"></p>
      </main>
    </div>
  </div>
  <dialog id="app-dialog" aria-labelledby="dialog-title">
    <div class="dialog-header"><h2 id="dialog-title"></h2><button type="button" data-dialog-close aria-label="Close dialog">×</button></div>
    <div id="dialog-content" class="dialog-content"></div>
  </dialog>`;

const style = document.createElement("style");
style.textContent = `
  :root { color-scheme: light; --page:#f8fafc; --surface:#fff; --raised:#f1f5f9; --ink:#0f172a; --muted:#64748b; --border:#e2e8f0; --accent:#4f46e5; --accent-soft:#eef2ff; --green:#047857; --red:#b91c1c; --amber:#92400e; --orange:#c2410c; --shadow:0 12px 32px rgb(15 23 42 / .16); font-family:ui-sans-serif,system-ui,sans-serif; }
  :root.dark { color-scheme:dark; --page:#020617; --surface:#0f172a; --raised:#020617; --ink:#f1f5f9; --muted:#94a3b8; --border:#1e293b; --accent:#818cf8; --accent-soft:#1e1b4b; --green:#6ee7b7; --red:#fca5a5; --amber:#fcd34d; --orange:#fdba74; --shadow:0 12px 32px rgb(0 0 0 / .4); }
  * { box-sizing:border-box; } body { margin:0; background:var(--page); color:var(--ink); } button,textarea { font:inherit; } button { cursor:pointer; }
  :focus-visible { outline:3px solid #818cf8; outline-offset:2px; } .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0; }
  .skip-link { position:fixed;z-index:90;top:-4rem;left:1rem;padding:.75rem 1rem;background:var(--surface);color:var(--ink);border-radius:.5rem; } .skip-link:focus { top:1rem; }
  .app-shell { min-height:100vh;display:flex; } .sidebar { width:240px;flex:none;display:flex;flex-direction:column;background:var(--surface);border-right:1px solid var(--border); }
  .brand { height:64px;display:flex;align-items:center;gap:12px;padding:0 20px;border-bottom:1px solid var(--border); } .brand-mark { width:36px;height:36px;display:grid;place-items:center;border-radius:8px;background:#4f46e5;color:white;font-size:13px;font-weight:700; }
  .brand-copy strong,.brand-copy span,.workspace strong,.workspace span { display:block; } .brand-copy strong { font-size:14px; } .brand-copy span,.workspace span { margin-top:3px;color:var(--muted);font-size:11px; }
  .navigation { display:grid;gap:4px;padding:16px 12px; } .navigation button { min-height:44px;display:flex;align-items:center;gap:12px;padding:6px 10px;border:0;border-radius:6px;background:transparent;color:var(--muted);text-align:left;font-size:14px; } .navigation button[aria-current="page"] { background:#4f46e5;color:white; }
  .navigation button:hover:not([aria-current="page"]) { background:var(--raised);color:var(--ink); } .navigation button span { width:26px;height:26px;display:grid;place-items:center;flex:none;border-radius:5px;background:color-mix(in srgb,var(--accent) 12%,transparent);color:var(--accent);font-size:9px;font-weight:700; } .navigation button[aria-current="page"] span { background:rgb(255 255 255 / .15);color:white; }
  .workspace { margin-top:auto;padding:16px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px; } .workspace i { width:8px;height:8px;border-radius:50%;background:#10b981; } .workspace strong { font-size:12px; }
  .main-column { min-width:0;flex:1; } .topbar { height:64px;padding:0 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);background:var(--surface); } .topbar div span,.page-heading > div > span { display:block;color:var(--muted);font-size:10px;font-weight:700;letter-spacing:.08em; } .topbar div strong { display:block;margin-top:3px;font-size:13px; }
  .topbar button,.button { min-height:40px;padding:0 13px;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--ink);font-size:13px;font-weight:600; } .topbar button:hover,.button:hover { background:var(--raised); }
  .dialog-actions { display:flex;justify-content:flex-end;gap:10px;margin-top:22px; } .danger-button { border-color:#dc2626;background:#dc2626;color:#fff; } .danger-button:hover { border-color:#b91c1c;background:#b91c1c; }
  .main-content { max-width:1440px;margin:auto;padding:28px 32px 48px; } .page-heading { display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:24px; } .page-heading h1 { margin:5px 0 0;font-size:24px;line-height:1.25; } .page-heading p { margin:6px 0 0;color:var(--muted);font-size:13px;line-height:1.5; } .sample-note { font-size:11px!important;white-space:nowrap; }
  .card { border:1px solid var(--border);border-radius:8px;background:var(--surface); } .metrics { display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px; } .metric { padding:18px; } .metric-head { display:flex;align-items:center;justify-content:space-between;gap:8px; } .metric-icon { width:38px;height:38px;display:grid;place-items:center;border-radius:7px;background:var(--accent-soft);color:var(--accent);font-size:16px;font-weight:700; } .metric-label { color:var(--muted);font-size:11px;font-weight:700;text-transform:uppercase; } .metric-value { margin-top:16px;font-size:26px;font-weight:650;font-variant-numeric:tabular-nums; } .metric-note { margin:6px 0 0;color:var(--muted);font-size:11px; }
  .activity { margin-top:18px;padding:20px; } .activity-head { display:flex;align-items:flex-start;justify-content:space-between;gap:12px; } .activity h2 { margin:0;font-size:16px; } .activity p { margin:5px 0 0;color:var(--muted);font-size:12px; } .pill { display:inline-flex;align-items:center;padding:5px 9px;border-radius:999px;background:var(--accent-soft);color:var(--accent);font-size:11px;font-weight:600;white-space:nowrap; }
  .chart-bars { height:200px;margin-top:20px;padding:0 8px 8px;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));align-items:end;gap:16px;border-bottom:1px solid var(--border); } .chart-col { height:100%;display:flex;flex-direction:column;justify-content:end;align-items:center;gap:8px;color:var(--muted);font-size:11px; } .chart-bar { width:min(100%,64px);border-radius:5px 5px 0 0;background:#6366f1;opacity:.82; } .legend { display:flex;align-items:center;gap:8px;margin-top:14px;color:var(--muted);font-size:11px; } .legend i { width:8px;height:8px;border-radius:2px;background:#6366f1; }
  .table-wrap { width:100%;overflow-x:auto;border:1px solid var(--border);border-radius:8px; } table { width:100%;min-width:680px;border-collapse:collapse;text-align:left;font-size:13px; } th { padding:12px 14px;background:var(--raised);color:var(--muted);font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap; } td { padding:11px 14px;border-top:1px solid var(--border);vertical-align:middle; } .muted { color:var(--muted); } .small { font-size:11px; } .nowrap { white-space:nowrap; } .wrap-cell { max-width:300px;white-space:normal;line-height:1.5; }
  .badge { display:inline-flex;align-items:center;padding:4px 8px;border-radius:999px;background:var(--raised);color:var(--muted);font-size:11px;font-weight:600;white-space:nowrap; } .badge.green { background:#d1fae5;color:#065f46; } .badge.red { background:#fee2e2;color:#991b1b; } .badge.orange { background:#ffedd5;color:#9a3412; } .badge.amber { background:#fef3c7;color:#78350f; } .badge.blue { background:#e0e7ff;color:#3730a3; } :root.dark .badge.green { background:#064e3b;color:#a7f3d0; } :root.dark .badge.red { background:#7f1d1d;color:#fecaca; } :root.dark .badge.orange { background:#7c2d12;color:#fed7aa; } :root.dark .badge.amber { background:#78350f;color:#fde68a; } :root.dark .badge.blue { background:#312e81;color:#c7d2fe; }
  .row-actions { position:relative;display:flex;justify-content:flex-end; } .dots { width:40px;height:40px;border:0;border-radius:6px;background:transparent;color:var(--muted);font-size:22px;line-height:1; } .dots:hover { background:var(--raised);color:var(--ink); } .popover { position:fixed;z-index:80;width:176px;padding:4px;border:1px solid var(--border);border-radius:7px;background:var(--surface);box-shadow:var(--shadow); } .popover button { display:block;width:100%;min-height:38px;padding:7px 10px;border:0;border-radius:4px;background:transparent;color:var(--ink);text-align:left;font-size:12px; } .popover button:hover:not(:disabled) { background:var(--raised); } .popover button.danger { color:var(--red); } .popover button:disabled { opacity:.5;cursor:not-allowed; }
  .cards-grid { display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px; } .skill-card { min-height:176px;padding:17px;display:flex;flex-direction:column; } .skill-card-head { display:flex;align-items:start;justify-content:space-between;gap:8px; } .skill-card h2 { margin:4px 0;font-size:15px; } .skill-card > p { flex:1;margin:7px 0;color:var(--muted);font-size:13px;line-height:1.6; } .skill-card-foot { display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid var(--border);padding-top:12px;font-size:12px; }
  .skill-grid { display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows 220ms ease,opacity 220ms ease; } .skill-grid[data-open="true"] { grid-template-rows:1fr;opacity:1; } .skill-grid > div { overflow:hidden; } .skill-chips { display:flex;flex-wrap:wrap;gap:5px;padding-top:8px; } .skills-toggle { min-height:40px;padding:5px 8px;border:0;border-radius:5px;background:transparent;color:var(--accent);font-size:12px;font-weight:600; } .skills-toggle:hover { background:var(--accent-soft); }
  dialog { width:min(94vw,640px);max-height:min(88vh,900px);padding:0;overflow:hidden;border:1px solid var(--border);border-radius:12px;background:var(--surface);color:var(--ink);box-shadow:var(--shadow); } dialog::backdrop { background:rgb(15 23 42 / .62);backdrop-filter:blur(3px); } .dialog-header { display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;border-bottom:1px solid var(--border); } .dialog-header h2 { margin:0;font-size:18px; } .dialog-header button { width:40px;height:40px;border:0;border-radius:6px;background:transparent;color:var(--muted);font-size:24px; } .dialog-header button:hover { background:var(--raised);color:var(--ink); } .dialog-content { max-height:calc(88vh - 74px);overflow-y:auto;padding:20px; } .field-grid { display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px; } .field { min-width:0;padding:11px;border-radius:6px;background:var(--raised); } .field dt { color:var(--muted);font-size:11px;font-weight:600; } .field dd { margin:5px 0 0;overflow-wrap:anywhere;font-size:13px;font-weight:600; } .prompt-label { display:block;margin-top:16px;font-size:13px;font-weight:600; } textarea { width:100%;min-height:144px;margin-top:8px;padding:11px;border:1px solid var(--border);border-radius:6px;background:var(--page);color:var(--ink);font-size:13px;line-height:1.6;resize:vertical; } .notice { margin:10px 0 0;color:var(--muted);font-size:11px; } .trace-title { margin:18px 0 8px;font-size:13px; } pre { max-height:260px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;padding:14px;border-radius:6px;background:var(--raised);font:11px/1.6 ui-monospace,monospace; }
  .line-item { display:flex;justify-content:space-between;gap:14px;padding:10px 12px;border-bottom:1px solid var(--border);font-size:13px; } .line-item:last-child { border-bottom:0; } .line-total { font-weight:700; }
  @media(max-width:1023px) { .metrics { grid-template-columns:repeat(2,minmax(0,1fr)); } .cards-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
  @media(max-width:1023px) { .sidebar { width:64px; } .brand { justify-content:center;padding:0 8px; } .brand-copy,.workspace div { display:none; } .navigation { padding:12px 7px; } .navigation button { justify-content:center;padding:6px; } .navigation button b { position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap; } .workspace { justify-content:center;padding:14px 0; } .workspace i { flex:none; } .main-content { padding:22px 24px 40px; } }
  @media(max-width:640px) { .topbar { padding:0 15px; } .main-content { padding:18px 14px 32px; } .page-heading { display:block;margin-bottom:18px; } .page-heading h1 { font-size:22px; } .sample-note { white-space:normal; } .metrics,.cards-grid { grid-template-columns:1fr;gap:10px; } .metric { padding:15px; } .metric-value { margin-top:10px;font-size:23px; } .activity { padding:15px; } .chart-bars { gap:7px;padding:0 2px 8px; } .field-grid { grid-template-columns:1fr; } .dialog-content { padding:15px; } }
  @media(prefers-reduced-motion:reduce) { *,*::before,*::after { scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important; } }
`;
document.head.append(style);
// Keep the design-system overrides after the base styles appended above.
const customStylesheet = document.querySelector('link[href="styles/custom-styles.css"]');
if (customStylesheet) document.head.append(customStylesheet);

const content = document.getElementById("content");
const dialog = document.getElementById("app-dialog");
const dialogContent = document.getElementById("dialog-content");
const dialogTitle = document.getElementById("dialog-title");
const statusMessage = document.getElementById("status-message");
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });
let currentSection = "dashboard";
let openMenu = null;
let modalOpener = null;
const expandedAgents = new Set();
let backdropPointer = false;

const money = (amount) => currency.format(amount);
const formatDate = (value) => dateFormat.format(new Date(`${value}T00:00:00Z`));
const byId = (list, id) => list.find((item) => item.id === id);
const make = (tag, className = "", text = null) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== null) node.textContent = text;
  return node;
};
const addText = (parent, tag, className, value) => parent.append(make(tag, className, value));
const announce = (message) => { statusMessage.textContent = ""; requestAnimationFrame(() => { statusMessage.textContent = message; }); };

function badge(label, tone = "neutral") { return make("span", `badge ${tone}`, label); }
function card(className = "") { return make("section", `card ${className}`); }

function actionControl(kind, id, actions) {
  const wrap = make("div", "row-actions");
  const trigger = make("button", "dots", "⋮");
  const menuId = `menu-${kind}-${id}`;
  trigger.type = "button";
  const recordName = { user: byId(users, id)?.name, agent: byId(agents, id)?.name, skill: byId(skills, id)?.name, contract: byId(contracts, id)?.clientSnapshot, error: byId(errors, id)?.agentSnapshot }[kind];
  trigger.setAttribute("aria-label", `Actions for ${recordName || `${kind} ${id}`}`);
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", menuId);
  trigger.dataset.menuTrigger = "true";
  const menu = make("div", "popover sr-only");
  menu.id = menuId;
  menu.dataset.menu = "true";
  menu.hidden = true;
  actions.forEach(({ label, action, disabled = false }) => {
    const button = make("button", action === "delete" ? "danger" : "", label);
    button.type = "button";
    button.dataset.rowAction = action;
    button.dataset.kind = kind;
    button.dataset.id = id;
    button.disabled = disabled;
    menu.append(button);
  });
  wrap.append(trigger, menu);
  return wrap;
}

function fieldList(fields) {
  const list = make("dl", "field-grid");
  fields.forEach(([label, value]) => {
    const field = make("div", "field");
    addText(field, "dt", "", label);
    addText(field, "dd", "", value);
    list.append(field);
  });
  return list;
}

function tableShell(headers, rows, emptyText) {
  if (!rows.length) return make("p", "card muted", emptyText);
  const wrapper = make("div", "table-wrap");
  const table = make("table");
  const thead = make("thead");
  const headerRow = make("tr");
  headers.forEach((label) => {
    const th = make("th", "", label);
    th.scope = "col";
    headerRow.append(th);
  });
  thead.append(headerRow);
  const tbody = make("tbody");
  rows.forEach((row) => tbody.append(row));
  table.append(thead, tbody);
  wrapper.append(table);
  return wrapper;
}

function tableRow() { return make("tr"); }
function cell(text, className = "") { return make("td", className, text); }
function actionCell(kind, id, actions) {
  const td = make("td", "");
  td.append(actionControl(kind, id, actions));
  return td;
}

function closeMenu(restoreFocus = false) {
  if (!openMenu) return;
  const { menu, trigger } = openMenu;
  menu.hidden = true;
  menu.classList.add("sr-only");
  trigger.setAttribute("aria-expanded", "false");
  openMenu = null;
  if (restoreFocus && trigger.isConnected) trigger.focus();
}

function openDialog(title, nodes, opener = document.activeElement) {
  closeMenu();
  modalOpener = opener;
  dialogTitle.textContent = title;
  dialogContent.replaceChildren(...nodes);
  dialog.showModal();
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => dialog.querySelector("[data-dialog-close],button,textarea")?.focus());
}

function showDetails(title, fields, opener) { openDialog(title, [fieldList(fields)], opener); }

function renderDashboard() {
  const paidNovember = contracts.filter((contract) => contract.paidDate.startsWith("2026-11"));
  const metrics = [
    ["$", "Revenue this month", money(paidNovember.reduce((sum, item) => sum + item.total, 0)), "November 2026 · contracts paid"],
    ["−", "Discounts & coupons", money(paidNovember.reduce((sum, item) => sum + item.discount, 0)), "November 2026 · discounts applied"],
    ["A", "Active agents", String(agents.filter((agent) => agent.status === "Active").length), "Current agent status"],
    ["!", "Failing agents", String(agents.filter((agent) => agent.status === "Failing").length), "Current agent status"]
  ];
  const grid = make("div", "metrics");
  metrics.forEach(([icon, label, value, note]) => {
    const item = card("metric");
    const head = make("div", "metric-head");
    head.append(make("span", "metric-icon", icon), make("span", "metric-label", label));
    item.append(head, make("div", "metric-value", value), make("p", "metric-note", note));
    grid.append(item);
  });
  const activity = card("activity");
  const head = make("div", "activity-head");
  const title = make("div");
  title.append(make("h2", "", "Weekly activity"), make("p", "", "Chart placeholder - sample activity, not live analytics"));
  head.append(title, badge("NOV 2026", "blue"));
  const bars = make("div", "chart-bars");
  [["Mon", 45], ["Tue", 67], ["Wed", 54], ["Thu", 78], ["Fri", 62], ["Sat", 92], ["Sun", 38]].forEach(([day, height]) => {
    const column = make("div", "chart-col");
    const bar = make("div", "chart-bar");
    bar.style.height = `${height}%`;
    bar.setAttribute("aria-label", `${day}: sample activity`);
    column.append(bar, make("span", "", day));
    bars.append(column);
  });
  const legend = make("div", "legend");
  legend.append(make("i"), document.createTextNode("Sample agent activity"));
  activity.append(head, bars, legend);

  const agentStatus = card("dashboard-agents");
  const agentHeader = make("div", "activity-head dashboard-agents-head");
  const agentHeading = make("div");
  agentHeading.append(
    make("h2", "", "Agent status"),
    make("p", "", "Current agent health and ownership · demo workspace")
  );
  agentHeader.append(agentHeading, badge(`${agents.length} agents`, "blue"));
  const agentRows = agents.map((agent) => {
    const row = tableRow();
    const name = make("td");
    name.append(make("strong", "", agent.name), make("span", "block small muted mono", agent.id));
    const statusTone = agent.status === "Active" ? "green" : agent.status === "Failing" ? "red" : "neutral";
    row.append(
      name,
      cell(byId(users, agent.ownerId)?.name || "Owner removed"),
      (() => { const td = make("td"); td.append(badge(agent.status, statusTone)); return td; })(),
      cell(String(agent.skillIds.length), "numeric-cell"),
      actionCell("agent", agent.id, [{ label: "Configure", action: "detail" }])
    );
    return row;
  });
  agentStatus.append(
    agentHeader,
    tableShell(["Agent", "Owner", "Status", "Skills", "Actions"], agentRows, "No agents are configured in this demo workspace.")
  );

  content.replaceChildren(grid, activity, agentStatus);
}

function renderUsers() {
  const rows = users.map((user) => {
    const row = tableRow();
    const name = make("td", "");
    name.append(make("strong", "", user.name), make("span", "block small muted", user.company));
    const status = make("td");
    status.append(badge(user.status, user.status === "Active" ? "green" : "neutral"));
    row.append(name, cell(user.email), cell(user.plan), status, actionCell("user", user.id, [{ label: "View detail", action: "detail" }, { label: "Delete", action: "delete" }]));
    return row;
  });
  content.replaceChildren(tableShell(["Name", "Email", "Plan", "Status", "Actions"], rows, "No users remain in this demo workspace."));
}

function renderAgents() {
  const rows = agents.map((agent) => {
    const row = tableRow();
    const owner = byId(users, agent.ownerId);
    const status = make("td");
    status.append(badge(agent.status, agent.status === "Active" ? "green" : agent.status === "Failing" ? "red" : "neutral"));
    const skillCell = make("td");
    const toggle = make("button", "skills-toggle", `${expandedAgents.has(agent.id) ? "−" : "+"} ${agent.skillIds.length} skills`);
    toggle.type = "button";
    toggle.dataset.skillsToggle = agent.id;
    toggle.setAttribute("aria-expanded", String(expandedAgents.has(agent.id)));
    toggle.setAttribute("aria-controls", `skills-${agent.id}`);
    const panel = make("div", "skill-grid");
    panel.id = `skills-${agent.id}`;
    panel.dataset.open = String(expandedAgents.has(agent.id));
    panel.setAttribute("aria-hidden", String(!expandedAgents.has(agent.id)));
    panel.inert = !expandedAgents.has(agent.id);
    const chips = make("div", "skill-chips");
    agent.skillIds.map((id) => byId(skills, id)).filter(Boolean).forEach((skill) => chips.append(badge(skill.name, "blue")));
    panel.append(chips);
    skillCell.append(toggle, panel);
    row.append(cell(agent.name), cell(owner?.name || "Owner removed"), status, skillCell, actionCell("agent", agent.id, [{ label: "Configure", action: "detail" }, { label: "Delete", action: "delete" }]));
    return row;
  });
  content.replaceChildren(tableShell(["Agent", "Owner", "Status", "Skills", "Actions"], rows, "No agents remain in this demo workspace."));
}

function renderSkills() {
  const intro = make("p", "muted", "Skills are capabilities that can be attached to an agent, such as browsing the web, reading documents, or managing calendars.");
  intro.style.margin = "0 0 18px";
  const grid = make("div", "cards-grid");
  skills.forEach((skill) => {
    const count = agents.filter((agent) => agent.skillIds.includes(skill.id)).length;
    const item = card("skill-card");
    const head = make("div", "skill-card-head");
    head.append(make("h2", "", skill.name), actionControl("skill", skill.id, [{ label: "View detail", action: "detail" }, { label: "Delete", action: "delete" }]));
    const footer = make("div", "skill-card-foot");
    footer.append(badge(`${count} enabled agents`, "blue"), make("strong", "", `${money(skill.price)} / mo`));
    item.append(head, make("p", "", skill.description), footer);
    grid.append(item);
  });
  content.replaceChildren(intro, grid);
}

function renderContracts() {
  const rows = contracts.map((contract) => {
    const row = tableRow();
    const status = make("td");
    status.append(badge(contract.status, contract.status === "Active" ? "green" : "neutral"));
    row.append(cell(contract.clientSnapshot), cell(contract.agentSnapshot), cell(contract.skillItems.map((item) => item.name).join(", "), "wrap-cell"), cell(`${formatDate(contract.start)} – ${formatDate(contract.end)}`, "nowrap small"), status, cell(money(contract.total), "nowrap"), actionCell("contract", contract.id, [{ label: "View detail", action: "detail" }]));
    return row;
  });
  content.replaceChildren(tableShell(["Client", "Rented agent", "Contracted skills", "Dates", "Status", "Total paid", "Actions"], rows, "No contracts are available."));
}

function renderErrors() {
  const rows = errors.map((error) => {
    const row = tableRow();
    const severity = make("td", "nowrap");
    const tone = error.severity === "Critical" ? "red" : error.severity === "Error" ? "orange" : "amber";
    severity.append(badge(error.severity, tone), make("span", "small muted", ` ${error.type}`));
    const resolution = make("td");
    resolution.append(badge(error.resolved ? "Resolved" : "Unresolved", error.resolved ? "green" : "neutral"));
    const actions = [{ label: "View detail", action: "detail" }, { label: error.resolved ? "Resolved" : "Mark as resolved", action: "resolve", disabled: error.resolved }];
    row.append(cell(`${error.timestamp} UTC`, "nowrap small"), cell(error.agentSnapshot), severity, cell(error.description, "wrap-cell"), resolution, actionCell("error", error.id, actions));
    return row;
  });
  content.replaceChildren(tableShell(["Timestamp (UTC)", "Agent", "Severity / type", "Description", "Resolution", "Actions"], rows, "No errors are recorded in this demo workspace."));
}

function render() {
  const [title, description] = sections[currentSection];
  document.getElementById("section-heading").textContent = title;
  document.getElementById("section-description").textContent = description;
  document.querySelectorAll("[data-section]").forEach((button) => {
    const active = button.dataset.section === currentSection;
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  ({ dashboard: renderDashboard, users: renderUsers, agents: renderAgents, skills: renderSkills, contracts: renderContracts, errors: renderErrors })[currentSection]();
}

function showUser(user, opener) {
  showDetails("User details", [["User ID", user.id], ["Name", user.name], ["Email", user.email], ["Company", user.company], ["Plan", user.plan], ["Status", user.status], ["Joined", formatDate(user.joined)]], opener);
}
function showAgent(agent, opener) {
  const details = make("div");
  details.append(fieldList([["Agent ID", agent.id], ["Name", agent.name], ["Owner", byId(users, agent.ownerId)?.name || "Owner removed"], ["Status", agent.status]]));
  const label = make("label", "prompt-label", "System prompt");
  const textarea = make("textarea");
  textarea.value = agent.prompt;
  label.append(textarea);
  details.append(label, make("p", "notice", "Draft only - changes are discarded when you close this dialog."));
  openDialog("Configure agent", [details], opener);
}
function showSkill(skill, opener) {
  const count = agents.filter((agent) => agent.skillIds.includes(skill.id)).length;
  showDetails("Skill details", [["Skill ID", skill.id], ["Name", skill.name], ["Description", skill.description], ["Monthly price", `${money(skill.price)} / month`], ["Enabled agents", String(count)]], opener);
}
function showContract(contract, opener) {
  const details = make("div");
  details.append(fieldList([["Contract ID", contract.id], ["Client", contract.clientSnapshot], ["Agent", contract.agentSnapshot], ["Status", contract.status], ["Start date", formatDate(contract.start)], ["End date", formatDate(contract.end)], ["Payment date", formatDate(contract.paidDate)]]));
  const breakdown = make("div", "card");
  const lines = [["Base charge", contract.base], ...contract.skillItems.map((item) => [item.name, item.price]), ["Discount", -contract.discount]];
  lines.forEach(([label, amount]) => {
    const line = make("div", "line-item");
    line.append(make("span", "muted", label), make("strong", "", money(amount)));
    breakdown.append(line);
  });
  const total = make("div", "line-item line-total");
  total.append(make("span", "", "Total paid"), make("strong", "", money(contract.total)));
  breakdown.append(total);
  details.append(make("h3", "trace-title", "Itemized charges"), breakdown);
  openDialog("Contract details", [details], opener);
}
function showError(error, opener) {
  const fields = fieldList([["Error ID", error.id], ["Timestamp (UTC)", `${error.timestamp} UTC`], ["Agent", error.agentSnapshot], ["Severity", error.severity], ["Type", error.type], ["Description", error.description], ["Resolution", error.resolved ? "Resolved" : "Unresolved"]]);
  const trace = make("pre");
  trace.textContent = error.trace;
  openDialog("Error details", [fields, make("h3", "trace-title", "Execution trace"), trace], opener);
}

function dependencyMessage(kind, record) {
  if (kind === "user") {
    const owned = agents.filter((agent) => agent.ownerId === record.id);
    if (owned.length) return `Cannot delete ${record.name}: remove owned agent${owned.length > 1 ? "s" : ""} (${owned.map((agent) => agent.name).join(", ")}) first.`;
  }
  if (kind === "agent" && contracts.some((contract) => contract.agentId === record.id && contract.status === "Active")) return `Cannot delete ${record.name}: an active contract references this agent.`;
  if (kind === "skill") {
    const assigned = agents.filter((agent) => agent.skillIds.includes(record.id));
    if (assigned.length) return `Cannot delete ${record.name}: it is assigned to ${assigned.map((agent) => agent.name).join(", ")}.`;
  }
  return null;
}

function confirmDelete(kind, id, opener) {
  const list = { user: users, agent: agents, skill: skills }[kind];
  const record = byId(list, id);
  if (!record) return;
  const blocked = dependencyMessage(kind, record);
  if (blocked) {
    openDialog("Unable to delete record", [make("p", "", blocked), make("p", "notice", "Changes in this demo workspace are temporary.")], opener);
    return;
  }
  const copy = make("p", "", `Delete ${record.name}? This change is demo-only and will reset on reload.`);
  const actions = make("div", "dialog-actions");
  const cancel = make("button", "button", "Cancel");
  cancel.type = "button";
  cancel.dataset.dialogClose = "true";
  const confirm = make("button", "button danger-button", "Delete record");
  confirm.type = "button";
  confirm.dataset.confirmDelete = "true";
  confirm.dataset.kind = kind;
  confirm.dataset.id = id;
  actions.append(cancel, confirm);
  openDialog("Confirm deletion", [copy, actions], opener);
}

function performDelete(kind, id) {
  const list = { user: users, agent: agents, skill: skills }[kind];
  const record = byId(list, id);
  if (!record || dependencyMessage(kind, record)) return;
  list.splice(list.findIndex((item) => item.id === id), 1);
  if (kind === "agent") expandedAgents.delete(id);
  modalOpener = document.getElementById("section-heading");
  dialog.close();
  render();
  announce(`${record.name} deleted. This demo change will reset on reload.`);
}

document.getElementById("navigation").addEventListener("click", (event) => {
  const button = event.target.closest("[data-section]");
  if (!button) return;
  closeMenu();
  currentSection = button.dataset.section;
  render();
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  const dark = document.documentElement.classList.toggle("dark");
  const button = document.getElementById("theme-toggle");
  button.textContent = dark ? "Light mode" : "Dark mode";
  button.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  try { localStorage.setItem("agenthub-theme", dark ? "dark" : "light"); }
  catch { announce("Theme changed for this session, but the preference could not be saved."); }
});

content.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-menu-trigger]");
  if (trigger) {
    const menu = document.getElementById(trigger.getAttribute("aria-controls"));
    if (openMenu?.trigger === trigger) closeMenu();
    else {
      closeMenu();
      menu.hidden = false;
      menu.classList.remove("sr-only");
      const rect = trigger.getBoundingClientRect();
      menu.style.top = `${Math.min(rect.bottom + 4, window.innerHeight - menu.offsetHeight - 8)}px`;
      menu.style.left = `${Math.max(8, Math.min(rect.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - 8))}px`;
      trigger.setAttribute("aria-expanded", "true");
      openMenu = { menu, trigger };
    }
    return;
  }
  const skillToggle = event.target.closest("[data-skills-toggle]");
  if (skillToggle) {
    const agent = byId(agents, skillToggle.dataset.skillsToggle);
    const expanded = !expandedAgents.has(agent.id);
    if (expanded) expandedAgents.add(agent.id); else expandedAgents.delete(agent.id);
    skillToggle.setAttribute("aria-expanded", String(expanded));
    skillToggle.textContent = `${expanded ? "−" : "+"} ${agent.skillIds.length} skills`;
    const panel = document.getElementById(`skills-${agent.id}`);
    panel.dataset.open = String(expanded);
    panel.setAttribute("aria-hidden", String(!expanded));
    panel.inert = !expanded;
    return;
  }
  const action = event.target.closest("[data-row-action]");
  if (!action) return;
  const { kind, id } = action.dataset;
  const record = { user: byId(users, id), agent: byId(agents, id), skill: byId(skills, id), contract: byId(contracts, id), error: byId(errors, id) }[kind];
  const opener = action.closest(".row-actions")?.querySelector("[data-menu-trigger]") || action;
  closeMenu();
  if (action.dataset.rowAction === "delete") confirmDelete(kind, id, opener);
  if (action.dataset.rowAction === "resolve" && record && !record.resolved) {
    record.resolved = true;
    render();
    document.getElementById("section-heading").focus();
    announce(`${record.id} marked as resolved. Agent status is unchanged.`);
  }
  if (action.dataset.rowAction === "detail" && record) ({ user: showUser, agent: showAgent, skill: showSkill, contract: showContract, error: showError })[kind](record, opener);
});

document.addEventListener("click", (event) => {
  if (openMenu && !event.target.closest("[data-menu], [data-menu-trigger]")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && openMenu) {
    event.preventDefault();
    closeMenu(true);
  }
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog && backdropPointer) dialog.close();
  if (event.target.closest("[data-dialog-close]")) dialog.close();
  const confirm = event.target.closest("[data-confirm-delete]");
  if (confirm) performDelete(confirm.dataset.kind, confirm.dataset.id);
  backdropPointer = false;
});
dialog.addEventListener("pointerdown", (event) => { backdropPointer = event.target === dialog; });
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  if (modalOpener?.isConnected) modalOpener.focus();
  else document.getElementById("section-heading").focus();
  modalOpener = null;
});

const themeButton = document.getElementById("theme-toggle");
const darkAtStart = document.documentElement.classList.contains("dark");
themeButton.textContent = darkAtStart ? "Light mode" : "Dark mode";
themeButton.setAttribute("aria-label", `Switch to ${darkAtStart ? "light" : "dark"} mode`);
render();
