import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { screens } from '../content/transpogapo'
import { BenchmarkChart, RatingsChart, SurveyChart } from './TranspoCharts'
import { Journey, PaperComparison, Photo, Prototype, Wireframes } from './TranspoInteractions'
import { LandingScene, ParallaxCutout, RouteDrawing, StoryStatistic, StoryText, useStoryReducedMotion } from './TranspoScenes'
import { sitePath } from '../sitePath'

function Note({ title, children }) {
  return <details className="tg-note"><summary>{title}</summary><div>{children}</div></details>
}

function Overview() {
  const collage = useRef(null)
  const reduce = useStoryReducedMotion()
  const { scrollYProgress } = useScroll({ target: collage, offset: ['start end', 'end start'] })
  const printY = useTransform(scrollYProgress, [0, 1], [34, -34])
  return <div className="tg-cover-layout">
    <div className="tg-cover-copy"><StoryText className="tg-lead">Find the right jeepney, know where to board, and see what comes after the ride.</StoryText>
      <StoryText as="dl" className="tg-facts" stagger={1}><div><dt>My role</dt><dd>Team lead, project coordinator<br/>& implementation lead</dd></div><div><dt>Implementation</dt><dd>January 2026 to present</dd></div><div><dt>Made for</dt><dd>Local commuters & visitors</dd></div><div><dt>Project</dt><dd>CSP312 Course Requirement</dd></div></StoryText>
      <a className="tg-text-link" href="https://transpogapo.web.app/map" target="_blank" rel="noreferrer">Open the working app ↗</a>
    </div>
    <motion.div ref={collage} className="tg-cover-collage" style={{ y: reduce ? 0 : printY }}><span className="tg-stamp">Olongapo City<br/>PHILIPPINES · 2026</span><Photo file="transpogapo-planner.png" alt={screens[2].alt} caption="A place, a route, a next step." className="tg-cover-desktop"/><Photo file="transpogapo-mobile.png" alt={screens[3].alt} caption="Take it with you" className="tg-cover-phone"/></motion.div>
    <Note title="The team behind the project"><p>Xyryle Adrian B. Cator — Requirements & Documentation Lead; Testing & QA Lead. Elijah Twaine Marquez — Design & Architecture Lead; QA & Testing Support. Discovery, design, and evaluation are team work; this case study describes my implementation contribution.</p><p>Research title: Development of an Interactive Web-based Route-Planning and Terminal Locator System for Public Utility Vehicles in Olongapo City.</p></Note>
  </div>
}

function People() {
  return <><div className="tg-research-intro">
    <div className="tg-stat"><StoryStatistic>62<span> out of 100</span></StoryStatistic><StoryText>reported route-related confusion or delays at least sometimes</StoryText></div>
    <StoryText className="tg-lead" stagger={1}>Recognizing a route color isn’t the same as knowing where to board.</StoryText>
  </div>
    <SurveyChart/>
    <Note title="Research notes & how to read the numbers"><p>The team’s online pre-survey had 100 respondents. These pain-point counts came from a multiple-selection question, so they do not add up to 100. Prior route knowledge was the most common information source overall (40/100). Among the 32 respondents living outside Olongapo, trial and error was the most frequently reported source.</p><p>A separate ranking question placed route identification first (mean rank 2.40), boarding points second (3.23), fares third (3.58), and transfers fourth (3.63). Smaller ranks meant more frequent difficulties.</p></Note>
  </>
}

function JourneyChapter() {
  return <><div className="tg-persona">
    <ParallaxCutout name="commuter" className="tg-persona-cutout" distance={42}/>
    <div className="tg-persona-copy"><span className="tg-eyebrow">Illustrative persona</span><StoryText as="h3">Mika Santos</StoryText><StoryText className="tg-persona-meta">19 years old · College student</StoryText><StoryText stagger={1}>When Mika travels somewhere new in Olongapo, she needs to identify the right jeepney by its route name and color and know exactly where to board. If she has to transfer, she wants to know where to get off, where to catch the next ride, and how far she’ll walk. Estimated fares and travel times help her choose a route.</StoryText></div>
    <ParallaxCutout name="sign" className="tg-boarding-cutout"/>
  </div><Journey/><StoryText className="tg-caption">Illustrative journey based on survey themes.</StoryText></>
}

function Design() {
  return <>
    <div className="tg-chart-accent-frame">
      <ParallaxCutout name="pencil" className="tg-chart-accent tg-pencil-accent" distance={12}/>
      <PaperComparison/>
    </div>
    <Wireframes/>
    <Note title="Try the reconstructed planning flow"><Prototype/></Note>
  </>
}

function System() {
  const [selected, setSelected] = useState(2)
  const screen = screens[selected]
  return <><div className="tg-chart-accent-frame">
      <ParallaxCutout name="folded-map" className="tg-chart-accent tg-map-accent" distance={14}/>
      <div className="tg-screen-tabs" aria-label="Product walkthrough">{screens.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)}><span aria-hidden="true">{['▣', '⌖', '⇄', '↳'][index]}</span> {item.caption}</button>)}</div>
    </div>
    <div key={screen.id} className={'tg-system-view ' + (selected === 3 ? 'tg-system-mobile' : '')}><Photo key={screen.id} {...screen} caption={screen.caption}/><div><span className="tg-eyebrow">Current working app · captured November 2026</span><StoryText as="h3">{screen.title}</StoryText><StoryText stagger={1}>{screen.description}</StoryText></div></div>
    <Note title="Optional features & real-world limits"><p>Browser location can support progress, rerouting, and arrival guidance when permission and device capabilities allow. This follows the passenger’s position; it is not live vehicle tracking.</p><p>elAI helps with city and transport questions, selecting places, and starting a plan. The planner computes the itinerary, and manual planning remains available. Incorrect-route reporting provides a private report reference when enabled in the deployment.</p><p>Fares and travel times are estimates. Suggested transfers still need field verification.</p></Note>
  </>
}

function Build() {
  const reduce = useStoryReducedMotion()
  const steps = [
    ['Start + destination', 'Manual input or elAI'],
    ['Trip planner', 'Service catalog + local road data'],
    ['Map + itinerary', 'Ranked options & ordered legs'],
  ]
  return <>
    <ol className="tg-build-notes"><StoryText as="li" effect="list"><h3>Map & itinerary</h3><p>Refined map search, transfers, and trip directions.</p></StoryText><StoryText as="li" effect="list" stagger={1}><h3>Navigation & arrival</h3><p>Improved trip-start, live updates, and arrival handling.</p></StoryText><StoryText as="li" effect="list"><h3>Assistance & feedback</h3><p>Integrated elAI and added route reporting.</p></StoryText><StoryText as="li" effect="list" stagger={1}><h3>Delivery</h3><p>Automated Firebase deployment.</p></StoryText></ol>
    <RouteDrawing flow/>
    <ol className="tg-flow" aria-label="System flow">{steps.map(([title, note], index) =>
      <motion.li key={title} initial={reduce ? false : { opacity: .6, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : .3, delay: reduce ? 0 : index * .08 }}>{title}<small>{note}</small></motion.li>)}</ol>
    <ul className="tg-tech" aria-label="Current technologies">{['React + Vite', 'Leaflet', 'Supabase', 'OSM road graph', 'GeoJSON', 'OpenRouteService', 'Firebase Hosting'].map(tech => <li key={tech}>{tech}</li>)}</ul>
    <BenchmarkChart/>
    <Note title="Implementation evidence & responsibilities"><p>The project history records elAI map integration (fc016b6), place search and trip context (638c162), navigation/search updates (aeb425e), arrival handling (30ecac3), route reporting (03096f9), and Firebase deployment (8584a33).</p><p>The assistant uses a Supabase Edge Function with Groq and checks catalog references. The route planner uses eligible stops, directional patterns, and local road data. Crossing lines on a map do not by themselves establish a usable transfer.</p><a href="https://github.com/rooli19/transpogapo-react-demo" target="_blank" rel="noreferrer">Explore the project repository ↗</a></Note>
  </>
}

function Evaluation() {
  return <><div className="tg-score"><span className="tg-eyebrow">Overall evaluation</span><StoryStatistic>4.61<span>/5</span></StoryStatistic><StoryText>21 complete end-user responses</StoryText></div>
    <RatingsChart/>
    <Note title="What this evaluation can—and cannot—tell us"><p>Users explored the system and completed a five-point questionnaire. Nineteen of the 21 evaluators lived in Olongapo; 15 were age 20. These ratings describe participating users’ perceptions, not measured reductions in missed rides, fares paid, or journey time. Separate usability rounds and attributed participant quotes were not available.</p></Note>
    <Note title="Accessibility in the current system"><p>Route names accompany color. Planner suggestions support keyboard navigation, and start/destination fields have labels. The mobile menu supports focus trapping, Escape, and focus restoration. Navigation updates use polite announcements; relevant homepage experiences respect reduced motion.</p><p>These are implemented behaviors, not a claim of a completed accessibility audit. Screen-reader testing and measured contrast results were not identified in the reviewed materials.</p></Note>
  </>
}

function Next() {
  return <div className="tg-ending"><StoryText as="blockquote" effect="quote">“A useful route needs to explain the decisions a passenger makes at street level.”</StoryText>
    <LandingScene/>
    <StoryText className="tg-caption tg-street-credit">Illustrative Olongapo streetscape</StoryText>
    <ol className="tg-next-list"><StoryText as="li" effect="list"><h3>Take it into the field</h3><p>Check stops, route directions, walking links, and transfer feasibility with local transport partners.</p></StoryText><StoryText as="li" effect="list" stagger={1}><h3>Make the first trip clearer</h3><p>Test persistent names and symbols alongside color, plus guidance for finding a boarding point.</p></StoryText><StoryText as="li" effect="list" stagger={2}><h3>Listen to more passengers</h3><p>Include more visitors, ages, devices, and network conditions. Measure task completion and first load separately from routing.</p></StoryText></ol>
    <div className="tg-end-links"><a className="tg-button" href="https://transpogapo.web.app/map" target="_blank" rel="noreferrer">Try TranspoGAPO ↗</a><a href="https://www.linkedin.com/in/rholly-cao/">Let’s connect ↗</a><a href={sitePath('works.html')}>Back to all projects</a><a href={sitePath('works/resh.html')}>Next project: RESH →</a></div>
    <Note title="About this case study’s sources"><p>Adapted from the instructor’s 26-slide Case Study Slide Deck Template and the TranspoGAPO project context reviewed through November 17, 2026. Research figures come from the team’s defense materials; implementation descriptions come from the application and commit history. Persona, journey, wireframes, and the low-fidelity flow are labeled reconstructions or illustrations.</p><p>The photo-style cutouts and street map are illustrations. The planner and product screenshots show the working app.</p></Note>
  </div>
}

const contents = [Overview, People, JourneyChapter, Design, System, Build, Evaluation, Next]
export default function TranspoChapters({ index }) {
  const Content = contents[index]
  return <Content/>
}
