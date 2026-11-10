'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { type Locale, toLocale } from '../lib/i18n'
import type { Post } from '../lib/posts'
import { SITE } from '../lib/site'
import { PostList } from './PostList'

type NotFoundContentProps = {
	locales: Record<
		Locale,
		{ text: { title: string; heading: string; body: string }; posts: Post[] }
	>
}

const pickRandom = <T,>(items: readonly T[], count: number): T[] =>
	items
		.map(item => ({ item, key: Math.random() }))
		.toSorted((a, b) => a.key - b.key)
		.slice(0, count)
		.map(({ item }) => item)

export const NotFoundContent = ({ locales }: NotFoundContentProps) => {
	const lang = toLocale(useParams<{ lang?: string }>().lang)
	const { text, posts } = locales[lang]
	// Picked after hydration so server and client markup match, and the picks differ per visit
	const [picks, setPicks] = useState<Post[]>([])
	// Randomness is client-only by nature; rendering it on the server would mismatch on hydration
	// oxlint-disable-next-line react/set-state-in-effect
	useEffect(() => setPicks(pickRandom(posts, 4)), [posts])
	return (
		<>
			<title>{`${text.title} · ${SITE.name}`}</title>
			<div className="not-found">
				<h1>{text.heading}</h1>
				<p>{text.body}</p>
			</div>
			{picks.length > 0 && <PostList lang={lang} posts={picks} />}
		</>
	)
}
