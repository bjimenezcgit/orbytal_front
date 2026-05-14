const footerLink =
  'text-xs font-medium uppercase tracking-widest text-orbytal-gray-metallic transition hover:text-orbytal-white md:text-sm'

function IconLinkedIn(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2h.1c.5-1 1.8-2.4 3.8-2.4 4.1 0 4.8 2.7 4.8 6.2V23h-4v-6.5c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V23h-4V8z" />
    </svg>
  )
}

function IconInstagram(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} aria-hidden>
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 2.5A4.5 4.5 0 0 0 7.5 11 4.5 4.5 0 0 0 12 15.5 4.5 4.5 0 0 0 16.5 11 4.5 4.5 0 0 0 12 6.5zm0 2A2.5 2.5 0 0 1 14.5 11 2.5 2.5 0 0 1 12 13.5 2.5 2.5 0 0 1 9.5 11 2.5 2.5 0 0 1 12 8.5zM17.8 6.3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
  )
}

function IconX(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} aria-hidden>
      <path d="M18.9 2h3.7l-8 9.1L23 22h-7.4l-5.8-7.6L5.8 22H2l8.6-9.8L2 2h7.6l5.2 6.9L18.9 2zm-1.3 18h2L7.4 4H5l12.6 16z" />
    </svg>
  )
}

export default function Footer() {
  const iconClass = 'h-5 w-5 text-orbytal-gray-metallic transition hover:text-orbytal-red'

  return (
    <footer className="border-t border-orbytal-graphite bg-orbytal-black py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <p className="text-lg font-bold uppercase tracking-[0.18em] text-orbytal-white">Orbytal</p>
          <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-orbytal-gray-metallic">
            Digital Group
          </p>
          <p className="mt-4 max-w-xs text-sm text-orbytal-gray-metallic">
            Building Intelligent Digital Growth
          </p>
        </div>

        <nav className="flex flex-col gap-3 md:items-end" aria-label="Pie de página">
          <a href="#servicios" className={footerLink}>
            Servicios
          </a>
          <a href="#nosotros" className={footerLink}>
            Nosotros
          </a>
          <a href="#contacto" className={footerLink}>
            Contacto
          </a>
        </nav>

        <div className="flex flex-row items-center gap-5 md:flex-col md:items-end">
          <span className="sr-only">Redes sociales</span>
          <a href="#" className={iconClass} aria-label="LinkedIn (placeholder)">
            <IconLinkedIn className="h-5 w-5" />
          </a>
          <a href="#" className={iconClass} aria-label="Instagram (placeholder)">
            <IconInstagram className="h-5 w-5" />
          </a>
          <a href="#" className={iconClass} aria-label="X (placeholder)">
            <IconX className="h-5 w-5" />
          </a>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl px-4 text-center text-xs text-orbytal-gray-metallic md:px-6">
        © 2026 Orbytal Digital Group. Todos los derechos reservados.
      </p>
    </footer>
  )
}
