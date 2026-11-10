'use client'

import { useTheme } from 'nextra-theme-blog'

/**
 * Sun/moon toggle. Both icons are always rendered and CSS (`.dark`) picks one,
 * so the server HTML matches the client and there is no flash or hydration mismatch.
 */
export const ThemeToggle = ({ label }: { label: string }) => {
	const { resolvedTheme, setTheme } = useTheme()
	const next = resolvedTheme === 'dark' ? 'light' : 'dark'

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={() => setTheme(next)}
			aria-label={label}
			title={label}
		>
			{/* Moon: shown in light mode */}
			<svg
				className="only-light"
				viewBox="0 0 24 24"
				width="18"
				height="18"
				aria-hidden="true"
			>
				<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
			</svg>
			{/* Sun: shown in dark mode */}
			<svg
				className="only-dark"
				viewBox="0 0 24 24"
				width="18"
				height="18"
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="4" />
				<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
			</svg>
		</button>
	)
}
