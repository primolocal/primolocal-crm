"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why is the application required?",
    answer:
      "We're not taking clients — we're selecting 10 partners. The application ensures we only work with contractors who are serious about growth and a good fit for our partnership model.",
  },
  {
    question: "What happens if it doesn't work?",
    answer:
      "The 30-day Prove-It period is completely free. If we don't hit the agreed-upon metrics by Day 30, you walk away with zero obligation and zero charge. No hard feelings.",
  },
  {
    question: "Why $10K/year? That's expensive.",
    answer:
      "One emergency HVAC job pays for the entire year. If Piper captures four jobs you would've missed — and at 15 missed calls a week, she will — the system has paid for itself. After that, it's pure upside. And because this is Founding Partner pricing, $10K is locked forever. When we open the next cohort, the price goes up. You're not paying for software. You're paying for the jobs you would've lost without it.",
  },
  {
    question: "Are payment plans available?",
    answer:
      "Yes. Two options for the annual commitment: (1) Pay in full: $10,000 upfront, locked forever as a Founding Partner. (2) Payment plan: $5,000 down, $5,000 due in 90 days. This gives you 6 months at the locked rate before the second payment, during which you'll see the full value of the system in your business. If you'd rather not commit annually, the month-to-month option at $1,000/month is available after the 30-day Prove-It period.",
  },
  {
    question: "What if I'm not ready to commit for a full year?",
    answer:
      "Month-to-month at $1,000/month is available after Day 30. Cancel anytime. You just don't get the Founding Partner lock-in pricing.",
  },
  {
    question: "How fast can I get set up?",
    answer:
      "72 hours after LOI signature. Piper is live, your Google Business Profile is optimized, and review automation is running. You'll start seeing results within the first week.",
  },
  {
    question: "What if I don't hit the Day 30 metrics?",
    answer:
      "No charge, no hard feelings. If the system doesn't capture the jobs we said it would, that's our problem, not yours. The Prove-It period is genuinely risk-free — that's what makes this a partnership, not a vendor relationship.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "The first 30 days are completely free, so there's nothing to refund. After you commit to the annual partnership, you've already seen the results firsthand — the decision to commit is made after you've watched Piper book jobs on your calendar for a month.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "Currently focused on HVAC, plumbing, electrical, and roofing contractors in the Houston area. We're starting narrow to ensure exceptional results before expanding.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-white" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b">
              <AccordionTrigger className="text-left text-lg font-medium text-navy hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
