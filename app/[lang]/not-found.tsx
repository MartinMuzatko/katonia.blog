import { NotFoundContent } from '../../components/NotFoundContent'
import { getDictionary, LOCALES } from '../../lib/i18n'
import { getPosts } from '../../lib/posts'

/**
 * not-found gets no params, and reading the request would make every page under
 * [lang] dynamic. So this stays static, ships both locales, and the client picks one.
 */
const NotFound = async () => {
	const locales = await Promise.all(
		LOCALES.map(async lang => [
			lang,
			{ text: getDictionary(lang).notFound, posts: await getPosts(lang) }
		])
	)
	return <NotFoundContent locales={Object.fromEntries(locales)} />
}

export default NotFound
