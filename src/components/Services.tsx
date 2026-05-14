import { useRef } from 'react'
import { animateStaggerFadeScale, useInViewOnce } from '@/hooks/useAnime'

type ServiceItem = {
  icon: string
  title: string
  description: string
}

const SERVICES: ServiceItem[] = [
  {
    icon: '📈',
    title: 'Marketing Digital & Growth',
    description:
      'Community Manager, contenido, SEO/SEM, Meta Ads, Google Ads, analítica.',
  },
  {
    icon: '🛒',
    title: 'E-commerce & Ventas Digitales',
    description: 'Tiendas online, integración de pagos, optimización de conversión.',
  },
  {
    icon: '🤖',
    title: 'Automatización & CRM',
    description: 'HubSpot, Zoho, funnels de conversión, seguimiento de leads.',
  },
  {
    icon: '💻',
    title: 'Desarrollo Tecnológico',
    description: 'Webs corporativas, apps móviles, software a medida, integraciones.',
  },
  {
    icon: '🧠',
    title: 'Inteligencia Artificial',
    description: 'Agentes virtuales, chatbots IA, automatización de atención y ventas.',
  },
  {
    icon: '📊',
    title: 'Data & Business Intelligence',
    description: 'Dashboards en tiempo real, métricas, decisiones basadas en datos.',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useInViewOnce(sectionRef, () => {
    const cards = sectionRef.current?.querySelectorAll('[data-service-card]')
    if (cards?.length) void animateStaggerFadeScale(cards)
  })

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="scroll-mt-24 bg-orbytal-black py-20 md:py-28"
      aria-labelledby="servicios-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2
          id="servicios-heading"
          className="text-3xl font-bold uppercase tracking-tight text-orbytal-white md:text-4xl"
        >
          Nuestros Servicios
        </h2>
        <p className="mt-4 max-w-3xl text-sm font-normal normal-case text-orbytal-gray-metallic md:text-base">
          No solo gestionamos presencia digital. Construimos sistemas inteligentes de crecimiento.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(s => (
            <article
              key={s.title}
              data-service-card
              className="group flex flex-col rounded-lg border border-orbytal-graphite bg-orbytal-carbon p-6 opacity-0 shadow-none transition duration-300 hover:border-orbytal-red hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-orbytal-red)_12%,transparent)]"
            >
              <div className="text-2xl" aria-hidden>
                {s.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold uppercase tracking-wide text-orbytal-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-orbytal-gray-metallic">{s.description}</p>
            </article>
          ))}

          <article
            data-service-card
            className="group relative col-span-1 flex flex-col overflow-hidden rounded-lg border border-orbytal-graphite bg-orbytal-carbon p-8 opacity-0 transition duration-300 hover:border-orbytal-red md:col-span-2 lg:col-span-3"
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orbytal-red to-orbytal-red-dark opacity-80"
              aria-hidden
            />
            <div className="pl-4">
              <h3 className="text-xl font-bold uppercase tracking-wide text-orbytal-white">
                Consultoría en Transformación Digital
              </h3>
              <p className="mt-2 text-sm text-orbytal-gray-metallic md:text-base">
                Diagnóstico empresarial · Roadmap digital · Estrategia tecnológica
              </p>
              <p className="mt-4 text-sm italic text-orbytal-red">El servicio de mayor valor estratégico</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
