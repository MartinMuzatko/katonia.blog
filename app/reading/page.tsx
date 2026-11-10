import type { Metadata } from 'next'

import { PostList } from '../../components/PostList'
import { getPostsByTag } from '../../lib/posts'

export const metadata: Metadata = { title: 'Reading' }

const ReadingPage = async () => {
	const posts = await getPostsByTag('reading')
	return (
		<>
			<h1>Reading</h1>
			{posts.length > 0 ? <PostList posts={posts} /> : <p>No reading notes yet.</p>}
		</>
	)
}

export default ReadingPage
