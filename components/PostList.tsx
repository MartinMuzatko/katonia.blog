import Link from 'next/link'

import type { Locale } from '../lib/i18n'
import type { Post } from '../lib/posts'
import { formatDate } from '../lib/site'

export const PostList = ({ lang, posts }: { lang: Locale; posts: Post[] }) => (
	<ul className="not-prose m-0! mb-12! list-none p-0!">
		{posts.map(post => (
			<li
				key={post.route}
				className="mt-0! mb-7! grid grid-cols-[1fr_auto] items-baseline gap-x-6 p-0 max-[480px]:grid-cols-1"
			>
				<Link
					href={post.route}
					className="font-ui text-[1.0625rem] leading-[1.4] font-[550]! tracking-[-0.01em] no-underline"
				>
					{post.title}
				</Link>
				<time
					dateTime={new Date(post.date).toISOString()}
					className="font-ui text-[0.8125rem] whitespace-nowrap text-muted tabular-nums max-[480px]:row-2 max-[480px]:mt-[0.15rem]"
				>
					{formatDate(post.date, lang)}
				</time>
				{post.description && (
					<p className="col-span-full mt-[0.2rem]! mb-0! text-base leading-normal text-muted">
						{post.description}
					</p>
				)}
			</li>
		))}
	</ul>
)
