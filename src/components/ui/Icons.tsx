import type { SVGProps } from 'react'

/** Icone disegnate a mano per il sito: tratto 1.5, angoli vivi. Niente set stock. */
type P = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 16): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  'aria-hidden': true,
  focusable: false,
})

export const ArrowRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
  </svg>
)

export const ArrowUpRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" strokeLinecap="square" />
  </svg>
)

export const ArrowDown = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M8 2v11M4 9l4 4 4-4" strokeLinecap="square" />
  </svg>
)

export const ArrowLeft = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M14 8H3M7 4L3 8l4 4" strokeLinecap="square" />
  </svg>
)

export const Plus = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M8 2.5v11M2.5 8h11" strokeLinecap="square" />
  </svg>
)

export const Chat = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2.5 3.5h11v7.5H7l-3 2.5V11H2.5z" strokeLinejoin="round" />
  </svg>
)

export const Copy = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5.5 5.5h8v8h-8zM10.5 5.5v-3h-8v8h3" />
  </svg>
)

export const Check = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M3 8.5l3 3 7-7" strokeLinecap="square" />
  </svg>
)

/** Segno di registro (target di stampa) */
export const RegMark = ({ size = 22, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={1} aria-hidden focusable={false} {...p}>
    <circle cx="11" cy="11" r="6" />
    <circle cx="11" cy="11" r="2.5" fill="currentColor" stroke="none" />
    <path d="M11 0v22M0 11h22" />
  </svg>
)
