import { useEffect, useRef } from 'react'
import { stagger } from 'animejs'
import {
  animateCharReveal,
  animateFadeSlideUp,
  animateHeroGridLines,
} from '@/hooks/useAnime'

const LINE1 = 'Building Intelligent'
const LINE2 = 'Digital Growth'

function splitChars(text: string, prefix: string) {
  return text.split('').map((ch, i) => (
    <span
      key={`${prefix}-${i}`}
      data-hero-char
      className="inline-block opacity-0"
    >
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))
}

export default function Hero() {
  const svgRef = useRef<SVGSVGElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRowRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const sub = subRef.current
    const ctaRow = ctaRowRef.current
    const badge = badgeRef.current
    if (!svg || !sub || !ctaRow || !badge) return

    const lineNodes = Array.from(svg.querySelectorAll<SVGLineElement>('line[data-grid-line]'))
    void animateHeroGridLines(lineNodes)

    const chars = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-char]'))
    void animateCharReveal(chars)

    const charCount = chars.length
    const baseDelay = 280 + Math.min(charCount * 14, 1200)

    void animateFadeSlideUp(sub, {
      duration: 900,
      delay: baseDelay,
      ease: 'outQuint',
      y: [20, 0],
    })

    void animateFadeSlideUp(badge, {
      duration: 700,
      delay: 180,
      y: [10, 0],
    })

    const buttons = Array.from(ctaRow.querySelectorAll<HTMLElement>('a'))
    void animateFadeSlideUp(buttons, {
      duration: 720,
      delay: stagger(140, { start: baseDelay + 120, from: 'first' }),
      ease: 'outQuint',
      y: [26, 0],
    })
  }, [])

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-orbytal-black pt-24 pb-16 md:pt-28"
      aria-labelledby="hero-heading"
    >
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 h-full w-full text-orbytal-graphite"
        aria-hidden
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={`v-${i}`}
            data-grid-line
            x1={`${(i + 1) * 5.5}%`}
            y1="0%"
            x2={`${(i + 1) * 5.5}%`}
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0"
          />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`h-${i}`}
            data-grid-line
            x1="0%"
            y1={`${(i + 1) * 7}%`}
            x2="100%"
            y2={`${(i + 1) * 7}%`}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0"
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--color-orbytal-red)_18%,transparent),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 md:px-6">
        <div
          ref={badgeRef}
          className="mb-8 inline-flex w-fit items-center rounded-full border border-orbytal-graphite bg-orbytal-carbon/80 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-orbytal-gray-metallic opacity-0 backdrop-blur-sm md:text-xs"
        >
          Ecosistema Digital Inteligente
        </div>

        <h1
          id="hero-heading"
          className="max-w-5xl font-bold uppercase leading-[0.92] tracking-tight text-orbytal-white"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
          }}
        >
          <span className="mb-2 block md:mb-3">{splitChars(LINE1, 'l1')}</span>
          <span className="block">{splitChars(LINE2, 'l2')}</span>
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-2xl text-base font-normal normal-case tracking-normal text-orbytal-gray-metallic opacity-0 md:text-lg"
        >
          Transformamos empresas mediante Inteligencia Artificial, Automatización y Estrategia Digital de
          alto impacto.
        </p>

        <div ref={ctaRowRef} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#servicios"
            className="inline-flex items-center justify-center rounded-sm bg-orbytal-red px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-orbytal-white opacity-0 shadow-[0_0_32px_color-mix(in_srgb,var(--color-orbytal-red)_40%,transparent)] transition hover:bg-orbytal-red-dark"
          >
            Conoce nuestros servicios
          </a>
          <a
            href="#manifiesto"
            className="inline-flex items-center justify-center rounded-sm border border-orbytal-white bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-orbytal-white opacity-0 transition hover:border-orbytal-red hover:text-orbytal-red"
          >
            Ver manifiesto
          </a>
        </div>
      </div>
    </section>
  )
}
