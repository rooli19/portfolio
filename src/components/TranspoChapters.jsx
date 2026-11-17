import { useState } from 'react'
import { painPoints, screens } from '../content/transpogapo'
import { Journey, Photo, Prototype, Wireframes } from './TranspoInteractions'
import { sitePath } from '../sitePath'

function Note({ title, children }) {
  return <details className="tg-note"><summary>{title}</summary><div>{children}</div></details>
}

function Overview() {
  return <div className="tg-cover-layout">
    <div className="tg-cover-copy"><p className="tg-lead">Planning jeepney & tricycle trips in Olongapo City.</p><p>A web-based map that connects route colors, terminals, and walking directions to the question that matters: <strong>“How do I get there?”</strong></p>
      <dl className="tg-facts"><div><dt>My role</dt><dd>Team lead, project coordinator<br/>& implementation lead</dd></div><div><dt>Implementation</dt><dd>October–November 2026</dd></div><div><dt>Made for</dt><dd>Local commuters & visitors</dd></div><div><dt>Project</dt><dd>BS Computer Science<br/>team research project</dd></div></dl>
      <a className="tg-text-link" href="https://transpogapo.web.app/map" target="_blank" rel="noreferrer">Open the working app ↗</a>
    </div>
    <div className="tg-cover-collage"><span className="tg-stamp">Olongapo City<br/>PHILIPPINES · 2026</span><Photo file="transpogapo-planner.png" alt={screens[2].alt} caption="A place, a route, a next step." className="tg-cover-desktop"/><Photo file="transpogapo-mobile.png" alt={screens[3].alt} caption="Take it with you" className="tg-cover-phone"/><p className="tg-margin-note">a field guide for<br/>the unfamiliar trip ↗</p></div>
    <Note title="The team behind the project"><p>Xyryle Adrian B. Cator — Requirements & Documentation Lead; Testing & QA Lead. Elijah Twaine Marquez — Design & Architecture Lead; QA & Testing Support. Discovery, design, and evaluation are team work; this case study describes my implementation contribution.</p><p>Research title: Development of an Interactive Web-based Route-Planning and Terminal Locator System for Public Utility Vehicles in Olongapo City.</p></Note>
  </div>
}

function People() {
  return <><div className="tg-research-intro"><p className="tg-lead">Recognizing a route color isn’t the same as knowing where to board.</p><div className="tg-stat"><strong>62<span>/100</span></strong><p>reported route-related confusion or delays at least sometimes</p></div></div>
    <p>Our goal was to bring route identification, terminal lookup, and trip planning into one place—so passengers could choose a vehicle and find the boarding point before leaving.</p>
    <div className="tg-pain-points">{painPoints.map(([count, title, problem, response], index) => <section className="tg-research-note" key={title}><span className="tg-eyebrow">Note 0{index + 1} · {count} of 100 selected</span><h3>{title}</h3><p>{problem}</p><p className="tg-response">{response}</p></section>)}</div>
    <Note title="Research notes & how to read the numbers"><p>The team’s online pre-survey had 100 respondents. These pain-point counts came from a multiple-selection question, so they do not add up to 100. Prior route knowledge was the most common information source overall (40/100). Among the 32 respondents living outside Olongapo, trial and error was the most frequently reported source.</p><p>A separate ranking question placed route identification first (mean rank 2.40), boarding points second (3.23), fares third (3.58), and transfers fourth (3.63). Smaller ranks meant more frequent difficulties.</p></Note>
  </>
}

function JourneyChapter() {
  return <><div className="tg-persona"><span className="tg-persona-initial" aria-hidden="true">M.</span><div><span className="tg-eyebrow">Illustrative persona · fictional name & scenario</span><h3>Meet Mika, on an unfamiliar trip.</h3><p>A student who knows the usual commute, but needs to find the right jeepney and boarding point for a new destination. Knowing the color alone does not say where to wait.</p></div></div><p className="tg-hand-note">Follow the decisions, one stop at a time ↓</p><Journey/><p className="tg-caption">Synthesized from survey themes. The journey, behaviors, and feelings are scenario assumptions, not an observed participant’s story.</p></>
}

function Design() {
  return <><p className="tg-lead">Keep the map for context. Make the next action obvious.</p><p className="tg-caption">Retrospective reconstructions for this case study—not original research-stage artifacts.</p><Wireframes/>
    <div className="tg-design-notes"><section><h3>01 / Planning the trip</h3><div className="tg-digital" aria-label="Reconstructed trip planner wireframe"><span>① Start: search · location · map pin</span><span>② Destination: search · map pin</span><div className="tg-digital-map"><b>③ Map context + directions</b></div></div><p>①–② Keep start and destination together. Search and map pins support people who know a landmark but not its address. ③ Keep the map available for context.</p></section><section><h3>02 / Reading the itinerary</h3><div className="tg-digital" aria-label="Reconstructed itinerary wireframe"><span>① Summary: estimated time · fare · walking</span><span>② Walk to the named boarding point</span><span>③ Ride → alight → final walk</span></div><p>① Keep estimates beside the result. ② Name the boarding point. ③ Show vehicle and walking legs in travel order, including the alighting point.</p></section></div>
    <Prototype/>
  </>
}

function System() {
  const [selected, setSelected] = useState(2)
  const screen = screens[selected]
  return <><p className="tg-lead">Find the service. Find the stop. Understand the trip.</p><div className="tg-screen-tabs" aria-label="Product walkthrough">{screens.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.caption}</button>)}</div>
    <div className={'tg-system-view ' + (selected === 3 ? 'tg-system-mobile' : '')}><Photo key={screen.id} {...screen} caption={screen.caption}/><div><span className="tg-eyebrow">Current working app · captured November 2026</span><h3>{screen.title}</h3><p>{screen.description}</p><p className="tg-hand-note">Tap the photograph<br/>to see the details ↗</p></div></div>
    <Note title="Optional features & real-world limits"><p>Browser location can support progress, rerouting, and arrival guidance when permission and device capabilities allow. This follows the passenger’s position; it is not live vehicle tracking.</p><p>elAI helps with city and transport questions, selecting places, and starting a plan. The planner computes the itinerary, and manual planning remains available. Incorrect-route reporting provides a private report reference when enabled in the deployment.</p><p>Fares and travel times are estimates. Suggested transfers still need field verification.</p></Note>
  </>
}

function Build() {
  return <><p className="tg-lead">My work connected the map, the planner, and the moments between.</p>
    <ol className="tg-build-notes"><li><h3>Map & itinerary</h3><p>Helped build and refine the React map experience, trip planning, transfer handling, and search. Focused on turning a computed route into usable boarding and walking steps.</p></li><li><h3>Navigation & arrival</h3><p>Improved trip-start behavior and live-navigation updates, including ending navigation when the passenger arrives.</p></li><li><h3>Assistance & feedback</h3><p>Integrated elAI with place search and trip context, and added an incorrect-route reporting flow.</p></li><li><h3>Delivery</h3><p>Set up automated Firebase deployment so application changes could reach the hosted build consistently.</p></li></ol>
    <div className="tg-flow" aria-label="System flow"><span>Start + destination<small>Manual input or elAI</small></span><b aria-hidden="true">→</b><span>Trip planner<small>Service catalog + local road data</small></span><b aria-hidden="true">→</b><span>Map + itinerary<small>Ranked options & ordered legs</small></span></div>
    <ul className="tg-tech" aria-label="Current technologies">{['React + Vite', 'Leaflet', 'Supabase', 'OSM road graph', 'GeoJSON', 'OpenRouteService', 'Firebase Hosting'].map(tech => <li key={tech}>{tech}</li>)}</ul>
    <Note title="Implementation evidence & responsibilities"><p>The project history records elAI map integration (fc016b6), place search and trip context (638c162), navigation/search updates (aeb425e), arrival handling (30ecac3), route reporting (03096f9), and Firebase deployment (8584a33).</p><p>The assistant uses a Supabase Edge Function with Groq and checks catalog references. The route planner uses eligible stops, directional patterns, and local road data. Crossing lines on a map do not by themselves establish a usable transfer.</p><a href="https://github.com/rooli19/transpogapo-react-demo" target="_blank" rel="noreferrer">Explore the project repository ↗</a></Note>
  </>
}

function Evaluation() {
  return <><p className="tg-lead">Encouraging ratings. A clear next area to improve.</p><div className="tg-evaluation"><div className="tg-score"><span className="tg-eyebrow">Overall evaluation</span><strong>4.61<span>/5</span></strong><p>21 complete end-user responses</p></div><div className="tg-score-list">{[['Usefulness', '4.62'], ['Ease of use', '4.51'], ['Completeness of information', '4.71']].map(([label, score]) => <div key={label}><span>{label}</span><strong>{score}<small> / 5</small></strong></div>)}</div></div>
    <div className="tg-design-notes"><section><h3>Keep the route cues</h3><p><strong>4.86/5</strong> for color-coded routes helping users identify the vehicle. Keep color paired with route names.</p></section><section><h3>Make the layout clearer</h3><p><strong>4.33/5</strong> for layout clarity—the lowest ease-of-use item. Test clearer labels and first-use guidance.</p></section></div>
    <Note title="What this evaluation can—and cannot—tell us"><p>Users explored the system and completed a five-point questionnaire. Nineteen of the 21 evaluators lived in Olongapo; 15 were age 20. These ratings describe participating users’ perceptions, not measured reductions in missed rides, fares paid, or journey time. Separate usability rounds and attributed participant quotes were not available.</p></Note>
    <Note title="Accessibility in the current system"><p>Route names accompany color. Planner suggestions support keyboard navigation, and start/destination fields have labels. The mobile menu supports focus trapping, Escape, and focus restoration. Navigation updates use polite announcements; relevant homepage experiences respect reduced motion.</p><p>These are implemented behaviors, not a claim of a completed accessibility audit. Screen-reader testing and measured contrast results were not identified in the reviewed materials.</p></Note>
    <Note title="Engineering benchmark: computation is not journey quality"><p>Across 300 timed runs over 30 origin–destination cases, mean local computation was 171.228 ms with the road graph already loaded and external routing disabled. This excludes first load and end-to-end network time.</p><p>Only 2 of 15 transfer-reference cases returned a top-ranked option containing a vehicle transfer. Different trip structures limit conclusions about transfer quality; returning an itinerary is not proof of a field-verified trip.</p></Note>
  </>
}

function Next() {
  return <div className="tg-ending"><blockquote>“A useful route needs to explain the decisions a passenger makes at street level.”</blockquote><p className="tg-caption">My implementation takeaway</p><p>Naming the boarding point, describing the walking connection, and showing the next vehicle makes the itinerary easier to explain. Fast computation and a practical journey are separate things to evaluate.</p>
    <ol className="tg-next-list"><li><h3>Take it into the field</h3><p>Check stops, route directions, walking links, and transfer feasibility with local transport partners.</p></li><li><h3>Make the first trip clearer</h3><p>Test persistent names and symbols alongside color, plus guidance for finding a boarding point.</p></li><li><h3>Listen to more passengers</h3><p>Include more visitors, ages, devices, and network conditions. Measure task completion and first load separately from routing.</p></li></ol>
    <div className="tg-end-links"><a className="tg-button" href="https://transpogapo.web.app/map" target="_blank" rel="noreferrer">Try TranspoGAPO ↗</a><a href="https://www.linkedin.com/in/rholly-cao/">Let’s connect ↗</a><a href={sitePath('works.html')}>Back to all projects</a><a href={sitePath('works/resh.html')}>Next project: RESH →</a></div><p className="tg-hand-note">Thanks for traveling through my notebook.</p>
    <Note title="About this case study’s sources"><p>Adapted from the instructor’s 26-slide Case Study Slide Deck Template and the TranspoGAPO project context reviewed through November 17, 2026. Research figures come from the team’s defense materials; implementation descriptions come from the application and commit history. Persona, journey, wireframes, and the low-fidelity flow are labeled reconstructions or illustrations.</p></Note>
  </div>
}

const contents = [Overview, People, JourneyChapter, Design, System, Build, Evaluation, Next]
export default function TranspoChapters({ index }) {
  const Content = contents[index]
  return <Content/>
}
