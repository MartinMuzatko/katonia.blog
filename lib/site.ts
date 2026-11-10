import type { Metadata } from 'next'

import { type Locale, LOCALES, localize } from './i18n'

export const SITE = {
	name: 'Katonia',
	url: 'https://katonia.blog'
} as const

export type NavKey = 'posts' | 'reading' | 'about' | 'now'

/** Locale-less paths; labels come from the dictionary. */
export const NAV: readonly { key: NavKey; path: string }[] = [
	{ key: 'posts', path: '/posts' },
	{ key: 'about', path: '/about' },
	{ key: 'now', path: '/now' }
]

const DATE_LOCALES: Record<Locale, string> = { en: 'en-GB', de: 'de-DE' }

export const formatDate = (date: string | Date, lang: Locale): string =>
	new Date(date).toLocaleDateString(DATE_LOCALES[lang], {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	})

/**
 * hreflang links to `path` in each of `locales` (default: all), plus the RSS feed for `lang`.
 * Next.js replaces `alternates` wholesale per page, so both must be set together.
 */
export const alternatesFor = (
	lang: Locale,
	path: string,
	locales: readonly Locale[] = LOCALES
): Metadata['alternates'] => ({
	languages: Object.fromEntries(locales.map(locale => [locale, localize(locale, path)])),
	types: { 'application/rss+xml': [{ url: localize(lang, '/feed.xml'), title: SITE.name }] }
})
