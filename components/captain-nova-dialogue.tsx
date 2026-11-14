"use client"

import { useEffect, useMemo, useState } from "react"
import { Volume2 } from "lucide-react"
import type { AgeBand, ExplorerInterest, FlightTest, MissionRecord } from "@/components/adventure-content"

export type NovaExpression = "welcoming" | "curious" | "thinking" | "excited" | "concerned" | "celebrating"

type DialogueEntry = {
  id: string
  expression: NovaExpression
  text: string
  audioSrc?: string
  voiceTimingMs?: number
}

type DialogueContext = {
  stage: string
  mission: MissionRecord | null
  nickname: string
  interest: ExplorerInterest | null
  ageBand: AgeBand
  discovered: string[]
  selectedComponent: string | null
  challengeChoice: string | null
  simulationOutcome: string | null
  flightAttempts: FlightTest[]
  prediction: string | null
  investigationPath: string | null
  completedMissions: number
}

const role = "Fictional educational guide · not a NASA representative"

function makeDialogue(context: DialogueContext): DialogueEntry | null {
  const explorer = context.nickname.trim() || "Explorer"
  const mission = context.mission
  const ageNote = context.ageBand === "younger" ? " I’ll keep our clue turns short and visual." : context.ageBand === "teen" || context.ageBand === "adult" ? " I’ll keep the engineering trade-offs in view." : ""
  if (context.stage === "welcome") return { id: "nova-welcome", expression: "welcoming", text: `I’m Captain Nova, your archive guide. You’ll lead every investigation; I’ll help you notice the clues that keep these missions alive.${ageNote}` }
  if (context.stage === "selection") return { id: "nova-selection", expression: "excited", text: `${explorer}, four quiet machines are still transmitting big stories.${context.completedMissions > 0 ? ` You’ve already completed ${context.completedMissions} mission${context.completedMissions === 1 ? "" : "s"}; your explorer log is growing.` : ""} Choose the mystery you want to chase first.` }
  if (!mission) return null
  if (context.stage === "arrival") return { id: `${mission.id}-mystery`, expression: "curious", text: `${explorer}, something about ${mission.shortTitle} still makes me wonder. Should we start by tracing its systems or by following the last clue it left behind?` }
  if (context.stage === "investigation") {
    if (context.selectedComponent) {
      const component = mission.components.find((item) => item.id === context.selectedComponent)
      return { id: `${mission.id}-clue-${context.selectedComponent}`, expression: "excited", text: `Great catch. The ${component?.name ?? "component"} changes the whole picture. You’ve found ${context.discovered.length} of ${mission.components.length} clues—what does this evidence make you suspect?` }
    }
    return { id: `${mission.id}-discovery`, expression: "curious", text: context.investigationPath === "systems" ? "Let’s trace how the machine works. Tap a glowing component and connect its job to the mystery." : context.investigationPath === "signal" ? "Let’s follow the final clue. Tap a glowing component; each one explains why this machine’s story mattered." : "Start anywhere that catches your eye. The best investigators let evidence lead the way." }
  }
  if (context.stage === "challenge") {
    const latestFlight = context.flightAttempts.at(-1)
    if (latestFlight) return { id: `${mission.id}-test-${latestFlight.attempt}`, expression: latestFlight.outcome === "suitable" ? "celebrating" : latestFlight.outcome === "insufficient" ? "concerned" : "thinking", text: latestFlight.outcome === "suitable" ? "You made the simulation work! Notice the trade-off you balanced, then compare your design with the historical mission." : latestFlight.outcome === "insufficient" ? "That result is useful evidence, not a wrong answer. Change one variable, predict the effect, and test again." : "You’re close. What single adjustment would give this design a little more margin?" }
    if (context.challengeChoice) {
      const choice = mission.challengeChoices.find((item) => item.id === context.challengeChoice)
      return { id: `${mission.id}-choice-${context.challengeChoice}`, expression: "thinking", text: `Interesting route: ${choice?.label ?? "that choice"}. Run the simulation and watch what this decision changes for the team.` }
    }
    return { id: `${mission.id}-experiment`, expression: "thinking", text: `${explorer}, this is your test—not a quiz. Make a prediction, try an option, and use the result as your next clue.` }
  }
  if (context.stage === "history") return { id: `${mission.id}-history`, expression: "curious", text: "Now we switch from our fictional field simulation to the documented record. Your choices shaped your path; NASA’s history stays anchored in evidence." }
  if (context.stage === "transmission") return { id: `${mission.id}-consequence`, expression: "concerned", text: `The mission is quiet now, but its final transmission still points to what ${mission.shortTitle} changed for future explorers.` }
  if (context.stage === "legacy") return { id: `${mission.id}-legacy`, expression: "thinking", text: "Here’s one more mystery: imagine this mission had never happened. Choose a possibility, then separate your thoughtful hypothesis from the evidence in the archive." }
  if (context.stage === "report") return { id: `${mission.id}-report`, expression: "celebrating", text: `${explorer}, you followed clues, made a prediction, and tested an idea. That’s how an explorer turns a quiet machine into a living story.` }
  return null
}

export function CaptainNovaDialogue({ context, onChoosePath }: { context: DialogueContext; onChoosePath: (path: "systems" | "signal") => void }) {
  const entry = useMemo(() => makeDialogue(context), [context])
  const [revealed, setRevealed] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    setRevealed(0)
    setIsPlaying(true)
  }, [entry?.id])

  useEffect(() => {
    if (!entry || !isPlaying || revealed >= entry.text.length) return
    const timer = window.setTimeout(() => setRevealed((current) => current + 1), 12)
    return () => window.clearTimeout(timer)
  }, [entry, isPlaying, revealed])

  if (!entry) return null
  const complete = revealed >= entry.text.length
  const isArrival = context.stage === "arrival"
  return <aside className={`nova-dialogue nova-${entry.expression}`} aria-label="Captain Nova guidance"><div className="nova-portrait"><img className="nova-character" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Friendly%20Futuristic%20Astronaut%20Explorer-eJ8pTYCvnC2qNeY5TSghUxUXBfrIWH.png" alt="Captain Nova, a friendly fictional astronaut explorer in an orange-and-white spacesuit" /></div><div className="nova-message"><div className="nova-message-meta"><span><b>CAPTAIN NOVA</b><i>{role}</i></span><span className="nova-expression-label">{entry.expression.toUpperCase()}</span></div><p aria-live={complete ? "polite" : "off"}>{entry.text.slice(0, revealed)}{!complete && <span className="nova-caret" aria-hidden="true">▍</span>}</p>{isArrival && complete && <div className="nova-responses" aria-label="Choose an investigation approach"><button type="button" onClick={() => onChoosePath("systems")}>TRACE THE SYSTEMS</button><button type="button" onClick={() => onChoosePath("signal")}>FOLLOW THE LAST CLUE</button></div>}<div className="nova-controls"><button type="button" onClick={() => { if (complete) { setRevealed(0); setIsPlaying(true) } else { setRevealed(entry.text.length); setIsPlaying(false) } }}>{complete ? "REPLAY MESSAGE" : "SKIP ANIMATION"}</button><span className="nova-audio-slot"><Volume2 aria-hidden="true" /> Narration ready in a future update</span></div></div></aside>
}
