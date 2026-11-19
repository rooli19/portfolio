import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { screens } from '../content/transpogapo'
import { BenchmarkChart, RatingsChart, SurveyChart } from './TranspoCharts'
import { Journey, Photo, Plane, WireframeComparison, Wireframes } from './TranspoInteractions'
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
      <p>Picture arriving at an unfamiliar landmark in Olongapo City. You know where you want to go, but you still have to work out which jeepney to look for, where to wait, and whether you’ll need a tricycle or a walk to finish the trip. Repeat commuters often know those details by heart. A new destination can put anyone back at the beginning.</p>
      <p>Our team built TranspoGAPO to bring those decisions into one browser-based map and trip planner. I led implementation and coordinated the project, with the team’s research guiding what we put on the map and what we needed to spell out in the directions.</p>
      <StoryText as="dl" className="tg-facts" stagger={1}><div><dt>My role</dt><dd>Team lead, project coordinator<br/>& implementation lead</dd></div><div><dt>Implementation</dt><dd>January 2026 to present</dd></div><div><dt>Made for</dt><dd>Local commuters & visitors</dd></div><div><dt>Project</dt><dd>CSP312 Course Requirement</dd></div></StoryText>
      <a className="tg-route-link" href="https://transpogapo.web.app/map" target="_blank" rel="noreferrer"><Plane/> Open the working app ↗</a>
    </div>
    <motion.div ref={collage} className="tg-cover-collage" style={{ y: reduce ? 0 : printY }}><Photo file="transpogapo-cover.png" alt="TranspoGAPO homepage introducing jeepney routes and tricycle terminals in Olongapo" caption="TranspoGAPO homepage" className="tg-cover-desktop"/><Photo file="transpogapo-mobile.png" alt={screens[3].alt} caption="Take it with you" className="tg-cover-phone"/></motion.div>
    <Note title="The team behind the project"><p>Xyryle Adrian B. Cator — Requirements & Documentation Lead; Testing & QA Lead. Elijah Twaine Marquez — Design & Architecture Lead; QA & Testing Support. Discovery, design, and evaluation are team work; this case study describes my implementation contribution.</p><p>Research title: Development of an Interactive Web-based Route-Planning and Terminal Locator System for Public Utility Vehicles in Olongapo City.</p></Note>
  </div>
}

function People() {
  return <><div className="tg-research-intro">
    <div className="tg-stat"><StoryStatistic>62<span> out of 100</span></StoryStatistic><StoryText>reported route-related confusion or delays at least sometimes</StoryText></div>
    <StoryText className="tg-lead" stagger={1}>Recognizing a route color isn’t the same as knowing where to board.</StoryText>
  </div>
    <div className="tg-narrative">
      <p>We started by asking 100 people how they found public transport information in Olongapo. Forty selected prior route knowledge, the most common answer overall. Among the 32 respondents who lived outside the city, trial and error was the most frequently reported source. That difference mattered for a planner meant to serve both regular passengers and people learning the network.</p>
    </div>
    <SurveyChart/>
    <div className="tg-narrative">
      <p>Route identification ranked first among the reported difficulties, with finding the boarding point next. We paired route names with color and gave boarding points their own place in the itinerary. Fare and transfer concerns also shaped what passengers could review before choosing a trip.</p>
    </div>
    <Note title="Research notes & how to read the numbers"><p>The online pre-survey allowed respondents to select multiple pain points, so the counts can add up to more than 100. A separate question asked them to rank how often difficulties occurred. Smaller ranks meant more frequent difficulties.</p></Note>
  </>
}

function JourneyChapter() {
  return <><div className="tg-persona">
    <ParallaxCutout name="commuter" className="tg-persona-cutout" distance={42}/>
    <div className="tg-persona-copy">
      <div className="tg-persona-identity">
        <span className="tg-eyebrow">Illustrative persona</span>
        <StoryText as="h3">Mika Santos</StoryText>
        <StoryText className="tg-persona-meta">19 years old · College student</StoryText>
      </div>
      <div className="tg-persona-bio">
        <StoryText stagger={1}>Mika usually takes a familiar route. We used this fictional student to follow what changes when she has to plan an unfamiliar trip through Olongapo.</StoryText>
        <p>Imagine Mika leaving for a place she hasn’t visited before. At home, she can compare the fare and time estimates on her phone. On the street, her attention shifts to the immediate decision of where to stand and which vehicle to watch for. If the trip involves a transfer, she needs a clear place to get off and directions to the next boarding point.</p>
      </div>
    </div>
    <ParallaxCutout name="sign" className="tg-boarding-cutout"/>
  </div>
    <Journey/><StoryText className="tg-caption">Illustrative journey based on survey themes.</StoryText>
    <div className="tg-narrative">
      <p>By the end of the ride, her destination may still be a walk away. Following the whole trip from search to arrival helped us decide which details belonged in the trip summary and which needed to appear in order, one leg at a time.</p>
    </div>
  </>
}

function Design() {
  return <>
    <div className="tg-narrative">
      <p>The route map helps a passenger get oriented. The itinerary tells them what to do next. We designed for the phone first, where directions open below the map and the passenger can read each leg in order. On desktop, there’s room to keep the start, destination, and trip options beside the map.</p>
    </div>
    <div className="tg-chart-accent-frame">
      <ParallaxCutout name="pencil" className="tg-chart-accent tg-pencil-accent" distance={12}/>
      <WireframeComparison/>
    </div>
    <div className="tg-narrative">
      <p>These retrospective wireframes show how the information changes as the passenger moves through the planner. The first screen establishes the two endpoints. The comparison screen brings walking and vehicle options into view. The directions screen gives the selected journey its own reading order, from the walk to the boarding point through the final leg.</p>
    </div>
    <Wireframes/>
  </>
}

function System() {
  const [selected, setSelected] = useState(2)
  const screen = screens[selected]
  return <>
    <div className="tg-narrative">
      <p>Take the example shown in the planner, a trip from SM City Olongapo Central to Ulo ng Apo. A passenger can start with those two places and compare options, or open the route and terminal views first to get familiar with what’s nearby. Each view gives them a way into the same trip-planning problem.</p>
    </div>
    <div className="tg-chart-accent-frame">
      <ParallaxCutout name="folded-map" className="tg-chart-accent tg-map-accent" distance={14}/>
      <div className="tg-screen-tabs" aria-label="Product walkthrough">{screens.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)}><span aria-hidden="true">{['▣', '⌖', '⇄', '↳'][index]}</span> {item.caption}</button>)}</div>
    </div>
    <div key={screen.id} className={'tg-system-view ' + (selected === 3 ? 'tg-system-mobile' : '')}><Photo key={screen.id} {...screen} caption={screen.caption}/><div><span className="tg-eyebrow">Current working app · captured November 2026</span><StoryText as="h3">{screen.title}</StoryText><StoryText stagger={1}>{screen.description}</StoryText></div></div>
    <div className="tg-narrative">
      <p>Once a passenger picks an option, the directions put the walking and vehicle legs in order. The time and fare estimates help with the choice before departure. The named stops help with the decisions that come later, when the passenger needs to board or get off.</p>
    </div>
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
    <div className="tg-narrative">
      <p>One of my implementation tasks was turning two places on the map into a trip the passenger could follow. For jeepneys, the planner checks eligible boarding and alighting stops in the order the vehicle serves them. For tricycles, terminals and service zones help determine which options are available. A transfer also needs a walking connection between the stops the passenger would actually use.</p>
      <p>I worked on place search, trip-start behavior, and navigation updates so passengers could carry a selected journey through to arrival. I also integrated elAI as another way to select places and start a trip. Manual entry and assistant-selected places feed into the same planner.</p>
    </div>
    <ol className="tg-build-notes"><StoryText as="li" effect="list"><h3>Map & itinerary</h3><p>Refined map search, transfers, and trip directions.</p></StoryText><StoryText as="li" effect="list" stagger={1}><h3>Navigation & arrival</h3><p>Improved trip-start, live updates, and arrival handling.</p></StoryText><StoryText as="li" effect="list"><h3>Assistance & feedback</h3><p>Integrated elAI and added route reporting.</p></StoryText><StoryText as="li" effect="list" stagger={1}><h3>Delivery</h3><p>Automated Firebase deployment.</p></StoryText></ol>
    <RouteDrawing flow/>
    <ol className="tg-flow" aria-label="System flow">{steps.map(([title, note], index) =>
      <motion.li key={title} initial={reduce ? false : { opacity: .6, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : .3, delay: reduce ? 0 : index * .08 }}>{title}<small>{note}</small></motion.li>)}</ol>
    <ul className="tg-tech" aria-label="Current technologies">{['React + Vite', 'Leaflet', 'Supabase', 'OSM road graph', 'GeoJSON', 'OpenRouteService', 'Firebase Hosting'].map(tech => <li key={tech}>{tech}</li>)}</ul>
    <BenchmarkChart/>
    <div className="tg-narrative">
      <p>Comparing the generated trips with our references showed why timing was only part of the story. A result could come back quickly and still propose a different sequence of rides. For the next benchmark, I’d compare journeys with equivalent transfers first, then verify the walking connections in the field.</p>
    </div>
    <Note title="Implementation evidence & responsibilities"><p>The project history records elAI map integration (fc016b6), place search and trip context (638c162), navigation/search updates (aeb425e), arrival handling (30ecac3), route reporting (03096f9), and Firebase deployment (8584a33).</p><p>The assistant uses a Supabase Edge Function with Groq and checks catalog references. The route planner uses eligible stops, directional patterns, and local road data. Crossing lines on a map do not by themselves establish a usable transfer.</p><a href="https://github.com/rooli19/transpogapo-react-demo" target="_blank" rel="noreferrer">Explore the project repository ↗</a></Note>
  </>
}

function Evaluation() {
  return <>
    <div className="tg-narrative">
      <p>After participants explored the system through tasks such as planning a trip and finding a terminal, we asked them to rate the experience. We wanted to see whether the information we’d brought together was useful and whether people could find it easily.</p>
    </div>
    <div className="tg-score"><span className="tg-eyebrow">Overall evaluation</span><StoryStatistic>4.61<span>/5</span></StoryStatistic><StoryText>21 complete end-user responses</StoryText></div>
    <RatingsChart/>
    <div className="tg-narrative">
      <p>Participants rated the route-color cue 4.86 out of 5, while layout clarity scored 4.33, the lowest ease-of-use item. The team’s defense notes also mention that some colors were hard to distinguish. Those findings give us a specific next test. Can a first-time passenger use the route name, color, and stop information together to find where to board?</p>
      <p>Most evaluators lived in Olongapo. A follow-up with more people unfamiliar with the network would help us see where they hesitate, ask for help, or choose the wrong option.</p>
    </div>
    <Note title="What this evaluation can—and cannot—tell us"><p>Users explored the system and completed a five-point questionnaire. Nineteen of the 21 evaluators lived in Olongapo; 15 were age 20. These ratings describe participating users’ perceptions, not measured reductions in missed rides, fares paid, or journey time. Separate usability rounds and attributed participant quotes were not available.</p></Note>
    <Note title="Accessibility in the current system"><p>Route names accompany color. Planner suggestions support keyboard navigation, and start/destination fields have labels. The mobile menu supports focus trapping, Escape, and focus restoration. Navigation updates use polite announcements; relevant homepage experiences respect reduced motion.</p><p>These are implemented behaviors, not a claim of a completed accessibility audit. Screen-reader testing and measured contrast results were not identified in the reviewed materials.</p></Note>
  </>
}

function Next() {
  return <div className="tg-ending"><StoryText as="blockquote" effect="quote">“A useful route needs to explain the decisions a passenger makes at street level.”</StoryText>
    <div className="tg-narrative">
      <p>I’d take the next round of testing back to the street. Start with a boarding point shown in the app and follow the walking directions to it. Check whether the vehicle can be identified there and whether a proposed transfer is practical on foot. That’s the same unfamiliar trip the case study opened with, now turned into a set of tasks we can observe.</p>
    </div>
    <LandingScene/>
    <StoryText className="tg-caption tg-street-credit">Illustrative Olongapo streetscape</StoryText>
    <ol className="tg-next-list"><StoryText as="li" effect="list"><h3>Take it into the field</h3><p>Check stops, route directions, walking links, and transfer feasibility with local transport partners.</p></StoryText><StoryText as="li" effect="list" stagger={1}><h3>Make the first trip clearer</h3><p>Test persistent names and symbols alongside color, plus guidance for finding a boarding point.</p></StoryText><StoryText as="li" effect="list" stagger={2}><h3>Listen to more passengers</h3><p>Include more visitors, ages, devices, and network conditions. Measure task completion and first load separately from routing.</p></StoryText></ol>
    <div className="tg-end-links"><a className="tg-button" href="https://transpogapo.web.app/map" target="_blank" rel="noreferrer">Try TranspoGAPO ↗</a><a href="https://www.linkedin.com/in/rholly-cao/">Let’s connect ↗</a><a href={sitePath('works.html')}>Back to all projects</a><a href={sitePath('works/resh.html')}>Next project: RESH →</a></div>
    <Note title="About this case study’s sources"><p>Adapted from the instructor’s 26-slide Case Study Slide Deck Template and the TranspoGAPO project context reviewed through November 17, 2026. Research figures come from the team’s defense materials; implementation descriptions come from the application and commit history. The persona and journey are illustrative, and the wireframes are retrospective reconstructions.</p><p>The photo-style cutouts and street map are illustrations. The planner and product screenshots show the working app.</p></Note>
  </div>
}

const contents = [Overview, People, JourneyChapter, Design, System, Build, Evaluation, Next]
export default function TranspoChapters({ index }) {
  const Content = contents[index]
  return <Content/>
}
