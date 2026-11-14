"use client"

import { Check, Maximize2, Minimize2, ScanLine } from "lucide-react"
import { useState, type CSSProperties } from "react"
import type { MissionRecord } from "@/components/adventure-content"

const NASA_DIAGRAM_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anatomy-of-ingenuity-mars-helicopter-OMWWegjUtxd5UxTnKah0vp8xM5H6AA.jpg"

const investigationMasks = [
  { id: "blades", left: "8.6%", top: "4.4%", width: "18.6%", height: "21.5%" },
  { id: "antennas", left: "31.8%", top: "0.8%", width: "29%", height: "15.4%" },
  { id: "solar", left: "77%", top: "19.5%", width: "21.6%", height: "15.8%" },
  { id: "batteries", left: "0%", top: "45.5%", width: "25.2%", height: "15.7%" },
  { id: "avionics", left: "68%", top: "44.5%", width: "21.8%", height: "27.5%" },
  { id: "legs", left: "11.1%", top: "79%", width: "19.8%", height: "19%" },
  { id: "sensors", left: "34%", top: "75.5%", width: "29.5%", height: "21.5%" },
]

type MissionInvestigationVisualProps = {
  mission: MissionRecord
  selectedId?: string | null
  discovered?: string[]
  onSelect?: (id: string) => void
  compact?: boolean
}

export function MissionInvestigationVisual({ mission, selectedId = null, discovered = [], onSelect, compact = false }: MissionInvestigationVisualProps) {
  const [referenceMode, setReferenceMode] = useState(false)
  const [bodyZoom, setBodyZoom] = useState(false)
  const interactive = Boolean(onSelect)
  const isIngenuity = mission.id === "ingenuity"
  const focused = mission.hotspots.find((hotspot) => hotspot.id === selectedId)

  if (!isIngenuity) return <GenericInvestigation mission={mission} selectedId={selectedId} discovered={discovered} onSelect={onSelect} compact={compact} />
  if (compact) return <figure className="nasa-investigation is-compact"><div className="nasa-diagram-canvas"><img src={NASA_DIAGRAM_URL} alt="NASA annotated diagram of Ingenuity Mars Helicopter" /></div></figure>

  return (
    <figure className={`nasa-investigation${referenceMode ? " is-reference" : ""}${bodyZoom ? " is-body-zoom" : ""}${compact ? " is-compact" : ""}`}>
      <div className="nasa-diagram-toolbar">
        <div><ScanLine aria-hidden="true" /><span>{referenceMode ? "NASA REFERENCE MODE" : "INVESTIGATION MODE"}</span></div>
        <button type="button" onClick={() => setReferenceMode((current) => !current)}>{referenceMode ? "Return to Investigation" : "View NASA Diagram"}</button>
        {!referenceMode && <button type="button" className="nasa-zoom-toggle" onClick={() => setBodyZoom((current) => !current)}>{bodyZoom ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}{bodyZoom ? "Full diagram" : "Inspect central body"}</button>}
      </div>
      <div
        className="nasa-diagram-canvas"
        style={focused ? ({ "--focus-x": `${focused.x}%`, "--focus-y": `${focused.y}%` } as CSSProperties) : undefined}
        aria-label={referenceMode ? "Complete NASA annotated diagram of Ingenuity" : "Interactive NASA diagram of Ingenuity with seven component markers"}
      >
        <img src={NASA_DIAGRAM_URL} alt={referenceMode ? "NASA annotated diagram of Ingenuity Mars Helicopter showing blades, antennas, solar panel, batteries, avionics and body, sensors and cameras, and legs" : "NASA Ingenuity helicopter technical diagram with interactive component markers"} />
        {!referenceMode && investigationMasks.map((mask) => <span key={mask.id} className={`nasa-label-mask${discovered.includes(mask.id) ? " is-revealed" : ""}`} style={{ left: mask.left, top: mask.top, width: mask.width, height: mask.height }} aria-hidden="true" />)}
        {!referenceMode && interactive && mission.hotspots.map((hotspot, index) => {
          const component = mission.components.find((item) => item.id === hotspot.id)
          const isFound = discovered.includes(hotspot.id)
          const isSelected = selectedId === hotspot.id
          return <button key={hotspot.id} type="button" className={`nasa-hotspot${isFound ? " is-found" : ""}${isSelected ? " is-selected" : ""}`} style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }} onClick={() => onSelect?.(hotspot.id)} aria-pressed={isSelected} aria-label={`${isFound ? "Review" : "Scan"} ${component?.name ?? `component ${index + 1}`} (clue ${index + 1} of 7)`}><span className="nasa-hotspot-ring" /><span className="nasa-hotspot-core">{isFound ? <Check aria-hidden="true" /> : <ScanLine aria-hidden="true" />}</span><span className="nasa-hotspot-label">{component?.name}</span></button>
        })}
      </div>
      {!referenceMode && interactive && <div className="nasa-clue-list" aria-label="Keyboard-accessible component clue list">{mission.components.map((component, index) => <button key={component.id} type="button" onClick={() => onSelect?.(component.id)} className={selectedId === component.id ? "is-selected" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{discovered.includes(component.id) ? "Review" : "Scan"} {component.name}</button>)}</div>}
      <figcaption><span>NASA AMES · TECHNICAL REFERENCE</span>{referenceMode ? "Unaltered NASA diagram. Source: NASA Ames Research Center presentation, p. 15." : "The printed NASA descriptions are revealed as you make discoveries. The glowing cyan markers are an added learning layer."}</figcaption>
    </figure>
  )
}

function GenericInvestigation({ mission, selectedId, discovered = [], onSelect, compact }: MissionInvestigationVisualProps) {
  return <figure className={`mission-diagram${compact ? " is-compact" : ""}`}><div className="diagram-key"><ScanLine aria-hidden="true" /><span>EDUCATIONAL COMPONENT DIAGRAM</span></div><div className="diagram-canvas" aria-label={`Labeled technical diagram of ${mission.artifact}`}><div className="diagram-scene" aria-hidden="true"><span /><span /><span /></div><div className="diagram-machine" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>{onSelect && mission.hotspots.map((hotspot, index) => { const component = mission.components.find((item) => item.id === hotspot.id); const found = discovered.includes(hotspot.id); return <button key={hotspot.id} type="button" className="diagram-hotspot" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }} onClick={() => onSelect(hotspot.id)} aria-pressed={selectedId === hotspot.id} aria-label={`${found ? "Review" : "Investigate"} ${component?.name ?? `component ${index + 1}`} `}><span className="hotspot-ring" /><span className="hotspot-core">{found ? <Check aria-hidden="true" /> : `0${index + 1}`}</span></button> })}</div><figcaption><span>SIMPLIFIED VISUAL GUIDE</span>{mission.diagramCaption}</figcaption></figure>
}
