import type { NextConfig } from 'next'
import nextra from 'nextra'

const withNextra = nextra({
	readingTime: true,
	defaultShowCopyCode: true
})

const nextConfig: NextConfig = {
	reactStrictMode: true,
	cleanDistDir: true,
	turbopack: {
		resolveAlias: {
			// Lets Nextra's MDX pages find our mdx-components under Turbopack
			'next-mdx-import-source-file': './mdx-components.tsx'
		}
	}
}

export default withNextra(nextConfig)
