import type { MDXWrapper } from 'nextra'
import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog'
import type { MDXComponents } from 'nextra/mdx-components'

import { Anchor } from './components/Anchor'
import { Divider } from './components/Divider'
import { Figure } from './components/Figure'
import { MorePosts } from './components/MorePosts'
import { getDictionary, localize, toLocale } from './lib/i18n'
import { formatDate } from './lib/site'

const blogComponents = getBlogMDXComponents({ Divider, Figure })

/** `content/posts/foo/de.mdx` → `{ lang: 'de', postRoute: '/de/posts/foo' }` (postRoute only for posts). */
const parseFilePath = (filePath = '') => {
	const [, section, slug, lang] =
		filePath
			.replaceAll('\\', '/')
			.match(/(?:^|\/)content\/([^/]+)\/([^/]+)\/([^/.]+)\.mdx?$/) ?? []
	const locale = toLocale(lang)
	return {
		lang: locale,
		postRoute: section === 'posts' ? localize(locale, `/posts/${slug}`) : undefined
	}
}

const Wrapper: MDXWrapper = ({ children, metadata }) => {
	const { title, filePath } = metadata
	const { lang, postRoute } = parseFilePath(filePath)
	const dict = getDictionary(lang)
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
						<time dateTime={new Date(date).toISOString()}>
							{formatDate(date, lang)}
						</time>
						{readingTime && readingTime.minutes > 0 && (
							<>
								<span aria-hidden="true"> · </span>
								{dict.minRead(Math.max(1, Math.round(readingTime.minutes)))}
							</>
						)}
					</p>
				)}
			</header>
			{children}
			{postRoute && <MorePosts lang={lang} currentRoute={postRoute} />}
		</>
	)
}

export const useMDXComponents = (components?: MDXComponents): MDXComponents => ({
	...blogComponents,
	a: Anchor,
	wrapper: Wrapper,
	...components
})
