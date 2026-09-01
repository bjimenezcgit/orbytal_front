import { useRef } from "react";
import { animateStaggerFadeScale, useInViewOnce } from "@/hooks/useAnime";

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  highlights?: string[];
  tagline?: string;
};

const SERVICES: ServiceItem[] = [
  {
    icon: "📈",
    title: "Marketing Digital & Growth",
    description:
      "Estrategias integrales de crecimiento que conectan marca, contenido y conversión.",
    highlights: [
      "Community Manager, contenido y producción audiovisual",
      "SEO, SEM y campañas en Meta Ads y Google Ads",
      "E-commerce: tiendas online, pagos y optimización de conversión",
      "CRM y automatización comercial: HubSpot, Zoho, funnels y leads",
    ],
    tagline: "No solo gestionamos redes, generamos crecimiento medible.",
  },
  {
    icon: "💻",
    title: "Desarrollo Tecnológico",
    description:
      "Soluciones a medida que soportan la operación y el crecimiento del negocio.",
    highlights: [
      "Páginas web corporativas y e-commerce",
      "Aplicaciones móviles y software a la medida",
      "Integraciones entre sistemas",
    ],
    tagline: "Creamos soluciones tecnológicas que impulsan tu negocio.",
  },
  {
    icon: "🤖",
    title: "Inteligencia Artificial & Automatización",
    description:
      "Sistemas inteligentes que optimizan atención, ventas y procesos internos.",
    highlights: [
      "Agentes virtuales y chatbots avanzados con IA",
      "Automatización de procesos empresariales",
      "Integración con CRM, WhatsApp y redes sociales",
    ],
    tagline: "Reducimos costos operativos y aumentamos la eficiencia.",
  },
  {
    icon: "📊",
    title: "Data & Business Intelligence",
    description:
      "Visibilidad en tiempo real para decisiones estratégicas basadas en datos.",
    highlights: [
      "Dashboards en tiempo real",
      "Análisis de datos de clientes y métricas de rendimiento",
      "Toma de decisiones basada en datos",
    ],
    tagline: "Te posicionamos como empresa estratégica, no solo operativa.",
  },
];

const CONSULTING: ServiceItem = {
  icon: "🎯",
  title: "Consultoría en Transformación Digital",
  description:
    "Diagnóstico empresarial, roadmap digital, optimización de procesos y estrategia tecnológica.",
  tagline: "El servicio de mayor valor estratégico",
};

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article
      data-service-card
      className="group flex h-full flex-col rounded-lg border border-orbytal-graphite bg-orbytal-carbon p-6 opacity-0 shadow-none transition duration-300 hover:border-orbytal-red hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-orbytal-red)_12%,transparent)]"
    >
      <div className="text-2xl" aria-hidden>
        {service.icon}
      </div>
      <h3 className="mt-4 text-lg font-bold uppercase tracking-wide text-orbytal-white">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-orbytal-gray-metallic">
        {service.description}
      </p>
      {service.highlights?.length ? (
        <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-orbytal-gray-metallic">
          {service.highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orbytal-red"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1" aria-hidden />
      )}
      {service.tagline ? (
        <p className="mt-4 pt-2 text-xs italic text-orbytal-red md:text-sm">
          {service.tagline}
        </p>
      ) : null}
    </article>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useInViewOnce(sectionRef, () => {
    const cards = sectionRef.current?.querySelectorAll("[data-service-card]");
    if (cards?.length) void animateStaggerFadeScale(cards);
  });

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="scroll-mt-24 bg-transparent pt-12 pb-20 md:pt-16 md:pb-28"
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
          No solo gestionamos presencia digital. Construimos sistemas
          inteligentes de crecimiento.
        </p>

        <div className="mt-12 space-y-5">
          <article
            data-service-card
            className="group relative flex flex-col overflow-hidden rounded-lg border border-orbytal-graphite bg-orbytal-carbon p-8 opacity-0 transition duration-300 hover:border-orbytal-red"
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-linear-to-b from-orbytal-red to-orbytal-red-dark opacity-80"
              aria-hidden
            />
            <div className="pl-4">
              <div className="text-2xl" aria-hidden>
                {CONSULTING.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold uppercase tracking-wide text-orbytal-white">
                {CONSULTING.title}
              </h3>
              <p className="mt-2 text-sm text-orbytal-gray-metallic md:text-base">
                {CONSULTING.description}
              </p>
              {CONSULTING.tagline ? (
                <p className="mt-4 text-sm italic text-orbytal-red">
                  {CONSULTING.tagline}
                </p>
              ) : null}
            </div>
          </article>

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
