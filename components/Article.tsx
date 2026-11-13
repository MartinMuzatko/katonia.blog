import type { MDXWrapper } from 'nextra'

import { getDictionary, localize, toLocale } from '../lib/i18n'
import { formatDate } from '../lib/site'
import { ArticleCTA } from './ArticleCta'
import { MorePosts } from './MorePosts'
import { TranslationNotice } from './TranslationNotice'

/** `content/posts/foo/de.mdx` → `{ lang: 'de', postRoute: '/de/posts/foo' }` (postRoute only for posts). */
const parseFilePath = (filePath = '') => {
	const [, section, slug, lang] =
		filePath
			.replaceAll('\\', '/')
			.match(/(?:^|\/)content\/([^/]+)\/([^/]+)\/([^/.]+)\.mdx?$/) ?? []
	const locale = toLocale(lang)
	return {
		lang: locale,
		slug: section === 'posts' ? slug : undefined,
		postRoute: section === 'posts' ? localize(locale, `/posts/${slug}`) : undefined
	}
}

export const Article: MDXWrapper = ({ children, metadata }) => {
	const { title, filePath } = metadata
	const { lang, postRoute, slug } = parseFilePath(filePath)
	const dict = getDictionary(lang)
	const { date, readingTime, description } = metadata as typeof metadata & {
		date?: string
		description?: string
		readingTime?: { minutes: number }
	}
	return (
		<>
			<header className="mb-10">
				<h1>{String(title ?? '')}</h1>
				{date && (
					<p className="m-0! font-ui text-[0.875rem] text-muted">
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
				{slug && <TranslationNotice slug={slug} lang={lang} />}
				{description && <p className="mt-4! mb-0! text-muted">{description}</p>}
			</header>
			{children}
			{postRoute && <ArticleCTA lang={lang} />}
			{postRoute && <MorePosts lang={lang} currentRoute={postRoute} />}
		</>
	)
}
