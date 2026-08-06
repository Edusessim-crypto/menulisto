import { legal } from "../data/offer";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cream px-4 pb-28 pt-12 text-center sm:px-6 sm:pb-12">
      <div className="mx-auto max-w-2xl">
        <p className="text-base font-bold text-brown">{legal.productName}</p>

        <nav className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-brown-soft">
          <a href={legal.termsUrl} className="hover:text-sage">
            Términos de uso
          </a>
          <a href={legal.privacyUrl} className="hover:text-sage">
            Política de privacidad
          </a>
          <a href={legal.refundUrl} className="hover:text-sage">
            Política de reembolso
          </a>
          <a href={`mailto:${legal.contactEmail}`} className="hover:text-sage">
            Contacto
          </a>
        </nav>

        <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-brown-soft/80">
          {legal.educationalNotice}
        </p>

        <p className="mt-6 text-xs text-brown-soft/70">
          © {year} {legal.copyrightHolder}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
