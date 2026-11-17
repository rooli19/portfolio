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
  ['53', 'Which jeepney?', 'Identifying the correct route or color code.', 'Pair the color with a route name and endpoints.'],
  ['47', 'Where do I board?', 'Finding the correct terminal or boarding point.', 'Show a named stop and the walk to get there.'],
  ['45', 'What will it cost?', 'Fare uncertainty or overcharging.', 'Put a clearly labeled fare estimate beside the trip.'],
  ['47', 'Where do I transfer?', 'Finding where to change vehicles.', 'Separate the ride, walk, and next boarding step.'],
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
