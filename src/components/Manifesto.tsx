import { useRef } from 'react'
import { animateManifestoLines, useInViewOnce } from '@/hooks/useAnime'

const MANIFESTO_LINES = [
  'El futuro pertenece a las empresas que evolucionan.',
  '',
  'En un mundo impulsado por datos, automatización e inteligencia artificial, las marcas necesitan más que presencia digital: necesitan sistemas inteligentes capaces de crecer, adaptarse y escalar constantemente.',
  '',
  'ORBYTAL nace para construir esa evolución. Combinamos estrategia, creatividad, inteligencia de negocio y tecnología para transformar la manera en que las empresas operan, venden y se conectan con el mundo digital.',
  '',
  'No seguimos tendencias. Construimos el futuro digital de las marcas modernas.',
]

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  useInViewOnce(sectionRef, () => {
    const lines = sectionRef.current?.querySelectorAll<HTMLElement>('.manifesto-line')
    if (lines?.length) void animateManifestoLines(Array.from(lines))
  })

  return (
    <section
      ref={sectionRef}
      id="manifiesto"
      className="scroll-mt-24 border-t border-orbytal-graphite bg-orbytal-carbon py-20 md:py-28"
      aria-labelledby="manifiesto-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="border-l-2 border-orbytal-red pl-6 md:pl-10">
          <h2
            id="manifiesto-heading"
            className="text-2xl font-bold uppercase tracking-tight text-orbytal-white md:text-3xl"
          >
            Manifiesto
          </h2>
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-orbytal-gray-metallic md:text-base">
            {MANIFESTO_LINES.map((line, i) =>
              line === '' ? (
                <div key={`sp-${i}`} className="h-2" aria-hidden />
              ) : (
                <p key={`m-${i}`} className="manifesto-line opacity-0">
                  {line}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
