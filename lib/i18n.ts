export const LOCALES = ['en', 'de'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale)

/** Falls back to the default locale for anything that isn't a supported locale. */
export const toLocale = (value: unknown): Locale => (isLocale(value) ? value : DEFAULT_LOCALE)

/**
 * The locale from a page's `params`. Nextra also calls `generateMetadata` without
 * params while building its page map, hence the optional promise.
 */
export const paramsLocale = async (params?: Promise<{ lang: string }>): Promise<Locale> =>
	toLocale((await params)?.lang)

/** Prefixes an absolute, locale-less path: `localize('de', '/posts')` → `/de/posts`. */
export const localize = (lang: Locale, path: string): string =>
	path === '/' ? `/${lang}` : `/${lang}${path}`

/** Swaps the locale prefix of a localized path: `/en/posts/x` → `/de/posts/x`. */
export const switchLocale = (pathname: string, lang: Locale): string =>
	pathname.replace(/^\/[^/]+(?=\/|$)/, `/${lang}`)

const DICTIONARIES = {
	en: {
		description: 'Notes on growing through difficulty.',
		intro: 'A notebook about philosophy, freedom and choosing your own path.',
		nav: { posts: 'Writing', reading: 'Reading', about: 'About', now: 'Now' },
		latestHeading: 'Notes & Reflections',
		mainNav: 'Main',
		languageNav: 'Language',
		skipToContent: 'Skip to content',
		toggleTheme: 'Toggle dark mode',
		allWriting: 'All writing →',
		moreWriting: 'More writing',
		noReadingNotes: 'No reading notes yet.',
		minRead: (minutes: number) => `${minutes} min read`,
		notFound: {
			title: 'Not found',
			heading: 'We all get lost sometimes',
			body: "This page doesn't exist, but these might be worth a wander."
		}
	},
	de: {
		description: 'Notizen übers Wachsen an Widerständen.',
		intro: 'Ein Notizbuch über Philosophie, Freiheit und den eigenen Weg.',
		nav: { posts: 'Texte', reading: 'Lektüre', about: 'Über', now: 'Jetzt' },
		latestHeading: 'Notizen & Gedanken',
		mainNav: 'Hauptnavigation',
		languageNav: 'Sprache',
		skipToContent: 'Zum Inhalt springen',
		toggleTheme: 'Dunkelmodus umschalten',
		allWriting: 'Alle Texte →',
		moreWriting: 'Weitere Texte',
		noReadingNotes: 'Noch keine Lektürenotizen.',
		minRead: (minutes: number) => `${minutes} Min. Lesezeit`,
		notFound: {
			title: 'Nicht gefunden',
			heading: 'Jeder verirrt sich mal',
			body: 'Diese Seite gibt es nicht, aber vielleicht lohnt sich ein Abstecher hierhin.'
		}
	}
} as const satisfies Record<Locale, unknown>

export type Dictionary = (typeof DICTIONARIES)[Locale]

export const getDictionary = (lang: Locale): Dictionary => DICTIONARIES[lang]

/** Short, human labels for the language switcher. */
export const LOCALE_LABELS: Record<Locale, { short: string; name: string }> = {
	en: { short: 'EN', name: 'English' },
	de: { short: 'DE', name: 'Deutsch' }
}
