import { cache } from 'react'

import { getEntries, importEntry, toTags } from './content'
import { type Locale, localize } from './i18n'

export type Post = {
	/** Localized route, e.g. `/de/posts/hello-world`. */
	route: string
	title: string
	date: string
	description?: string
	tags: string[]
}

const toPost = async (slug: string, lang: Locale): Promise<Post | undefined> => {
	const { metadata } = await importEntry('posts', slug, lang)
	const { title, date, description, tags } = metadata as typeof metadata & {
		date?: string | Date
		tags?: unknown
	}
	if (!date) return undefined
	return {
		route: localize(lang, `/posts/${slug}`),
		title: String(title),
		date: new Date(date).toISOString(),
		description: description ?? undefined,
		tags: toTags(tags)
	}
}

/**
 * All published posts in `lang`, newest first. Posts without a `lang` translation
 * are left out, as are drafts outside development (see `lib/content.ts`).
 */
export const getPosts = cache(async (lang: Locale): Promise<Post[]> => {
	const entries = (await getEntries('posts')).filter(({ locales }) => locales.includes(lang))
	const posts = await Promise.all(entries.map(({ slug }) => toPost(slug, lang)))
	return posts
		.filter(post => post !== undefined)
		.toSorted((a, b) => +new Date(b.date) - +new Date(a.date))
})

/** Published posts in `lang` whose front matter `tags` include `tag` (case-insensitive). */
export const getPostsByTag = async (lang: Locale, tag: string): Promise<Post[]> =>
	(await getPosts(lang)).filter(post => post.tags.includes(tag.toLowerCase()))
