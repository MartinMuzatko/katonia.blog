import Link from 'next/link'

import { PostList } from '../components/PostList'
import { getPosts } from '../lib/posts'

const LATEST = 10

export default async function HomePage() {
	const posts = await getPosts()
	return (
		<>
			<h1 className="sr-only">Katonia</h1>
			<p className="intro">
				A notebook about philosophy, freedom and choosing your own path.
			</p>
			<PostList posts={posts.slice(0, LATEST)} />
			{posts.length > LATEST && (
				<p className="more">
					<Link href="/posts">All writing →</Link>
				</p>
			)}
		</>
	)
}
