import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { greetings } from '../data/greetings'

// Timing constants — tweak these to adjust overall intro pace
const FIRST_GREETING_HOLD_MS = 800
const FIRST_GREETING_FADE_MS = 500
const GREETING_INTERVAL_MIN = 150
const GREETING_INTERVAL_MAX = 150
const FINAL_PAUSE_MS = 300
const OVERLAY_EXIT_MS = 800

/** Returns a random interval between min and max (ms) for organic pacing */
function getGreetingInterval() {
  return (
    GREETING_INTERVAL_MIN +
    Math.floor(Math.random() * (GREETING_INTERVAL_MAX - GREETING_INTERVAL_MIN + 1))
  )
}

/** Delay before advancing away from the current greeting */
function getDelayBeforeNextGreeting(index) {
  if (greetings[index] === 'Hello') return FIRST_GREETING_HOLD_MS
  return getGreetingInterval()
}

/**
 * Full-screen intro loader with multilingual greeting cycle.
 * Renders once per page load, then calls onComplete and unmounts.
 */
export default function IntroLoader({ onExitStart, onComplete }) {
  const prefersReducedMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const indexRef = useRef(0)
  const onExitStartRef = useRef(onExitStart)
  const onCompleteRef = useRef(onComplete)

  onExitStartRef.current = onExitStart
  onCompleteRef.current = onComplete

  // Lock body scroll while intro is active
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (isExiting) {
      document.body.style.overflow = ''
    }
  }, [isExiting])

  // Advance through greetings, then slide overlay away
  useEffect(() => {
    if (prefersReducedMotion) {
      onExitStartRef.current?.()
      const timer = setTimeout(() => onCompleteRef.current(), 100)
      return () => clearTimeout(timer)
    }

    let timeoutId

    const startExit = () => {
      onExitStartRef.current?.()
      setIsExiting(true)
    }

    const advanceGreeting = () => {
      if (indexRef.current < greetings.length - 1) {
        indexRef.current += 1
        setCurrentIndex(indexRef.current)
        timeoutId = setTimeout(advanceGreeting, getGreetingInterval())
      } else {
        timeoutId = setTimeout(startExit, FINAL_PAUSE_MS)
      }
    }

    timeoutId = setTimeout(advanceGreeting, getDelayBeforeNextGreeting(0))

    return () => clearTimeout(timeoutId)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface dark:bg-stone-950"
      initial={{ y: 0 }}
      animate={isExiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: OVERLAY_EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isExiting) onCompleteRef.current()
      }}
      aria-hidden={isExiting}
    >
      {/* Animated film grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply motion-safe:animate-grain dark:opacity-[0.04] dark:mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      {/* Screen reader: announce current greeting */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {greetings[currentIndex]}
      </p>

      {currentIndex === 0 && !isExiting ? (
        <motion.h1
          className="relative z-10 px-5 text-center font-display text-[1.75rem] font-normal tracking-[-0.04em] text-ink antialiased dark:text-stone-50 sm:text-[2.25rem] md:text-[2.75rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FIRST_GREETING_FADE_MS / 1000, ease: 'linear' }}
        >
          {greetings[currentIndex]}
        </motion.h1>
      ) : !isExiting ? (
        <h1 className="relative z-10 px-5 text-center font-display text-[1.75rem] font-normal tracking-[-0.04em] text-ink antialiased dark:text-stone-50 sm:text-[2.25rem] md:text-[2.75rem]">
          {greetings[currentIndex]}
        </h1>
      ) : null}
    </motion.div>
  )
}
