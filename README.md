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
- Lab copy: `content/lab.ts`
