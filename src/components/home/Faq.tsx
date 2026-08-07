import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faq, home } from "@/content";
import { cn } from "@/lib/cn";

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-cream py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow={home.faqEyebrow}
          title={home.faqHeading}
          align="center"
        />
        <h2 id="faq-heading" className="sr-only">
          Frequently asked questions
        </h2>
        <Reveal className="mt-10 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {faq.map((item) => (
            <FaqItem key={item.question} {...item} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-base font-semibold transition-colors duration-200 ease-glass hover:bg-cream/60 hover:text-brass-strong focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brass sm:px-6",
            open ? "text-brass-strong" : "text-ink",
          )}
        >
          {question}
          <ChevronDown
            aria-hidden
            className={cn(
              "size-5 shrink-0 text-brass transition-transform duration-300 ease-glass",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-label={question}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">{answer}</p>
        </div>
      </div>
    </div>
  );
}
