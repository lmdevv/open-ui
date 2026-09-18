# Open UI

Open UI is an open-source, account-gated reference library for studying products, standalone
screens, and ordered user flows across product versions.

The repository currently contains the production-oriented application scaffold. Product browsing,
contribution, moderation, and publication slices will be implemented incrementally.

## Stack

- TanStack Start and TanStack Query on Cloudflare Workers
- Cloudflare D1 with Drizzle ORM
- Clerk authentication
- Tailwind CSS and shared shadcn/ui components
- pnpm workspaces, Turborepo, TypeScript, Oxlint, and Oxfmt
- Alchemy for Cloudflare infrastructure and deployments

The architectural decisions and deliberate deferrals are summarized in
[`docs/architecture.md`](docs/architecture.md).

## Requirements

- Node.js 24
- pnpm 11.25.0 (the version pinned by `packageManager`)
- A Clerk application for authenticated development
- A Cloudflare account only when deploying

## Local development

```bash
pnpm install --frozen-lockfile
cp apps/web/.env.example apps/web/.env
pnpm dev
```

Populate `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `apps/web/.env`. Environment files
are ignored; schemas are committed. The app runs at <http://localhost:3001>.

Useful commands:

```bash
pnpm check          # lint, formatting check, and type checking
pnpm build          # production build
pnpm format         # write formatting changes
pnpm db:generate    # generate Drizzle migrations
```

## Repository layout

```text
apps/
  web/       TanStack Start app, server functions, media route, and workflow entry point
packages/
  config/    shared TypeScript configuration
  db/        Drizzle schema, migrations, and queries
  domain/    entities, validation schemas, policies, and publication decisions
  infra/     Cloudflare resources managed by Alchemy
  ui/        shared components and design tokens
```

Keep workflow and media code in `apps/web` until another deployable needs them. Production data,
screenshots, secrets, and live Cloudflare bindings do not belong in this repository.

## Deployment

Alchemy provisions the D1 database and deploys the web application to Cloudflare. Configure your
local Cloudflare profile from `packages/infra`, then deploy with an explicit stage:

```bash
cd packages/infra
pnpm exec alchemy profile edit
pnpm exec alchemy deploy --stage production
```

Preview and production credentials must use isolated Cloudflare, Clerk, and analytics resources.

## License

Apache-2.0. See [`LICENSE`](LICENSE).
