import { type ContentEntryProps, importEntry } from '../lib/content'
import { useMDXComponents as getMDXComponents } from '../mdx-components'

const Wrapper = getMDXComponents().wrapper!

/** Renders one translation of a `content/<section>/<slug>/` entry. */
export const ContentEntry = async ({ section, slug, lang }: ContentEntryProps) => {
	const {
		default: MDXContent,
		toc,
		metadata,
		sourceCode
	} = await importEntry(section, slug, lang)
	return (
		<Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
			<MDXContent />
		</Wrapper>
	)
}
