import { mount } from '../components/Shell'
import PaperImage from '../components/PaperImage'
import InkTitle from '../components/InkTitle'
import AboutRope from '../components/AboutRope'
import { experience, skills } from '../content/profile'
import mountains from '../assets/about-mountains.avif'
import running from '../assets/about-running.avif'
import tennis from '../assets/about-tennis.avif'
import codeIcon from '../assets/code-icon.svg'
import robotIcon from '../assets/robot-icon.svg'
import cloudIcon from '../assets/cloud-icon.svg'
import researchIcon from '../assets/research-icon.svg'
import './about.css'

const experienceIcons = [codeIcon, robotIcon, cloudIcon, researchIcon]

const photos = [
  ['Moments outside the classroom', mountains, 'A runner beside a mountain lake'],
  ['Beyond the screen', running, 'Runners on a trail at sunset'],
  ['Learning and building', tennis, 'Two people on a tennis court from above'],
  ['Creating and exploring', mountains, 'A mountain lake reflecting the sky'],
]

function About() {
  return <>
    <section className="about-hero">
      <p className="handwritten kicker">a little more about me</p>
      <AboutRope />
      <div className="about-collage wrap">
        {photos.map(([caption, src, alt]) => <figure key={caption}>
          <figcaption className="handwritten">{caption}</figcaption>
          <PaperImage image={{ src, alt }} width={440} height={450} />
        </figure>)}
      </div>
    </section>
    <div className="wrap about-copy">
      <section className="about-intro">
        <InkTitle as="h2" className="sticky handwritten">a little bit about me</InkTitle>
        <div className="taped-notes">
          <p className="taped-note">I’m a BS Computer Science student at Gordon College and the team lead and lead backend developer of HARAYA. I help build web systems and coordinate projects with stakeholders.</p>
          <p className="taped-note">I enjoy solving programming problems, learning new technologies, and building systems that make everyday tasks easier.</p>
          <div className="taped-note">
            <p>My work spans JavaScript, Python, React, Firebase, MySQL, robotics, and web application development. I’m especially interested in backend systems, routing, and database integration.</p>
            <p>I lead a three-member software team at HARAYA, handling backend architecture and database integration. I’ve also supported AWS Cloud Club and CCS Student Council activities.</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="marker">What I work with</h2>
        <div className="skill-grid">{skills.map(([title, description]) => <article key={title} className="note-card">
          <h3>{title}</h3><p>{description}</p>
        </article>)}</div>
      </section>
      <section>
        <h2 className="marker">Education</h2>
        <h3>Gordon College</h3>
        <p>BS Computer Science · 2024–present</p>
      </section>
    </div>
    <section className="wrap about-experience">
      <InkTitle as="h2" className="marker">Experience and leadership</InkTitle>
      <div className="experience-list">{experience.map(([title, role, description], index) => <article key={title} className="experience-item">
        <span className="highlight experience-icon"><img src={experienceIcons[index]} alt="" width="90" height="60" /></span>
        <div><h3>{title}</h3><p className="handwritten">{role}</p><p>{description}</p></div>
      </article>)}</div>
    </section>
  </>
}

mount(About, 'about')
