import { faqItems } from "../data/offer";
import { IconChevronDown } from "./Icons";

export function Faq() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Preguntas frecuentes
        </h2>

        <div className="mt-10 space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] open:shadow-[var(--shadow-card)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-brown marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <IconChevronDown className="h-5 w-5 shrink-0 text-sage transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-brown-soft sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
