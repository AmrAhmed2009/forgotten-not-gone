"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Lightbulb, Volume2 } from "lucide-react"
import type { AgeBand, ExplorerInterest, FlightTest, MissionRecord } from "@/components/adventure-content"

export type NovaExpression = "welcoming" | "curious" | "thinking" | "excited" | "concerned" | "celebrating"

type DialogueEntry = { id: string; expression: NovaExpression; text: string; audioSrc?: string; voiceTimingMs?: number }
type DialogueContext = { stage: string; mission: MissionRecord | null; nickname: string; interest: ExplorerInterest | null; ageBand: AgeBand; discovered: string[]; selectedComponent: string | null; challengeChoice: string | null; simulationOutcome: string | null; flightAttempts: FlightTest[]; prediction: string | null; investigationPath: string | null; completedMissions: number }

const portraitUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captain%20Nova%20Astronaut%20Portrait-hiFfjYQkdCNLl34lSe7MfLH0CYJ9ZT.png"
const role = "Fictional educational guide · not a NASA representative"

function makeDialogue(context: DialogueContext): DialogueEntry | null {
  const explorer = context.nickname.trim() || "Explorer"
  const mission = context.mission
  const ageNote = context.ageBand === "younger" ? " I’ll keep our clue turns short and visual." : context.ageBand === "teen" || context.ageBand === "adult" ? " I’ll keep the engineering trade-offs in view." : ""
  if (context.stage === "welcome") return { id: "nova-welcome", expression: "welcoming", text: `Hey, ${explorer}! I’m Captain Nova. You’ll lead every investigation; I’ll help you notice the clues that keep these machines’ stories alive.${ageNote}` }
  if (context.stage === "selection") return { id: "nova-selection", expression: "excited", text: `${explorer}, four quiet machines are still transmitting big stories. Choose the mystery you want to chase first.` }
  if (!mission) return null
  if (context.stage === "arrival") return { id: `${mission.id}-arrival`, expression: "curious", text: mission.narrative.arrival }
  if (context.stage === "investigation") {
    if (context.selectedComponent) { const component = mission.components.find((item) => item.id === context.selectedComponent); return { id: `${mission.id}-clue-${context.selectedComponent}`, expression: "excited", text: `Great catch. ${component?.observation ?? "That component changes the whole picture."} You’ve found ${context.discovered.length} of ${mission.components.length} clues.` } }
    return { id: `${mission.id}-investigation`, expression: "curious", text: mission.narrative.investigation }
  }
  if (context.stage === "challenge") { const latestFlight = context.flightAttempts.at(-1); if (latestFlight) return { id: `${mission.id}-test-${latestFlight.attempt}`, expression: latestFlight.outcome === "suitable" ? "celebrating" : latestFlight.outcome === "insufficient" ? "concerned" : "thinking", text: latestFlight.outcome === "suitable" ? "You made the simulation work. Compare your design with the historical mission when you’re ready." : latestFlight.outcome === "insufficient" ? "That result is useful evidence. Change one variable, predict the effect, and test again." : "You’re close. What single adjustment would give this design more margin?" }; if (context.challengeChoice) return { id: `${mission.id}-choice-${context.challengeChoice}`, expression: "thinking", text: "Interesting choice. Run the educational simulation and watch what this decision changes for your field team." }; return { id: `${mission.id}-experiment`, expression: "thinking", text: `${explorer}, this is your test—not a quiz. Make a prediction, try an option, and use the result as your next clue.` } }
  if (context.stage === "history") return { id: `${mission.id}-history`, expression: "curious", text: mission.narrative.history }
  if (context.stage === "transmission") return { id: `${mission.id}-transmission`, expression: "concerned", text: mission.narrative.transmission }
  if (context.stage === "legacy") return { id: `${mission.id}-legacy`, expression: "thinking", text: mission.narrative.legacy }
  if (context.stage === "report") return { id: `${mission.id}-report`, expression: "celebrating", text: mission.narrative.report }
  return null
}

function actionLabel(stage: string) { return ({ welcome: "CONTINUE", selection: "CHOOSE A MISSION", investigation: "RETURN TO THE CLUES", challenge: "START EXPERIMENT", history: "REVEAL THE TRANSMISSION", transmission: "EXPLORE THE LEGACY", legacy: "OPEN MY MISSION REPORT", report: "VIEW MY REPORT" }[stage] ?? "CONTINUE") }
function shouldOpen(context: DialogueContext) { return context.stage !== "investigation" || Boolean(context.selectedComponent) }

export function CaptainNovaDialogue({ context, onChoosePath, onAdvance }: { context: DialogueContext; onChoosePath: (path: "systems" | "signal") => void; onAdvance: () => void }) {
  const entry = useMemo(() => makeDialogue(context), [context])
  const [isOpen, setIsOpen] = useState(false)
  const [revealed, setRevealed] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const actionRef = useRef<HTMLButtonElement>(null)
  const scrollPosition = useRef(0)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setRevealed(0); setIsPlaying(true); setIsOpen(Boolean(entry && shouldOpen(context))) }, [entry?.id])
  useEffect(() => { if (!entry || !isPlaying || revealed >= entry.text.length) return; const timer = window.setTimeout(() => setRevealed((current) => current + 1), 12); return () => window.clearTimeout(timer) }, [entry, isPlaying, revealed])
  useEffect(() => {
    if (!isOpen) return
    scrollPosition.current = window.scrollY
    const previous = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width, overflow: document.body.style.overflow }
    document.body.style.position = "fixed"; document.body.style.top = `-${scrollPosition.current}px`; document.body.style.width = "100%"; document.body.style.overflow = "hidden"
    window.setTimeout(() => actionRef.current?.focus(), 0)
    return () => { document.body.style.position = previous.position; document.body.style.top = previous.top; document.body.style.width = previous.width; document.body.style.overflow = previous.overflow; window.scrollTo(0, scrollPosition.current) }
  }, [isOpen])

  if (!entry) return null
  const complete = revealed >= entry.text.length
  const isArrival = context.stage === "arrival"
  const dismissible = context.stage === "investigation" || context.stage === "challenge"
  const close = () => setIsOpen(false)
  const completeThen = (callback: () => void) => { if (!complete) { setRevealed(entry.text.length); setIsPlaying(false) }; callback(); close() }
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && dismissible) { event.preventDefault(); close(); return }
    if (event.key !== "Tab") return
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
    if (!focusable?.length) return
    const first = focusable[0]; const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }
  const overlay = <div className={`nova-overlay nova-${entry.expression}`} role="presentation"><div className="nova-backdrop" /><div className="nova-dialogue" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="nova-dialogue-title" aria-describedby="nova-dialogue-copy" onKeyDown={trapFocus}><div className="nova-portrait"><img className="nova-character" src={portraitUrl} alt="Captain Nova, a friendly fictional astronaut explorer in an orange-and-white spacesuit" /></div><div className="nova-message"><div className="nova-message-meta"><span><b id="nova-dialogue-title">CAPTAIN NOVA</b><i>{role}</i></span><span className="nova-expression-label">{entry.expression.toUpperCase()}</span></div><p id="nova-dialogue-copy" aria-live={complete ? "polite" : "off"}>{entry.text.slice(0, revealed)}{!complete && <span className="nova-caret" aria-hidden="true">▍</span>}</p>{isArrival && complete ? <div className="nova-responses" aria-label="Choose an investigation approach"><button type="button" onClick={() => completeThen(() => onChoosePath("systems"))}>TRACE THE SYSTEMS</button><button type="button" onClick={() => completeThen(() => onChoosePath("signal"))}>FOLLOW THE LAST CLUE</button></div> : <button ref={actionRef} className="nova-primary-action" type="button" onClick={() => completeThen(onAdvance)}>{actionLabel(context.stage)}</button>}<div className="nova-controls"><button type="button" onClick={() => complete ? setRevealed(0) : (setRevealed(entry.text.length), setIsPlaying(false))}>{complete ? "REPLAY MESSAGE" : "SKIP ANIMATION"}</button><span className="nova-audio-slot"><Volume2 aria-hidden="true" /> Narration ready in a future update</span></div></div></div></div>
  return <>{isOpen && mounted ? createPortal(overlay, document.body) : null}{!isOpen && (context.stage === "investigation" || context.stage === "challenge") && <button className="nova-guide-button" type="button" onClick={() => setIsOpen(true)} aria-label="Ask Captain Nova for a contextual hint"><Lightbulb aria-hidden="true" /><span>GUIDE</span></button>}</>
}
