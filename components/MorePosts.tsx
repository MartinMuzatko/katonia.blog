import { getDictionary, type Locale } from '../lib/i18n'
import { getPosts } from '../lib/posts'
import { PostList } from './PostList'

type MorePostsProps = { lang: Locale; currentRoute: string; limit?: number }

/** Up to `limit` other posts in `lang`, newest first, excluding the one at `currentRoute`. */
export const MorePosts = async ({ lang, currentRoute, limit = 4 }: MorePostsProps) => {
	const posts = (await getPosts(lang)).filter(post => post.route !== currentRoute).slice(0, limit)
	if (posts.length === 0) return null
	return (
		<aside className="mt-16 border-t border-hairline pt-6" aria-labelledby="more-posts-heading">
			<h2
				id="more-posts-heading"
				className="m-0! mb-5! font-ui text-[0.875rem]! font-medium! tracking-normal! text-muted!"
			>
				{getDictionary(lang).moreWriting}
			</h2>
			<PostList lang={lang} posts={posts} />
		</aside>
	)
}
