import { readdir } from 'node:fs/promises'
import path from 'node:path'

import type { Metadata } from 'next'
import type { EvaluateResult } from 'nextra'
import { cache } from 'react'

import { isLocale, type Locale } from './i18n'
import { alternatesFor } from './site'

/**
 * Content lives in one folder per entry, with one MDX file per language:
 *
 *     content/posts/<slug>/en.mdx
 *     content/posts/<slug>/de.mdx
 *     content/pages/<slug>/en.mdx   → /en/<slug> (about, now)
 *
 * A language whose file is missing simply doesn't get that entry.
 *
 * A translation tagged `draft` (or with `draft: true`) only exists in development:
 * everywhere else it is left out of listings, static params and hreflang links,
 * so its route is a 404.
 */
export type Section = 'posts' | 'pages'

export type Entry = { slug: string; locales: Locale[] }

const CONTENT_DIR = path.join(process.cwd(), 'content')

const SHOW_DRAFTS = process.env.NODE_ENV === 'development'

/** Front matter `tags` as a lowercase list; accepts a YAML list or a comma-separated string. */
export const toTags = (value: unknown): string[] =>
	(Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : [])
		.map(tag => String(tag).trim().toLowerCase())
		.filter(Boolean)

const isDraft = (metadata: Record<string, unknown>): boolean =>
	metadata.draft === true || toTags(metadata.tags).includes('draft')

const isVisible = async (section: Section, slug: string, lang: Locale): Promise<boolean> =>
	SHOW_DRAFTS || !isDraft((await importEntry(section, slug, lang)).metadata)

const localesIn = async (section: Section, slug: string): Promise<Locale[]> => {
	const locales = (await readdir(path.join(CONTENT_DIR, section, slug)))
		.map(file => file.match(/^([^.]+)\.mdx?$/)?.[1])
		.filter(isLocale)
	const visible = await Promise.all(locales.map(lang => isVisible(section, slug, lang)))
	return locales.filter((_, i) => visible[i])
}

/** Every entry folder in `section`, with the (non-draft, outside dev) locales it has a file for. */
export const getEntries = cache(async (section: Section): Promise<Entry[]> => {
	const dir = path.join(CONTENT_DIR, section)
	const folders = (await readdir(dir, { withFileTypes: true })).filter(item => item.isDirectory())
	return Promise.all(
		folders.map(async ({ name }) => ({
			slug: name,
			locales: await localesIn(section, name)
		}))
	)
})

/** The locales `slug` exists in, or `[]` if there's no such entry. */
export const getEntryLocales = async (section: Section, slug: string): Promise<Locale[]> =>
	(await getEntries(section)).find(entry => entry.slug === slug)?.locales ?? []

/** `{ lang, slug }` for every existing translation, for `generateStaticParams`. */
export const getEntryParams = async (section: Section) =>
	(await getEntries(section)).flatMap(({ slug, locales }) =>
		locales.map(lang => ({ lang, slug }))
	)

/** The compiled MDX module (component, front matter, toc) for one translation. */
export const importEntry = (
	section: Section,
	slug: string,
	lang: Locale
): Promise<EvaluateResult> => import(`../content/${section}/${slug}/${lang}.mdx`)

/** Which translation to render, and its locale-less route (for hreflang links). */
export type ContentEntryProps = { section: Section; slug: string; lang: Locale; path: string }

/** Page metadata from front matter, with hreflang links only to the translations that exist. */
export const contentEntryMetadata = async ({
	section,
	slug,
	lang,
	path: route
}: ContentEntryProps): Promise<Metadata> => {
	const { metadata } = await importEntry(section, slug, lang)
	return {
		...metadata,
		alternates: alternatesFor(lang, route, await getEntryLocales(section, slug))
	}
}
