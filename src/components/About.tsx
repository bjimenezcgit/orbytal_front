import { useState } from 'react'
import TeamMemberModal, { type TeamMemberProfile } from '@/components/TeamMemberModal'



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
      </div>

      <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </section>
  )
}
