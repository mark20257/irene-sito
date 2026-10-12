'use client'

import { useRef, useState, type ReactNode } from 'react'
import type { Dictionary } from '@/content'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { cn } from '@/lib/utils'

export type FeedItem = {
  kind: 'carousel' | 'ad' | 'reel' | 'post' | 'meme'
  author: string
  caption: string
  likes: string
  ratio: string
  media: ReactNode
  note: { type: string; goal: string; result: string }
}

/**
 * Un telefono, un feed, le note a margine.
 * Scorrendo la pagina, la sezione si blocca e il feed scorre dentro il telefono:
 * a ogni post corrisponde la "nota della strategist" (tipo, obiettivo, risultato).
 */
export function FeedClient({ items, labels, handle }: { items: FeedItem[]; labels: Dictionary['feed']; handle: string }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const screen = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const staticMode = useReducedMotion()
  const activeRef = useRef(0)
  const n = items.length

  useGSAP(
    () => {
      if (staticMode) return
      const stage = root.current
      const tr = track.current
      const sc = screen.current
      if (!stage || !tr || !sc) return
      const posts = Array.from(tr.querySelectorAll<HTMLElement>('[data-post]'))
      const offset = (i: number) => (posts[i]?.offsetTop ?? 0) - 8
      const maxY = () => Math.max(0, tr.scrollHeight - sc.clientHeight)

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${n * window.innerHeight * 0.7}`,
          pin: true,
          scrub: 0.8,
          refreshPriority: 2,
          invalidateOnRefresh: true,
        },
      })
      tl.eventCallback('onUpdate', () => {
        const y = -Number(gsap.getProperty(tr, 'y'))
        let idx = 0
        posts.forEach((_, i) => {
          if (y >= offset(i) - sc.clientHeight * 0.4) idx = i
        })
        if (idx !== activeRef.current) {
          activeRef.current = idx
          setActive(idx)
        }
      })
      tl.to({}, { duration: 0.35 })
      for (let i = 1; i < posts.length; i++) {
        tl.to(tr, { y: () => -Math.min(offset(i), maxY()), duration: 1 }).to({}, { duration: 0.35 })
      }
      tl.to(tr, { y: () => -maxY(), duration: 0.8 })
    },
    { scope: root, dependencies: [staticMode] },
  )

  const current = items[active]

  return (
    <div
      ref={root}
      className={cn('relative overflow-hidden', staticMode ? 'py-16' : 'h-svh')}
      data-feed-stage
      data-hide-sticky
    >
      <div className="wrap grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* ── note a margine (desktop) ─────────────────────────── */}
        <div className="hidden lg:col-span-4 lg:block" aria-live="polite">
          {staticMode ? (
            <ol className="grid gap-8">
              {items.map((it, i) => (
                <li key={i}>
                  <FeedNote item={it} index={i} total={n} labels={labels} />
                </li>
              ))}
            </ol>
          ) : (
            <div className="relative min-h-[22rem]">
              {items.map((it, i) => (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  className={cn(
                    'absolute inset-x-0 top-0 transition-[opacity,transform] duration-700 ease-out-expo',
                    i === active ? 'translate-y-0 opacity-100' : i < active ? '-translate-y-6 opacity-0' : 'translate-y-6 opacity-0',
                  )}
                >
                  <FeedNote item={it} index={i} total={n} labels={labels} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── telefono ─────────────────────────────────────────── */}
        <div className="flex justify-center lg:col-span-4">
          <div
            className={cn(
              'relative aspect-[9/19.5] rounded-[clamp(30px,4.6vh,46px)] bg-[#050505] p-[clamp(7px,1vh,11px)] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8),inset_0_0_0_1.5px_rgb(255_255_255/0.14)]',
              staticMode ? 'h-[min(80svh,760px)]' : 'h-[min(66svh,600px)] lg:h-[min(82svh,780px)]',
            )}
          >
            <div ref={screen} className="relative h-full overflow-hidden rounded-[clamp(23px,3.6vh,36px)] bg-paper text-ink">
              {/* status bar */}
              <div className="absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-between bg-paper px-6 text-[11px] font-semibold">
                <span>9:41</span>
                <span className="absolute left-1/2 top-1.5 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-[#050505]" aria-hidden="true" />
                <span className="flex items-center gap-1" aria-hidden="true">
                  <svg width="16" height="10" viewBox="0 0 16 10">
                    {[0, 1, 2, 3].map((i) => (
                      <rect key={i} x={i * 4} y={8 - i * 2.4} width="3" height={2 + i * 2.4} rx=".6" fill="currentColor" />
                    ))}
                  </svg>
                  <svg width="22" height="11" viewBox="0 0 22 11">
                    <rect x=".5" y=".5" width="18" height="10" rx="3" fill="none" stroke="currentColor" />
                    <rect x="2" y="2" width="12" height="7" rx="1.5" fill="currentColor" />
                    <rect x="19.5" y="3.5" width="1.6" height="4" rx=".8" fill="currentColor" />
                  </svg>
                </span>
              </div>
              {/* app header */}
              <div className="absolute inset-x-0 top-8 z-20 flex h-11 items-center justify-between border-b border-ink/10 bg-paper px-4">
                <span className="flex items-center gap-1 text-[15px] font-bold tracking-tight">
                  {handle}
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </span>
                <span className="flex gap-3" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="3" width="14" height="14" rx="4" />
                    <path d="M10 6.5v7M6.5 10h7" />
                  </svg>
                  <HeartIcon />
                </span>
              </div>

              {/* feed */}
              <div
                className={cn('absolute inset-x-0 top-[76px] bottom-0', staticMode ? 'overflow-y-auto' : 'overflow-hidden')}
                data-lenis-prevent={staticMode || undefined}
                tabIndex={staticMode ? 0 : undefined}
              >
                <div ref={track} className="will-change-transform">
                  {/* storie in evidenza */}
                  <div className="flex gap-3 overflow-hidden px-3 py-3" aria-hidden="true">
                    {labels.phone.stories.map((s, i) => (
                      <span key={s} className="flex w-14 shrink-0 flex-col items-center gap-1">
                        <span className={cn('grid h-14 w-14 place-items-center rounded-full p-[2.5px]', i === 0 ? 'bg-acid' : 'bg-ink/15')}>
                          <span className={cn('h-full w-full rounded-full border-2 border-paper', ['bg-ink', 'bg-acid', 'bg-paper-3', 'bg-ink', 'bg-paper-3'][i])} />
                        </span>
                        <span className="w-full truncate text-center text-[10px]">{s}</span>
                      </span>
                    ))}
                  </div>

                  {items.map((it, i) => (
                    <article key={i} data-post className="border-t border-ink/10 pb-3">
                      <header className="flex items-center gap-2.5 px-3 py-2.5">
                        <span className={cn('h-8 w-8 shrink-0 rounded-full', it.author === handle ? 'bg-acid shadow-[inset_0_0_0_2px_var(--color-ink)]' : 'bg-ink')} />
                        <span className="min-w-0 flex-1 leading-tight">
                          <span className="block truncate text-[13px] font-semibold">{it.author}</span>
                          {it.kind === 'ad' && <span className="block text-[11px] text-ink/60">{labels.phone.sponsored}</span>}
                        </span>
                        <span className="text-lg leading-none" aria-hidden="true">
                          ···
                        </span>
                      </header>
                      <div className="relative overflow-hidden bg-paper-2" style={{ aspectRatio: it.ratio }}>
                        {it.media}
                        {it.kind === 'carousel' && (
                          <span className="absolute top-2.5 right-2.5 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] text-paper">1/6</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3.5 px-3 pt-2.5" aria-hidden="true">
                        <HeartIcon filled={!staticMode && i === active} />
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M20 12a8 8 0 1 1-3.2-6.4L20 4.5l-.8 3.6A8 8 0 0 1 20 12z" strokeLinejoin="round" />
                        </svg>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" strokeLinejoin="round" />
                        </svg>
                        <svg className="ml-auto" width="20" height="22" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M3 3h14v18l-7-5-7 5z" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="px-3 pt-1.5 text-[12.5px] font-semibold">
                        {it.likes} {labels.phone.likes}
                      </p>
                      <p className="px-3 pt-0.5 text-[12.5px] leading-snug">
                        <span className="font-semibold">{it.author}</span> {it.caption}
                      </p>
                    </article>
                  ))}

                  <div className="grid place-items-center gap-2 border-t border-ink/10 px-6 py-10 text-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-acid" aria-hidden="true">
                      ✓
                    </span>
                    <p className="text-[13px] font-semibold">{labels.end}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── indice dei post (desktop) ────────────────────────── */}
        <ol className="hidden lg:col-span-3 lg:col-start-10 lg:grid" aria-hidden="true">
          {items.map((it, i) => (
            <li
              key={i}
              className={cn(
                'flex items-baseline gap-3 border-t border-[var(--rule)] py-3 transition-colors duration-500',
                i === active ? 'text-acid' : 'text-paper/45',
              )}
            >
              <span className="label">{String(i + 1).padStart(2, '0')}</span>
              <span className="label">{it.note.type}</span>
            </li>
          ))}
          <li className="mt-2 h-1 overflow-hidden bg-paper/10">
            <span className="block h-full bg-acid transition-[width] duration-700 ease-out-expo" style={{ width: `${((active + 1) / n) * 100}%` }} />
          </li>
        </ol>
      </div>

      {/* ── nota (mobile) ────────────────────────────────────── */}
      {!staticMode && (
        <div className="pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,3svh)] px-[var(--gutter)] lg:hidden" aria-live="polite">
          <div className="mx-auto max-w-md bg-acid p-4 text-ink shadow-[0_0_0_1px_var(--color-ink)]">
            <p className="label flex justify-between gap-4">
              <span>{current.note.type}</span>
              <span>
                {String(active + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}
              </span>
            </p>
            <p className="t-display mt-2 text-[1.6rem] leading-[1.02] tracking-tight">{current.note.result}</p>
          </div>
        </div>
      )}
      {staticMode && (
        <ol className="wrap mt-10 grid gap-8 lg:hidden">
          {items.map((it, i) => (
            <li key={i}>
              <FeedNote item={it} index={i} total={n} labels={labels} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function FeedNote({ item, index, total, labels }: { item: FeedItem; index: number; total: number; labels: Dictionary['feed'] }) {
  return (
    <article>
      <p className="label text-acid">
        {labels.progress} {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      <h3 className="t-h4 mt-3 uppercase">{item.note.type}</h3>
      <dl className="mt-6 grid gap-4">
        <div className="border-t border-[var(--rule)] pt-3">
          <dt className="label muted">{labels.noteLabels.goal}</dt>
          <dd className="mt-1 text-lg">{item.note.goal}</dd>
        </div>
        <div className="border-t border-[var(--rule)] pt-3">
          <dt className="label muted">{labels.noteLabels.result}</dt>
          <dd className="t-display mt-1 text-[clamp(1.8rem,1rem+1.8vw,3rem)] leading-[1.02] tracking-tight">
            <span className="bg-acid px-1 text-ink [box-decoration-break:clone]">{item.note.result}</span>
          </dd>
        </div>
      </dl>
    </article>
  )
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className={cn('transition-transform duration-500 ease-out-back', filled && 'scale-110')}>
      <path
        d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.6 3.6 4.5 6.9 4.5c2 0 3.4 1.2 5.1 3.1 1.7-1.9 3.1-3.1 5.1-3.1 3.3 0 5.4 3.1 4.2 6.3C19.5 15.4 12 20 12 20z"
        fill={filled ? 'var(--color-acid)' : 'none'}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}
