export const chapters = [
  { id: 'overview', label: 'The project', title: 'A little less lost.', note: '01 / A commuter’s field guide' },
  { id: 'people', label: 'The people', title: 'Start with the people', note: '02 / Listening before building' },
  { id: 'journey', label: 'The journey', title: 'A route is only half the story', note: '03 / At street level' },
  { id: 'design', label: 'The sketches', title: 'Making room for the next step', note: '04 / Retrospective design explorations' },
  { id: 'system', label: 'The system', title: 'From a place to a plan', note: '05 / Inside the working app' },
  { id: 'build', label: 'My part', title: 'Connecting the moving parts', note: '06 / My implementation notebook' },
  { id: 'evaluation', label: 'The findings', title: 'What the evidence tells us', note: '07 / Evaluation, with context' },
  { id: 'next', label: 'What’s next', title: 'Keep checking the real journey', note: '08 / Lessons to take along' },
]

export const painPoints = [
  { id: 'route', label: 'Which jeepney?', count: 53, rank: '2.40', art: 'placard', detail: 'Pair the route color with a service name and endpoints.' },
  { id: 'boarding', label: 'Where do I board?', count: 47, rank: '3.23', art: 'sign', detail: 'Show a named stop and the walk to get there.' },
  { id: 'fare', label: 'What will it cost?', count: 45, rank: '3.58', art: 'ticket', detail: 'Put a clearly labeled fare estimate beside the trip.' },
  { id: 'transfer', label: 'Where do I transfer?', count: 47, rank: '3.63', art: 'folded-map', detail: 'Separate the ride, walk, and next boarding step.' },
]

export const plannerBenchmark = [
  { id: 'single', label: 'Single-mode reference', milliseconds: '150.836', art: 'stopwatch', detail: '15 origin–destination cases and 150 timed runs. The reference trips used one mode of transport.' },
  { id: 'transfer', label: 'Transfer reference', milliseconds: '191.619', art: 'stopwatch', detail: '15 origin–destination cases and 150 timed runs. The reference trips included vehicle transfers.' },
]

export const evaluationCategories = [
  { id: 'usefulness', label: 'Usefulness', rating: '4.62', art: 'folded-map', detail: 'How useful participants found the system for finding routes and planning trips.' },
  { id: 'ease', label: 'Ease of use', rating: '4.51', art: 'clipboard', detail: 'How easy participants found the system to use and understand.' },
  { id: 'completeness', label: 'Completeness of information', rating: '4.71', art: 'placard', detail: 'How complete participants found the route and trip information presented by the system.' },
]

export const evaluationQuestions = [
  { id: 'color', label: 'Identifying vehicles by route color', rating: '4.86', art: 'placard', detail: 'Participants rated how well route colors helped them identify the right vehicle. Keep the colors alongside route names.' },
  { id: 'clarity', label: 'Layout clarity', rating: '4.33', art: 'clipboard', detail: 'Layout clarity was the lowest ease-of-use item. Give the map and trip details clearer labels and test first-use guidance.' },
]

export const journey = [
  ['Decide to travel', 'How do I get there?', 'A new destination makes a familiar commute unfamiliar.', 'Search by destination or select a place on the map.'],
  ['Find a vehicle', 'Which color do I look for?', 'Local route names and colors need context.', 'Connect the route color to a name and its endpoints.'],
  ['Find boarding', 'Where should I wait?', 'A line on a map does not explain where to stand.', 'Name the boarding point and show the walking connection.'],
  ['Ride & transfer', 'Where do I change vehicles?', 'Getting off is only one part of making a connection.', 'Show where to alight, walk, and board the next vehicle.'],
  ['Arrive', 'Is there a final walk?', 'The vehicle stop may not be the destination.', 'Include the final walking leg and keep time and fare labeled as estimates.'],
]

export const screens = [
  { id: 'routes', title: '01 · Find the right service', file: 'transpogapo-routes.png', alt: 'Current TranspoGAPO map with a selected color-coded jeepney route and its details', caption: 'Explore routes', description: 'Route colors become useful when they sit beside a service name, endpoints, and the route itself.' },
  { id: 'terminals', title: '02 · Find a place to board', file: 'transpogapo-terminals.png', alt: 'Current TranspoGAPO terminal directory with a selected tricycle terminal on the map', caption: 'Locate a terminal', description: 'Bring the terminal and its location together so passengers can orient themselves before leaving.' },
  { id: 'planner', title: '03 · Compare a journey', file: 'transpogapo-planner.png', alt: 'Current TranspoGAPO trip planner showing selected endpoints and generated trip options', caption: 'Plan a trip', description: 'Compare the estimated time, fare, and walking before choosing a recommended itinerary.' },
  { id: 'mobile', title: '04 · Read the next step', file: 'transpogapo-mobile.png', alt: 'Current TranspoGAPO mobile itinerary with ordered walking and vehicle directions', caption: 'Follow directions', description: 'Read the boarding and alighting points in order, including walking legs and supported transfers.' },
]
