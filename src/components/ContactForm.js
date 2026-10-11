import { useRef, useState } from 'react';

// Set this to the inbox's Formspree endpoint before enabling submissions.
const endpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT || '';
const endpointPattern = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/;

export default function ContactForm() {
  const submitting = useRef(false);
  const [status, setStatus] = useState('idle');
  const configured = endpointPattern.test(endpoint);

  async function sendMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (submitting.current || !form.reportValidity()) return;
    const action = form.getAttribute('action');
    if (!endpointPattern.test(action || '')) { setStatus('error'); return; }
    const data = new FormData(form);
    if (!data.get('name').trim() || !data.get('message').trim()) {
      setStatus('invalid');
      return;
    }
    submitting.current = true;
    setStatus('sending');
    try {
      const response = await fetch(action, {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form className="contact-form" action={configured ? endpoint : undefined} method="POST" onSubmit={sendMessage} aria-label="Send a message" aria-busy={status === 'sending'}>
      <div className="contact-form-fields">
        <div><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={200} /></div>
        <div><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
      </div>
      <label htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" rows={5} required maxLength={10000} />
      <button type="submit" className="contact-send" disabled={!configured || status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send'}</button>
      {!configured && <p className="contact-form-note">The contact form is being connected. Please contact me on LinkedIn above for now.</p>}
      <p className="contact-form-status" role="status" aria-live="polite">
        {status === 'sent' && 'Message sent!'}
        {status === 'error' && 'Message could not be sent. Please try again or contact me on LinkedIn above.'}
        {status === 'invalid' && 'Please enter your name and a message.'}
      </p>
    </form>
  );
}
