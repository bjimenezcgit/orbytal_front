import { useEffect, useRef, useSyncExternalStore } from 'react'
import { animate, stagger } from 'animejs'
import type { RefObject } from 'react'

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    onStoreChange => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => prefersReducedMotion(),
    () => false,
  )
}

function revealElements(elements: Iterable<HTMLElement>) {
  for (const el of elements) {
    el.style.opacity = '1'
    el.style.transform = 'none'
  }
}

function collectElements(targets: Parameters<typeof animate>[0]): HTMLElement[] {
  if (typeof targets === 'string') {
    return Array.from(document.querySelectorAll<HTMLElement>(targets))
  }
  if (targets instanceof Element) {
    return [targets as HTMLElement]
  }
  if (Array.isArray(targets)) {
    return targets.filter((t): t is HTMLElement => t instanceof HTMLElement)
  }
  if (targets && typeof (targets as NodeList).length === 'number') {
    return Array.from(targets as NodeListOf<HTMLElement>)
  }
  return []
}

export function animateFadeSlideUp(
  targets: Parameters<typeof animate>[0],
  options?: {
    duration?: number
    delay?: unknown
    ease?: string
    y?: [number, number]
  },
) {
  if (prefersReducedMotion()) {
    revealElements(collectElements(targets))
    return null
  }
  const params = {
    opacity: [0, 1],
    y: options?.y ?? [28, 0],
    duration: options?.duration ?? 780,
    ease: options?.ease ?? 'outQuint',
    ...(options?.delay !== undefined ? { delay: options.delay } : {}),
  }
  return animate(targets, params as Parameters<typeof animate>[1])
}

export function animateStaggerFadeScale(targets: Parameters<typeof animate>[0]) {
  if (prefersReducedMotion()) {
    revealElements(collectElements(targets))
    return null
  }
  return animate(targets, {
    opacity: [0, 1],
    scale: [0.94, 1],
    y: [22, 0],
    duration: 680,
    ease: 'outQuint',
    delay: stagger(90, { from: 'first' }),
  })
}

export function animateManifestoLines(lineElements: HTMLElement[]) {
  if (prefersReducedMotion()) {
    revealElements(lineElements)
    return null
  }
  return animate(lineElements, {
    opacity: [0, 1],
    x: [-12, 0],
    duration: 620,
    ease: 'outCubic',
    delay: stagger(140, { from: 'first' }),
  })
}

export function animateCharReveal(charElements: HTMLElement[]) {
  if (prefersReducedMotion()) {
    revealElements(charElements)
    return null
  }
  return animate(charElements, {
    opacity: [0, 1],
    y: [14, 0],
    duration: 420,
    ease: 'outQuint',
    delay: stagger(18, { from: 'first' }),
  })
}

export function animateNavbarIntro(nav: HTMLElement) {
  if (prefersReducedMotion()) {
    nav.style.opacity = '1'
    nav.style.transform = 'translateY(0)'
    return null
  }
  return animate(nav, {
    opacity: [0, 1],
    y: [-16, 0],
    duration: 900,
    ease: 'outQuint',
  })
}

export function animateHeroGridLines(lineElements: SVGLineElement[]) {
  if (prefersReducedMotion()) {
    lineElements.forEach(l => l.setAttribute('opacity', '0.22'))
    return null
  }
  return animate(lineElements, {
    opacity: [0, 0.2],
    duration: 2400,
    ease: 'outSine',
    delay: stagger(12, { from: 'random' }),
  })
}

export function useInViewOnce(
  ref: RefObject<Element | null>,
  onEnter: () => void,
  observerInit: IntersectionObserverInit = { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
) {
  const fired = useRef(false)
  const onEnterRef = useRef(onEnter)

  useEffect(() => {
    onEnterRef.current = onEnter
  }, [onEnter])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      if (!fired.current) {
        fired.current = true
        onEnterRef.current()
      }
      return
    }

    const io = new IntersectionObserver(entries => {
      const hit = entries.some(e => e.isIntersecting)
      if (hit && !fired.current) {
        fired.current = true
        onEnterRef.current()
      }
    }, observerInit)

    io.observe(el)
    return () => io.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps -- observerInit identity is stable in our call sites
  }, [ref, observerInit.threshold, observerInit.rootMargin, observerInit.root])
}
