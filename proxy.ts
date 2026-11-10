import { type NextRequest, NextResponse } from 'next/server'

import { DEFAULT_LOCALE, isLocale, type Locale } from './lib/i18n'

const COOKIE = 'NEXT_LOCALE'

/** Picks the best supported locale from an Accept-Language header, honouring q-values. */
const negotiateLocale = (header: string | null): Locale =>
	(header ?? '')
		.split(',')
		.map(part => {
			const [tag = '', ...params] = part.trim().split(';')
			const q = params.find(p => p.trim().startsWith('q='))
			return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q.split('=')[1]) : 1 }
		})
		.filter(({ q }) => q > 0)
		.toSorted((a, b) => b.q - a.q)
		.map(({ lang }) => lang)
		.find(isLocale) ?? DEFAULT_LOCALE

const pathLocale = (pathname: string): string | undefined => pathname.split('/')[1]

export const proxy = (request: NextRequest): NextResponse => {
	const { pathname, search } = request.nextUrl
	const requested = pathLocale(pathname)

	if (!isLocale(requested)) {
		const cookie = request.cookies.get(COOKIE)?.value
		const lang = isLocale(cookie)
			? cookie
			: negotiateLocale(request.headers.get('accept-language'))
		const target = new URL(`/${lang}${pathname === '/' ? '' : pathname}${search}`, request.url)
		return NextResponse.redirect(target)
	}

	const response = NextResponse.next()
	// Remember the reader's choice, so bare URLs send them back to the same language
	if (request.cookies.get(COOKIE)?.value !== requested) {
		response.cookies.set(COOKIE, requested, { path: '/', maxAge: 60 * 60 * 24 * 365 })
	}
	return response
}

export const config = {
	// Everything except Next internals and files with an extension (images, icons, feeds)
	matcher: ['/((?!_next/|.*\\.[^/]+$).*)']
}
