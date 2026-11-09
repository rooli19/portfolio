import { mount } from '../components/Shell'
import PaperImage from '../components/PaperImage'
import { projects } from '../content/projects'
import InkTitle from '../components/InkTitle'
import { ProjectCard } from '../components/ProjectCards'
import { sitePath } from '../sitePath'

function CaseStudy({ index }) {
  const project = projects[index]
  const next = projects[index + 1]
  return <article className="wrap case-study">
    <header className="case-heading">
      <p className="handwritten kicker">{project.category}</p>
      <InkTitle>{project.title}</InkTitle>
      <p>{project.summary}</p>
      <p className="sticky role-note">{project.role}</p>
    </header>
    <PaperImage image={project.media.cover} className="pencil-frame" eager />
    <section><h2>The problem and the people</h2><p>{project.problem}</p></section>
    <section><h2>My contribution</h2><p>{project.contribution}</p></section>
    <section>
      <h2>How {project.slug === 'hiss-n-miss' ? 'I' : 'we'} built it</h2>
      <p>{project.process}</p>
      <ul className="tech-list" aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <div className="case-images">
        <PaperImage image={project.media.process} className="pencil-frame" />
        <PaperImage image={project.media.interface} className="pencil-frame" />
      </div>
    </section>
    <section>
      <h2>The result</h2>
      <p>{project.result}</p>
      <PaperImage image={project.media.result} className="pencil-frame" />
      {project.link && <a className="highlight paper-button" href={project.link.href}>{project.link.label}</a>}
    </section>
    {project.reflection !== undefined && <section>
      <h2>What I learned</h2>
      {project.reflection ? <p>{project.reflection}</p> : <div className="blank-reflection" />}
    </section>}
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
