"use client"

import { Check, ScanLine } from "lucide-react"
import type { CSSProperties } from "react"
import type { MissionRecord } from "@/components/adventure-content"

type MissionInvestigationVisualProps = {
  mission: MissionRecord
  selectedId?: string | null
  discovered?: string[]
  onSelect?: (id: string) => void
  compact?: boolean
}

export function MissionInvestigationVisual({ mission, selectedId = null, discovered = [], onSelect, compact = false }: MissionInvestigationVisualProps) {
  const interactive = Boolean(onSelect)
  const isIngenuity = mission.id === "ingenuity"

  return (
    <figure className={`mission-diagram mission-diagram-${mission.id}${isIngenuity ? " is-ingenuity" : ""}${compact ? " is-compact" : ""}`}>
      <div className="diagram-key"><ScanLine aria-hidden="true" /><span>{isIngenuity ? "INGENUITY TECHNICAL ILLUSTRATION" : "EDUCATIONAL COMPONENT DIAGRAM"}</span><small>NOT A PHOTOGRAPH</small></div>
      <div
        className={`diagram-canvas${selectedId ? " has-focus" : ""}`}
        style={selectedId ? ({ "--focus-x": `${mission.hotspots.find((hotspot) => hotspot.id === selectedId)?.x ?? 50}%`, "--focus-y": `${mission.hotspots.find((hotspot) => hotspot.id === selectedId)?.y ?? 50}%` } as CSSProperties) : undefined}
        aria-label={`Labeled technical diagram of ${mission.artifact}`}
      >
        {isIngenuity ? <IngenuityIllustration /> : <GenericIllustration />}
        {interactive && mission.hotspots.map((hotspot, index) => {
          const component = mission.components.find((item) => item.id === hotspot.id)
          const isFound = discovered.includes(hotspot.id)
          const isSelected = selectedId === hotspot.id
          return (
            <button
              key={hotspot.id}
              type="button"
              className={`diagram-hotspot hotspot-${hotspot.id}${isFound ? " is-found" : ""}${isSelected ? " is-selected" : ""}`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={() => onSelect?.(hotspot.id)}
              aria-pressed={isSelected}
              aria-label={`${isFound ? "Review" : "Investigate"} ${component?.name ?? `component ${index + 1}`}`}
            >
              <span className="hotspot-ring" /><span className="hotspot-core">{isFound ? <Check aria-hidden="true" /> : `0${index + 1}`}</span><span className="hotspot-label">{component?.name}</span>
            </button>
          )
        })}
      </div>
      {interactive && isIngenuity && <ul className="sr-only" aria-label="Ingenuity component investigation alternatives">{mission.components.map((component) => <li key={component.id}><button type="button" onClick={() => onSelect?.(component.id)}>{discovered.includes(component.id) ? "Review" : "Investigate"} {component.name}</button></li>)}</ul>}
      <figcaption><span>{isIngenuity ? "NASA-VERIFIED COMPONENT GUIDE" : "SIMPLIFIED VISUAL GUIDE"}</span>{isIngenuity ? <>Team-created diagram based on NASA&apos;s documented Ingenuity technical specifications: top solar array, counter-rotating rotors, and underside navigation camera.</> : mission.diagramCaption}</figcaption>
    </figure>
  )
}

function IngenuityIllustration() {
  return <div className="ingenuity-illustration" aria-hidden="true"><div className="ingenuity-sky"><span /><span /><span /></div><div className="ingenuity-ground" /><div className="ingenuity-shadow" /><div className="ingenuity-helicopter"><span className="ingenuity-rotor ingenuity-rotor-back" /><span className="ingenuity-rotor ingenuity-rotor-front" /><span className="ingenuity-mast" /><span className="ingenuity-solar" /><span className="ingenuity-body" /><span className="ingenuity-leg ingenuity-leg-one" /><span className="ingenuity-leg ingenuity-leg-two" /><span className="ingenuity-camera" /></div></div>
}

function GenericIllustration() {
  return <><div className="diagram-scene" aria-hidden="true"><span /><span /><span /></div><div className="diagram-machine" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div></>
}
