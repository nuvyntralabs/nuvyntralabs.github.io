export const nuvynHref = "/toolkits/nuvyn/";
export const nuvynDocsBase = "/toolkits/nuvyn/docs";
export const nuvynGuideBase = "/toolkits/nuvyn/guide";

export const nuvyn = {
  slug: "nuvyn",
  name: "Nuvyn",
  title: "Nuvyn",
  subtitle: "The whole-ecosystem door: spec-driven CLI for .NET MAUI apps on the Nuvyntra stack",
  description:
    "Nuvyn is the whole-ecosystem door. It creates a new four-platform MAUI host and locks plan/implement to MVVMExpress, Lumina UIKit, and the smallest Plugin.Maui.* set. nuvyn adopt attaches the same slash chain to an existing MAUI app without rewriting its host. Individual plugins and NuvyntraLabs.UIKit stay installable without Nuvyn. The product is whatever you specify — any domain.",
  github: "https://github.com/nuvyntralabs/Nuvyn",
  nuget: "https://www.nuget.org/packages/NuvyntraLabs.Nuvyn.Cli",
  packageId: "NuvyntraLabs.Nuvyn.Cli",
  command: "nuvyn",
  language: "C#",
  version: "1.2.0",
  license: "MIT",
  author: "Niladri Prasad Padhy",
  tags: [".NET MAUI", "CLI", "spec-driven", "agentic", "MVVMExpress", "UIKit"],
  abstract:
    "Nuvyn is a standalone PackAsTool CLI. It depends only on System.CommandLine and Spectre.Console. nuvyn init copies an embedded three-project host, adds the default Nuvyntra packages from nuget.org, writes .nuvyn/ standing law, and installs slash commands for the Spec Kit coding-agent set — Cursor, GitHub Copilot, Claude Code, Gemini CLI, Codex, Windsurf, and 30+ more. nuvyn adopt attaches that slash chain to an existing MAUI app and writes .nuvyn/, skills, and adopt-report.md only — it does not change host architecture, UI kit, or HTTP. init never overlays an existing folder. init / adopt / check compose maui-dev doctor --path when MauiDev is on PATH. On an interactive terminal it asks every 4 hours whether to update from nuget.org.",
  install: `dotnet tool install -g NuvyntraLabs.Nuvyn.Cli --source https://api.nuget.org/v3/index.json
nuvyn init ClinicApp --agent cursor`,
  update: `dotnet tool update -g NuvyntraLabs.Nuvyn.Cli --source https://api.nuget.org/v3/index.json
nuvyn version`,
  refresh: `cd ClinicApp
nuvyn update
nuvyn update --agent cursor`,
  adopt: `cd FieldApp
nuvyn adopt
nuvyn adopt --agent cursor
nuvyn adopt --path ../FieldApp --agent copilot`,
  platforms: ["Android", "iOS", "Mac Catalyst", "Windows"],
  defaultPackages: [
    { name: "Plugin.Maui.MVVMExpress", role: "App shell, ViewModels, navigation", href: "/packages/plugin-maui-mvvmexpress/" },
    { name: "NuvyntraLabs.UIKit", role: "Lumina NV* controls and page recipes", href: "/uikit/" },
    { name: "Plugin.Maui.HttpForge", role: "Typed REST client", href: "/packages/plugin-maui-httpforge/" },
    { name: "Plugin.Maui.FormValidation", role: "Form rules on the host", href: "/packages/plugin-maui-form-validation/" },
    { name: "Plugin.Maui.KeyboardManager", role: "Soft keyboard hide / show / resize", href: "/packages/plugin-maui-keyboard-manager/" },
  ],
  slash: [
    { command: "/nuvyn.constitution", writes: ".nuvyn/constitution.md", purpose: "Nuvyntra principles plus optional product rules" },
    { command: "/nuvyn.specify", writes: "specs/<nnn>/spec.md", purpose: "What / why — the mobile product spec" },
    { command: "/nuvyn.clarify", writes: "updates spec.md", purpose: "Resolve ambiguities with at most five questions" },
    { command: "/nuvyn.plan", writes: "plan.md + research.md", purpose: "Packages and one Lumina recipe per screen" },
    { command: "/nuvyn.checklist", writes: "checklists/<domain>.md", purpose: "Optional reviewer quality gate" },
    { command: "/nuvyn.task", writes: "tasks.md", purpose: "Dependency-ordered tasks (T001 [P] [US1])" },
    { command: "/nuvyn.analysis", writes: "report only", purpose: "Spec / plan / tasks consistency" },
    { command: "/nuvyn.implement", writes: "host code", purpose: "Build the feature on the locked stack" },
    { command: "/nuvyn.converge", writes: "appends tasks.md", purpose: "Remaining work after implement" },
  ],
  agents: [
    { id: "cursor", label: "Cursor", folder: ".cursor/skills/nuvyn-*/" },
    { id: "copilot", label: "GitHub Copilot", folder: ".github/skills/" },
    { id: "claude", label: "Claude Code", folder: ".claude/commands/" },
    { id: "gemini", label: "Gemini CLI", folder: ".gemini/commands/" },
    { id: "codex", label: "Codex CLI", folder: ".agents/skills/" },
    { id: "goose", label: "Goose", folder: ".goose/recipes/" },
    { id: "windsurf", label: "Windsurf", folder: ".windsurf/workflows/" },
    { id: "generic", label: "Generic", folder: ".agents/commands/" },
  ],
  moreAgents:
    "agy, alquimia, amp, auggie, bob, cline, codebuddy, command-code, cursor-agent, devin, docker-agent, droid, dsh, firebender, forge, grok, hermes, iflow, junie, kilocode, kimi, kiro-cli (kiro), lingma, muse, omp, opencode, pi, qodercli, qwen, roo, rovodev, shai, tabnine, trae, vibe, zcode, zed",
} as const;
