"use client"

import { useEffect, useRef, useState } from "react"
import { Compass, Radio, Star } from "lucide-react"
import { BrandLogoButton } from "@/components/brand-logo"
import { WelcomeScreen, MissionSelectionScreen, ArrivalScreen, InvestigationScreen, ChallengeScreen, HistoryScreen, TransmissionScreen, LegacyScreen, MissionReportScreen } from "@/components/adventure-screens"
import { CaptainNovaDialogue } from "@/components/captain-nova-dialogue"
import { MissionStorybook } from "@/components/mission-storybook"
import { INTEREST_PROFILES, MISSION_DATA, type AgeBand, type ExplorerInterest, type FlightTest, type MissionId } from "@/components/adventure-content"

type AdventureStage = "welcome" | "selection" | "arrival" | "investigation" | "challenge" | "history" | "transmission" | "legacy" | "report"

const stageNames = ["Profile", "Mission", "Arrival", "Explore", "Test", "History", "Signal", "Legacy", "Report"]
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
  const [simulationOutcome, setSimulationOutcome] = useState<string | null>(null)
  const [flightAttempts, setFlightAttempts] = useState<FlightTest[]>([])
  const [prediction, setPrediction] = useState<string | null>(null)
  const [investigationPath, setInvestigationPath] = useState<"systems" | "signal" | null>(null)
  const [controls, setControls] = useState({ rotorSize: 72, rotorSpeed: 78, weight: 28 })
  const previousStage = useRef(stage)

  const mission = MISSION_DATA.find((item) => item.id === selectedMission) ?? null
  const parsedAge = Number(age)
  const ageBand: AgeBand = age === "" || !Number.isInteger(parsedAge) || parsedAge < 0 || parsedAge > 99 ? "unknown" : parsedAge <= 5 ? "caregiver" : parsedAge <= 9 ? "younger" : parsedAge <= 14 ? "younger" : parsedAge <= 17 ? "teen" : "adult"
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
    setSimulationOutcome(null)
    setFlightAttempts([])
    setPrediction(null)
    setInvestigationPath(null)
    setControls({ rotorSize: 72, rotorSpeed: 78, weight: 28 })
    setStage("arrival")
  }

  function beginChallenge() {
    setChallengeChoice(null)
    setChallengeTested(false)
    setStage("challenge")
  }

  function recordChallenge(outcome?: string | FlightTest) {
    if (typeof outcome === "object") {
      setFlightAttempts((current) => [...current, outcome].slice(-5))
      setSimulationOutcome(outcome.summary)
    } else {
      setSimulationOutcome(outcome ?? null)
    }
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
    setSimulationOutcome(null)
    setFlightAttempts([])
    setPrediction(null)
  }

  function exploreAnother() {
    setSelectedMission(null)
    setStage("selection")
  }

  function replayMission() {
    if (selectedMission) startMission(selectedMission)
  }

  function advanceNova() {
    if (stage === "arrival") setStage("investigation")
    else if (stage === "history") setStage("transmission")
    else if (stage === "transmission") setStage("legacy")
    else if (stage === "legacy") finishMission()
  }

  const novaContext = { stage, mission, nickname, interest, ageBand, discovered, selectedComponent, challengeChoice, simulationOutcome, flightAttempts, prediction, investigationPath, completedMissions: completedMissions.length }

  if (selectedMission && stage !== "welcome" && stage !== "selection") {
    return <main className="adventure-shell"><div className="ambient-stars" aria-hidden="true" /><header className="site-header"><BrandLogoButton onActivate={restartAdventure} /><div className="header-transmission"><span className="transmission-dot" /> SPACE EXPLORER PROGRAM <i>/</i> ARCHIVE 001</div><div className="header-mission"><Compass aria-hidden="true" /><span>MISSION <b>{mission?.number}</b></span><span className="header-planet">{mission?.planet.toUpperCase()}</span></div></header><MissionStorybook missionId={selectedMission} nickname={nickname} onReplay={() => startMission(selectedMission)} onChooseAnother={exploreAnother} onFinished={() => { if (!completedMissions.includes(selectedMission)) setCompletedMissions((current) => [...current, selectedMission]) }} /></main>
  }

  return <main className="adventure-shell"><div className="ambient-stars" aria-hidden="true" /><header className="site-header"><BrandLogoButton onActivate={restartAdventure} /><div className="header-transmission"><span className="transmission-dot" /> SPACE EXPLORER PROGRAM <i>/</i> ARCHIVE 001</div><div className="header-mission"><Compass aria-hidden="true" /><span>{mission ? "MISSION" : "ARCHIVE"} <b>{mission?.number ?? "00"}</b></span><span className="header-planet">{mission?.planet.toUpperCase() ?? "MULTI-WORLD"}</span></div></header><CaptainNovaDialogue context={novaContext} onChoosePath={(path) => { setInvestigationPath(path); setStage("investigation") }} onAdvance={advanceNova} /><nav className="stage-progress" aria-label="Adventure progress"><ol>{stageNames.map((name, index) => <li key={name} className={index < activeIndex ? "is-complete" : index === activeIndex ? "is-current" : ""} aria-current={index === activeIndex ? "step" : undefined} aria-label={`Stage ${index + 1}: ${name}${index === activeIndex ? ", current" : index < activeIndex ? ", complete" : ""}`}><span className="progress-number">{index < activeIndex ? <span aria-hidden="true">✓</span> : `0${index + 1}`}</span><span className="progress-name">{name}</span></li>)}</ol></nav><div className="stage-content" key={`${stage}-${selectedMission ?? "none"}`}>{stage === "welcome" && <WelcomeScreen nickname={nickname} age={age} interest={interest} onNicknameChange={setNickname} onAgeChange={(value) => { if (value === "" || (/^\d{1,2}$/.test(value) && Number(value) <= 99)) setAge(value) }} onInterestChange={setInterest} onLaunch={() => { setNickname((current) => current.trim()); setStage("selection") }} />}{stage === "selection" && interest && <MissionSelectionScreen nickname={nickname} ageBand={ageBand} interest={interest} completedMissions={completedMissions} selectedMission={selectedMission} onSelect={startMission} onBack={() => setStage("welcome")} />}{stage === "arrival" && mission && interest && <ArrivalScreen mission={mission} interest={interest} ageBand={ageBand} onContinue={() => setStage("investigation")} onBack={exploreAnother} />}{stage === "investigation" && mission && interest && <InvestigationScreen mission={mission} interest={interest} ageBand={ageBand} discovered={discovered} selected={selectedComponent} investigationPath={investigationPath} onSelect={(id) => { setSelectedComponent(id); setDiscovered((current) => current.includes(id) ? current : [...current, id]) }} onContinue={beginChallenge} onBack={() => setStage("arrival")} />}{stage === "challenge" && mission && interest && <ChallengeScreen mission={mission} interest={interest} ageBand={ageBand} selectedChoice={challengeChoice} controls={controls} tested={challengeTested} flightAttempts={flightAttempts} onControl={(name, value) => setControls((current) => ({ ...current, [name]: value }))} onChoose={setChallengeChoice} onTest={recordChallenge} onContinue={() => setStage("history")} onBack={() => setStage("investigation")} />}{stage === "history" && mission && <HistoryScreen mission={mission} choice={challengeChoice} simulationOutcome={simulationOutcome} onContinue={() => setStage("transmission")} onBack={() => setStage("challenge")} />}{stage === "transmission" && mission && <TransmissionScreen mission={mission} simulationOutcome={simulationOutcome} onContinue={() => setStage("legacy")} onBack={() => setStage("history")} />}{stage === "legacy" && mission && <LegacyScreen mission={mission} prediction={prediction} onPrediction={setPrediction} onContinue={finishMission} onBack={() => setStage("transmission")} />}{stage === "report" && mission && interest && <MissionReportScreen mission={mission} nickname={nickname} age={age} ageBand={ageBand} interest={interest} discovered={discovered} choice={challengeChoice} prediction={prediction} challengeSummary={simulationOutcome ?? mission.challengeChoices.find((choice) => choice.id === challengeChoice)?.consequence ?? "You recorded an observation."} flightAttempts={flightAttempts} investigationPath={investigationPath} onReplay={replayMission} onExploreAnother={exploreAnother} />}</div><footer className="site-footer"><span><Radio aria-hidden="true" /> {profile ? `${profile.skill.toUpperCase()} · ${mission?.shortTitle.toUpperCase() ?? "ARCHIVE"}` : "A STORY ABOUT THE MACHINES WE LEAVE BEHIND."}</span><span>MADE FOR CURIOUS MINDS <Star aria-hidden="true" /></span><a className="footer-top-link" href="https://science.nasa.gov/" target="_blank" rel="noreferrer" aria-label="Visit NASA Science"><Star aria-hidden="true" /></a></footer></main>
}
