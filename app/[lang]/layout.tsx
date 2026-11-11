import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Layout } from 'nextra-theme-blog'
import { Head } from 'nextra/components'

import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'
import { getDictionary, isLocale, LOCALES, localize, toLocale } from '../../lib/i18n'
import { alternatesFor, NAV, SITE } from '../../lib/site'

import 'nextra-theme-blog/style.css'
import '../globals.css'

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

export const generateStaticParams = () => LOCALES.map(lang => ({ lang }))

export const generateMetadata = async ({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> => {
	const lang = toLocale((await params).lang)
	const dict = getDictionary(lang)
	return {
		metadataBase: new URL(SITE.url),
		title: { default: SITE.name, template: `%s · ${SITE.name}` },
		description: dict.description,
		// Only the feed here: hreflang links are per page, and 404s shouldn't inherit any
		alternates: { types: alternatesFor(lang, '/')?.types },
		openGraph: {
			siteName: SITE.name,
			type: 'website',
			locale: lang,
			images: '/logo-large.png'
		}
	}
}

const RootLayout = async ({ children, params }: LayoutProps<'/[lang]'>) => {
	const { lang } = await params
	if (!isLocale(lang)) notFound()
	const dict = getDictionary(lang)
	const nav = NAV.map(({ key, path }) => ({ href: localize(lang, path), label: dict.nav[key] }))
	return (
		<html lang={lang} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
			<Head
				backgroundColor={{ light: '#FAFAF7', dark: '#111111' }}
				color={{ hue: 287, saturation: 52, lightness: { light: 37, dark: 70 } }}
			/>
			<body>
				<a
					href="#content"
					className="absolute -top-[100px] left-(--gutter) bg-bg px-3 py-2 font-ui text-[0.875rem] focus:top-(--gutter)"
				>
					{dict.skipToContent}
				</a>
				{/* The header goes in `banner` so it sits inside the theme provider but outside the article */}
				<Layout
					nextThemes={{ defaultTheme: 'system' }}
					banner={
						<SiteHeader
							lang={lang}
							nav={nav}
							labels={{
								mainNav: dict.mainNav,
								languageNav: dict.languageNav,
								toggleTheme: dict.toggleTheme
							}}
						/>
					}
				>
					<div id="content" />
					{children}
					<SiteFooter lang={lang} year={YEAR} aboutLabel={dict.nav.about} />
				</Layout>
			</body>
		</html>
	)
}

export default RootLayout
