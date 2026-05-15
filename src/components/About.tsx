const TEAM = [
  {
    initials: 'CF',
    name: 'Cristian Fernando Espinosa',
    role: 'Founder, CEO & Business Strategy',
  },
  {
    initials: 'BJ',
    name: 'Bryan Jimenez Calambas',
    role: 'Chief AI Officer (CAIO)',
  },
  {
    initials: 'MG',
    name: 'Maier Alejandro Gonzalez',
    role: 'Chief Marketing Officer (CMO)',
  },
] as const

const PILLARS = ['IA + Automatización', 'Marketing Estratégico', 'Tecnología aplicada'] as const

export default function About() {
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
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TEAM.map(member => (
            <article
              key={member.name}
              className="flex flex-col items-center rounded-lg border border-orbytal-graphite bg-orbytal-carbon p-6 text-center md:items-start md:text-left"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-orbytal-red text-lg font-bold text-orbytal-white"
                aria-hidden
              >
                {member.initials}
              </div>
              <h4 className="mt-4 text-base font-bold text-orbytal-white">{member.name}</h4>
              <p className="mt-1 text-sm text-orbytal-gray-metallic">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
