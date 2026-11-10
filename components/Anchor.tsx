import Link from 'next/link'
import type { MDXComponents } from 'nextra/mdx-components'

type AnchorProps = React.ComponentProps<NonNullable<MDXComponents['a']>>

/** Plain links: no external-link icon, client-side routing for internal pages. */
export function Anchor({ href: rawHref = '', ...props }: AnchorProps) {
	const href = typeof rawHref === 'string' ? rawHref : (rawHref.href ?? '')
	const isInternalPage = href.startsWith('/') && !href.startsWith('//') && !/\.\w+$/.test(href)
	if (isInternalPage || href.startsWith('#')) {
		return <Link href={href} {...props} />
	}
	// `children` arrives through the props spread
	// oxlint-disable-next-line jsx-a11y/anchor-has-content
	return <a href={href} {...(props as React.ComponentProps<'a'>)} />
}
