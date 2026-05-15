import { useCallback, useEffect, useRef, useState } from 'react'
import { lerp, useScrollProgressEffect } from '@/hooks/useSmoothScrollProgress'

const LOGO_SRC = '/imgs/logo_side.png'
const LOGO_W = 1536
const LOGO_H = 1024
const SCROLL_START = 140

export default function ScrollLogoBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [scrollEnd, setScrollEnd] = useState(1000)

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById('hero')
      const h = hero?.offsetHeight ?? window.innerHeight
      setScrollEnd(Math.round(h * 0.9))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const applyProgress = useCallback((p: number) => {
    const container = containerRef.current
    const logo = logoRef.current
    const glow = glowRef.current
    if (!container || !logo || !glow) return

    const opacity = lerp(0, 0.38, p)
    const scale = lerp(0.92, 1, p)
    const topPct = lerp(40, 50, p)
    const glowOpacity = lerp(0, 0.45, Math.max(0, (p - 0.35) / 0.65))

    logo.style.opacity = String(opacity)
    logo.style.transform = 'translate3d(0, 0, 0) scale(1)'

    container.style.top = `${topPct}%`
    container.style.transform = `translate3d(0, -50%, 0) scale(${scale})`
    container.style.visibility = p < 0.01 ? 'hidden' : 'visible'
    glow.style.opacity = String(glowOpacity)
  }, [])

  useScrollProgressEffect({
    start: SCROLL_START,
    end: scrollEnd,
    smooth: 0.1,
    onProgress: applyProgress,
  })

  useEffect(() => {
    applyProgress(0)
  }, [applyProgress])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-visible bg-orbytal-black"
    >
      <svg className="absolute inset-0 h-full w-full text-orbytal-graphite opacity-[0.35]">
        {Array.from({ length: 22 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${(i + 1) * 4.5}%`}
            y1="0%"
            x2={`${(i + 1) * 4.5}%`}
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0%"
            y1={`${(i + 1) * 5.5}%`}
            x2="100%"
            y2={`${(i + 1) * 5.5}%`}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_15%,color-mix(in_srgb,var(--color-orbytal-red)_14%,transparent),transparent_50%)]" />

      <div
        ref={containerRef}
        className="absolute right-[1%] w-[min(92vw,720px)] sm:right-[2%] md:right-[4%] md:w-[min(62vw,640px)] lg:w-[min(55vw,720px)]"
        style={{
          top: '40%',
          visibility: 'hidden',
          transform: 'translate3d(0, -50%, 0) scale(0.92)',
        }}
      >
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 z-0 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-orbytal-red)_45%,transparent),transparent_68%)] blur-3xl"
          style={{ opacity: 0 }}
        />

        <div
          className="relative z-[1] w-full overflow-visible"
          style={{ aspectRatio: `${LOGO_W} / ${LOGO_H}` }}
        >
          <img
            ref={logoRef}
            src={LOGO_SRC}
            alt="Orbytal Digital Group"
            width={LOGO_W}
            height={LOGO_H}
            className="h-full w-full object-contain object-center will-change-transform"
            draggable={false}
            style={{ opacity: 0 }}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-orbytal-black from-0% via-orbytal-black/88 via-40% to-transparent to-68% md:via-46% md:to-62%" />
    </div>
  )
}
