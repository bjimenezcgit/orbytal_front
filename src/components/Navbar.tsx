import { useEffect, useRef, useState } from 'react'
import { stagger } from 'animejs'
import { animateFadeSlideUp, animateNavbarIntro } from '@/hooks/useAnime'

const navLinkClass =
  'text-sm font-medium uppercase tracking-widest text-orbytal-gray-metallic transition-colors hover:text-orbytal-white'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const desktopLinksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (header) void animateNavbarIntro(header)
  }, [])

  useEffect(() => {
    const wrap = desktopLinksRef.current
    const cta = ctaRef.current
    if (!wrap || !cta) return
    const els = [...wrap.querySelectorAll<HTMLElement>('a'), cta]
    void animateFadeSlideUp(els, {
      duration: 640,
      delay: stagger(80, { start: 200, from: 'first' }),
      y: [12, 0],
    })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 overflow-visible border-b transition-all duration-300 ${
        scrolled
          ? 'border-orbytal-graphite/50 bg-orbytal-black/45 backdrop-blur-xl shadow-[0_8px_32px_color-mix(in_srgb,var(--color-orbytal-black)_35%,transparent)]'
          : 'border-orbytal-graphite/20 bg-orbytal-black/15 backdrop-blur-md'
      }`}
      style={{ opacity: 0 }}
    >
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-4 overflow-visible px-4 md:h-12 md:px-6">
        <a
          href="#"
          className="relative block h-11 w-38 shrink-0 overflow-visible sm:w-44 md:h-12 md:w-50 lg:w-60"
          onClick={closeMenu}
        >
          <img
            src="/imgs/logo_side.png"
            alt="Orbytal Digital Group"
            className="absolute left-0 top-1/2 h-14 w-full max-w-none -translate-y-1/2 object-contain object-left sm:h-15 md:h-16 lg:h-20"
            width={320}
            height={90}
            fetchPriority="high"
          />
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
          <div ref={desktopLinksRef} className="flex items-center gap-10">
            <a href="#servicios" className={`${navLinkClass} opacity-0`}>
              Servicios
            </a>
            <a href="#nosotros" className={`${navLinkClass} opacity-0`}>
              Nosotros
            </a>
            <a href="#contacto" className={`${navLinkClass} opacity-0`}>
              Contacto
            </a>
          </div>
          <a
            ref={ctaRef}
            href="#servicios"
            className="rounded-sm bg-orbytal-red px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-orbytal-white opacity-0 shadow-[0_0_24px_color-mix(in_srgb,var(--color-orbytal-red)_35%,transparent)] transition hover:bg-orbytal-red-dark"
          >
            Comenzar
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#servicios"
            className="rounded-sm bg-orbytal-red px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-orbytal-white"
          >
            Comenzar
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded border border-orbytal-graphite text-orbytal-white"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(v => !v)}
          >
            <span className="sr-only">Menú</span>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-orbytal-graphite/50 bg-orbytal-black/70 px-4 py-6 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4">
            <a href="#servicios" className={navLinkClass} onClick={closeMenu}>
              Servicios
            </a>
            <a href="#nosotros" className={navLinkClass} onClick={closeMenu}>
              Nosotros
            </a>
            <a href="#contacto" className={navLinkClass} onClick={closeMenu}>
              Contacto
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
