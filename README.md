# Nuvyntra Labs — Product Portfolio

Documentation site for the .NET MAUI NuGet catalog. Live at
**[https://nuvyntralabs.github.io](https://nuvyntralabs.github.io)**.

This repository was created as `ProductPortfolio` and renamed to `nuvyntralabs.github.io` so GitHub
Pages can serve the organization root (`https://nuvyntralabs.github.io`) instead of
`/ProductPortfolio`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Pushes to `main` build a static Next.js export and publish it with GitHub Pages
(`.github/workflows/pages.yml`).

In the repo: **Settings → Pages → Source: GitHub Actions**.

## Content

Package copy lives in `content/packages.ts`. White papers stay on the author site
(`https://niladripadhy.vercel.app/opensource/<slug>`); this hub is install + capability docs.
