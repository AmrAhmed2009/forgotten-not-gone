import { Check, Radio, ScanLine } from "lucide-react"

export type ClueId = "descent-stage" | "footprints" | "experiment"

const markers: { id: ClueId; number: string; label: string; className: string }[] = [
  { id: "descent-stage", number: "01", label: "Lunar Module", className: "marker-lander" },
  { id: "footprints", number: "02", label: "Footprints", className: "marker-tracks" },
  { id: "experiment", number: "03", label: "Science package", className: "marker-experiment" },
]

export function LunarScene({
  visited,
  selected,
  onSelect,
}: {
  visited: ClueId[]
  selected: ClueId | null
  onSelect: (id: ClueId) => void
}) {
  return (
    <div className="scene-wrap">
      <div className="scene-topline">
        <span><span className="live-dot" /> LIVE SCAN</span>
        <span>TRANQUILITY BASE · 0°40′N 23°28′E</span>
      </div>
      <div className="scene-window">
        <svg className="lunar-art" viewBox="0 0 760 530" role="img" aria-labelledby="scene-title scene-desc">
          <title id="scene-title">Apollo 11 landing site on the Moon</title>
          <desc id="scene-desc">A stylized lunar surface with the Apollo 11 descent stage, a science experiment, footprints, and Earth in the distance.</desc>
          <defs>
            <linearGradient id="space" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#081326"/><stop offset="1" stopColor="#142949"/></linearGradient>
            <linearGradient id="moon" x1="0" y1="0" x2="0.72" y2="1"><stop stopColor="#73839b"/><stop offset=".42" stopColor="#485a75"/><stop offset="1" stopColor="#26334d"/></linearGradient>
            <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff1bd"/><stop offset=".45" stopColor="#db9d55"/><stop offset="1" stopColor="#8c5b3d"/></linearGradient>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffe2a2"/><stop offset="1" stopColor="#d98d46"/></linearGradient>
            <radialGradient id="earth" cx="35%" cy="25%"><stop stopColor="#b9fff7"/><stop offset=".35" stopColor="#43c2d9"/><stop offset="1" stopColor="#2866ae"/></radialGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <rect width="760" height="530" fill="url(#space)"/>
          <g className="starfield" fill="#f7f2db">
            <circle cx="65" cy="72" r="1.7"/><circle cx="141" cy="150" r="1"/><circle cx="194" cy="52" r="1.5"/><circle cx="260" cy="111" r="1"/><circle cx="320" cy="67" r="1.8"/><circle cx="397" cy="145" r="1"/><circle cx="465" cy="56" r="1.4"/><circle cx="552" cy="127" r="1"/><circle cx="645" cy="71" r="1.7"/><circle cx="703" cy="166" r="1"/><circle cx="103" cy="222" r="1"/><circle cx="353" cy="192" r="1.5"/><circle cx="495" cy="212" r="1"/><circle cx="692" cy="245" r="1.4"/><circle cx="40" cy="196" r="1.3"/>
          </g>
          <circle cx="617" cy="150" r="49" fill="#46cce2" opacity=".13" filter="url(#glow)"/>
          <circle cx="617" cy="150" r="35" fill="url(#earth)"/>
          <path d="M590 140c9-8 16-8 24-14l8 5-4 9 7 5-6 9-11 2-4 13-9-2-2-12-9-5 6-10Zm33-16 10 3 4 8-7 5-8-7 1-9Zm-53 36 8-3 8 8-5 10-9-4-2-11Z" fill="#96e2c4" opacity=".78"/>
          <text x="617" y="207" textAnchor="middle" fill="#a9dce5" fontSize="11" letterSpacing="2" fontFamily="monospace">EARTH</text>
          <path d="M0 361c92-35 150-14 235-39 92-26 147-8 225-24 93-20 183-5 300 27v205H0Z" fill="#303d58"/>
          <path d="M0 392c108-44 191-16 280-34 102-21 180 11 257-4 88-18 145-5 223 18v158H0Z" fill="url(#moon)"/>
          <path d="M0 418c94-28 142-25 226-7m266-4c74-25 142-29 268-3" fill="none" stroke="#9babc0" strokeOpacity=".23" strokeWidth="3"/>
          <ellipse cx="112" cy="460" rx="64" ry="13" fill="#27344b" opacity=".8"/><ellipse cx="112" cy="457" rx="46" ry="7" fill="#70809a" opacity=".55"/>
          <ellipse cx="636" cy="430" rx="58" ry="12" fill="#243249" opacity=".78"/><ellipse cx="636" cy="427" rx="38" ry="6" fill="#74839a" opacity=".48"/>
          <g opacity=".7" fill="#c2c7c5"><circle cx="226" cy="445" r="2"/><circle cx="202" cy="474" r="1.5"/><circle cx="539" cy="450" r="2"/><circle cx="575" cy="480" r="1.4"/><circle cx="275" cy="484" r="1.5"/><circle cx="708" cy="460" r="2"/><circle cx="45" cy="480" r="1.3"/></g>
          <g className="footprints" fill="#c6c6bc" opacity=".55" transform="rotate(-17 457 443)"><ellipse cx="414" cy="437" rx="5" ry="3"/><ellipse cx="431" cy="448" rx="5" ry="3"/><ellipse cx="448" cy="437" rx="5" ry="3"/><ellipse cx="465" cy="448" rx="5" ry="3"/><ellipse cx="482" cy="437" rx="5" ry="3"/></g>
          <g className="lander">
            <ellipse cx="390" cy="406" rx="112" ry="16" fill="#1b2940" opacity=".7"/>
            <path d="m353 301-47 92m47-92 80 92m-80-92-8 101m8-101 51 101" stroke="#d6d5c9" strokeWidth="5" strokeLinecap="round"/>
            <path d="m295 386-16 9 7 10 24-1m133-18 16 9-7 10-24-1m-50-2-15 8 8 8 16-1m34-15 14 7-7 8-15-1" fill="none" stroke="#b8c3c5" strokeWidth="4" strokeLinejoin="round"/>
            <path d="m326 276 16-28h81l19 28-8 43-25 20h-54l-24-19Z" fill="url(#foil)" stroke="#f8d48f" strokeWidth="2"/>
            <path d="m343 248 14-25h53l13 25Z" fill="#efc675" stroke="#fff0c0" strokeWidth="2"/>
            <path d="m354 258 9-17h43l9 17-4 28h-53Z" fill="#263d58" stroke="#e7c784" strokeWidth="3"/>
            <path d="m361 263 15-16h13l14 16v19h-42Z" fill="#477b8a" opacity=".88"/>
            <path d="m337 310-7 34 24 10 9-15m68-29 7 34-22 10-8-15" fill="#bc834e" stroke="#f2cb84" strokeWidth="2"/>
            <path d="m367 337-4 15m47-15 5 15" stroke="#f4dfa9" strokeWidth="3"/>
            <path d="m329 285-20 16 9 12 19-14m93-14 20 16-9 12-19-14" fill="url(#gold)" stroke="#f9d696" strokeWidth="2"/>
            <path d="m376 223 9-22m0 0 10-10m-9 10-9-7" stroke="#d8e9e9" strokeWidth="2"/>
            <circle cx="386" cy="200" r="3" fill="#7ee7ed" filter="url(#glow)"/>
            <path d="m345 351-21 21m72-20 22 21" stroke="#e0e2db" strokeWidth="2" opacity=".75"/>
          </g>
          <g transform="translate(233 381)"><path d="M0 0v31m-12-26 12 3 12-3M-14 8l14 3 14-3" stroke="#e7ab62" strokeWidth="2"/><path d="M-18 32h36" stroke="#aab7c2" strokeWidth="2"/><circle cy="4" r="4" fill="#55dce4"/></g>
          <g transform="translate(552 388)"><path d="M0 0v20m-18 0 18-6 18 6m-36 6 18-6 18 6M-22 27h44" fill="none" stroke="#f0c982" strokeWidth="2"/><rect x="-8" y="-11" width="16" height="11" rx="2" fill="#8bb6b1" stroke="#f0c982" strokeWidth="2"/><path d="M0-11v-8" stroke="#f0c982" strokeWidth="2"/></g>
          <path d="M0 505h760" stroke="#a4b4c5" strokeOpacity=".16"/>
          <text x="22" y="514" fill="#a5b4c7" fontSize="10" letterSpacing="1.4" fontFamily="monospace">APOLLO 11 · JULY 1969</text>
          <text x="737" y="514" textAnchor="end" fill="#a5b4c7" fontSize="10" letterSpacing="1.4" fontFamily="monospace">SURFACE VIEW · 01</text>
        </svg>
        {markers.map((marker) => {
          const isVisited = visited.includes(marker.id)
          const isSelected = selected === marker.id
          return (
            <button
              key={marker.id}
              type="button"
              className={`scene-marker ${marker.className}${isSelected ? " is-selected" : ""}${isVisited ? " is-visited" : ""}`}
              onClick={() => onSelect(marker.id)}
              aria-label={`${isVisited ? "Revisit" : "Explore"} ${marker.label}`}
              aria-pressed={isSelected}
            >
              <span className="marker-ring"><span>{isVisited ? <Check aria-hidden="true" /> : <ScanLine aria-hidden="true" />}</span></span>
              <span className="marker-tag"><span>{marker.number}</span> {marker.label}</span>
            </button>
          )
        })}
        <div className="scene-beacon" aria-hidden="true"><Radio /></div>
      </div>
      <div className="scene-caption"><span><span className="caption-key" /> SCAN POINT</span><span>Tap a marker to investigate</span></div>
    </div>
  )
}
