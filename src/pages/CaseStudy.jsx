import { mount } from '../components/Shell'
import { projects } from '../content/projects'
import InkTitle from '../components/InkTitle'
import HoverPreview from '../components/HoverPreview'
import { ProjectCard } from '../components/ProjectCards'
import { mediaPath, sitePath } from '../sitePath'
import { lazy, Suspense, useRef, useState } from 'react'
import './case-study.css'

const TranspoScrapbook = lazy(() => import('./TranspoScrapbook'))

function ProjectGallery({ screenshots, title }) {
  const [failedImages, setFailedImages] = useState([])
  const [selectedSrc, setSelectedSrc] = useState('')
  const touchStart = useRef(null)
  const slides = screenshots.filter(image => !failedImages.includes(image.src))
  const index = Math.max(0, slides.findIndex(image => image.src === selectedSrc))
  const slide = slides[index]

  function turn(step) {
    setSelectedSrc(current => {
      const currentIndex = Math.max(0, slides.findIndex(image => image.src === current))
      return slides[(currentIndex + step + slides.length) % slides.length].src
    })
  }

  function handleArrow(event) {
    if (slides.length < 2 || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return
    event.preventDefault()
    turn(event.key === 'ArrowLeft' ? -1 : 1)
  }

  function handleTouchEnd(event) {
    const start = touchStart.current
    touchStart.current = null
    if (!start || slides.length < 2) return
    const end = event.changedTouches[0]
    const horizontal = end.clientX - start.clientX
    const vertical = end.clientY - start.clientY
    if (Math.abs(horizontal) > Math.max(40, Math.abs(vertical))) turn(horizontal < 0 ? 1 : -1)
  }

  if (!slide) return <div className="project-gallery"><p className="project-gallery-empty">Screenshots coming soon</p></div>

  const photo = <img key={slide.src} src={mediaPath(slide.src)} alt={slide.alt} decoding="async" draggable={false}
    onError={() => setFailedImages(images => [...images, slide.src])} />

  return <section className="project-gallery" aria-label={`${title} screenshots`} aria-roledescription="carousel" onKeyDown={handleArrow}>
    <div className="project-gallery-stage"
      onTouchStart={event => { touchStart.current = event.touches.length === 1 ? event.touches[0] : null }}
      onTouchEnd={handleTouchEnd}>
      {slide.preview ? <HoverPreview key={slide.src} src={slide.preview} poster={slide.src} showPlayButton>{photo}</HoverPreview> : photo}
    </div>
    {slides.length > 1 && <div className="project-gallery-controls">
      <button type="button" aria-label="Previous screenshot" onClick={() => turn(-1)}>←</button>
      <p aria-live="polite" aria-atomic="true">
        {index + 1} / {slides.length}<span className="sr-only">. {slide.alt}</span>
      </p>
      <button type="button" aria-label="Next screenshot" onClick={() => turn(1)}>→</button>
    </div>}
  </section>
}

function CaseStudy({ index }) {
  const project = projects[index]
  const next = projects[index + 1]
  if (project.slug === 'transpogapo') return <Suspense fallback={<div className="wrap case-study"><header className="case-heading"><h1>TranspoGAPO</h1><p>Opening the scrapbook…</p></header></div>}><TranspoScrapbook /></Suspense>
  return <article className="wrap project-study">
    <div className="project-study-layout">
      <header className="project-overview">
        <p className="handwritten kicker">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="project-summary">{project.summary}</p>
        <p className="sticky role-note">{project.role}</p>
        <img className="project-cutout" src={mediaPath(`/photos/${project.slug}-cutout.webp`)}
          alt="" width="360" height="220" decoding="async" />
        <ul className="tech-list" aria-label="Technologies">
          {project.technologies.map(tech => <li key={tech}>{tech}</li>)}
        </ul>
      </header>
      <div className="project-study-content">
        <ProjectGallery screenshots={project.media.screenshots} title={project.title} />
        <div className="project-study-notes">
          <section><h2>The problem and the people</h2><p>{project.problem}</p></section>
          <section><h2>My contribution</h2><p>{project.contribution}</p></section>
          <section>
            <h2>How {project.slug === 'hiss-n-miss' ? 'I' : 'we'} built it</h2>
            <p>{project.process}</p>
          </section>
          <section>
            <h2>The result</h2>
            <p>{project.result}</p>
            {project.link && <a className="highlight paper-button" href={project.link.href}>{project.link.label}</a>}
          </section>
          {project.reflection !== undefined && <section>
            <h2>What I learned</h2>
            {project.reflection ? <p>{project.reflection}</p> : <div className="blank-reflection" />}
          </section>}
        </div>
      </div>
    </div>
    <nav className="case-links" aria-label="Project navigation">
      <a href={sitePath('works.html')}>← All projects</a>
    </nav>
    {next && <section className="next-project">
      <InkTitle as="h2" className="marker">Next project</InkTitle>
      <p>{next.summary}</p>
      <ProjectCard project={next} />
    </section>}
  </article>
}

const index = projects.findIndex(project => project.slug === document.body.dataset.project)
mount(CaseStudy, 'works', { index })
