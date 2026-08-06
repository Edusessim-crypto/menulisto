import { objections } from "../data/offer";

export function ObjectionBreaker() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl">
        <div className="space-y-8">
          {objections.map((o) => (
            <div key={o.question}>
              <p className="text-base font-bold italic text-brown sm:text-lg">
                “{o.question}”
              </p>
              <p className="mt-2 text-base leading-relaxed text-brown-soft">
                {o.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
