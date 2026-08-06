import { ImagePlaceholder } from "./ImagePlaceholder";

// Sección de mockup del producto. Sin título — la imagen habla sola.
function IconPhoneDownload({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v7m0 0l-2.5-2.5M12 15l2.5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ProductMockup() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-lg flex-col items-center">
        <ImagePlaceholder
          src="/images/mockup-menu-listo.webp"
          alt="Mockup del Método Menú Listo: tablet, celular, libros y tarjetas con el plan de 30 días, lista de compras y recetas"
          label="Mockup del producto"
          className="w-[85%] sm:w-full"
          aspect="aspect-square"
        />

        <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-brown-soft">
          <IconPhoneDownload className="h-5 w-5 shrink-0 text-sage" />
          Acceso digital inmediato desde tu celular
        </p>
      </div>
    </section>
  );
}
