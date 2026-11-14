import { Check, Info } from "lucide-react"
import { INGENUITY_PARTS, type MachinePartId } from "@/components/adventure-content"

type IngenuitySceneProps = {
  discovered: MachinePartId[]
  selected: MachinePartId | null
  onSelect: (part: MachinePartId) => void
  interactive?: boolean
}

const hotspotPositions: Record<MachinePartId, string> = {
  blades: "hotspot-blades",
  antennas: "hotspot-antennas",
  solar: "hotspot-solar",
  batteries: "hotspot-batteries",
  avionics: "hotspot-avionics",
  sensors: "hotspot-sensors",
  legs: "hotspot-legs",
}

export function IngenuityScene({
  discovered,
  selected,
  onSelect,
  interactive = true,
}: IngenuitySceneProps) {
  return (
    <figure className={`ingenuity-figure${interactive ? "" : " ingenuity-figure-static"}`}>
      <div className="ingenuity-frame">
        <svg className="ingenuity-svg" viewBox="0 0 840 520" role="img" aria-labelledby="ingenuity-title ingenuity-description">
          <title id="ingenuity-title">NASA’s Ingenuity Mars Helicopter above the surface of Mars</title>
          <desc id="ingenuity-description">A labeled, illustrated view of Ingenuity showing its rotor blades, solar panel, and downward-facing navigation camera.</desc>
          <defs>
            <linearGradient id="mars-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#17233a" />
              <stop offset=".53" stopColor="#633544" />
              <stop offset="1" stopColor="#b86145" />
            </linearGradient>
            <linearGradient id="mars-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d78554" />
              <stop offset="1" stopColor="#6f3540" />
            </linearGradient>
            <linearGradient id="helicopter-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff3d7" />
              <stop offset="1" stopColor="#b8c8c7" />
            </linearGradient>
            <radialGradient id="martian-sun">
              <stop stopColor="#ffe2a5" />
              <stop offset="1" stopColor="#e9975f" stopOpacity="0" />
            </radialGradient>
            <filter id="soft-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="840" height="520" fill="url(#mars-sky)" />
          <circle cx="683" cy="123" r="82" fill="url(#martian-sun)" />
          <circle cx="683" cy="123" r="28" fill="#f8c27f" opacity=".82" />
          <g fill="#fff0d5" opacity=".78">
            <circle cx="95" cy="88" r="2" /><circle cx="171" cy="153" r="1.5" /><circle cx="278" cy="65" r="1.7" />
            <circle cx="591" cy="69" r="1.5" /><circle cx="772" cy="207" r="1.4" /><circle cx="739" cy="55" r="1.2" />
            <circle cx="51" cy="201" r="1.3" /><circle cx="529" cy="170" r="1.4" /><circle cx="218" cy="217" r="1" />
          </g>
          <path d="M0 340c93-38 160-9 251-32 105-27 174 4 268-17 112-25 203-7 321 21v208H0Z" fill="#7c4145" />
          <path d="M0 381c103-34 199-16 293-30 108-17 176 6 275-12 89-16 172-2 272 24v157H0Z" fill="url(#mars-ground)" />
          <path d="M0 431c112-27 205-12 315-22m215 0c113-30 187-10 310 11" fill="none" stroke="#f2b37c" strokeOpacity=".25" strokeWidth="3" />
          <g fill="#4a2c3a" opacity=".44">
            <ellipse cx="130" cy="437" rx="66" ry="14" /><ellipse cx="721" cy="456" rx="76" ry="17" />
          </g>
          <g fill="#efb27d" opacity=".74">
            <circle cx="94" cy="469" r="3" /><circle cx="190" cy="449" r="2" /><circle cx="652" cy="475" r="3" />
            <circle cx="752" cy="428" r="2" /><circle cx="554" cy="463" r="2.5" /><circle cx="274" cy="477" r="2" />
          </g>
          <ellipse cx="420" cy="374" rx="129" ry="19" fill="#472f3c" opacity=".56" />

          <g className={`machine-part part-rotors${selected === "rotors" ? " part-active" : ""}`}>
            <path d="M272 127 558 101l10 12-292 28Z" fill="#f3e9d5" stroke="#afbcc0" strokeWidth="3" />
            <path d="m296 148 262-23 9 10-267 27Z" fill="#d9e3dd" stroke="#97a7aa" strokeWidth="2" />
            <path d="m287 131 17-2 8 5-17 3m249-27 17-2 8 5-17 3" fill="#e7a872" />
            <path d="M415 120v65" stroke="#e7dfcd" strokeWidth="7" />
            <circle cx="419" cy="124" r="10" fill="#f0b56e" stroke="#fff0d1" strokeWidth="3" filter="url(#soft-glow)" />
          </g>

          <g className={`machine-part part-solar${selected === "solar" ? " part-active" : ""}`}>
            <path d="m362 193 15-13h84l17 13v14H362Z" fill="#263f60" stroke="#efc988" strokeWidth="3" />
            <path d="M383 181v24m25-24v24m25-24v24m-67-12h108" stroke="#72d4dd" strokeOpacity=".8" strokeWidth="2" />
            <path d="m418 181 2-16 2 16" fill="none" stroke="#dedfd5" strokeWidth="4" />
          </g>

          <g className="machine-part part-body">
            <path d="m390 207 12-13h42l13 13v57h-67Z" fill="url(#helicopter-body)" stroke="#f8e2b9" strokeWidth="3" />
            <path d="m403 211 9-8h21l10 8v24h-40Z" fill="#526d78" stroke="#d4d8ca" strokeWidth="2" />
            <path d="m410 216 9-8h7l9 8v14h-25Z" fill="#9edfe0" opacity=".83" />
            <path d="m396 246 56 0" stroke="#d49b67" strokeWidth="4" />
            <path d="m397 264-28 63m75-63 28 63m-77-34-22 34m72-34 22 34" fill="none" stroke="#e9dfca" strokeWidth="5" strokeLinecap="round" />
            <path d="m351 328h39m51 0h40" stroke="#f4d49c" strokeWidth="5" strokeLinecap="round" />
          </g>

          <g className={`machine-part part-camera${selected === "camera" ? " part-active" : ""}`}>
            <path d="M415 264v16" stroke="#d7ded6" strokeWidth="4" />
            <circle cx="415" cy="285" r="10" fill="#1e3245" stroke="#edb36f" strokeWidth="3" />
            <circle cx="415" cy="285" r="4" fill="#73dbe0" filter="url(#soft-glow)" />
          </g>
          <path d="M27 492h786" stroke="#ffe1c1" strokeOpacity=".22" />
          <text x="31" y="510" fill="#f4d7bd" fontSize="11" letterSpacing="1.5" fontFamily="monospace">JEZERO CRATER · MARS</text>
          <text x="809" y="510" textAnchor="end" fill="#f4d7bd" fontSize="11" letterSpacing="1.5" fontFamily="monospace">TECHNOLOGY DEMONSTRATION</text>
        </svg>
        <div className="scene-label scene-label-mars"><span className="scene-label-dot" /> MARS · JEZERO CRATER</div>
        {interactive && INGENUITY_PARTS.map((part, index) => {
          const isDiscovered = discovered.includes(part.id)
          const isSelected = selected === part.id
          return (
            <button
              key={part.id}
              className={`hotspot ${hotspotPositions[part.id]}${isDiscovered ? " is-discovered" : ""}${isSelected ? " is-selected" : ""}`}
              type="button"
              onClick={() => onSelect(part.id)}
              aria-label={`${isDiscovered ? "Review" : "Explore"} ${part.name}`}
              aria-pressed={isSelected}
            >
              <span className="hotspot-ring">{isDiscovered ? <Check aria-hidden="true" /> : <span>{String(index + 1).padStart(2, "0")}</span>}</span>
            </button>
          )
        })}
      </div>
      {interactive && (
        <figcaption className="scene-key">
          <span className="scene-key-instruction"><Info aria-hidden="true" /> Tap a highlighted part to discover what it does.</span>
          <ul aria-label="Parts to discover">
            {INGENUITY_PARTS.map((part) => (
              <li key={part.id} className={discovered.includes(part.id) ? "is-discovered" : ""}>
                <span className="scene-key-dot" />{part.name}
              </li>
            ))}
          </ul>
        </figcaption>
      )}
    </figure>
  )
}
