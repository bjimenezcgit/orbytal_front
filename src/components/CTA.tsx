import { useRef } from 'react'
import { stagger } from 'animejs'
import { animateFadeSlideUp, useInViewOnce } from '@/hooks/useAnime'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useInViewOnce(sectionRef, () => {
    const box = innerRef.current
    if (!box) return
    const targets = Array.from(box.querySelectorAll<HTMLElement>('[data-cta-animate]'))
    void animateFadeSlideUp(targets, {
      duration: 820,
      delay: stagger(160, { from: 'first' }),
      y: [24, 0],
    })
  })

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="scroll-mt-24 bg-transparent py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      <div ref={innerRef} className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2
          id="cta-heading"
          data-cta-animate
          className="text-3xl font-bold uppercase tracking-tight text-orbytal-white opacity-0 md:text-4xl"
        >
          ¿Listo para evolucionar tu empresa?
        </h2>
        <p
          data-cta-animate
          className="mt-4 text-sm text-orbytal-gray-metallic opacity-0 md:text-base"
        >
          Agenda una consultoría gratuita y descubre cómo Orbytal puede transformar tu negocio.
        </p>
        <a
          data-cta-animate
          href="mailto:hola@orbytal.com"
          className="mt-10 inline-flex items-center justify-center rounded-sm bg-orbytal-red px-10 py-4 text-sm font-bold uppercase tracking-wide text-orbytal-white opacity-0 shadow-[0_0_36px_color-mix(in_srgb,var(--color-orbytal-red)_45%,transparent)] transition hover:bg-orbytal-red-dark hover:shadow-[0_0_48px_color-mix(in_srgb,var(--color-orbytal-red)_55%,transparent)]"
        >
          Agendar consultoría
        </a>
      </div>
    </section>
  )
}
