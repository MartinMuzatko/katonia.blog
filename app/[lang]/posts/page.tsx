import type { Metadata } from 'next'

import { PostList } from '../../../components/PostList'
import { getDictionary, paramsLocale, toLocale } from '../../../lib/i18n'
import { getPosts } from '../../../lib/posts'
import { alternatesFor } from '../../../lib/site'

export const generateMetadata = async ({
	params
}: PageProps<'/[lang]/posts'>): Promise<Metadata> => {
	const lang = await paramsLocale(params)
	return { title: getDictionary(lang).nav.posts, alternates: alternatesFor(lang, '/posts') }
}

const WritingPage = async ({ params }: PageProps<'/[lang]/posts'>) => {
	const lang = toLocale((await params).lang)
	const posts = await getPosts(lang)
	const byYear = Map.groupBy(posts, post => new Date(post.date).getUTCFullYear())
	return (
		<>
			<h1>{getDictionary(lang).nav.posts}</h1>
			{[...byYear].map(([year, yearPosts]) => (
				<section key={year} aria-labelledby={`y${year}`}>
					<h2 id={`y${year}`} className="year">
						{year}
					</h2>
					<PostList lang={lang} posts={yearPosts} />
				</section>
			))}
		</>
	)
}

export default WritingPage
