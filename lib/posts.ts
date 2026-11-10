import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'

export type Post = {
	route: string
	title: string
	date: string
	description?: string
	tags: string[]
}

const toTags = (value: unknown): string[] =>
	(Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : [])
		.map(tag => String(tag).trim().toLowerCase())
		.filter(Boolean)

/** All published posts under /posts, newest first. Set `draft: true` in front matter to hide one. */
export async function getPosts(): Promise<Post[]> {
	const { directories } = normalizePages({
		list: await getPageMap('/posts'),
		route: '/posts'
	})
	return directories
		.filter(item => item.name !== 'index' && item.frontMatter?.date && !item.frontMatter.draft)
		.map(item => ({
			route: item.route,
			title: String(item.frontMatter?.title ?? item.title),
			date: String(item.frontMatter?.date),
			description: item.frontMatter?.description,
			tags: toTags(item.frontMatter?.tags)
		}))
		.toSorted((a, b) => +new Date(b.date) - +new Date(a.date))
}

/** Published posts whose front matter `tags` include `tag` (case-insensitive), newest first. */
export const getPostsByTag = async (tag: string): Promise<Post[]> =>
	(await getPosts()).filter(post => post.tags.includes(tag.toLowerCase()))
