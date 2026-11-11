/** The flower glyph as a section divider. Use it once per post at most. */
export function Divider() {
	return (
		// A static (non-focusable) separator needs no label, and <hr> cannot hold the glyph images
		// oxlint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/prefer-tag-over-role
		<div className="my-[3em] flex justify-center" role="separator">
			<img
				src="/glyph.png"
				alt=""
				width={20}
				height={20}
				className="m-0! size-5! dark:hidden!"
			/>
			<img
				src="/glyph-dark.png"
				alt=""
				width={20}
				height={20}
				className="m-0! hidden! size-5! dark:block!"
			/>
		</div>
	)
}
