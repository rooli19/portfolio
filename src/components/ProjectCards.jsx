import PaperImage from './PaperImage'
import { projects, projectUrl } from '../content/projects'
import WobblyInk from './WobblyInk'
import arrow from '../assets/pencil-arrow.svg'

const captions = [
  'Making local commuting easier with TranspoGAPO',
  'Automating receipts with OCR and AI',
  'A blockchain-backed land registry prototype',
  'A voice-controlled Python arcade game',
]

export function ProjectCard({ project }) {
  return <article>
      <a className="project-card" href={projectUrl(project.slug)}>
        <PaperImage image={project.media.cover} className="pencil-frame" />
        <div className="project-caption highlight">
          <h3>{project.title}</h3>
          <p>{project.role}</p>
        </div>
        <span className="project-category handwritten">
          {project.slug === 'transpogapo' ? 'Web development' : project.category}
        </span>
      </a>
  </article>
}

export default function ProjectCards({ featured = false }) {
  return <div className={'project-grid' + (featured ? ' featured-projects' : '')}>
    {projects.map((project, index) => <div key={project.slug} className="project-entry">
      {featured && index === 0 && <p className="sticky handwritten project-sticky">Local transit, made easier</p>}
      <ProjectCard project={project} />
      {featured && <p className="handwritten project-annotation"><WobblyInk src={arrow} width={58} height={22} /> {captions[index]}</p>}
    </div>)}
  </div>
}
