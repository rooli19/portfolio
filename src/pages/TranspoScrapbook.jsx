import { useLayoutEffect, useRef, useState } from 'react'
import { chapters } from '../content/transpogapo'
import TranspoChapters from '../components/TranspoChapters'
import { OpeningScene, StoryBackdrop, StoryText } from '../components/TranspoScenes'
import './transpogapo.css'

function Spread({ chapter, index }) {
  return <section id={chapter.id} tabIndex={-1} className="tg-spread" data-chapter={chapter.id} aria-labelledby={`${chapter.id}-heading`}>
    <div className="tg-chapter-inner wrap">
      <header className="tg-chapter-header">
        <StoryText className="tg-eyebrow">{chapter.note}</StoryText>
        <StoryText as="h2" id={`${chapter.id}-heading`} className="tg-heading" effect="heading" stagger={1}>{chapter.title}</StoryText>
      </header>
      <TranspoChapters index={index}/>
      {index === chapters.length - 1 && <a className="tg-route-link" href="#title">↑ Back to the beginning</a>}
    </div>
  </section>
}

export default function TranspoScrapbook() {
  const [activeIndex, setActiveIndex] = useState(0)
  const article = useRef(null)
  const story = useRef(null)
  const route = useRef(null)

  useLayoutEffect(() => {
    const sections = [...story.current.children]
    const navigation = route.current
    const container = article.current
    let frame = 0

    function updateRoute() {
      frame = 0
      const readingLine = Math.min(innerHeight * .28, 220)
      const positions = sections.map(section => section.getBoundingClientRect().top)
      const index = Math.max(0, positions.findLastIndex(top => top <= readingLine))
      const nextTop = positions[index + 1]
      const fraction = nextTop === undefined ? 0 : Math.max(0, (readingLine - positions[index]) / (nextTop - positions[index]))
      navigation.style.setProperty('--tg-progress', (index + fraction) / (sections.length - 1))
      navigation.toggleAttribute('data-reading', positions[0] <= readingLine)
      navigation.hidden = container.getBoundingClientRect().bottom < readingLine && !navigation.contains(document.activeElement)
      setActiveIndex(index)
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateRoute)
    }

    // React mounts the chapter anchors after the browser's initial fragment jump.
    const fragment = [container.firstElementChild, ...sections].find(section => `#${section.id}` === window.location.hash)
    fragment?.scrollIntoView({ behavior: 'instant' })
    updateRoute()
    const observer = new ResizeObserver(scheduleUpdate)
    observer.observe(container)
    sections.forEach(section => observer.observe(section))
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  return <article ref={article} className="tg-scrapbook">
    <OpeningScene/>
    <StoryBackdrop article={article}/>
    <nav ref={route} className="tg-route" aria-label="Scrapbook chapters">
      <p className="tg-route-stop">Stop {String(activeIndex + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</p>
      <span className="tg-route-progress" aria-hidden="true"/>
      <details onKeyDown={event => {
        if (event.key !== 'Escape' || !event.currentTarget.open) return
        event.currentTarget.open = false
        event.currentTarget.querySelector('summary').focus()
      }}>
        <summary>Chapters</summary>
        <ol className="tg-tabs">{chapters.map((chapter, index) =>
          <li key={chapter.id}><a href={`#${chapter.id}`} aria-current={activeIndex === index ? 'location' : undefined} onClick={event => {
            if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) event.currentTarget.closest('details').open = false
          }}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{chapter.label}</a></li>
        )}</ol>
      </details>
    </nav>
    <div ref={story} className="tg-story">
      {chapters.map((chapter, index) => <Spread key={chapter.id} chapter={chapter} index={index}/>)}
    </div>
  </article>
}
