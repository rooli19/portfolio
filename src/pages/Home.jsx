import { mount } from '../components/Shell'
import Lanyard from '../components/Lanyard'
import ProjectCards from '../components/ProjectCards'
import TechMarquee from '../components/TechMarquee'
import CameraViewer from '../components/CameraViewer'
import HomeDoodle from '../components/HomeDoodle'
import AnimatedName from '../components/AnimatedName'
import InkTitle from '../components/InkTitle'
import { sitePath } from '../sitePath'
import './home.css'

function Home({ playNameIntro = false }) {
  return <>
    <section className="home-hero">
      <div className="hero-lettering" aria-hidden="true">
        <span>software developer&nbsp;</span><span>software developer&nbsp;</span>
      </div>
      <Lanyard />
      <div className="wrap hero-copy">
        <AnimatedName text="I’m Rholly Cao" playIntro={playNameIntro} />
        <p>I build web apps for everyday problems, creating accessible, efficient, and purpose-built tools.</p>
        <div className="hero-links">
          <a className="highlight paper-button" href={sitePath('works/transpogapo.html')}>Read the TranspoGAPO case study ↗</a>
          <a href={sitePath('about.html')}>Meet the developer →</a>
        </div>
      </div>
    </section>
    <TechMarquee />
    <section className="wrap home-work" aria-label="Selected projects">
      <HomeDoodle scene="projects" />
      <p className="handwritten kicker">Selected projects | 2024 to 2026</p>
      <InkTitle as="h2" className="marker">Built by me, built with others</InkTitle>
      <ProjectCards featured />
    </section>
    <div className="home-camera">
      <HomeDoodle scene="camera" />
      <CameraViewer />
    </div>
  </>
}

function mountHome() {
  const loaderKey = 'portfolio-loader-seen'
  try {
    if (window.sessionStorage.getItem(loaderKey) === '1') {
      mount(Home)
      return
    }
  } catch {
    // The homepage can still load when session storage is unavailable.
  }

  const renderHome = () => {
    try {
      window.sessionStorage.setItem(loaderKey, '1')
    } catch {
      // The next visit may show the loader again.
    }
    mount(Home, undefined, { playNameIntro: true })
  }

  const loader = document.getElementById('portfolio-boot')
  const now = performance.now()
  const startedAt = Number(loader?.dataset.startedAt ?? now)
  const remaining = Math.ceil(3000 - (now - startedAt))
  if (loader && remaining > 0) window.setTimeout(renderHome, remaining)
  else renderHome()
}

mountHome()
