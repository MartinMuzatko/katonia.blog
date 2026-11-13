import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { parseArgs } from 'node:util'

const LOCALES = ['en', 'de']
const POSTS_DIR = 'content/posts'
const DEFAULT_TITLE = 'New post'
const DEFAULT_TAGS = 'draft'

const slugify = text =>
	text
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

const today = () => new Date().toISOString().slice(0, 10)

const frontmatter = ({ title, date, tags }) =>
	`---\ntitle: ${title}\ndate: ${date}\ndescription:\ntags: ${tags}\n---\n`

const main = async () => {
	const { values, positionals } = parseArgs({
		allowPositionals: true,
		options: { title: { type: 'string', short: 't' }, tags: { type: 'string' } }
	})
	const title = (values.title ?? positionals.join(' ').trim()) || DEFAULT_TITLE
	const tags = values.tags ?? DEFAULT_TAGS
	const date = today()
	const dir = join(POSTS_DIR, `${date}-${slugify(title) || 'post'}`)

	if (existsSync(dir)) {
		console.error(`Already exists: ${dir}`)
		process.exit(1)
	}

	await mkdir(dir, { recursive: true })
	await Promise.all(
		LOCALES.map(locale =>
			writeFile(join(dir, `${locale}.mdx`), frontmatter({ title, date, tags }))
		)
	)
	console.log(`Created ${dir} (${LOCALES.join(', ')})`)
}

await main()
