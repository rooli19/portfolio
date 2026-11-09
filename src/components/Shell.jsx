import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import logo from '../assets/logo.svg'
import ContactNotebook from './ContactNotebook'
import { sitePath } from '../sitePath'
import '../style.css'

const pages = [
  ['about', '/about.html'],
  ['works', '/works.html'],
  ['playground', '/playground.html'],
  ['contact', '/contact.html'],
]

export class Recovery extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export function Shell({ active, children }) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a href={sitePath()} className="brand" aria-label="Rholly Cao, home"><img src={logo} width="59" height="46" alt="" /></a>
      <nav aria-label="Main navigation">
        {pages.map(([label, href]) => <a key={href} href={sitePath(href)} aria-current={active === label ? 'page' : undefined}>{label}</a>)}
      </nav>
    </header>
    <main id="main" tabIndex={-1}>
      <Recovery fallback={<section className="wrap recovery"><h1>Page unavailable</h1><p><a href={sitePath()}>Return home</a> or <a href={sitePath('works.html')}>browse the projects</a>.</p></section>}>
        {children}
      </Recovery>
    </main>
    {active !== 'playground' && active !== 'contact' &&
      <Recovery fallback={<footer className="wrap recovery"><a href={sitePath('contact.html')}>Get in touch ↗</a></footer>}>
        <ContactNotebook />
      </Recovery>}
  </>
}

export function mount(Page, active, props = {}) {
  const root = document.getElementById('root')
  createRoot(root).render(<Shell active={active}><Page {...props} /></Shell>)
}
