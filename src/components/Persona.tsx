import { persona } from "../data/offer";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function Persona() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
        <ImagePlaceholder
          src={persona.photoUrl}
          alt={`Foto de ${persona.name}, creadora del material`}
          label="Foto"
          className="w-40 shrink-0 sm:w-48"
          aspect="aspect-square"
          rounded="rounded-full"
        />

        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold sm:text-2xl">{persona.name}</h2>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-brown-soft sm:text-lg">
            {persona.bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {persona.reviewedBy && (
            <p className="mt-4 text-sm font-semibold text-sage">
              Contenido revisado por {persona.reviewedBy}, nutricionista
              infantil.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
