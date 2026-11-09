import { media } from './media'
import { sitePath } from '../sitePath'

export const projects = [
  {
    slug: 'transpogapo',
    title: 'TranspoGAPO',
    role: 'Lead backend developer',
    category: 'Featured case study',
    summary: 'An interactive navigation system for jeepney and tricycle routes in Olongapo City.',
    technologies: ['JavaScript', 'Leaflet.js', 'Firebase Firestore', 'OOP'],
    problem: 'Local commuters need a way to plan journeys using jeepneys and tricycles. TranspoGAPO brings local transit routes and walking directions together in one web app.',
    contribution: 'As lead backend developer, I developed the dynamic routing system and real-time, turn-by-turn walking directions. I worked on the modular system architecture and database integration.',
    process: 'Our team used Agile development to iterate on the application. I focused on making routing logic and database access maintainable through object-oriented modules.',
    result: 'The project brings local transit navigation into a web application. Explore the live app to see the commuter experience.',
    reflection: '',
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
