import { useState } from 'react'
import IntroLoader from './components/IntroLoader'
import Navbar from './components/Navbar'
import RevealSection from './components/RevealSection'

const sectionClass =
  'border-t border-line bg-surface px-5 py-16 text-ink sm:px-6 sm:py-20 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50'

const labelClass =
  'mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-faint dark:text-stone-500'

const headingClass =
  'font-heading text-[1.65rem] font-normal leading-snug tracking-[-0.03em] sm:text-[1.85rem]'

const projectList = [
  {
    name: 'Subedi Cuts',
    description:
      'A barber shop site with a gallery, reviews, and a multi-step booking flow. Availability and bookings are stored in Supabase.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
    href: 'https://github.com/sworup131/subedicuts',
    live: 'https://subedicuts.vercel.app',
    image: '/projects/subedi-cuts.jpg',
  },
  {
    name: 'Attendance',
    description:
      'A student attendance app with login, signup, tracking, and a dashboard.',
    tags: ['Node.js', 'Express', 'MongoDB', 'EJS'],
    href: 'https://github.com/sworup131/attendancenew',
    image: '/projects/black.svg',
  },
  {
    name: 'Notes',
    description:
      'A notes app with an API for creating, updating, and deleting notes.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    href: 'https://github.com/sworup131/notes-app',
    live: 'https://notes-app-t52s.vercel.app',
    image: '/projects/black.svg',
  },
]

const sections = [
  {
    id: 'hero',
    content: (
      <section
        id="hero"
        className="bg-surface px-5 pt-16 pb-8 text-ink dark:bg-stone-950 dark:text-stone-50 sm:px-6 sm:pt-20 sm:pb-10"
      >
        <div className="mx-auto w-full max-w-xl">
          <h1 className="font-display text-[2rem] font-normal leading-tight tracking-[-0.04em] sm:text-[2.5rem]">
            Sworup Subedi
          </h1>
          <p className="mt-3 font-sans text-[0.95rem] text-muted dark:text-stone-400">
            Full-Stack Developer &amp; Student
          </p>
          <p className="mt-6 max-w-md font-sans text-[0.95rem] leading-relaxed text-muted dark:text-stone-400">
            I craft minimal and functional digital experiences. Focused on
            full-stack development and AI.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 font-sans text-[0.95rem] text-ink dark:text-stone-200">
            <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            Looking for internship opportunities.
          </p>
        </div>
      </section>
    ),
  },
  {
    id: 'about',
    content: (
      <section
        id="about"
        className="border-t border-line bg-surface px-5 pt-10 pb-16 text-ink sm:px-6 sm:pt-12 sm:pb-20 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50"
      >
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-[1.85rem] leading-none tracking-[-0.04em] sm:text-[2.1rem]">
            About
          </h2>
          <div className="mt-6 space-y-3 text-[0.95rem] leading-[1.75] text-muted dark:text-stone-300/90">
            <p>
              I&apos;m a{' '}
              <strong className="font-medium text-ink dark:text-stone-50">developer and student</strong>{' '}
              focused on full-stack development and AI. I build products end to
              end, from the interface through the systems and models behind
              them.
            </p>
            <p>
              My work is about turning ideas into software that feels clear and
              useful, using{' '}
              <strong className="font-medium text-ink dark:text-stone-50">modern web technologies and AI</strong>. I like systems that stay simple on the surface and still hold up as they grow.
            </p>
            <p>
              I&apos;m currently{' '}
              <strong className="font-medium text-ink dark:text-stone-50">looking for internship opportunities</strong>, so I can keep shipping polished work and learn alongside a team.
            </p>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: 'projects',
    content: (
      <section id="projects" className={sectionClass}>
        <div className="mx-auto max-w-xl">
          <p className={labelClass}>Projects</p>
          <h2 className={headingClass}>Selected work</h2>
          <ul className="mt-8">
            {projectList.map((project) => (
              <li
                key={project.href}
                className="border-t border-line py-6 first:border-t-0 first:pt-0 dark:border-stone-800"
              >
                <div className={project.image ? 'flex items-start gap-4' : undefined}>
                  {project.image && (
                    <a
                      href={project.live || project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block h-[110px] w-[180px] shrink-0 overflow-hidden rounded-md border border-line dark:border-stone-800"
                    >
                      <img
                        src={project.image}
                        alt={`${project.name} homepage`}
                        className="h-full w-full object-cover object-center"
                      />
                    </a>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-heading text-[1.15rem] tracking-[-0.03em]">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-opacity hover:opacity-70"
                      >
                        {project.name}
                      </a>
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted dark:text-stone-400">
                      {project.description}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line px-2.5 py-0.5 text-[0.75rem] text-muted dark:border-stone-700 dark:text-stone-400"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 flex gap-4 text-[0.85rem]">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ink underline decoration-line underline-offset-4 transition-opacity hover:opacity-70 dark:text-stone-200 dark:decoration-stone-700"
                      >
                        GitHub
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-ink underline decoration-line underline-offset-4 transition-opacity hover:opacity-70 dark:text-stone-200 dark:decoration-stone-700"
                        >
                          Live
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
  },
  {
    id: 'connect',
    content: (
      <section
        id="connect"
        className="border-t border-line bg-surface px-5 py-10 text-ink sm:px-6 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50"
      >
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-[1.35rem] leading-none tracking-[-0.03em]">
            Let&apos;s build something together.
          </h2>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9rem]">
            <span className="inline-flex items-center gap-2 text-muted dark:text-stone-400">
              <span className="relative flex size-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Open to internships
            </span>
            <a
              href="https://github.com/sworup131"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-line underline-offset-4 transition-opacity hover:opacity-70 dark:text-stone-50 dark:decoration-stone-700"
            >
              GitHub
            </a>
          </p>
        </div>
      </section>
    ),
  },
]

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [revealActive, setRevealActive] = useState(false)

  return (
    <div className="min-h-screen bg-canvas dark:bg-stone-950">
      {!introComplete && (
        <IntroLoader
          onExitStart={() => {
            window.scrollTo(0, 0)
            setRevealActive(true)
          }}
          onComplete={() => setIntroComplete(true)}
        />
      )}

      <main className="mx-auto min-h-screen max-w-3xl border-x border-line bg-surface dark:border-stone-800 dark:bg-stone-950">
        {revealActive && <Navbar />}

        {sections.map((section) => (
          <RevealSection
            key={section.id}
            active={revealActive}
            immediate={section.id === 'hero' || section.id === 'about'}
            still={section.id === 'projects' || section.id === 'connect'}
          >
            {section.content}
          </RevealSection>
        ))}
      </main>
    </div>
  )
}

export default App
