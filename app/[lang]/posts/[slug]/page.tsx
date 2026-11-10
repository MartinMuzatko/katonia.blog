import type { Metadata } from 'next'

import { ContentEntry } from '../../../../components/ContentEntry'
import { contentEntryMetadata, getEntryParams } from '../../../../lib/content'
import { toLocale } from '../../../../lib/i18n'

/** Renders `content/posts/<slug>/<lang>.mdx`. */

// Only translations that exist; anything else is a 404
export const dynamicParams = false

export const generateStaticParams = () => getEntryParams('posts')

const toProps = async (params: PageProps<'/[lang]/posts/[slug]'>['params']) => {
	const { lang, slug } = await params
	return { section: 'posts', slug, lang: toLocale(lang), path: `/posts/${slug}` } as const
}

export const generateMetadata = async ({
	params
}: PageProps<'/[lang]/posts/[slug]'>): Promise<Metadata> =>
	contentEntryMetadata(await toProps(params))

const PostPage = async ({ params }: PageProps<'/[lang]/posts/[slug]'>) => (
	<ContentEntry {...await toProps(params)} />
)

export default PostPage
