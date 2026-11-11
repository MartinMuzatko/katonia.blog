import { getDictionary, type Locale } from '../lib/i18n'
import { SITE } from '../lib/site'

type ArticleCTAProps = { lang: Locale }

/** A quiet invitation to write back, shown under a post. */
export const ArticleCTA = ({ lang }: ArticleCTAProps) => {
	const { heading, intro, body, action } = getDictionary(lang).cta
	return (
		<aside
			className="mt-16 border-t border-hairline pt-6"
			aria-labelledby="article-cta-heading"
		>
			<h2
				id="article-cta-heading"
				className="m-0! mb-5! font-ui text-[0.875rem]! font-medium! tracking-normal! text-muted!"
			>
				{heading}
			</h2>
			<p className="mb-4!">{intro}</p>
			<p className="mb-4!">{body}</p>
			<p className="mb-4!">
				{action} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
			</p>
		</aside>
	)
}
