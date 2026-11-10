import { getDictionary, LOCALES, toLocale } from '../../../lib/i18n'
import { getPosts } from '../../../lib/posts'
import { SITE } from '../../../lib/site'

export const dynamic = 'force-static'

export const generateStaticParams = () => LOCALES.map(lang => ({ lang }))

const escape = (s: unknown): string =>
	String(s ?? '').replace(
		/[<>&'"]/g,
		c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!
	)

export const GET = async (
	_request: Request,
	{ params }: RouteContext<'/[lang]/feed.xml'>
): Promise<Response> => {
	const lang = toLocale((await params).lang)
	const posts = await getPosts(lang)
	const items = posts
		.map(
			post => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE.url}${post.route}</link>
      <guid>${SITE.url}${post.route}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
		)
		.join('\n')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.name)}</title>
    <link>${SITE.url}/${lang}</link>
    <description>${escape(getDictionary(lang).description)}</description>
    <language>${lang}</language>
    <atom:link href="${SITE.url}/${lang}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
