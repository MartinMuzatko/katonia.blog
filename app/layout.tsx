import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import Link from 'next/link'
import { Footer, Layout } from 'nextra-theme-blog'
import { Head } from 'nextra/components'

import { SiteHeader } from '../components/SiteHeader'
import { SITE } from '../lib/site'

import 'nextra-theme-blog/style.css'
import './globals.css'

const serif = Newsreader({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	variable: '--font-serif',
	display: 'swap'
})

const sans = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap'
})

// Evaluated once per build: the site is statically rendered
const YEAR = new Date().getFullYear()

export const metadata: Metadata = {
	metadataBase: new URL(SITE.url),
	title: { default: SITE.name, template: `%s · ${SITE.name}` },
	description: SITE.description,
	alternates: {
		types: { 'application/rss+xml': [{ url: '/feed.xml', title: SITE.name }] }
	},
	openGraph: { siteName: SITE.name, type: 'website', images: '/logo-large.png' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang={SITE.lang}
			className={`${serif.variable} ${sans.variable}`}
			suppressHydrationWarning
		>
			<Head
				backgroundColor={{ light: '#FAFAF7', dark: '#111111' }}
				color={{ hue: 287, saturation: 52, lightness: { light: 37, dark: 70 } }}
			/>
			<body>
				<a href="#content" className="skip-link">
					Skip to content
				</a>
				{/* The header goes in `banner` so it sits inside the theme provider but outside the article */}
				<Layout nextThemes={{ defaultTheme: 'system' }} banner={<SiteHeader />}>
					<div id="content" />
					{children}
					<Footer>
						<span>
							© {YEAR} {SITE.name}
						</span>
						<span aria-hidden="true"> · </span>
						{/* A route handler, not a page, so a plain <a> is right */}
						{/* oxlint-disable-next-line nextjs/no-html-link-for-pages */}
						<a href="/feed.xml">RSS</a>
						<span aria-hidden="true"> · </span>
						<Link href="/about">About</Link>
					</Footer>
				</Layout>
			</body>
		</html>
	)
}
