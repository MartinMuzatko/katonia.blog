import { getPosts } from '../../lib/posts'
import { SITE } from '../../lib/site'

export const dynamic = 'force-static'

const escape = (s: unknown): string =>
	String(s ?? '').replace(
		/[<>&'"]/g,
		c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!
	)

export async function GET(): Promise<Response> {
	const posts = await getPosts()
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
    <link>${SITE.url}</link>
    <description>${escape(SITE.description)}</description>
    <language>${SITE.lang}</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
