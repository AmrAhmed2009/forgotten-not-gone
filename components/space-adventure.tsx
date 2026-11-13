"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Compass, Radio, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ENGINEERING_CHOICES,
  FUTURE_PREDICTIONS,
  type EngineeringChoiceId,
  type ExplorerInterest,
  type FuturePredictionId,
  type MachinePartId,
} from "@/components/adventure-content"
import {
  DiscoveryScreen,
  EngineeringScreen,
  LegacyScreen,
  MissionReportScreen,
  MissionSelectionScreen,
  WelcomeScreen,
} from "@/components/adventure-screens"

type AdventureStage = "welcome" | "selection" | "discovery" | "engineering" | "legacy" | "report"

const stageNames = ["Welcome", "Mission", "Discover", "Engineer", "Legacy", "Report"]
const stageIndex: Record<AdventureStage, number> = {
  welcome: 0,
  selection: 1,
  discovery: 2,
  engineering: 3,
  legacy: 4,
  report: 5,
}

export default function SpaceAdventure() {
  const [stage, setStage] = useState<AdventureStage>("welcome")
  const [nickname, setNickname] = useState("")
  const [age, setAge] = useState("")
  const [interest, setInterest] = useState<ExplorerInterest | null>(null)
  const [discoveredParts, setDiscoveredParts] = useState<MachinePartId[]>([])
  const [selectedPart, setSelectedPart] = useState<MachinePartId | null>(null)
  const [readyToDecide, setReadyToDecide] = useState(false)
  const [engineeringChoice, setEngineeringChoice] = useState<EngineeringChoiceId | null>(null)
  const [prediction, setPrediction] = useState<FuturePredictionId | null>(null)
  const previousStage = useRef(stage)

  useEffect(() => {
    if (previousStage.current !== stage) {
      document.querySelector<HTMLElement>("[data-stage-title]")?.focus()
      previousStage.current = stage
    }
  }, [stage])

  function beginMission() {
    setDiscoveredParts([])
    setSelectedPart(null)
    setReadyToDecide(false)
    setEngineeringChoice(null)
    setPrediction(null)
    setStage("discovery")
  }

  function selectPart(part: MachinePartId) {
    setSelectedPart(part)
    setDiscoveredParts((current) => current.includes(part) ? current : [...current, part])
  }

  function restartAdventure() {
    setNickname("")
    setAge("")
    setInterest(null)
    setDiscoveredParts([])
    setSelectedPart(null)
    setReadyToDecide(false)
    setEngineeringChoice(null)
    setPrediction(null)
    setStage("welcome")
  }

  const activeIndex = stageIndex[stage]
  const reportChoice = ENGINEERING_CHOICES.find((option) => option.id === engineeringChoice)
  const reportPrediction = FUTURE_PREDICTIONS.find((option) => option.id === prediction)

  return (
    <main className="adventure-shell">
      <div className="ambient-stars" aria-hidden="true" />
      <header className="site-header">
        <button className="brand" type="button" onClick={restartAdventure} aria-label="Forgotten, Not Gone, restart adventure">
          <span className="brand-mark"><Sparkles aria-hidden="true" /></span>
          <span className="brand-wordmark">forgotten,<br /><b>not gone.</b></span>
        </button>
        <div className="header-transmission"><span className="transmission-dot" /> SPACE EXPLORER PROGRAM <i>/</i> FIELD LOG 001</div>
        <div className="header-mission"><Compass aria-hidden="true" /><span>MISSION <b>01</b></span><span className="header-planet">MARS</span></div>
      </header>

      <nav className="stage-progress" aria-label="Adventure progress">
        <ol>
          {stageNames.map((name, index) => (
            <li key={name} className={index < activeIndex ? "is-complete" : index === activeIndex ? "is-current" : ""} aria-current={index === activeIndex ? "step" : undefined}>
              <span className="progress-number">{index < activeIndex ? <span aria-hidden="true">✓</span> : `0${index + 1}`}</span>
              <span className="progress-name">{name}</span>
            </li>
          ))}
        </ol>
        <span className="progress-summary">STAGE <b>0{activeIndex + 1}</b> / 06</span>
      </nav>

      <div className="stage-content" key={stage}>
        {stage === "welcome" && (
          <WelcomeScreen
            nickname={nickname}
            age={age}
            interest={interest}
            onNicknameChange={setNickname}
            onAgeChange={setAge}
            onInterestChange={setInterest}
            onLaunch={() => { setNickname((current) => current.trim()); setStage("selection") }}
          />
        )}
        {stage === "selection" && interest && (
          <MissionSelectionScreen nickname={nickname} interest={interest} onInvestigate={beginMission} onBack={() => setStage("welcome")} />
        )}
        {stage === "discovery" && (
          <DiscoveryScreen
            discovered={discoveredParts}
            selected={selectedPart}
            onSelect={selectPart}
            onContinue={() => { setEngineeringChoice(null); setReadyToDecide(false); setStage("engineering") }}
            onBack={() => setStage("selection")}
          />
        )}
        {stage === "engineering" && (
          <EngineeringScreen
            ready={readyToDecide}
            choice={engineeringChoice}
            onReady={() => setReadyToDecide(true)}
            onChoose={setEngineeringChoice}
            onContinue={() => { setPrediction(null); setStage("legacy") }}
            onBack={() => setStage("discovery")}
          />
        )}
        {stage === "legacy" && (
          <LegacyScreen prediction={prediction} onPrediction={setPrediction} onContinue={() => setStage("report")} onBack={() => setStage("engineering")} />
        )}
        {stage === "report" && reportChoice && reportPrediction && (
          <MissionReportScreen
            nickname={nickname}
            engineeringChoice={reportChoice.id}
            prediction={reportPrediction.id}
            onRestart={restartAdventure}
            onBackToMissions={() => setStage("selection")}
          />
        )}
      </div>

      <footer className="site-footer"><span><Radio aria-hidden="true" /> A STORY ABOUT THE MACHINES WE LEAVE BEHIND.</span><span>MADE FOR CURIOUS MINDS <Star aria-hidden="true" /></span><a className="footer-top-link" href="https://www.jpl.nasa.gov/missions/ingenuity/" target="_blank" rel="noreferrer" aria-label="Visit NASA's Ingenuity mission page"><ArrowUpRight aria-hidden="true" /></a></footer>
    </main>
  )
}
