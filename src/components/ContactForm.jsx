import { useId } from 'react'
import { email, linkedin } from '../content/profile'

function openDraft(event) {
  event.preventDefault()
  const fields = new FormData(event.currentTarget)
  const name = fields.get('name').trim()
  const message = fields.get('message').trim()
  const replyTo = fields.get('email')
  const subject = encodeURIComponent('Portfolio enquiry from ' + name)
  const body = encodeURIComponent(message + '\n\nFrom ' + name + '\nReply to ' + replyTo)
  window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body
}

export default function ContactForm({ title = 'Get in touch!' }) {
  const note = useId()
  return <div className="contact-paper">
    <h2>{title}</h2>
    <form onSubmit={openDraft} aria-describedby={note}>
      <label>Your name<input name="name" autoComplete="name" required /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
      <label>Message<textarea name="message" rows="3" required /></label>
      <button className="highlight paper-button" type="submit">Send it →</button>
      <p id={note}>Opens a draft in your email app. You can also email me directly below.</p>
    </form>
    <div className="contact-links">
      <a href={'mailto:' + email}>{email}</a>
      <a href={linkedin}>LinkedIn ↗</a>
    </div>
  </div>
}
