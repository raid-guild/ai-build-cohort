import Image from "next/image";
import { Button } from "@/components/brand-ui";
import { InquiryForm } from "@/components/inquiry-form";

const steps = [
  { number: "01", title: "Week 1: explore what’s possible", text: "The first two-hour workshop introduces your approved tools and practical examples. Ask basic questions, try things out, and get comfortable with what AI can help you do." },
  { number: "02", title: "Week 1: pick a problem and build", text: "In a second two-hour workshop, brainstorm useful workflows and start a prototype, on your own or in a small group. Begin with a manageable task: a department recap, inbox triage, or recurring reporting." },
  { number: "03", title: "Weeks 2–4: build with support", text: "Explore and build between sessions. Three weekly group calls give you space to share progress, understand problems, and work through blockers with RaidGuild mentors and each other." },
  { number: "04", title: "Finish with a demo day", text: "A separate final session celebrates the work. Show your prototype, share what you learned, and capture what’s useful and what to try next. Unfinished experiments are welcome too." },
];

const outcomes = [
  { title: "Working prototypes", text: "Small, testable tools for daily work, whether they help one person or could be useful across a team." },
  { title: "Practiced skills", text: "Experience choosing a useful problem, building with approved tools, evaluating the result, and explaining how it works." },
  { title: "A shared playbook", text: "A record of what each prototype does, the tools and data it uses, who it could help, and the next steps." },
];

export default function Home() {
  return <main>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="RaidGuild AI Build Cohort, back to top">
        <Image src="/images/symbol-black.svg" alt="" width={38} height={38} />
        <span>RAIDGUILD<span className="brand-separator"> / </span><span className="brand-offer">AI BUILD COHORT</span></span>
      </a>
      <nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#proof">Proof</a><a className="nav-cta" href="#contact">Book an intro call <span aria-hidden="true">↗</span></a></nav>
    </header>

    <section className="hero" id="top" aria-labelledby="main-content">
      <div className="hero-art" aria-hidden="true"><Image src="/images/spear-applied-ai-v1.webp" alt="" fill priority sizes="(max-width: 800px) 100vw, 52vw" /></div>
      <div className="hero-content" id="main-content">
        <p className="eyebrow"><span className="eyebrow-dot" /> RAIDGUILD / APPLIED AI</p>
        <p className="hero-practice">A RaidGuild practice</p>
        <h1><span className="hero-promise">Build with AI.</span><br /><em>Build for your work.</em></h1>
        <p className="hero-lede">A guided month to get comfortable with AI and build useful prototypes for your own work, with practical workshops and support from RaidGuild builders.</p>
        <div className="hero-actions"><Button asChild className="button button-primary"><a href="#contact">Book an intro call <span aria-hidden="true">↗</span></a></Button><a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div>
        <p className="hero-note">One month · 4–8 participants · Six sessions · Starting at $5,000</p>
      </div>
      <span className="hero-index" aria-hidden="true">01 / THE OFFER</span>
    </section>

    <section className="problem section-pad" aria-labelledby="problem-title">
      <div className="container problem-grid"><div className="section-label">THE PROBLEM <span>↘</span></div><div><h2 id="problem-title">Tools are easy to get.<br /><em>Building takes practice.</em></h2><p>Your team may already be experimenting with AI, but knowing what to use and where to start can be difficult. Guided practice helps people move past the intimidation, try useful ideas within agreed boundaries, and share what works.</p></div></div>
    </section>

    <section className="how section-pad" id="how-it-works" aria-labelledby="how-title">
      <div className="container"><div className="section-top"><p className="section-label">THE PROCESS <span>02 / 07</span></p><h2 id="how-title">From a real workflow<br />to a <em>working prototype.</em></h2><p>Two kickoff workshops, three weekly support calls, and a final demo day. Bring your everyday work; leave room to explore between sessions.</p></div><div className="steps">{steps.map((step) => <article className="step" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><span className="step-arrow" aria-hidden="true">↗</span></article>)}</div></div>
    </section>

    <section className="outcomes section-pad" aria-labelledby="outcomes-title"><div className="container"><p className="section-label">WHAT YOU TAKE AWAY <span>03 / 07</span></p><div className="outcome-intro"><h2 id="outcomes-title">More than a demo.<br /><em>A way to keep building.</em></h2><p>Make something useful and make it understandable. Your team leaves with prototypes, practiced skills, and experiments that others can learn from and build on.</p></div><div className="outcome-grid">{outcomes.map((item, index) => <article className="outcome-card" key={item.title}><span className="card-index">0{index + 1} / 03</span><span className="card-spark" aria-hidden="true">✳</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

    <section className="proof section-pad" id="proof" aria-labelledby="proof-title"><div className="container proof-grid"><div className="proof-copy"><p className="section-label">WHERE THE FORMAT COMES FROM <span>04 / 07</span></p><h2 id="proof-title">Built in our<br /><em>own community.</em></h2><p>This format grows out of RaidGuild’s own community cohorts: learn new tools, build a project, and share what you discover. In October 2026, Arcade Alchemy participants built six playable games. This pilot brings that shared-building approach to your team’s workflows.</p><a className="text-link text-link-light" href="https://portal.raidguild.org/posts/october-2026-cohort-arcade-alchemy-recap" target="_blank" rel="noopener noreferrer">Read the cohort recap <span aria-hidden="true">↗</span></a></div><div className="proof-media"><video controls playsInline preload="none" poster="/images/october-cohort-recap-poster.jpg" aria-label="October 2026 Arcade Alchemy cohort montage, 46 seconds"><source src="/video/october-cohort-recap.mp4" type="video/mp4" />Your browser does not support video. <a href="/video/october-cohort-recap.mp4">Download the montage.</a></video><p>OCTOBER 2026 / 46 SECONDS / SIX PLAYABLE GAMES</p></div></div></section>

    <section className="people section-pad" aria-labelledby="people-title"><div className="container people-grid"><p className="section-label">WHO RUNS IT <span>05 / 07</span></p><div><h2 id="people-title">Guided by people<br />who <em>build.</em></h2><p>Dekan is a RaidGuild core contributor and summoner with more than 20 years of experience building products. RaidGuild brings builders together to turn practical ideas into working software.</p><p>A lead host guides the month, with a second RaidGuild mentor joining selected sessions. We help people get started, work through questions, and learn from each other.</p></div><div className="people-mark" aria-hidden="true"><Image src="/images/brand-mark.svg" alt="" width={240} height={240} /></div></div></section>

    <section className="pilot section-pad" aria-labelledby="pilot-title"><div className="container"><p className="section-label">PILOT FORMAT <span>06 / 07</span></p><h2 id="pilot-title">One month.<br /><em>A useful place to start.</em></h2><div className="pilot-facts"><div><span>THE GROUP</span><strong>4–8 participants</strong></div><div><span>THE MONTH</span><strong>Six guided sessions</strong></div><div><span>STARTING PRICE</span><strong>$5,000 per team</strong></div></div><p className="pilot-note">Includes preparation, two two-hour workshops in week one, three weekly support calls, and a separate demo day at the end of week four. Allow time to explore and build between sessions.</p><p className="pilot-note">Remote by default; in person where it makes sense. We agree on call lengths and the schedule up front. Extra sessions, travel, and production development are scoped separately.</p></div></section>

    <section className="faq section-pad" aria-labelledby="faq-title"><div className="container faq-grid"><div><p className="section-label">THE DETAILS <span>07 / 07</span></p><h2 id="faq-title">Before we<br /><em>get started.</em></h2></div><p className="faq-copy">We begin with a consultation with your team lead: what tools, assistants, and data connections people already use, what’s available, and what’s allowed. Together, we identify promising workflows and prepare the workshops so participants can start building quickly.</p></div></section>

    <section className="contact section-pad" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><p className="section-label">START A CONVERSATION <span>↗</span></p><h2 id="contact-title">Let’s find the right<br /><em>thing to build.</em></h2><p>Tell us who would take part and what their day-to-day work looks like. A rough idea is enough; we’ll explore useful starting points together on an intro call.</p><p className="contact-email">Prefer email? <a href="mailto:clerics@raidguild.org">clerics@raidguild.org</a></p></div><InquiryForm /></div></section>
    <footer className="footer"><div className="container footer-inner"><a className="brand" href="#top"><Image src="/images/symbol-black.svg" alt="" width={30} height={30} /><span>RAIDGUILD</span></a><p>A RaidGuild practice</p><a href="https://raidguild.org" target="_blank" rel="noopener noreferrer">Back to RaidGuild <span aria-hidden="true">↗</span></a></div></footer>
  </main>;
}
