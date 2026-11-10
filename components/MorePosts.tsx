import { getDictionary, type Locale } from '../lib/i18n'
import { getPosts } from '../lib/posts'
import { PostList } from './PostList'

type MorePostsProps = { lang: Locale; currentRoute: string; limit?: number }

/** Up to `limit` other posts in `lang`, newest first, excluding the one at `currentRoute`. */
export const MorePosts = async ({ lang, currentRoute, limit = 4 }: MorePostsProps) => {
	const posts = (await getPosts(lang)).filter(post => post.route !== currentRoute).slice(0, limit)
	if (posts.length === 0) return null
	return (
		<aside className="more-posts" aria-labelledby="more-posts-heading">
			<h2 id="more-posts-heading">{getDictionary(lang).moreWriting}</h2>
			<PostList lang={lang} posts={posts} />
		</aside>
	)
}
