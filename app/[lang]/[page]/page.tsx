import type { Metadata } from 'next'

import { ContentEntry } from '../../../components/ContentEntry'
import { contentEntryMetadata, getEntryParams } from '../../../lib/content'
import { toLocale } from '../../../lib/i18n'

/** Renders `content/pages/<page>/<lang>.mdx`: about, now. */

// Only translations that exist; anything else is a 404
export const dynamicParams = false

export const generateStaticParams = async () =>
	(await getEntryParams('pages')).map(({ lang, slug }) => ({ lang, page: slug }))

const toProps = async (params: PageProps<'/[lang]/[page]'>['params']) => {
	const { lang, page } = await params
	return { section: 'pages', slug: page, lang: toLocale(lang), path: `/${page}` } as const
}

export const generateMetadata = async ({
	params
}: PageProps<'/[lang]/[page]'>): Promise<Metadata> => contentEntryMetadata(await toProps(params))

const ContentPage = async ({ params }: PageProps<'/[lang]/[page]'>) => (
	<ContentEntry {...await toProps(params)} />
)

export default ContentPage
