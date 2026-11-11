'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { type Locale, LOCALE_LABELS, LOCALES, localize, switchLocale } from '../lib/i18n'
import { SITE } from '../lib/site'
import { ThemeToggle } from './ThemeToggle'

const logoSize = 48

type SiteHeaderProps = {
	lang: Locale
	nav: readonly { href: string; label: string }[]
	labels: { mainNav: string; languageNav: string; toggleTheme: string }
}

export const SiteHeader = ({ lang, nav, labels }: SiteHeaderProps) => {
	const pathname = usePathname()
	return (
		<header className="site-header" data-pagefind-ignore="all">
			<Link href={localize(lang, '/')} className="site-brand">
				<img
					src="/logo.png"
					alt=""
					width={logoSize}
					height={logoSize}
					className="site-logo only-light"
				/>
				<img
					src="/logo-dark.png"
					alt=""
					width={logoSize}
					height={logoSize}
					className="site-logo only-dark"
				/>
				<span>{SITE.name}</span>
			</Link>
			<nav aria-label={labels.mainNav} className="site-nav">
				<ul>
					{nav.map(({ href, label }) => {
						const active = pathname === href
						return (
							<li key={href}>
								<Link href={href} aria-current={active ? 'page' : undefined}>
									{label}
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
			<nav aria-label={labels.languageNav} className="lang-switch">
				{LOCALES.filter(other => other !== lang).map(other => (
					<Link
						key={other}
						href={switchLocale(pathname, other)}
						hrefLang={other}
						lang={other}
						title={LOCALE_LABELS[other].name}
					>
						{LOCALE_LABELS[other].short}
					</Link>
				))}
			</nav>
			<ThemeToggle label={labels.toggleTheme} />
		</header>
	)
}
