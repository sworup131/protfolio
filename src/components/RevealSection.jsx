import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REVEAL_DURATION = 0.55

/**
 * Slides a section up into place.
 * The hero reveals as soon as the intro ends. Every section below
 * uses the same slide when it enters the viewport.
 */
export default function RevealSection({ children, active, immediate = false, still = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const revealed = active && (immediate || inView)

  if (still) return children

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: revealed ? '0%' : '100%' }}
        transition={{
          duration: REVEAL_DURATION,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
