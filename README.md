# katonia.blog

A personal blog built with [Nextra](https://nextra.site) (blog theme) on Next.js, in TypeScript.

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build && pnpm start
```

## Writing

The site is in English and German. Every URL starts with the locale (`/en/...`, `/de/...`);
bare URLs redirect to the reader's language (cookie, then `Accept-Language`, then English).

Each post is a folder named after its slug, with one file per language. Images used by
the post can live in the same folder:

- `content/posts/<slug>/en.mdx`
- `content/posts/<slug>/de.mdx`

A post with only one language file shows up only in that language. About and Now work the
same way under `content/pages/<slug>/`.

```mdx
---
title: My post
date: 2026-11-10
description: One line shown under the title on the home page and in RSS.
# draft: true   # hides it from lists and the feed
---

Body text…
```

Keep `tags` in English in both languages (`tags: reading`): they're identifiers, not labels.
Internal links in MDX should include the locale (`/de/about`), or they go through a redirect.

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

| What                             | Where                                                           |
| -------------------------------- | --------------------------------------------------------------- |
| Site name, URL, nav links        | `lib/site.ts`                                                   |
| Locales, UI strings (en/de)      | `lib/i18n.ts`                                                   |
| Locale redirect                  | `proxy.ts`                                                      |
| Posts, About, Now (MDX)          | `content/posts/<slug>/<lang>.mdx`, `content/pages/<slug>/`      |
| Home, Writing, Reading, 404      | `app/[lang]/`                                                   |
| Colours, type, layout            | `app/globals.css` (tokens at the top)                           |
| Header / post list / MDX extras  | `components/`                                                   |
| Post title + date + reading time | `mdx-components.tsx`                                            |
| RSS (one feed per language)      | `app/[lang]/feed.xml/route.ts` → `/en/feed.xml`, `/de/feed.xml` |
| Favicon                          | `app/[lang]/icon.png`, `app/[lang]/apple-icon.png`              |
