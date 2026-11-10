import type { Metadata } from 'next'

import { PostList } from '../../../components/PostList'
import { getDictionary, paramsLocale, toLocale } from '../../../lib/i18n'
import { getPostsByTag } from '../../../lib/posts'
import { alternatesFor } from '../../../lib/site'

export const generateMetadata = async ({
	params
}: PageProps<'/[lang]/reading'>): Promise<Metadata> => {
	const lang = await paramsLocale(params)
	return { title: getDictionary(lang).nav.reading, alternates: alternatesFor(lang, '/reading') }
}

const ReadingPage = async ({ params }: PageProps<'/[lang]/reading'>) => {
	const lang = toLocale((await params).lang)
	const dict = getDictionary(lang)
	// Tags are identifiers, so they stay in English in every locale
	const posts = await getPostsByTag(lang, 'reading')
	return (
		<>
			<h1>{dict.nav.reading}</h1>
			{posts.length > 0 ? (
				<PostList lang={lang} posts={posts} />
			) : (
				<p>{dict.noReadingNotes}</p>
			)}
		</>
	)
}

export default ReadingPage
