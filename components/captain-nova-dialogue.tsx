"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { Lightbulb, Volume2 } from "lucide-react"
import type { AgeBand, ExplorerInterest, FlightTest, MissionRecord } from "@/components/adventure-content"

export type NovaExpression = "welcoming" | "curious" | "thinking" | "excited" | "concerned" | "celebrating"

type DialogueEntry = { id: string; expression: NovaExpression; text: string; audioSrc?: string; voiceTimingMs?: number }
type DialogueContext = { stage: string; mission: MissionRecord | null; nickname: string; interest: ExplorerInterest | null; ageBand: AgeBand; discovered: string[]; selectedComponent: string | null; challengeChoice: string | null; simulationOutcome: string | null; flightAttempts: FlightTest[]; prediction: string | null; investigationPath: string | null; completedMissions: number }
type DialogueChoice = { label: string; onSelect: () => void }

type CaptainNovaDialogueProps = {
  context?: DialogueContext
  onChoosePath?: (path: "systems" | "signal") => void
  onAdvance?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  children?: ReactNode
  actionLabel?: string
  onAction?: () => void
  choices?: DialogueChoice[]
  dismissible?: boolean
  audioLabel?: string
}

const portraitUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captain%20Nova%20Astronaut%20Portrait-hiFfjYQkdCNLl34lSe7MfLH0CYJ9ZT.png"

function makeDialogue(context: DialogueContext): DialogueEntry | null {
  const explorer = context.nickname.trim() || "Explorer"
  const mission = context.mission
  const ageNote = context.ageBand === "younger" ? " I’ll keep our clue turns short and visual." : context.ageBand === "teen" || context.ageBand === "adult" ? " I’ll keep the engineering trade-offs in view." : ""
  if (context.stage === "welcome") return { id: "nova-welcome", expression: "welcoming", text: `Hey, ${explorer}! I’m Captain Nova. You’ll lead every investigation; I’ll help you notice the clues that keep these machines’ stories alive.${ageNote}` }
  if (context.stage === "selection") return { id: "nova-selection", expression: "excited", text: `${explorer}, four quiet machines are still transmitting big stories. Choose the mystery you want to chase first.` }
  if (!mission) return null
  if (context.stage === "arrival") return { id: `${mission.id}-arrival`, expression: "curious", text: mission.narrative.arrival }
  if (context.stage === "investigation") {
    if (context.selectedComponent) {
      const component = mission.components.find((item) => item.id === context.selectedComponent)
      return { id: `${mission.id}-clue-${context.selectedComponent}`, expression: "excited", text: `Great catch. ${component?.observation ?? "That component changes the whole picture."} You’ve found ${context.discovered.length} of ${mission.components.length} clues.` }
    }
    return { id: `${mission.id}-investigation`, expression: "curious", text: mission.narrative.investigation }
  }
  if (context.stage === "challenge") {
    const latestFlight = context.flightAttempts.at(-1)
    if (latestFlight) return { id: `${mission.id}-test-${latestFlight.attempt}`, expression: latestFlight.outcome === "suitable" ? "celebrating" : latestFlight.outcome === "insufficient" ? "concerned" : "thinking", text: latestFlight.outcome === "suitable" ? "You made the simulation work. Compare your design with the historical mission when you’re ready." : latestFlight.outcome === "insufficient" ? "That result is useful evidence. Change one variable, predict the effect, and test again." : "You’re close. What single adjustment would give this design more margin?" }
    if (context.challengeChoice) return { id: `${mission.id}-choice-${context.challengeChoice}`, expression: "thinking", text: "Interesting choice. Run the educational simulation and watch what this decision changes for your field team." }
    return { id: `${mission.id}-experiment`, expression: "thinking", text: `${explorer}, this is your test—not a quiz. Make a prediction, try an option, and use the result as your next clue.` }
  }
  if (context.stage === "history") return { id: `${mission.id}-history`, expression: "curious", text: mission.narrative.history }
  if (context.stage === "transmission") return { id: `${mission.id}-transmission`, expression: "concerned", text: mission.narrative.transmission }
  if (context.stage === "legacy") return { id: `${mission.id}-legacy`, expression: "thinking", text: mission.narrative.legacy }
  if (context.stage === "report") return { id: `${mission.id}-report`, expression: "celebrating", text: mission.narrative.report }
  return null
}

function actionLabel(stage: string) {
  return ({ welcome: "Continue the adventure", selection: "Choose a mission", investigation: "Return to the clues", challenge: "Start experiment", history: "Reveal the transmission", transmission: "Explore the legacy", legacy: "Open my mission report", report: "View my report" }[stage] ?? "Continue")
}

function shouldOpen(context: DialogueContext) {
  return context.stage !== "investigation" || Boolean(context.selectedComponent)
}

export function CaptainNovaDialogue({ context, onChoosePath, onAdvance, open, onOpenChange, title = "Captain Nova", children, actionLabel: explicitActionLabel, onAction, choices, dismissible = false, audioLabel = "Narration ready in a future update" }: CaptainNovaDialogueProps) {
  const entry = useMemo(() => context ? makeDialogue(context) : null, [context])
  const [contextOpen, setContextOpen] = useState(() => Boolean(context && shouldOpen(context)))
  const [revealed, setRevealed] = useState(0)
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const primaryActionRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const scrollPosition = useRef(0)

  const isContextMode = Boolean(context)
  const isOpen = isContextMode ? contextOpen : Boolean(open)
  const content = isContextMode ? entry?.text : children
  const contentId = isContextMode ? entry?.id : `${title}-${explicitActionLabel}`

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (!entry || !context) return
    setRevealed(0)
    setContextOpen(shouldOpen(context))
  }, [entry?.id])
  useEffect(() => {
    if (!entry || !isOpen || revealed >= entry.text.length) return
    const timer = window.setTimeout(() => setRevealed((current) => current + 1), 12)
    return () => window.clearTimeout(timer)
  }, [entry, isOpen, revealed])
  useEffect(() => {
    if (!isOpen) return
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    scrollPosition.current = window.scrollY
    const previous = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width, overflow: document.body.style.overflow }
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollPosition.current}px`
    document.body.style.width = "100%"
    document.body.style.overflow = "hidden"
    window.setTimeout(() => primaryActionRef.current?.focus(), 0)
    return () => {
      document.body.style.position = previous.position
      document.body.style.top = previous.top
      document.body.style.width = previous.width
      document.body.style.overflow = previous.overflow
      window.scrollTo(0, scrollPosition.current)
      previousFocus.current?.focus()
    }
  }, [isOpen])

  const setOpen = (nextOpen: boolean) => {
    if (isContextMode) setContextOpen(nextOpen)
    else onOpenChange?.(nextOpen)
  }

  if ((!isContextMode && !content) || (isContextMode && !entry) || !mounted) return null

  const complete = !isContextMode || revealed >= (entry?.text.length ?? 0)
  const activeChoices = choices ?? (context?.stage === "arrival" && complete && onChoosePath ? [
    { label: "Trace the systems", onSelect: () => onChoosePath("systems") },
    { label: "Follow the last clue", onSelect: () => onChoosePath("signal") },
  ] : undefined)
  const primaryActionLabel = explicitActionLabel ?? (context ? actionLabel(context.stage) : "Continue")
  const invoke = (callback?: () => void) => {
    callback?.()
    setOpen(false)
  }
  const close = () => setOpen(false)
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && dismissible) {
      event.preventDefault()
      close()
      return
    }
    if (event.key !== "Tab") return
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const overlay = (
    <div className="captain-dialogue-overlay" role="presentation">
      <div className="captain-dialogue-backdrop" />
      <section className="captain-dialogue-panel" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="captain-dialogue-title" aria-describedby="captain-dialogue-copy" onKeyDown={trapFocus}>
        <div className="captain-dialogue-portrait">
          <img src={portraitUrl} alt="Captain Nova, a friendly fictional astronaut explorer in an orange-and-white spacesuit" />
        </div>
        <div className="captain-dialogue-content">
          <p className="captain-dialogue-eyebrow">MISSION GUIDE</p>
          <h2 id="captain-dialogue-title">{title}</h2>
          <div id="captain-dialogue-copy" className="captain-dialogue-copy" aria-live={complete ? "polite" : "off"}>
            {isContextMode ? <p>{entry?.text.slice(0, revealed)}{!complete && <span className="captain-dialogue-caret" aria-hidden="true">▍</span>}</p> : content}
          </div>
          {activeChoices && complete ? <div className="captain-dialogue-choices" aria-label="Choose an investigation approach">{activeChoices.map((choice, index) => <button key={choice.label} ref={index === 0 ? primaryActionRef : undefined} type="button" onClick={() => invoke(choice.onSelect)}>{choice.label}</button>)}</div> : <button ref={primaryActionRef} className="captain-dialogue-action" type="button" onClick={() => invoke(onAction ?? onAdvance)}>{primaryActionLabel}</button>}
          {isContextMode && <div className="captain-dialogue-footer"><button type="button" onClick={() => setRevealed(complete ? 0 : entry?.text.length ?? 0)}>{complete ? "Replay message" : "Skip animation"}</button><span><Volume2 aria-hidden="true" /> {audioLabel}</span></div>}
        </div>
      </section>
    </div>
  )

  return <>{isOpen ? createPortal(overlay, document.body) : null}{isContextMode && !isOpen && (context?.stage === "investigation" || context?.stage === "challenge") && <button className="captain-guide-button" type="button" onClick={() => setOpen(true)} aria-label="Ask Captain Nova for a contextual hint"><Lightbulb aria-hidden="true" /><span>Guide</span></button>}</>
}
