import { ExternalLink, ImageIcon, MapPin, Sparkles } from "lucide-react"
import type { MissionRecord } from "@/components/adventure-content"

type MissionArchiveProps = {
  mission: MissionRecord
  compact?: boolean
}

export function MissionArchive({ mission, compact = false }: MissionArchiveProps) {
  return (
    <section className={`mission-archive${compact ? " mission-archive-compact" : ""}`} aria-labelledby="archive-title">
      <div className="archive-header">
        <div>
          <span className="section-kicker">NASA DISCOVERY ARCHIVE</span>
          <h2 id="archive-title">Evidence from the field</h2>
          <p>Real mission media anchors this story. Educational simulations are labeled separately.</p>
        </div>
        <span className="archive-badge"><ImageIcon aria-hidden="true" /> NASA MEDIA</span>
      </div>
      <div className="archive-feature">
        <figure className={`archive-photo archive-photo-${mission.accent}`}>
          <img src={mission.image} alt={mission.imageAlt} loading={compact ? "lazy" : "eager"} />
          <figcaption><span>ACTUAL NASA IMAGE</span>{mission.imageCredit}</figcaption>
        </figure>
        <div className="archive-caption">
          <span className="archive-caption-kicker"><MapPin aria-hidden="true" /> {mission.location}</span>
          <h3>{mission.subtitle}</h3>
          <p>{mission.actualResult}</p>
          <a href={mission.imageSource} target="_blank" rel="noreferrer">View original NASA image <ExternalLink aria-hidden="true" /></a>
        </div>
      </div>
      <div className="archive-timeline" aria-label={`${mission.shortTitle} mission milestones`}>
        <div><span>01</span><b>ARRIVAL</b><p>{mission.why}</p></div>
        <div><span>02</span><b>DISCOVERY</b><p>{mission.discoveries[0]}</p></div>
        <div><span>03</span><b>WHERE IT REMAINS</b><p>{mission.status}</p></div>
      </div>
      <div className="archive-footer"><Sparkles aria-hidden="true" /><span>Image credits and original sources stay beside the evidence.</span><a href={mission.missionSource} target="_blank" rel="noreferrer">NASA mission page <ExternalLink aria-hidden="true" /></a></div>
    </section>
  )
}
