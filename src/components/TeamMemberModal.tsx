import { useEffect } from 'react'

export type TeamMemberProfile = {
  name: string
  role: string
  photo: string
  intro: string
  approach: string
  capabilities: string[]
  contributions: string[]
  objective: string
  linkedIn?: string
}

type TeamMemberModalProps = {
  member: TeamMemberProfile | null
  onClose: () => void
}

function IconLinkedIn(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2h.1c.5-1 1.8-2.4 3.8-2.4 4.1 0 4.8 2.7 4.8 6.2V23h-4v-6.5c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V23h-4V8z" />
    </svg>
  )
}

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  useEffect(() => {
    if (!member) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [member, onClose])

  if (!member) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-orbytal-black/80 backdrop-blur-sm"
        aria-label="Cerrar modal"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-orbytal-graphite bg-orbytal-carbon shadow-[0_24px_80px_color-mix(in_srgb,var(--color-orbytal-black)_60%,transparent)]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-orbytal-graphite px-6 py-5">
          <div className="min-w-0 pr-2">
            <h3 id="team-modal-title" className="text-lg font-bold text-orbytal-white md:text-xl">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-orbytal-red">{member.role}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-sm p-1 text-orbytal-gray-metallic transition hover:text-orbytal-white"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5 pb-8 text-sm leading-relaxed text-orbytal-gray-metallic md:text-base">
          <p>{member.intro}</p>

          <h4 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-orbytal-white">Mi enfoque</h4>
          <p className="mt-2">{member.approach}</p>

          <h4 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-orbytal-white">Capacidades en</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {member.capabilities.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h4 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-orbytal-white">
            Lo que aporto a este proyecto
          </h4>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {member.contributions.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-6 font-semibold text-orbytal-white">{member.objective}</p>

          {member.linkedIn ? (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orbytal-gray-metallic transition hover:text-orbytal-red"
            >
              <IconLinkedIn className="h-5 w-5" />
              LinkedIn
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
