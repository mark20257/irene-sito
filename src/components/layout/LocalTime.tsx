'use client'

import { useEffect, useState } from 'react'

const format = (timeZone: string) =>
  new Intl.DateTimeFormat('it-IT', { hour: '2-digit', minute: '2-digit', timeZone, hour12: false }).format(new Date())

/** Ora locale di Irene, aggiornata ogni 15 secondi. I due punti lampeggiano. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setTime(format(timeZone))
    update()
    const id = window.setInterval(update, 15_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  if (!time) return <time className="tabular-nums">--:--</time>
  const [h, m] = time.split(':')
  return (
    <time className="tabular-nums" dateTime={time}>
      {h}
      <span className="animate-pulse motion-reduce:animate-none">:</span>
      {m}
    </time>
  )
}
