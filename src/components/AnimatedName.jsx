import { useEffect, useState } from 'react'

const letterDelays = [0, 105, 45, 150, 75]

export default function AnimatedName({ text, playIntro }) {
  const [introActive, setIntroActive] = useState(playIntro)

  useEffect(() => {
    if (!playIntro) return
    const timer = window.setTimeout(() => setIntroActive(false), 2000)
    return () => window.clearTimeout(timer)
  }, [playIntro])

  return <h1 className="home-name" aria-label={text}>
    <span className="home-name-text" data-intro={introActive || undefined} aria-hidden="true">
      {text.split(' ').map((word, wordIndex) =>
        <span key={wordIndex}>
          {wordIndex > 0 && ' '}
          <span className="home-name-word">
            {Array.from(word, (letter, letterIndex) =>
              <span className="home-name-letter" key={letterIndex}
                style={{ '--letter-delay': `${letterDelays[(wordIndex + letterIndex) % letterDelays.length]}ms` }}>
                <span className="home-name-fill">{letter}</span>
                <span className="home-name-sketch">{letter}</span>
              </span>
            )}
          </span>
        </span>
      )}
    </span>
  </h1>
}
