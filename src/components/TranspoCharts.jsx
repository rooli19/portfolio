import { useId, useState } from 'react'
import { motion } from 'motion/react'
import { Cutout, StoryMeter, StoryText, useStoryReducedMotion } from './TranspoScenes'
import { evaluationCategories, evaluationQuestions, painPoints, plannerBenchmark } from '../content/transpogapo'

function StoryChart({ title, views, children }) {
  const heading = useId()
  const [viewIndex, setViewIndex] = useState(0)
  const [selectedId, select] = useState(views[0].rows[0].id)
  const reduce = useStoryReducedMotion()
  const view = views[viewIndex]
  const selectedIndex = view.rows.findIndex(row => row.id === selectedId)
  const selected = view.rows[selectedIndex]

  function changeView(index) {
    setViewIndex(index)
    if (!views[index].rows.some(row => row.id === selectedId)) select(views[index].rows[0].id)
  }

  return <section className="tg-chart" aria-labelledby={heading}>
    <StoryText as="h3" id={heading}>{title}</StoryText>
    <div className="tg-chart-body">
      <div className="tg-chart-data">
        {views.length > 1 && <div className="tg-chart-views" role="group" aria-label={`${title} view`}>
          {views.map(({ label }, index) => <button type="button" key={label}
            aria-pressed={viewIndex === index} onClick={() => changeView(index)}>{label}</button>)}
        </div>}
        <p className="tg-chart-scale">{view.description}</p>
        <ul className="tg-chart-rows">
          {view.rows.map(row => <li key={row.id}>
            <button type="button" aria-pressed={selectedId === row.id} onClick={() => select(row.id)}>
              <span>{row.label}</span><strong>{row.display}</strong>
              {view.ranked
                ? <span className="tg-chart-rank" aria-hidden="true" style={{ '--tg-rank': `${row.fraction * 100}%` }}/>
                : <StoryMeter value={row.fraction}/>}
            </button>
          </li>)}
        </ul>
      </div>
      <div className="tg-chart-aside">
        <div className="tg-chart-reading" aria-live="polite" aria-atomic="true">
          <strong>{selected.label}</strong>
          <p>{selected.detail}</p>
        </div>
        <motion.div key={selected.id} className="tg-chart-art" aria-hidden="true"
          initial={reduce ? false : { opacity: .25, y: 16, scale: .94 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: selectedIndex % 2 === 0 ? -6 : 5 }}
          transition={{ duration: reduce ? 0 : .35, ease: 'easeOut' }}>
          <Cutout name={selected.art} className="tg-chart-cutout"/>
        </motion.div>
      </div>
    </div>
    {children && <div className="tg-chart-context">{children}</div>}
  </section>
}

const surveyViews = [
  {
    label: 'How many selected it',
    description: 'Four featured difficulties from a multiple-selection question. Counts are out of 100 respondents.',
    rows: painPoints.map(row => ({ ...row, display: `${row.count} of 100`, fraction: row.count / 100 })),
  },
  {
    label: 'How often it happened',
    description: 'Mean frequency ranks from a separate question. A lower rank means the difficulty happened more often.',
    ranked: true,
    rows: painPoints.map(row => ({ ...row, display: row.rank, fraction: (Number(row.rank) - 1) / 5 })),
  },
]

export function SurveyChart() {
  return <StoryChart title="What makes a trip difficult?" views={surveyViews}/>
}

const benchmarkViews = [{
  description: 'Mean local computation in milliseconds. Bars share a 0–250 ms scale.',
  rows: plannerBenchmark.map(row => ({ ...row, display: `${row.milliseconds} ms`, fraction: Number(row.milliseconds) / 250 })),
}]

export function BenchmarkChart() {
  return <StoryChart title="How quickly did the planner respond?" views={benchmarkViews}>
    <StoryText>Across 300 timed runs, the overall mean was <strong>171.228 ms</strong>. The road graph was already loaded and external routing was off. First-load and network time were excluded.</StoryText>
    <StoryText>Only <strong>2 of 15</strong> transfer-reference cases returned a top-ranked option with a vehicle transfer. The timing results measure computation speed. Transfer quality still needs field verification.</StoryText>
  </StoryChart>
}

const ratingViews = [
  { label: 'Category averages', description: 'Mean ratings out of 5 across the three evaluation categories.', rows: evaluationCategories },
  { label: 'Individual questions', description: 'Mean ratings out of 5 for two individual questionnaire items.', rows: evaluationQuestions },
].map(view => ({
  ...view,
  rows: view.rows.map(row => ({ ...row, display: `${row.rating} / 5`, fraction: Number(row.rating) / 5 })),
}))

export function RatingsChart() {
  return <StoryChart title="How did users rate the app?" views={ratingViews}>
    <StoryText>The 21 respondents rated the app after exploring it. These ratings capture their experience using the system. Missed rides, fares paid, and real trip times were outside the evaluation.</StoryText>
  </StoryChart>
}
