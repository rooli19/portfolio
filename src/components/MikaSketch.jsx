const expressions = {
  curious: { brows: 'M25 32l8-3m9 1 8 3', eyes: 'M30 38h.1m15 0h.1', mouth: 'M35 48q4 3 8 0' },
  unsure: { brows: 'M25 32l8 2m9-4 8-2', eyes: 'M32 39h.1m15 0h.1', mouth: 'M34 50l9-2' },
  anxious: { brows: 'M25 34l8-4m9 0 8 4', eyes: 'M30 40h.1m15 0h.1', mouth: 'M34 51q4-6 9 0' },
  focused: { brows: 'M25 31l8 4m9 0 8-4', eyes: 'M31 40h.1m15 0h.1', mouth: 'M34 49h9' },
  relieved: { brows: 'M25 32q4-3 8-1m9 0q4-2 8 1', eyes: 'M26 40q4-4 8 0m8 0q4-4 8 0', mouth: 'M33 47q6 9 12 0' },
}

export default function MikaSketch({ mood = 'curious' }) {
  const { brows, eyes, mouth } = expressions[mood]
  return <svg className="tg-mika-sketch" viewBox="0 0 76 76" aria-hidden="true" fill="none" stroke="#292625" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 51q-3-9 1-23Q18 9 35 8q20-3 25 19l3 24q-9 8-23 6-17 2-25-6Z" fill="#383034"/>
    <path d="M13 71q2-12 18-15l2-8h11l2 8q15 3 18 15" fill="#eadeef"/>
    <path d="M32 55q7 9 14 0m-22 5-1 11m31-11 2 11"/>
    <path d="M22 33q14-3 22-14 3 8 11 12l-1 13q-4 12-16 13-14-2-16-15Z" fill="#fff4df"/>
    <path d="m26 45 3 1m18 0 3-1" stroke="#b87775"/>
    <path d={brows}/>
    <path d={eyes} strokeWidth="3"/>
    <path d={mouth}/>
    <path d="m49 23 6-2m-4 6 6-2" stroke="#eadeef"/>
    <path d="M10 20v8m-4-4h8m54 10v6m-3-3h6" stroke="#8a675c" strokeWidth="1.4"/>
  </svg>
}
