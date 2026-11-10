import Link from 'next/link'

import type { Locale } from '../lib/i18n'
import type { Post } from '../lib/posts'
import { formatDate } from '../lib/site'

export const PostList = ({ lang, posts }: { lang: Locale; posts: Post[] }) => (
	<ul className="post-list not-prose">
		{posts.map(post => (
			<li key={post.route}>
				<Link href={post.route} className="post-list-title">
					{post.title}
				</Link>
				<time dateTime={new Date(post.date).toISOString()}>
					{formatDate(post.date, lang)}
				</time>
				{post.description && <p className="post-list-excerpt">{post.description}</p>}
			</li>
		))}
	</ul>
)
