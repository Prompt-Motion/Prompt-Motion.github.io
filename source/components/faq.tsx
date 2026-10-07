import { FAQS } from "@/lib/seo";

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="mt-16 border-t border-border pt-10">
      <h2 id="faq-heading" className="text-lg font-medium tracking-tight">
        Prompt Motion FAQ
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {FAQS.map((item) => (
          <article key={item.question}>
            <h3 className="text-sm font-medium">{item.question}</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
