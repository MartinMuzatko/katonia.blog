import type { Metadata } from 'next'
import Link from 'next/link'

import { PostList } from '../../components/PostList'
import { getDictionary, localize, paramsLocale, toLocale } from '../../lib/i18n'
import { getPosts } from '../../lib/posts'
import { alternatesFor, SITE } from '../../lib/site'

const LATEST = 10

export const generateMetadata = async ({ params }: PageProps<'/[lang]'>): Promise<Metadata> => ({
	alternates: alternatesFor(await paramsLocale(params), '/')
})

const HomePage = async ({ params }: PageProps<'/[lang]'>) => {
	const lang = toLocale((await params).lang)
	const dict = getDictionary(lang)
	const posts = await getPosts(lang)
	return (
		<>
			<h1 className="sr-only">{SITE.name}</h1>
			<p className="mb-14! text-[1.25rem]">{dict.intro}</p>
			<h2 className="mt-0! mb-6!">{dict.latestHeading}</h2>
			<PostList lang={lang} posts={posts.slice(0, LATEST)} />
			{posts.length > LATEST && (
				<p className="font-ui text-[0.9375rem]">
					<Link href={localize(lang, '/posts')}>{dict.allWriting}</Link>
				</p>
			)}
		</>
	)
}

export default HomePage
