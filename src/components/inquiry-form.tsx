"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button, Input, Label, Textarea } from "@raidguild/brand-system/components";

type Status = "idle" | "sending" | "sent" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const confirmation = useRef<HTMLDialogElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === "sent" && !confirmation.current?.open) confirmation.current?.showModal();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "We could not send your request. Please email clerics@raidguild.org.");
      form.reset();
      setStatus("sent");
      setMessage("Thanks — your request is on its way. We’ll follow up to arrange an intro call.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send your request. Please email clerics@raidguild.org.");
    }
  }

  return <form className="inquiry-form" onSubmit={submit} aria-label="Request an intro call">
    <div className="form-head"><span>INTRO REQUEST</span><span>01—06</span></div>
    <div className="form-row"><div><Label htmlFor="name">Full name</Label><Input id="name" name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></div><div><Label htmlFor="email">Work email</Label><Input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></div></div>
    <div className="form-row"><div><Label htmlFor="company">Company</Label><Input id="company" name="company" autoComplete="organization" required maxLength={160} placeholder="Company name" /></div><div><Label htmlFor="role">Your role</Label><Input id="role" name="role" autoComplete="organization-title" required maxLength={120} placeholder="What you do" /></div></div>
    <div><Label htmlFor="teamSize">Expected participants</Label><Input id="teamSize" name="teamSize" required maxLength={80} placeholder="e.g. 6 people" /></div>
    <div><Label htmlFor="workflow">What would you like your team to build?</Label><Textarea id="workflow" name="workflow" required maxLength={2000} rows={4} placeholder="A recurring task, bottleneck, or first idea is enough." /></div>
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <Button ref={submitButton} type="submit" className="button button-primary form-submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request an intro call"}<span aria-hidden="true">↗</span></Button>
    <p className="form-fineprint">We’ll use these details only to follow up about your request.</p>
    <p className={`form-status ${status}`} role={status === "error" ? "alert" : "status"} aria-live="polite">{message}</p>
    <dialog ref={confirmation} className="inquiry-success" aria-labelledby="inquiry-success-title" aria-describedby="inquiry-success-description" onClose={() => submitButton.current?.focus()}>
      <button type="button" className="success-close" aria-label="Close confirmation" autoFocus onClick={() => confirmation.current?.close()}>×</button>
      <span className="success-check" aria-hidden="true">✓</span>
      <p className="success-eyebrow">INTRO REQUEST SENT</p>
      <h2 id="inquiry-success-title">Request<br /><em>received.</em></h2>
      <p id="inquiry-success-description">Thanks for getting in touch. We’ll follow up by email to arrange an intro call.</p>
      <p className="success-next">While you’re here, meet the Guild.</p>
      <div className="success-links">
        <a className="button button-primary" href="https://raidguild.org" target="_blank" rel="noopener noreferrer">Explore RaidGuild <span aria-hidden="true">↗</span></a>
        <a className="button success-x" href="https://x.com/raidguild" target="_blank" rel="noopener noreferrer">Follow on X <span aria-hidden="true">↗</span></a>
      </div>
      <button type="button" className="success-back" onClick={() => confirmation.current?.close()}>Back to the page</button>
    </dialog>
  </form>;
}
