import Link from 'next/link'

import { getOriginalLocale } from '../lib/content'
import { getDictionary, type Locale, localize } from '../lib/i18n'

type TranslationNoticeProps = { slug: string; lang: Locale }

/** "(Automatically translated from …)", linking the original, for posts written in another language. */
export const TranslationNotice = async ({ slug, lang }: TranslationNoticeProps) => {
	const original = await getOriginalLocale('posts', slug, lang)
	if (!original) return null
	const { translatedFrom, languageNames } = getDictionary(lang)
	return (
		<p className="mt-4! mb-0! font-ui text-[0.875rem] text-muted">
			{translatedFrom.before}
			<Link href={localize(original, `/posts/${slug}`)} hrefLang={original}>
				{languageNames[original]}
			</Link>
			{translatedFrom.after}
		</p>
	)
}
