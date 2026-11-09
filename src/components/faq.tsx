"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@raidguild/brand-system/components";

const questions = [
  { question: "Is this production software?", answer: "The cohort produces prototypes and a practical path forward. Production work needs its own decisions about security, reliability, ownership, and maintenance." },
  { question: "Which AI tools will we use?", answer: "We work within your approved stack and agree on tools before building starts." },
  { question: "What about our company data?", answer: "We agree on data boundaries up front. The cohort can work with approved, synthetic, or sanitized data according to your policies." },
  { question: "How does a pilot get scoped?", answer: "We start with an intro conversation about your team, a candidate workflow, participant group, and schedule, then propose a format and price." },
];

export function Faq() {
  return <Accordion type="single" collapsible className="faq-list">{questions.map((item, index) =>
    <AccordionItem key={item.question} value={`question-${index}`}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent><p>{item.answer}</p></AccordionContent>
    </AccordionItem>
  )}</Accordion>;
}
