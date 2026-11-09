import { mount } from '../components/Shell'
import ContactForm from '../components/ContactForm'
import InkTitle from '../components/InkTitle'

function Contact() {
  return <section className="wrap contact-page">
    <div>
      <InkTitle>Say hello</InkTitle>
      <p className="sticky handwritten">Drop me a line, I usually reply within a day</p>
    </div>
    <ContactForm />
  </section>
}

mount(Contact, 'contact')
