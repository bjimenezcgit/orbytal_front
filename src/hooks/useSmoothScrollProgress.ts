import { useEffect } from 'react'
import { prefersReducedMotion } from '@/hooks/useAnime'

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

type Options = {
  start?: number
  end?: number
  smooth?: number
  onProgress: (progress: number) => void
}

/**
 * Emite progreso 0→1 suavizado según scroll, sin re-render de React.
 */
export function useScrollProgressEffect({
  start = 0,
  end = 900,
  smooth = 0.09,
  onProgress,
}: Options) {
  useEffect(() => {
    const range = Math.max(end - start, 1)
    let current = 0
    let target = 0
    let raf = 0

    const updateTarget = () => {
      const y = window.scrollY
      target = easeOutCubic(Math.min(1, Math.max(0, (y - start) / range)))
    }

    const emit = (value: number) => {
      onProgress(value)
    }

    if (prefersReducedMotion()) {
      const onScroll = () => {
        updateTarget()
        current = target
        emit(current)
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const tick = () => {
      updateTarget()
      const delta = target - current
      if (Math.abs(delta) > 0.0005) {
        current += delta * smooth
      } else if (current !== target) {
        current = target
      }
      emit(current)
      raf = requestAnimationFrame(tick)
    }

    updateTarget()
    current = target
    emit(current)
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [start, end, smooth, onProgress])
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
