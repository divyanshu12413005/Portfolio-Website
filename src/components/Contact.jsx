import { useState } from "react";
import { useReveal } from "../hooks/useReveal.js";

const initialForm = { name: "", email: "", subject: "", message: "", botcheck: "" };
const mailAddress = "divyanshusinghdsa12413005@iiitsonepat.ac.in";

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const reveal = useReveal();

  const update = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (sending) return;
    const trimmed = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]));
    const nextErrors = {};
    if (!trimmed.name) nextErrors.name = "Please enter your name.";
    if (!trimmed.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) nextErrors.email = "Please enter a valid email address.";
    if (trimmed.message.length < 10) nextErrors.message = "Please enter at least 10 characters.";
    setErrors(nextErrors);
    setStatus({ type: "", message: "" });
    if (Object.keys(nextErrors).length) return;

    setSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: import.meta.env.VITE_WEB3FORMS_KEY, ...trimmed }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Unable to send message.");
      setForm(initialForm);
      setStatus({ type: "success", message: "Thanks! Your message has been sent." });
    } catch {
      setStatus({ type: "error", message: "Sorry, your message could not be sent. Please email me instead." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={`section-shell contact-section contact-layout ${reveal.className}`} id="contact" ref={reveal.ref} aria-labelledby="contact-title">
      <div className="contact-intro"><p className="section-kicker">Contact</p><h2 id="contact-title">Let's connect</h2><p>Interested in thoughtful feedback, learning opportunities, and collaborating on useful projects.</p>
        <div className="contact-links" aria-label="Contact links">
          <a className="contact-icon-link email-icon" href={`mailto:${mailAddress}`} aria-label="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17z" /><path d="m4 7 8 6 8-6" /></svg>
          </a>
          <a className="contact-icon-link linkedin-icon" href="https://www.linkedin.com/in/divyanshu-singh-chauhan-390264307/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.7H2.4V21h2.8V8.7ZM3.8 2.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM21.6 13.9c0-3.7-2-5.5-4.7-5.5-2.2 0-3.2 1.2-3.7 2V8.7h-2.8V21h2.8v-6.1c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V21h2.9l1.2-7.1Z" /></svg>
          </a>
          <a className="contact-icon-link github-icon" href="https://github.com/divyanshu12413005" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11.1 11.1 0 0 1 5.9 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3.4c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg>
          </a>
          <a className="contact-icon-link instagram-icon" href="https://www.instagram.com/divyanshu_singh_chauhan_58/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="instagram-gradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#feda75"/><stop offset=".45" stopColor="#fa7e1e"/><stop offset=".72" stopColor="#d62976"/><stop offset="1" stopColor="#4f5bd5"/></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="instagram-dot" cx="17.5" cy="6.8" r="1" /></svg>
          </a>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit} noValidate>
        <div className="form-field"><label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label><input id="contact-name" name="name" value={form.name} onChange={update} autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby="name-error" /><small className="field-error" id="name-error">{errors.name}</small></div>
        <div className="form-field"><label htmlFor="contact-email">Email <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby="email-error" /><small className="field-error" id="email-error">{errors.email}</small></div>
        <div className="form-field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" value={form.subject} onChange={update} /></div>
        <div className="form-field"><label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" rows="5" minLength={10} value={form.message} onChange={update} required aria-invalid={Boolean(errors.message)} aria-describedby="message-error" /><small className="field-error" id="message-error">{errors.message}</small></div>
        <div className="honeypot" aria-hidden="true"><label htmlFor="contact-botcheck">Leave this field empty</label><input id="contact-botcheck" name="botcheck" value={form.botcheck} onChange={update} tabIndex={-1} autoComplete="off" /></div>
        <button className={`form-submit${sending ? " is-sending" : ""}`} type="submit" disabled={sending}><span className="submit-label">{sending ? "Sending…" : "Send message"}</span><span className="form-spinner" aria-hidden="true" /></button>
        <p className={`form-status${status.type ? ` is-${status.type}` : ""}`} aria-live="polite" role="status">{status.message}{status.type === "error" && <> <a href={`mailto:${mailAddress}`}>{mailAddress}</a></>}</p>
      </form>
    </section>
  );
}
