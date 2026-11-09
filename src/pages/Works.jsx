import { mount } from '../components/Shell'
import ProjectCards from '../components/ProjectCards'
import InkTitle from '../components/InkTitle'

function Works() {
  return <section className="wrap page-section">
    <p className="handwritten kicker">Selected projects | 2024 to 2026</p>
    <InkTitle>Works</InkTitle>
    <h2 className="sr-only">Project list</h2>
    <ProjectCards />
  </section>
}

mount(Works, 'works')
