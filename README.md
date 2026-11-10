# katonia.blog

A personal blog built with [Nextra](https://nextra.site) (blog theme) on Next.js, in TypeScript.

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build && pnpm start
```

## Writing

Add a post as `app/posts/<slug>/page.mdx`:

```mdx
---
title: My post
date: 2026-11-10
description: One line shown under the title on the home page and in RSS.
# draft: true   # hides it from lists and the feed
---

Body text…
```

Available in MDX:

- `<Divider />`: the small flower section divider. Use it once per post at most.
- `<Figure src={img} alt="…" caption="…" />`: a full-width image with a grey caption.
  Import local images (`import img from './photo.jpg'`) so Next.js optimises them.

## Code style

- Formatting: [oxfmt](https://oxc.rs/docs/guide/usage/formatter) (`.oxfmtrc.json`). Tabs (width 4), no semicolons, single quotes.
- Linting: [oxlint](https://oxc.rs/docs/guide/usage/linter) (`.oxlintrc.json`).
- Components are UpperCamelCase, one per file, and the file has the same name (`components/SiteHeader.tsx`). All other files are kebab-case.
- A Husky pre-commit hook runs oxlint and oxfmt on staged files via lint-staged.

```bash
pnpm lint          # oxlint
pnpm format        # oxfmt (writes)
pnpm typecheck     # tsc
pnpm check         # all three, read-only (for CI)
```

## Where things live

| What                             | Where                                 |
| -------------------------------- | ------------------------------------- |
| Site name, URL, nav links        | `lib/site.ts`                         |
| Colours, type, layout            | `app/globals.css` (tokens at the top) |
| Header / post list / MDX extras  | `components/`                         |
| Post title + date + reading time | `mdx-components.tsx`                  |
| RSS                              | `app/feed.xml/route.ts` → `/feed.xml` |
| Favicon                          | `app/icon.png`, `app/apple-icon.png`  |
