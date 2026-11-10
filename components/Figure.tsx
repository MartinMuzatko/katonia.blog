import Image, { type StaticImageData } from 'next/image'

type FigureProps = {
	/** An imported image (optimised by next/image) or a /public path. */
	src: StaticImageData | string
	alt?: string
	caption?: React.ReactNode
	width?: number
	height?: number
}

/** An image at full column width with an optional grey caption. */
export function Figure({ src, alt = '', caption, width, height }: FigureProps) {
	return (
		<figure>
			{typeof src === 'string' ? (
				<img src={src} alt={alt} width={width} height={height} loading="lazy" />
			) : (
				<Image src={src} alt={alt} sizes="(max-width: 720px) 100vw, 680px" />
			)}
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	)
}
