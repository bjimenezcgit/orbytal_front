import { useState } from 'react'
import TeamMemberModal, { type TeamMemberProfile } from '@/components/TeamMemberModal'

const TEAM: TeamMemberProfile[] = [
  {
    name: 'Cristian Fernando Espinosa',
    role: 'Founder, CEO & Business Strategy',
    photo: '/imgs/IMG_3620.png',
    intro:
      'Profesional en tecnología con más de 12 años de experiencia liderando iniciativas de transformación digital, automatización de procesos, inteligencia artificial y analítica de datos.',
    approach:
      'Ayudo a las empresas a convertir procesos manuales en operaciones más eficientes, escalables y orientadas a resultados mediante el uso estratégico de la tecnología.',
    capabilities: [
      'Automatización de procesos (RPA)',
      'Inteligencia Artificial aplicada al negocio',
      'Transformación Digital',
      'Analítica de Datos y Power BI',
      'Gobierno y Control de Tecnología',
      'ERP Empresariales (SAP, SIESA y SIIGO)',
      'Soluciones Microsoft Power Platform',
    ],
    contributions: [
      'Identificación de oportunidades de mejora operativa',
      'Diseño de procesos más eficientes y escalables',
      'Implementación de soluciones de automatización',
      'Generación de indicadores para la toma de decisiones',
      'Acompañamiento integral desde el diagnóstico hasta la puesta en producción',
    ],
    objective:
      'Mi objetivo es ayudar a Rclean a optimizar su operación, mejorar la experiencia de sus clientes y construir una base tecnológica que soporte su crecimiento.',
    linkedIn: 'https://www.linkedin.com/in/cristianedc/',
  },
  {
    name: 'Bryan Jimenez Calambas',
    role: 'Chief AI Officer (CAIO)',
    photo: '/imgs/IMG_3621.png',
    intro:
      'Profesional en Análisis y Desarrollo de Sistemas de Información, con experiencia en el desarrollo de aplicaciones web y móviles, análisis de requerimientos, modelado de procesos y documentación técnica. Especializado en la construcción de soluciones Full Stack utilizando tecnologías modernas de frontend, backend y servicios en la nube.',
    approach:
      'Ayudo a las compañías a transformar sus necesidades de negocio en soluciones tecnológicas eficientes, escalables y orientadas a resultados.',
    capabilities: [
      'Desarrollo Full Stack con React, Angular y Next.js. APIs y servicios backend con Node.js, Express y NestJS, aplicaciones móviles con React Native',
      'Diseño y gestión de bases de datos MySQL, PostgreSQL, MongoDB y DynamoDB.',
      'Arquitecturas basadas en servicios en la nube (AWS y Azure).',
      'Diseño de soluciones bajo patrones MVC y UML.',
      'Implementación de interfaces modernas y responsivas con TailwindCSS, Bootstrap y Material UI.',
    ],
    contributions: [
      'Análisis y entendimiento de requerimientos de negocio.',
      'Diseño y desarrollo de soluciones tecnológicas escalables.',
      'Optimización de procesos mediante herramientas digitales.',
      'Construcción de aplicaciones web y móviles de alto rendimiento e integración de servicios, APIs y bases de datos.',
    ],
    objective:
      'Mi objetivo es contribuir al crecimiento de cada proyecto mediante el desarrollo de soluciones tecnológicas innovadoras, eficientes y sostenibles.',
  },
]

const PILLARS = ['IA + Automatización', 'Marketing Estratégico', 'Tecnología aplicada'] as const

export default function About() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberProfile | null>(null)

  return (
    <section
      id="nosotros"
      className="scroll-mt-24 bg-transparent py-20 md:py-28"
      aria-labelledby="nosotros-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2
          id="nosotros-heading"
          className="text-3xl font-bold uppercase tracking-tight text-orbytal-white md:text-4xl"
        >
          ¿Qué es Orbytal?
        </h2>

        <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-orbytal-gray-metallic md:text-base">
          <p>
            Orbytal es un ecosistema digital inteligente. Nacimos para ayudar a empresas y marcas a crecer
            mediante Inteligencia Artificial, Automatización Digital, Marketing Estratégico y Tecnología
            aplicada a objetivos reales de negocio.
          </p>
          <p>
            No somos una agencia tradicional. Somos un aliado estratégico de transformación empresarial en la
            era de la inteligencia artificial.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-3" aria-label="Pilares">
          {PILLARS.map(label => (
            <li
              key={label}
              className="rounded-full border border-orbytal-graphite bg-orbytal-carbon px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orbytal-white md:text-sm"
            >
              {label}
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-xs font-bold uppercase tracking-[0.25em] text-orbytal-gray-metallic">
          Equipo fundador
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TEAM.map(member => (
            <div key={member.name} className="group relative">
              <div
                className="pointer-events-none absolute -inset-2 rounded-xl bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-orbytal-red)_24%,transparent),transparent_70%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <button
                type="button"
                onClick={() => setSelectedMember(member)}
                className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-orbytal-graphite bg-orbytal-carbon text-left transition duration-300 group-hover:border-orbytal-red"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-orbytal-carbon via-orbytal-carbon/40 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h4 className="text-base font-bold text-orbytal-white md:text-lg">{member.name}</h4>
                  <p className="mt-1 text-sm text-orbytal-gray-metallic">{member.role}</p>
                  <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-orbytal-red opacity-70 transition group-hover:opacity-100">
                    Ver perfil
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </section>
  )
}
