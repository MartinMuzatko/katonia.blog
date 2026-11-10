'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV, SITE } from '../lib/site'
import { ThemeToggle } from './ThemeToggle'
const logoSize = 48

export function SiteHeader() {
	const pathname = usePathname()
	return (
		<header className="site-header" data-pagefind-ignore="all">
			<Link href="/" className="site-brand">
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
			<nav aria-label="Main" className="site-nav">
				<ul>
					{NAV.map(({ href, label }) => {
						const active = pathname === href || pathname.startsWith(href + '/')
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
			<ThemeToggle />
		</header>
	)
}
