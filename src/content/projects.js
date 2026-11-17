import { media } from './media'
import { sitePath } from '../sitePath'

export const projects = [
  {
    slug: 'transpogapo',
    title: 'TranspoGAPO',
    role: 'Team lead, project coordinator, and implementation lead',
    category: 'Featured case study',
    summary: 'A web-based map and trip planner connecting jeepney routes, tricycle terminals, and walking directions in Olongapo City.',
    technologies: ['React', 'Vite', 'Leaflet', 'Supabase', 'OpenStreetMap', 'OpenRouteService', 'Firebase Hosting'],
    problem: 'Local commuters need a way to plan journeys using jeepneys and tricycles. TranspoGAPO brings local transit routes and walking directions together in one web app.',
    contribution: 'I led implementation and coordination, helped refine the map and trip planner, improved search and live navigation, integrated elAI and route reporting, and automated Firebase deployment.',
    process: 'Our team used a 100-person pre-survey to understand commuter difficulties and a 21-person evaluation to assess the working system.',
    result: 'The 21-person evaluation recorded an overall mean of 4.61/5. These ratings describe participants’ perceptions of the system.',
    reflection: 'A useful itinerary names where to board, explains the walking connection, and shows which vehicle to take next.',
    link: { href: 'https://transpogapo.web.app', label: 'Explore TranspoGAPO ↗' },
  },
  {
    slug: 'resh',
    title: 'RESH',
    role: 'OCR and AI integration',
    category: 'Web application',
    summary: 'An intelligent receipt manager using OCR and AI to automate expense tracking.',
    technologies: ['JavaScript', 'HTML/CSS', 'Firebase', 'Tesseract.js', 'Groq', 'Ollama', 'Node.js'],
    problem: 'People who track expenses often have to enter receipt details by hand. RESH extracts and classifies receipt information to reduce that work.',
    contribution: 'I developed the application and integrated OCR with AI-driven entity recognition. I implemented authenticated access, isolated cloud data storage, and automated document processing workflows.',
    process: 'Receipt recognition, entity extraction, and classification support the expense organization workflow.',
    result: 'RESH combines receipt processing and financial record organization in one web application.',
  },
  {
    slug: 'landr',
    title: 'Landr.',
    role: 'Requirements and pitch lead',
    category: 'Hackathon prototype',
    summary: 'A blockchain-backed land registry prototype, awarded first runner-up at a hackathon.',
    technologies: ['Avalanche', 'MetaMask', 'Firebase', 'Vite', 'Leaflet.js'],
    problem: 'Landr. explores land record submissions, administrative review, and hash-based record verification. We built the prototype during a two-day hackathon.',
    contribution: 'I served as requirements lead and pitch team lead. I contributed to backend architecture and integrated Avalanche communication, MetaMask wallet connectivity, and smart contract transaction handling.',
    process: 'The prototype uses Firestore and Firebase Authentication. Its design includes record submissions, administrative review, and certificate management.',
    result: 'Landr. earned first runner-up recognition at the hackathon.',
  },
  {
    slug: 'hiss-n-miss',
    title: 'Hiss n Miss',
    role: 'Solo developer',
    category: 'Game development',
    summary: 'A voice-controlled arcade game built independently in Python with custom assets.',
    technologies: ['Python', 'NumPy', 'Pygame', 'OOP'],
    problem: 'I built Hiss n Miss for Computer Programming 2. Inspired by side-scrolling obstacle games, it lets players use sound to control the action.',
    contribution: 'I independently built the game, implemented real-time voice input, and created the original sprites, soundtrack, and sound effects.',
    process: 'I used Python, NumPy, and Pygame with an object-oriented design. The voice input connects to the gameplay system so that sound controls the action.',
    result: 'The completed course project combines programming, visual design, and audio production.',
  },
].map(project => ({ ...project, media: media[project.slug] }))

export const projectUrl = slug => sitePath('works/' + slug + '.html')
