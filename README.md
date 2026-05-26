# mvp-launch

MVP launch starter built with Next.js for Cloudflare Pages.

## Local Development

```bash
npm run dev
```

Open http://localhost:3000.

## Cloudflare Pages Settings

Use these settings when connecting the GitHub repository to Cloudflare Pages.

```text
Framework preset: Next.js
Build command: npm run build
Build output directory: out
```

## Stack

```text
Frontend: Next.js
Hosting: Cloudflare Pages
Backend: Cloudflare Pages Functions
Database/Auth/Storage: Supabase
Analytics: PostHog
Payment: Toss Payments link or manual transfer
```

Keep the first version small. Do not add a separate server, admin app, or automated payment flow until the MVP proves demand.
