import type { MDXWrapper } from 'nextra'
import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog'
import type { MDXComponents } from 'nextra/mdx-components'

import { Anchor } from './components/Anchor'
import { Divider } from './components/Divider'
import { Figure } from './components/Figure'
import { MorePosts } from './components/MorePosts'
import { formatDate } from './lib/site'

const blogComponents = getBlogMDXComponents({ Divider, Figure })

const Wrapper: MDXWrapper = ({ children, metadata }) => {
	const { title, filePath } = metadata
	// Only individual posts (app/posts/<slug>/page.mdx) get the "more writing" list.
	const postRoute = filePath
		?.replaceAll('\\', '/')
		.match(/(?:^|\/)app(\/posts\/[^/]+)\/page\.mdx?$/)?.[1]
	const { date, readingTime } = metadata as typeof metadata & {
		date?: string
		readingTime?: { minutes: number }
	}
	return (
		<>
			<header className="post-header">
				<h1>{String(title ?? '')}</h1>
				{date && (
					<p className="post-meta">
						<time dateTime={new Date(date).toISOString()}>{formatDate(date)}</time>
						{readingTime && readingTime.minutes > 0 && (
							<>
								<span aria-hidden="true"> · </span>
								{Math.max(1, Math.round(readingTime.minutes))} min read
							</>
						)}
					</p>
				)}
			</header>
			{children}
			{postRoute && <MorePosts currentRoute={postRoute} />}
		</>
	)
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...blogComponents,
		a: Anchor,
		wrapper: Wrapper,
		...components
	}
}
