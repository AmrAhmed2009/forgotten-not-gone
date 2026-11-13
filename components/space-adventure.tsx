"use client"

import { useState } from "react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, Compass, Heart, Lightbulb, LockKeyhole, Radio, RotateCcw, Sparkles, Star, Telescope, Zap } from "lucide-react"
import { ClueId, LunarScene } from "@/components/lunar-scene"

type Stage = "briefing" | "exploration" | "challenge" | "complete"

type Clue = {
  eyebrow: string
  title: string
  copy: string
  fact: string
  icon: typeof Telescope
}

const clues: Record<ClueId, Clue> = {
  "descent-stage": {
    eyebrow: "OBJECT 01 · THE LANDER",
    title: "A last step, still here.",
    copy: "The Eagle’s lower half stayed behind when the astronauts blasted off. It became a quiet landmark on the Moon.",
    fact: "NASA FACT · Apollo 11’s lunar module descent stage remains at Tranquility Base.",
    icon: Telescope,
  },
  footprints: {
    eyebrow: "OBJECT 02 · THE FOOTPRINTS",
    title: "A trail with no wind.",
    copy: "Look closely: those tiny steps mark a human visit to another world. There is no weather here to sweep them away.",
    fact: "NASA FACT · With no wind or rain on the Moon, footprints can last for a very long time.",
    icon: Compass,
  },
  experiment: {
    eyebrow: "OBJECT 03 · THE SCIENCE",
    title: "A message from inside the Moon.",
    copy: "Apollo 11 astronauts placed science instruments here and brought moon rocks home. Every clue helped us understand our neighbor.",
    fact: "NASA FACT · The Apollo 11 Passive Seismic Experiment measured moonquakes until 1969.",
    icon: Radio,
  },
}

const signalRoutes = [
  { id: "direct", title: "Moon → Earth", note: "Send it straight home" },
  { id: "relay", title: "Moon → relay → Earth", note: "Bounce the signal around the ridge" },
  { id: "lander", title: "Moon → lander → Earth", note: "Use the old lander as a booster" },
]

export default function SpaceAdventure() {
  const [stage, setStage] = useState<Stage>("briefing")
  const [visited, setVisited] = useState<ClueId[]>([])
  const [selected, setSelected] = useState<ClueId | null>(null)
  const [route, setRoute] = useState<string | null>(null)
  const [routeMessage, setRouteMessage] = useState("")
  const [signalRestored, setSignalRestored] = useState(false)

  function investigate(id: ClueId) {
    setSelected(id)
    setVisited((current) => current.includes(id) ? current : [...current, id])
  }

  function checkRoute() {
    if (!route) {
      setRouteMessage("Choose a route for the signal first.")
      return
    }
    if (route === "relay") {
      setRouteMessage("That’s it! The relay clears the ridge and carries your signal home.")
      setSignalRestored(true)
    } else {
      setRouteMessage(route === "direct" ? "The crater ridge blocks a straight shot. Can you bounce the signal higher?" : "The lander is a silent landmark now. Try sending the signal through orbit.")
    }
  }

  function resetMission() {
    setStage("briefing")
    setVisited([])
    setSelected(null)
    setRoute(null)
    setRouteMessage("")
    setSignalRestored(false)
  }

  const activeClue = selected ? clues[selected] : null
  const ActiveIcon = activeClue?.icon

  return (
    <main className="adventure-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); resetMission() }} aria-label="Forgotten, Not Gone — mission home">
          <span className="brand-mark"><Sparkles aria-hidden="true" /></span>
          <span className="brand-name">forgotten<span>,</span><br />not gone<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-center"><span className="signal-dot" /> SPACE EXPLORER PROGRAM <span className="topbar-divider">/</span> FIELD LOG 001</div>
        <div className="topbar-right"><span className="orbit-icon"><Star aria-hidden="true" /></span><span>MISSION <b>01</b></span></div>
      </header>

      <section className="mission-shell" aria-live="polite">
        {stage === "briefing" && <Briefing onStart={() => setStage("exploration")} />}

        {stage === "exploration" && (
          <>
            <div className="mission-heading">
              <div className="mission-heading-copy">
                <div className="eyebrow"><span className="eyebrow-line" /> FIRST FOOTPRINTS <span className="eyebrow-dot">·</span> THE MOON, 1969</div>
                <h1>One small step.<br /><span>A very long echo.</span></h1>
                <p>Something is still here at Tranquility Base. Scan the landing site and collect three clues.</p>
              </div>
              <div className="mission-stamp"><span className="stamp-small">YOUR FIELD LOG</span><span className="stamp-count">0{visited.length}<i>/</i>03</span><span className="stamp-label">CLUES FOUND</span><div className="stamp-bars" aria-label={`${visited.length} of 3 clues found`}>{[0, 1, 2].map((i) => <span key={i} className={i < visited.length ? "filled" : ""} />)}</div></div>
            </div>
            <div className="game-layout">
              <div className="scene-column"><LunarScene visited={visited} selected={selected} onSelect={investigate} /></div>
              <aside className="mission-panel" aria-label="Mission field log">
                <div className="panel-top"><div className="panel-icon"><Compass aria-hidden="true" /></div><span>FIELD LOG <i>·</i> 001</span><span className="panel-live"><span /> RECORDING</span></div>
                {activeClue && ActiveIcon ? (
                  <div className="clue-content" key={selected}>
                    <div className="clue-eyebrow">{activeClue.eyebrow}</div>
                    <div className="clue-title-row"><span className="clue-big-icon"><ActiveIcon aria-hidden="true" /></span><h2>{activeClue.title}</h2></div>
                    <p className="clue-copy">{activeClue.copy}</p>
                    <div className="fact-note"><span className="fact-icon"><Lightbulb aria-hidden="true" /></span><p>{activeClue.fact}</p></div>
                    <div className="log-saved"><Check aria-hidden="true" /> CLUE ADDED TO YOUR LOG</div>
                  </div>
                ) : (
                  <div className="empty-log"><span className="empty-orbit"><Telescope aria-hidden="true" /></span><h2>Your discovery log<br />is waiting.</h2><p>Tap a glowing scan point on the Moon to uncover your first clue.</p><div className="empty-instruction"><span>TIP</span> Start with the golden lander.</div></div>
                )}
                <div className="panel-footer"><span className="footer-signal" /><span>TRUST THE CLUES. FOLLOW THE SIGNAL.</span></div>
              </aside>
            </div>
            <div className="mission-bottom"><button className="text-button" type="button" onClick={() => setStage("briefing")}><ArrowLeft aria-hidden="true" /> MISSION BRIEFING</button><div className="bottom-progress"><span className="bottom-progress-dots">{[0, 1, 2].map((i) => <i key={i} className={i < visited.length ? "active" : ""} />)}</span><span>{visited.length === 3 ? "ALL CLUES COLLECTED" : `${3 - visited.length} CLUE${3 - visited.length === 1 ? "" : "S"} LEFT TO FIND`}</span></div><button className="primary-button small-button" type="button" disabled={visited.length < 3} onClick={() => { setRoute(null); setRouteMessage(""); setStage("challenge") }}>{visited.length < 3 ? <><LockKeyhole aria-hidden="true" /> SCAN ALL 3 CLUES</> : <>SOLVE THE SIGNAL <ArrowRight aria-hidden="true" /></>}</button></div>
          </>
        )}

        {stage === "challenge" && (
          <div className="challenge-page">
            <button className="text-button back-link" type="button" onClick={() => setStage("exploration")}><ArrowLeft aria-hidden="true" /> BACK TO THE MOON</button>
            <div className="challenge-card">
              <div className="challenge-visual" aria-hidden="true"><div className="signal-orbit orbit-one" /><div className="signal-orbit orbit-two" /><div className="signal-moon"><span /></div><div className="signal-satellite"><Radio /></div><div className="signal-earth"><span /></div><div className="signal-ridge" /><div className="signal-path"><i /><i /><i /></div><div className="signal-label signal-label-moon">MOON</div><div className="signal-label signal-label-relay">RELAY</div><div className="signal-label signal-label-earth">HOME</div></div>
              <div className="challenge-content">
                <div className="eyebrow"><span className="eyebrow-line" /> ENGINEER’S CHALLENGE</div>
                <h1>Can you get<br /><span>the signal home?</span></h1>
                <p className="challenge-story">A crater ridge is blocking your scout’s message. The relay satellite is above it. Choose the path that can reach Earth.</p>
                <div className="route-heading"><Zap aria-hidden="true" /> PICK A SIGNAL ROUTE</div>
                <div className="route-options" role="radiogroup" aria-label="Choose a signal route">{signalRoutes.map((option, index) => <button type="button" key={option.id} role="radio" aria-checked={route === option.id} className={`route-option${route === option.id ? " selected" : ""}`} onClick={() => { setRoute(option.id); setRouteMessage("") }}><span className="route-index">0{index + 1}</span><span className="route-text"><b>{option.title}</b><small>{option.note}</small></span><span className="route-select" aria-hidden="true">{route === option.id && <Check />}</span></button>)}</div>
                {routeMessage && <p className={`route-feedback${signalRestored ? " success" : ""}`} role="status">{signalRestored && <Check aria-hidden="true" />}{routeMessage}</p>}
                {!signalRestored ? <button className="primary-button check-button" type="button" onClick={checkRoute}>TEST MY ROUTE <ArrowRight aria-hidden="true" /></button> : <button className="primary-button check-button" type="button" onClick={() => setStage("complete")}>OPEN THE ARCHIVE <ArrowRight aria-hidden="true" /></button>}
                <p className="simulation-note">SCOUT RELAY IS PART OF THIS STORY SIMULATION.</p>
              </div>
            </div>
            <div className="challenge-fact"><span><Lightbulb aria-hidden="true" /> REAL SPACE SCIENCE</span><p>Radio signals travel in straight lines. A relay in orbit can pass a message over obstacles, just like a lighthouse passing a light along.</p></div>
          </div>
        )}

        {stage === "complete" && <MissionComplete onReplay={resetMission} onReturn={() => setStage("exploration")} />}
      </section>
      <footer className="page-footer"><span>AN ADVENTURE THROUGH THE THINGS WE LEAVE BEHIND.</span><span>MADE FOR CURIOUS MINDS <Heart aria-hidden="true" /></span></footer>
    </main>
  )
}

function Briefing({ onStart }: { onStart: () => void }) {
  return (
    <div className="briefing-layout" id="home">
      <div className="briefing-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> A SPACE EXPLORER ADVENTURE <span className="eyebrow-dot">·</span> CHAPTER 01</div>
        <h1>Some things<br />are left behind.<br /><span>Nothing is<br />forgotten.</span></h1>
        <p className="briefing-description">The Moon is full of stories. Put on your explorer boots and find the ones still waiting to be heard.</p>
        <button className="primary-button start-button" type="button" onClick={onStart}><span className="button-spark"><Sparkles aria-hidden="true" /></span> START YOUR EXPEDITION <ArrowRight aria-hidden="true" /></button>
        <div className="briefing-meta"><span><Compass aria-hidden="true" /> ONE MOON MISSION</span><i /><span><Star aria-hidden="true" /> THREE CLUES</span><i /><span><Zap aria-hidden="true" /> ONE BIG IDEA</span></div>
      </div>
      <div className="briefing-art-wrap">
        <div className="briefing-orbit orbit-large" /><div className="briefing-orbit orbit-small" />
        <div className="briefing-art">
          <svg viewBox="0 0 590 490" role="img" aria-labelledby="hero-title hero-desc">
            <title id="hero-title">A tiny explorer visits the Apollo 11 lunar module on the Moon</title>
            <desc id="hero-desc">Illustration of a friendly space explorer looking toward the historic lunar lander with Earth rising in the background.</desc>
            <defs><linearGradient id="heroGround" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#65758c"/><stop offset="1" stopColor="#303d56"/></linearGradient><linearGradient id="heroFoil" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffdfa0"/><stop offset="1" stopColor="#bd7540"/></linearGradient><radialGradient id="heroEarth"><stop stopColor="#adfff2"/><stop offset=".45" stopColor="#54c5d8"/><stop offset="1" stopColor="#3165a5"/></radialGradient></defs>
            <g fill="#f6edce"><circle cx="44" cy="62" r="2"/><circle cx="117" cy="131" r="1.5"/><circle cx="171" cy="47" r="1.4"/><circle cx="227" cy="111" r="1"/><circle cx="302" cy="40" r="1.6"/><circle cx="445" cy="85" r="1.5"/><circle cx="524" cy="56" r="2"/><circle cx="548" cy="178" r="1.4"/><circle cx="76" cy="223" r="1"/><circle cx="215" cy="202" r="1.6"/><circle cx="398" cy="187" r="1"/></g>
            <circle cx="466" cy="142" r="54" fill="#3bbed1" opacity=".12"/><circle cx="466" cy="142" r="38" fill="url(#heroEarth)"/><path d="m443 131 15-11 10 3 4 11-11 4-5 13-13-6Zm29 18 10-8 10 4 3 11-12 8-8-5Z" fill="#91dfc3" opacity=".75"/>
            <path d="M0 364c98-53 159-15 248-49 92-35 200-4 342 4v171H0Z" fill="#28354d"/><path d="M0 395c102-38 163-19 264-28 126-12 209 14 326-8v131H0Z" fill="url(#heroGround)"/><ellipse cx="345" cy="422" rx="160" ry="20" fill="#202c42" opacity=".55"/>
            <g transform="translate(322 199)"><path d="m34 88-38 91m38-91 76 91m-76-91-7 95m7-95 49 95" fill="none" stroke="#d9ddd7" strokeWidth="5" strokeLinecap="round"/><path d="m24 65 14-23h70l18 23-7 42-22 19H48l-23-19Z" fill="url(#heroFoil)" stroke="#f7d38d" strokeWidth="2"/><path d="m38 42 12-21h48l12 21Z" fill="#f0cd7d" stroke="#fae4ad" strokeWidth="2"/><path d="m51 51 8-15h31l8 15-3 26H53Z" fill="#34566b" stroke="#f1d295" strokeWidth="3"/><path d="m57 57 12-15h11l12 15v16H57Z" fill="#5e9aa2"/><path d="m25 77-20 12 8 12 18-10m97-14 20 12-8 12-18-10" fill="#dea864" stroke="#f4d79a" strokeWidth="2"/><path d="m52 124-17 21m60-21 19 21" fill="none" stroke="#edc777" strokeWidth="5"/><circle cx="74" cy="0" r="4" fill="#65e8e7"/></g>
            <g transform="translate(173 330)"><ellipse cx="38" cy="88" rx="48" ry="9" fill="#1f2b41" opacity=".55"/><path d="m24 49-10 42m31-42 12 42m-39-31-14 31m46-31 17 31" stroke="#d6e0e1" strokeWidth="5" strokeLinecap="round"/><path d="M13 31Q11 9 36 7q25 2 23 24l-5 34H17Z" fill="#78ced2" stroke="#d4f2ec" strokeWidth="3"/><path d="M9 32Q4 4 36 3q32 1 28 29l-7 1Q56 12 36 12 16 12 15 34Z" fill="#f7f2e5"/><rect x="18" y="23" width="36" height="25" rx="11" fill="#364b65" stroke="#b5dce0" strokeWidth="2"/><path d="M23 31q11-8 26 0v10H23Z" fill="#9ce7e2" opacity=".75"/><path d="m13 50-14 17 9 7 17-12m32-12 15 17-9 7-17-12" fill="#f4f0e2" stroke="#d1e9e4" strokeWidth="2"/><rect x="9" y="75" width="21" height="13" rx="5" fill="#f4c26d"/><rect x="39" y="75" width="21" height="13" rx="5" fill="#f4c26d"/><path d="m18 71 4 7m25-7-3 7" stroke="#37566a" strokeWidth="3"/><path d="m5 28-10-9m10 2-12-2" stroke="#f4c26d" strokeWidth="2"/><circle cx="-6" cy="17" r="3" fill="#78e8e5"/></g>
            <g transform="translate(105 398) rotate(-17)"><ellipse cx="0" cy="0" rx="5" ry="3" fill="#d0d1c9"/><ellipse cx="20" cy="12" rx="5" ry="3" fill="#d0d1c9"/><ellipse cx="40" cy="0" rx="5" ry="3" fill="#d0d1c9"/><ellipse cx="60" cy="12" rx="5" ry="3" fill="#d0d1c9"/></g>
            <path d="M0 468h590" stroke="#b5c5d0" strokeOpacity=".2"/>
            <text x="294" y="483" textAnchor="middle" fill="#a7b8c7" fontSize="11" letterSpacing="2" fontFamily="monospace">TRANQUILITY BASE · 0°40′N 23°28′E</text>
          </svg>
          <div className="art-sticker"><span>THE MOON<br />IS KEEPING<br /><b>OUR SECRETS.</b></span><span className="sticker-star"><Sparkles aria-hidden="true" /></span></div>
          <div className="art-coordinate"><span>MISSION LOCATION</span><b>TRANQUILITY<br />BASE, THE MOON</b></div>
        </div>
        <div className="briefing-orbit-label"><span /> 238,900 MILES FROM HOME</div>
      </div>
      <div className="briefing-bottom"><span><span className="bottom-pulse" /> TRANSMISSION RECEIVED</span><span>AN ADVENTURE ABOUT THE THINGS WE LEAVE BEHIND <ArrowUpRight aria-hidden="true" /></span></div>
    </div>
  )
}

function MissionComplete({ onReplay, onReturn }: { onReplay: () => void; onReturn: () => void }) {
  return (
    <div className="complete-page">
      <div className="complete-confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="complete-orbit"><div className="complete-moon"><span><Sparkles /></span></div><div className="complete-star star-a"><Star /></div><div className="complete-star star-b"><Star /></div><div className="complete-star star-c"><Sparkles /></div></div>
      <div className="complete-copy"><div className="eyebrow"><span className="eyebrow-line" /> SIGNAL RECEIVED <span className="eyebrow-dot">·</span> ARCHIVE OPEN</div><h1>Not forgotten.<br /><span>Not even close.</span></h1><p>Your signal made it home. So did the stories of the people, footprints, and discoveries they left on the Moon.</p><blockquote>“A machine can be left behind.<br />The courage it carried can’t.”</blockquote><div className="complete-stats"><span><Check /> 03 CLUES FOUND</span><i /><span><Radio /> SIGNAL RESTORED</span><i /><span><Star /> MISSION COMPLETE</span></div><div className="complete-actions"><button className="primary-button" type="button" onClick={onReplay}><RotateCcw aria-hidden="true" /> PLAY AGAIN</button><button className="text-button" type="button" onClick={onReturn}>EXPLORE THE MOON <ChevronRight aria-hidden="true" /></button></div><p className="source-note">FACT CHECK: NASA APOLLO 11 MISSION ARCHIVE · THE RELAY IS A STORY SIMULATION.</p></div>
    </div>
  )
}
