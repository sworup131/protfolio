import { useState } from 'react'
import { useTheme } from '../hooks/useTheme.jsx'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Connect', href: '#connect' },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors hover:text-ink dark:border-stone-700 dark:text-stone-400 dark:hover:text-stone-50"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/90">
      <div className="flex h-14 items-center justify-between px-5 sm:px-6">
        <a
          href="#hero"
          className="flex items-center gap-2 text-ink transition-opacity hover:opacity-70 dark:text-stone-50"
          aria-label="Home"
        >
          <img src="/favicon.png" alt="" width={28} height={28} className="h-7 w-7" />
        </a>

        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-5 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[0.85rem] text-muted transition-colors hover:text-ink dark:text-stone-400 dark:hover:text-stone-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors hover:text-ink md:hidden dark:border-stone-700 dark:text-stone-400 dark:hover:text-stone-50"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-line px-5 py-4 md:hidden dark:border-stone-800"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-[0.9rem] text-muted transition-colors hover:text-ink dark:text-stone-400 dark:hover:text-stone-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
