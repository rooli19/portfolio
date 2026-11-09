import { mount } from '../components/Shell'
import PaperGallery from '../components/PaperGallery'
import { playgroundPhotos } from '../content/media'

function Playground() {
  return <section className="playground-page">
    <h1 className="sr-only">Playground</h1>
    <PaperGallery photos={playgroundPhotos} />
    <p className="handwritten gallery-note">A space for my work and ideas</p>
  </section>
}

mount(Playground, 'playground')
