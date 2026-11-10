export const SITE = {
	name: 'Katonia',
	url: 'https://katonia.blog',
	description: 'Notes on growing through difficulty.',
	lang: 'en'
} as const

export type NavItem = { href: string; label: string }

export const NAV: NavItem[] = [
	{ href: '/posts', label: 'Writing' },
	{ href: '/reading', label: 'Reading' },
	{ href: '/about', label: 'About' },
	{ href: '/now', label: 'Now' }
]

export function formatDate(date: string | Date): string {
	return new Date(date).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	})
}
