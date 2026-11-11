'use client'

import { useTheme } from 'nextra-theme-blog'

const icon = 'fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]'

/**
 * Sun/moon toggle. Both icons are always rendered and Tailwind's `dark:` variant picks one,
 * so the server HTML matches the client and there is no flash or hydration mismatch.
 */
export const ThemeToggle = ({ label }: { label: string }) => {
	const { resolvedTheme, setTheme } = useTheme()
	const next = resolvedTheme === 'dark' ? 'light' : 'dark'

	return (
		<button
			type="button"
			className="inline-grid size-8 -mr-[7px] cursor-pointer place-items-center border-0 bg-transparent p-0 text-muted transition-colors duration-150 hover:text-accent"
			onClick={() => setTheme(next)}
			aria-label={label}
			title={label}
		>
			{/* Moon: shown in light mode */}
			<svg
				className={`${icon} dark:hidden`}
				viewBox="0 0 24 24"
				width="18"
				height="18"
				aria-hidden="true"
			>
				<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
			</svg>
			{/* Sun: shown in dark mode */}
			<svg
				className={`${icon} hidden dark:block`}
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
