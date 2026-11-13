"use client"

import { useEffect, useRef, useState } from "react"
import { Compass, Radio, Sparkles, Star } from "lucide-react"
import { WelcomeScreen, MissionSelectionScreen, ArrivalScreen, InvestigationScreen, ChallengeScreen, HistoryScreen, TransmissionScreen, LegacyScreen, MissionReportScreen } from "@/components/adventure-screens"
import { INTEREST_PROFILES, MISSION_DATA, type AgeBand, type ExplorerInterest, type MissionId } from "@/components/adventure-content"

type AdventureStage = "welcome" | "selection" | "arrival" | "investigation" | "challenge" | "history" | "transmission" | "legacy" | "report"

const stageNames = ["Welcome", "Mission", "Arrival", "Investigate", "Challenge", "Archive", "Transmission", "Legacy", "Report"]
const stageIndex: Record<AdventureStage, number> = { welcome: 0, selection: 1, arrival: 2, investigation: 3, challenge: 4, history: 5, transmission: 6, legacy: 7, report: 8 }

export default function SpaceAdventure() {
  const [stage, setStage] = useState<AdventureStage>("welcome")
  const [nickname, setNickname] = useState("")
  const [age, setAge] = useState("")
  const [interest, setInterest] = useState<ExplorerInterest | null>(null)
  const [selectedMission, setSelectedMission] = useState<MissionId | null>(null)
  const [completedMissions, setCompletedMissions] = useState<MissionId[]>([])
  const [discovered, setDiscovered] = useState<string[]>([])
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [challengeChoice, setChallengeChoice] = useState<string | null>(null)
  const [challengeTested, setChallengeTested] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [controls, setControls] = useState({ rotorSize: 72, rotorSpeed: 78, weight: 28 })
  const previousStage = useRef(stage)

  const mission = MISSION_DATA.find((item) => item.id === selectedMission) ?? null
  const ageBand: AgeBand = age === "10" || age === "11" ? "younger" : age === "12" || age === "13" || age === "14" ? "older" : "unknown"
  const activeIndex = stageIndex[stage]
  const profile = interest ? INTEREST_PROFILES[interest] : null

  useEffect(() => {
    if (previousStage.current !== stage) {
      document.querySelector<HTMLElement>("[data-stage-title]")?.focus()
      previousStage.current = stage
    }
  }, [stage])

  function startMission(id: MissionId) {
    setSelectedMission(id)
    setDiscovered([])
    setSelectedComponent(null)
    setChallengeChoice(null)
    setChallengeTested(false)
    setPrediction(null)
    setControls({ rotorSize: 72, rotorSpeed: 78, weight: 28 })
    setStage("arrival")
  }

  function beginChallenge() {
    setChallengeChoice(null)
    setChallengeTested(false)
    setStage("challenge")
  }

  function recordChallenge() {
    setChallengeTested(true)
  }

  function finishMission() {
    if (selectedMission && !completedMissions.includes(selectedMission)) setCompletedMissions((current) => [...current, selectedMission])
    setStage("report")
  }

  function restartAdventure() {
    setStage("welcome")
    setNickname("")
    setAge("")
    setInterest(null)
    setSelectedMission(null)
    setCompletedMissions([])
    setDiscovered([])
    setSelectedComponent(null)
    setChallengeChoice(null)
    setChallengeTested(false)
    setPrediction(null)
  }

  function exploreAnother() {
    setSelectedMission(null)
    setStage("selection")
  }

  function replayMission() {
    if (selectedMission) startMission(selectedMission)
  }

  return <main className="adventure-shell"><div className="ambient-stars" aria-hidden="true" /><header className="site-header"><button className="brand" type="button" onClick={restartAdventure} aria-label="Forgotten, Not Gone, restart adventure"><span className="brand-mark"><Sparkles aria-hidden="true" /></span><span className="brand-wordmark">forgotten,<br /><b>not gone.</b></span></button><div className="header-transmission"><span className="transmission-dot" /> SPACE EXPLORER PROGRAM <i>/</i> ARCHIVE 001</div><div className="header-mission"><Compass aria-hidden="true" /><span>{mission ? "MISSION" : "ARCHIVE"} <b>{mission?.number ?? "00"}</b></span><span className="header-planet">{mission?.planet.toUpperCase() ?? "MULTI-WORLD"}</span></div></header><nav className="stage-progress" aria-label="Adventure progress"><ol>{stageNames.map((name, index) => <li key={name} className={index < activeIndex ? "is-complete" : index === activeIndex ? "is-current" : ""} aria-current={index === activeIndex ? "step" : undefined}><span className="progress-number">{index < activeIndex ? <span aria-hidden="true">✓</span> : `0${index + 1}`}</span><span className="progress-name">{name}</span></li>)}</ol><span className="progress-summary">STAGE <b>0{activeIndex + 1}</b> / 09</span></nav><div className="stage-content" key={`${stage}-${selectedMission ?? "none"}`}>{stage === "welcome" && <WelcomeScreen nickname={nickname} age={age} interest={interest} onNicknameChange={setNickname} onAgeChange={setAge} onInterestChange={setInterest} onLaunch={() => { setNickname((current) => current.trim()); setStage("selection") }} />}{stage === "selection" && interest && <MissionSelectionScreen nickname={nickname} ageBand={ageBand} interest={interest} completedMissions={completedMissions} selectedMission={selectedMission} onSelect={startMission} onBack={() => setStage("welcome")} />}{stage === "arrival" && mission && interest && <ArrivalScreen mission={mission} interest={interest} ageBand={ageBand} onContinue={() => setStage("investigation")} onBack={exploreAnother} />}{stage === "investigation" && mission && interest && <InvestigationScreen mission={mission} interest={interest} ageBand={ageBand} discovered={discovered} selected={selectedComponent} onSelect={(id) => { setSelectedComponent(id); setDiscovered((current) => current.includes(id) ? current : [...current, id]) }} onContinue={beginChallenge} onBack={() => setStage("arrival")} />}{stage === "challenge" && mission && interest && <ChallengeScreen mission={mission} interest={interest} ageBand={ageBand} selectedChoice={challengeChoice} controls={controls} tested={challengeTested} onControl={(name, value) => setControls((current) => ({ ...current, [name]: value }))} onChoose={setChallengeChoice} onTest={recordChallenge} onContinue={() => setStage("history")} onBack={() => setStage("investigation")} />}{stage === "history" && mission && <HistoryScreen mission={mission} choice={challengeChoice} onContinue={() => setStage("transmission")} onBack={() => setStage("challenge")} />}{stage === "transmission" && mission && <TransmissionScreen mission={mission} onContinue={() => setStage("legacy")} onBack={() => setStage("history")} />}{stage === "legacy" && mission && <LegacyScreen mission={mission} prediction={prediction} onPrediction={setPrediction} onContinue={finishMission} onBack={() => setStage("transmission")} />}{stage === "report" && mission && interest && <MissionReportScreen mission={mission} nickname={nickname} ageBand={ageBand} interest={interest} discovered={discovered} choice={challengeChoice} prediction={prediction} challengeSummary={mission.challengeChoices.find((choice) => choice.id === challengeChoice)?.consequence ?? "You recorded an observation."} onReplay={replayMission} onExploreAnother={exploreAnother} />}</div><footer className="site-footer"><span><Radio aria-hidden="true" /> {profile ? `${profile.skill.toUpperCase()} · ${mission?.shortTitle.toUpperCase() ?? "ARCHIVE"}` : "A STORY ABOUT THE MACHINES WE LEAVE BEHIND."}</span><span>MADE FOR CURIOUS MINDS <Star aria-hidden="true" /></span><a className="footer-top-link" href="https://science.nasa.gov/" target="_blank" rel="noreferrer" aria-label="Visit NASA Science"><Star aria-hidden="true" /></a></footer></main>
}
