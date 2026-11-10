import type { Metadata } from 'next'
import { connection } from 'next/server'

import { PostList } from '../components/PostList'
import { getPosts } from '../lib/posts'

export const metadata: Metadata = { title: 'Not found' }

const pickRandom = <T,>(items: readonly T[], count: number): T[] =>
	items
		.map(item => ({ item, key: Math.random() }))
		.toSorted((a, b) => a.key - b.key)
		.slice(0, count)
		.map(({ item }) => item)

const NotFound = async () => {
	// Opt out of static rendering so the picks differ on every request
	await connection()
	const posts = pickRandom(await getPosts(), 4)
	return (
		<>
			<div className="not-found">
				<h1>We all get lost sometimes</h1>
				<p>This page doesn't exist, but these might be worth a wander.</p>
			</div>
			{posts.length > 0 && <PostList posts={posts} />}
		</>
	)
}

export default NotFound
