import { mount } from '../components/Shell'
import Lanyard from '../components/Lanyard'
import ProjectCards from '../components/ProjectCards'
import Showreel from '../components/Showreel'
import CameraViewer from '../components/CameraViewer'
import InkTitle from '../components/InkTitle'
import { sitePath } from '../sitePath'
import './home.css'

function Home() {
  return <>
    <section className="home-hero">
      <div className="hero-lettering" aria-hidden="true">
        <span>software developer&nbsp;</span><span>software developer&nbsp;</span>
      </div>
      <Lanyard />
      <div className="wrap hero-copy">
        <InkTitle>I’m Rholly Cao</InkTitle>
        <p>I build web apps for everyday problems, from finding a ride in Olongapo to organizing receipts.</p>
        <div className="hero-links">
          <a className="highlight paper-button" href={sitePath('works/transpogapo.html')}>Read the TranspoGAPO case study ↗</a>
          <a href={sitePath('about.html')}>Meet the developer →</a>
        </div>
      </div>
    </section>
    <Showreel />
    <section className="wrap home-work" aria-label="Selected projects">
      <h2 className="sr-only">Selected projects</h2>
      <ProjectCards featured />
    </section>
    <CameraViewer />
  </>
}

mount(Home)
