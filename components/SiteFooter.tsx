import Link from 'next/link'
import { Footer } from 'nextra-theme-blog'

import { type Locale, localize } from '../lib/i18n'
import { SITE } from '../lib/site'

type SiteFooterProps = {
	lang: Locale
	year: number
	aboutLabel: string
}

export const SiteFooter = ({ lang, year, aboutLabel }: SiteFooterProps) => (
	<Footer>
		<span>
			© {year} {SITE.name}
		</span>
		<span aria-hidden="true"> · </span>
		{/* A route handler, not a page, so a plain <a> is right */}
		{/* oxlint-disable-next-line nextjs/no-html-link-for-pages */}
		<a href={localize(lang, '/feed.xml')}>RSS</a>
		<span aria-hidden="true"> · </span>
		<Link href={localize(lang, '/about')}>{aboutLabel}</Link>
	</Footer>
)
