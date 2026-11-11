import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog'
import type { MDXComponents } from 'nextra/mdx-components'

import { Anchor } from './components/Anchor'
import { Article } from './components/Article'
import { Divider } from './components/Divider'
import { Figure } from './components/Figure'

const blogComponents = getBlogMDXComponents({ Divider, Figure })

export const useMDXComponents = (components?: MDXComponents): MDXComponents => ({
	...blogComponents,
	a: Anchor,
	wrapper: Article,
	...components
})
