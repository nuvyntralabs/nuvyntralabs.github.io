# Nuvyntra Labs

Company site for **open-source work**: R&D projects, proofs of concept, and NuGet
packages. Live at **[https://nuvyntralabs.github.io](https://nuvyntralabs.github.io)**.

Professional experience stays on
[niladri-padhy-website.vercel.app](https://niladri-padhy-website.vercel.app/).

## Sections

| Path | Content |
| --- | --- |
| `/research/` | R&D projects (inspection, VoIP, GPS, bindings) |
| `/pocs/` | Proofs of concept and maintained forks |
| `/packages/` | .NET MAUI NuGet catalog |
| `/packages/plugin-maui-mvvmexpress/docs/` | MVVMExpress documentation (expander topics + roadmap) |
| `/packages/plugin-maui-mvvmexpress/integration/` | MVVMExpress getting started |
| `/packages/plugin-maui-leak-analyser/` | LeakAnalyser overview |
| `/packages/plugin-maui-leak-analyser/docs/` | LeakAnalyser technical documentation |
| `/packages/plugin-maui-leak-analyser/integration/` | LeakAnalyser getting started |
| `/packages/plugin-maui-httpforge/` | HttpForge overview |
| `/packages/plugin-maui-httpforge/docs/` | HttpForge technical documentation |
| `/packages/plugin-maui-httpforge/integration/` | HttpForge getting started |
| `/packages/plugin-maui-httpforge/comparison/` | HttpForge vs Refit and sibling HTTP plugins |
| `/getting-started/` | Install + compose plugins |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) if port 3000 is already in use.

## Deploy

Pushes to `main` build a static Next.js export and publish it with GitHub Pages
(`.github/workflows/pages.yml`).

In the repo: **Settings → Pages → Source: GitHub Actions**.

## Content

- R&D and POCs: `content/works.ts`
- NuGet catalog: `content/packages.ts`
- MVVMExpress docs: `content/mvvmexpress.ts`
- LeakAnalyser docs: `content/leak-analyser.ts`
- HttpForge docs: `content/http-forge.ts`
- Lab copy: `content/lab.ts`
