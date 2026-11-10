import { getPosts } from '../lib/posts'
import { PostList } from './PostList'

/** Up to `limit` other posts, newest first, excluding the one at `currentRoute`. */
export async function MorePosts({
	currentRoute,
	limit = 4
}: {
	currentRoute: string
	limit?: number
}) {
	const posts = (await getPosts()).filter(post => post.route !== currentRoute).slice(0, limit)
	if (posts.length === 0) return null
	return (
		<aside className="more-posts" aria-labelledby="more-posts-heading">
			<h2 id="more-posts-heading">More writing</h2>
			<PostList posts={posts} />
		</aside>
	)
}
