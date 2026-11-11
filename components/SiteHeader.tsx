'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { type Locale, LOCALE_LABELS, LOCALES, localize, switchLocale } from '../lib/i18n'
import { SITE } from '../lib/site'
import { ThemeToggle } from './ThemeToggle'

const logoSize = 48

const linkClass = 'text-muted no-underline hover:text-accent aria-[current=page]:text-accent'

type SiteHeaderProps = {
	lang: Locale
	nav: readonly { href: string; label: string }[]
	labels: { mainNav: string; languageNav: string; toggleTheme: string }
}

export const SiteHeader = ({ lang, nav, labels }: SiteHeaderProps) => {
	const pathname = usePathname()
	return (
		<header
			className="mx-auto flex max-w-measure items-center justify-between gap-4 px-(--gutter) pt-10 font-ui text-[0.9375rem] max-[420px]:gap-3 max-[420px]:pt-7"
			data-pagefind-ignore="all"
		>
			<Link
				href={localize(lang, '/')}
				className="inline-flex items-center gap-[0.6rem] text-[1.0625rem] font-semibold tracking-[-0.01em] no-underline hover:text-inherit max-[420px]:text-base"
			>
				<img
					src="/logo.png"
					alt=""
					width={logoSize}
					height={logoSize}
					className="object-contain dark:hidden"
				/>
				<img
					src="/logo-dark.png"
					alt=""
					width={logoSize}
					height={logoSize}
					className="hidden object-contain dark:block"
				/>
				<span>{SITE.name}</span>
			</Link>
			<nav aria-label={labels.mainNav} className="ml-auto">
				<ul className="m-0 flex list-none gap-6 p-0 max-[420px]:gap-3.5">
					{nav.map(({ href, label }) => {
						const active = pathname === href
						return (
							<li key={href}>
								<Link
									href={href}
									aria-current={active ? 'page' : undefined}
									className={linkClass}
								>
									{label}
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
			<nav aria-label={labels.languageNav}>
				{LOCALES.filter(other => other !== lang).map(other => (
					<Link
						key={other}
						href={switchLocale(pathname, other)}
						hrefLang={other}
						lang={other}
						title={LOCALE_LABELS[other].name}
						className={`${linkClass} text-[0.8125rem] font-semibold tracking-[0.04em]`}
					>
						{LOCALE_LABELS[other].short}
					</Link>
				))}
			</nav>
			<ThemeToggle label={labels.toggleTheme} />
		</header>
	)
}
