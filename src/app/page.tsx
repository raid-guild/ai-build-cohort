import Image from "next/image";
import { Button } from "@/components/brand-ui";
import { InquiryForm } from "@/components/inquiry-form";

const steps = [
  { number: "01", title: "Choose the right work", text: "We identify real workflows, choose a useful prototype target, and agree on approved tools and data boundaries." },
  { number: "02", title: "Build together", text: "Small teams turn that workflow into a prototype in guided, hands-on build sessions with RaidGuild builders." },
  { number: "03", title: "Keep momentum", text: "Office hours between sessions help teams unblock decisions, test ideas, and improve what they have built." },
  { number: "04", title: "Show what works", text: "A demo day and handoff make the outcome visible: what works, what needs more work, and what production would require." },
];

const outcomes = [
  { title: "Working prototypes", text: "Small, testable tools for workflows your team already knows." },
  { title: "Practiced skills", text: "Hands-on experience scoping, building, evaluating, and explaining AI work." },
  { title: "A shared playbook", text: "A repeatable way to pick promising use cases and carry useful ideas forward." },
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
        <h1>Build with AI.<br /><em>Build for your work.</em></h1>
        <p className="hero-lede">Your team learns applied AI by building working prototypes for its own workflows, with hands-on guidance from RaidGuild builders.</p>
        <div className="hero-actions"><Button asChild className="button button-primary"><a href="#contact">Book an intro call <span aria-hidden="true">↗</span></a></Button><a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div>
        <p className="hero-note">A guided cohort for company teams · Remote · Scoped to your team</p>
      </div>
      <span className="hero-index" aria-hidden="true">01 / THE OFFER</span>
    </section>

    <section className="problem section-pad" aria-labelledby="problem-title">
      <div className="container problem-grid"><div className="section-label">THE PROBLEM <span>↘</span></div><div><h2 id="problem-title">Tools are easy to get.<br /><em>Building takes practice.</em></h2><p>Many teams have access to AI tools. Fewer have had the time and guidance to turn a messy, real workflow into something useful. A lecture can show possibilities. Building together reveals what the work actually needs.</p></div></div>
    </section>

    <section className="how section-pad" id="how-it-works" aria-labelledby="how-title">
      <div className="container"><div className="section-top"><p className="section-label">THE PROCESS <span>02 / 07</span></p><h2 id="how-title">From a real workflow<br />to a <em>working prototype.</em></h2><p>Each cohort follows the work your team brings, with guidance at every stage.</p></div><div className="steps">{steps.map((step) => <article className="step" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><span className="step-arrow" aria-hidden="true">↗</span></article>)}</div></div>
    </section>

    <section className="outcomes section-pad" aria-labelledby="outcomes-title"><div className="container"><p className="section-label">WHAT YOU TAKE AWAY <span>03 / 07</span></p><div className="outcome-intro"><h2 id="outcomes-title">More than a demo.<br /><em>A way to keep building.</em></h2><p>The point is useful practice on your own work. Your team leaves with tangible artifacts and a clearer way to evaluate what comes next.</p></div><div className="outcome-grid">{outcomes.map((item, index) => <article className="outcome-card" key={item.title}><span className="card-index">0{index + 1} / 03</span><span className="card-spark" aria-hidden="true">✳</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

    <section className="proof section-pad" id="proof" aria-labelledby="proof-title"><div className="container proof-grid"><div className="proof-copy"><p className="section-label">BUILT IN A COHORT <span>04 / 07</span></p><h2 id="proof-title">October’s<br /><em>Arcade Alchemy.</em></h2><p>In the October 2026 Arcade Alchemy cohort, builders made six playable games. The 46-second montage shows what hands-on work can produce in a shared learning format.</p><a className="text-link text-link-light" href="https://portal.raidguild.org/posts/october-2026-cohort-arcade-alchemy-recap" target="_blank" rel="noopener noreferrer">Read the cohort recap <span aria-hidden="true">↗</span></a></div><div className="proof-media"><video controls playsInline preload="none" poster="/images/cohort-poster.jpg" aria-label="October 2026 Arcade Alchemy cohort montage, 46 seconds"><source src="/video/cohort.mp4" type="video/mp4" />Your browser does not support video. <a href="/video/cohort.mp4">Download the montage.</a></video><p>OCTOBER 2026 / 46 SECONDS / SIX PLAYABLE GAMES</p></div></div></section>

    <section className="people section-pad" aria-labelledby="people-title"><div className="container people-grid"><p className="section-label">WHO RUNS IT <span>05 / 07</span></p><div><h2 id="people-title">Guided by people<br />who <em>build.</em></h2><p>Dekan is a RaidGuild core contributor and summoner with more than 20 years of experience building products. RaidGuild brings builders together to turn practical ideas into working software.</p><p>The cohort pairs hands-on guidance with room for your team to experiment, learn, and explain its choices.</p></div><div className="people-mark" aria-hidden="true"><Image src="/images/brand-mark.svg" alt="" width={240} height={240} /></div></div></section>

    <section className="pilot section-pad" aria-labelledby="pilot-title"><div className="container"><p className="section-label">PILOT FORMAT <span>06 / 07</span></p><h2 id="pilot-title">Shape a pilot around<br /><em>your team’s work.</em></h2><div className="pilot-facts"><div><span>FORMAT</span><strong>Remote, guided sessions</strong></div><div><span>PARTICIPANTS</span><strong>Small teams, scoped together</strong></div><div><span>LENGTH &amp; PRICE</span><strong>Scoped per team</strong></div></div><p className="pilot-note">We agree on the workflow, participant group, schedule, approved tools, and data boundaries before the pilot begins.</p></div></section>

    <section className="faq section-pad" aria-labelledby="faq-title"><div className="container faq-grid"><div><p className="section-label">THE DETAILS <span>07 / 07</span></p><h2 id="faq-title">Before we<br /><em>get started.</em></h2></div><p className="faq-copy">We start with your team and a workflow worth building for. Together, we agree on the pilot’s format, schedule, price, approved tools, and data boundaries.</p></div></section>

    <section className="contact section-pad" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><p className="section-label">START A CONVERSATION <span>↗</span></p><h2 id="contact-title">Let’s find the right<br /><em>thing to build.</em></h2><p>Tell us a little about your team and the workflow you have in mind. We’ll follow up to arrange an intro call.</p><p className="contact-email">Prefer email? <a href="mailto:clerics@raidguild.org">clerics@raidguild.org</a></p></div><InquiryForm /></div></section>
    <footer className="footer"><div className="container footer-inner"><a className="brand" href="#top"><Image src="/images/symbol-black.svg" alt="" width={30} height={30} /><span>RAIDGUILD</span></a><p>A RaidGuild practice</p><a href="https://raidguild.org" target="_blank" rel="noopener noreferrer">Back to RaidGuild <span aria-hidden="true">↗</span></a></div></footer>
  </main>;
}
