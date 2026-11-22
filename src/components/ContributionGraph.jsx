import { useEffect, useState } from 'react'

const LEVELS = [
  'bg-stone-200 dark:bg-stone-800',
  'bg-emerald-200 dark:bg-emerald-900',
  'bg-emerald-400 dark:bg-emerald-700',
  'bg-emerald-500 dark:bg-emerald-500',
  'bg-emerald-600 dark:bg-emerald-400',
]

function weeksFrom(contributions) {
  if (contributions.length === 0) return []

  const first = new Date(`${contributions[0].date}T00:00:00`)
  const cells = [...Array(first.getDay()).fill(null), ...contributions]
  const weeks = []

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7))
  }

  return weeks
}

function dayLabel(date, count) {
  const formatted = new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const noun = count === 1 ? 'contribution' : 'contributions'

  return `${count} ${noun} on ${formatted}`
}

export default function ContributionGraph() {
  const [contributions, setContributions] = useState([])
  const [total, setTotal] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let ignore = false

    fetch('https://github-contributions-api.jogruber.de/v4/sworup131?y=last')
      .then((response) => {
        if (!response.ok) throw new Error('Contributions request failed')
        return response.json()
      })
      .then((data) => {
        if (ignore) return
        setContributions(data.contributions ?? [])
        setTotal(data.total?.lastYear ?? 0)
      })
      .catch(() => {
        if (!ignore) setFailed(true)
      })

    return () => {
      ignore = true
    }
  }, [])

  const weeks = weeksFrom(contributions)

  return (
    <div>
      <p className="text-[0.9rem] text-muted dark:text-stone-400">
        {total === null ? 'Loading contributions' : `${total} contributions in the last year`}
      </p>

      {failed ? (
        <p className="mt-3 text-[0.85rem] text-muted dark:text-stone-400">
          The contribution graph is unavailable right now.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto pb-1">
          <div
            className="grid w-max grid-flow-col grid-rows-7 gap-[2px]"
            role="img"
            aria-label={
              total === null
                ? 'GitHub contribution graph'
                : `${total} GitHub contributions in the last year`
            }
          >
            {weeks.flat().map((day, index) =>
              day ? (
                <span
                  key={day.date}
                  title={dayLabel(day.date, day.count)}
                  className={`size-2 rounded-[2px] ${LEVELS[day.level] ?? LEVELS[0]}`}
                />
              ) : (
                <span key={`pad-${index}`} className="size-2" />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
