# mvp-launch

MVP launch starter built with Next.js for Cloudflare Workers Static Assets.

## Local Development

```bash
npm run dev
```

Open http://localhost:3000.

## Cloudflare Settings

Use these settings when connecting the GitHub repository to Cloudflare.

```text
Build command: npm run build
Deploy command: npx wrangler deploy
```

## Stack

```text
Frontend: Next.js
Hosting: Cloudflare Workers Static Assets
Backend: Cloudflare Workers
Database/Auth/Storage: Supabase
Analytics: PostHog
Payment: Toss Payments link or manual transfer
```

Keep the first version small. Do not add a separate server, admin app, or automated payment flow until the MVP proves demand.
