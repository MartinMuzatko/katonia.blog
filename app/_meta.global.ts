import type { MetaRecord } from 'nextra'

export default {
	index: { type: 'page', display: 'hidden' },
	posts: { type: 'page', title: 'Writing' },
	reading: { type: 'page', title: 'Reading' },
	about: { type: 'page' },
	now: { type: 'page' }
} satisfies MetaRecord
