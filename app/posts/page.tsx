import type { Metadata } from 'next'

import { PostList } from '../../components/PostList'
import { getPosts } from '../../lib/posts'

export const metadata: Metadata = { title: 'Writing' }

export default async function WritingPage() {
	const posts = await getPosts()
	const byYear = Map.groupBy(posts, post => new Date(post.date).getUTCFullYear())
	return (
		<>
			<h1>Writing</h1>
			{[...byYear].map(([year, yearPosts]) => (
				<section key={year} aria-labelledby={`y${year}`}>
					<h2 id={`y${year}`} className="year">
						{year}
					</h2>
					<PostList posts={yearPosts} />
				</section>
			))}
		</>
	)
}
