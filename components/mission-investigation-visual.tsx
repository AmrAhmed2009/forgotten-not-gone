"use client"

import { Check, ScanLine } from "lucide-react"
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

  return (
    <figure className={`mission-diagram mission-diagram-${mission.id}${compact ? " is-compact" : ""}`}>
      <div className="diagram-key"><ScanLine aria-hidden="true" /><span>EDUCATIONAL COMPONENT DIAGRAM</span><small>NOT A PHOTOGRAPH</small></div>
      <div className="diagram-canvas" aria-label={`Labeled technical diagram of ${mission.artifact}`}>
        <div className="diagram-scene" aria-hidden="true"><span /><span /><span /></div>
        <div className="diagram-machine" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        {interactive && mission.hotspots.map((hotspot, index) => {
          const component = mission.components.find((item) => item.id === hotspot.id)
          const isFound = discovered.includes(hotspot.id)
          const isSelected = selectedId === hotspot.id
          return (
            <button
              key={hotspot.id}
              type="button"
              className={`diagram-hotspot${isFound ? " is-found" : ""}${isSelected ? " is-selected" : ""}`}
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
      <figcaption><span>SIMPLIFIED VISUAL GUIDE</span>{mission.diagramCaption}</figcaption>
    </figure>
  )
}
