"use client"

import { ArrowRight, Atom, Award, Check, ChevronRight, CircleHelp, Cpu, ExternalLink, Globe2, Heart, Lightbulb, LockKeyhole, Rocket, RotateCcw, ScanLine, Sparkles, Star, Telescope, Wind } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { IngenuityScene } from "@/components/ingenuity-scene"
import {
  ENGINEERING_CHOICES,
  EXPLORER_INTERESTS,
  FUTURE_PREDICTIONS,
  INGENUITY_PARTS,
  type EngineeringChoiceId,
  type ExplorerInterest,
  type FuturePredictionId,
  type MachinePartId,
} from "@/components/adventure-content"

const interestIcons: Record<ExplorerInterest, LucideIcon> = {
  Engineering: Cpu,
  "Space Mysteries": Telescope,
  Science: Atom,
}

export function WelcomeScreen({
  nickname,
  age,
  interest,
  onNicknameChange,
  onAgeChange,
  onInterestChange,
  onLaunch,
}: {
  nickname: string
  age: string
  interest: ExplorerInterest | null
  onNicknameChange: (value: string) => void
  onAgeChange: (value: string) => void
  onInterestChange: (value: ExplorerInterest) => void
  onLaunch: () => void
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (interest) onLaunch()
  }

  return (
    <section className="welcome-stage" aria-labelledby="stage-title">
      <div className="welcome-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> SPACE EXPLORER ADVENTURE <span className="eyebrow-dot">·</span> MISSION 01</div>
        <h1 id="stage-title" data-stage-title tabIndex={-1}>Forgotten,<br /><span>Not Gone</span></h1>
        <p className="welcome-subtitle">Every forgotten space machine has a story. Are you ready to discover it?</p>
        <div className="welcome-note"><Sparkles aria-hidden="true" /><span>One brave little helicopter.<br />One giant leap for exploration.</span></div>
        <IngenuityScene discovered={[]} selected={null} onSelect={() => {}} interactive={false} />
      </div>

      <form className="launch-card" onSubmit={submit}>
        <div className="card-overline"><span className="live-indicator" /> YOUR EXPLORER PROFILE <span className="optional-label">JUST FOR THIS VISIT</span></div>
        <h2>Get ready to launch</h2>
        <p className="launch-intro">A couple of quick picks will shape your adventure.</p>

        <div className="profile-fields">
          <label className="profile-field" htmlFor="explorer-nickname">
            <span className="field-heading">Explorer nickname <span>OPTIONAL</span></span>
            <input
              id="explorer-nickname"
              name="nickname"
              type="text"
              value={nickname}
              maxLength={24}
              autoComplete="off"
              placeholder="For example, Nova"
              onChange={(event) => onNicknameChange(event.target.value)}
            />
            <span className="field-hint">A nickname only — no real name needed.</span>
          </label>
          <label className="profile-field" htmlFor="explorer-age">
            <span className="field-heading">Age <span>OPTIONAL</span></span>
            <select id="explorer-age" name="age" value={age} onChange={(event) => onAgeChange(event.target.value)}>
              <option value="">Skip this</option>
              {[10, 11, 12, 13, 14].map((value) => <option key={value} value={String(value)}>{value}</option>)}
            </select>
          </label>
        </div>

        <fieldset className="interest-fieldset">
          <legend>What are you most curious about?</legend>
          <div className="interest-options">
            {EXPLORER_INTERESTS.map((option) => {
              const Icon = interestIcons[option]
              return (
                <label className={`interest-option${interest === option ? " is-selected" : ""}`} key={option}>
                  <input type="radio" name="interest" value={option} checked={interest === option} required onChange={() => onInterestChange(option)} />
                  <span className="interest-option-card"><Icon aria-hidden="true" /><span>{option}</span><span className="interest-check"><Check aria-hidden="true" /></span></span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <Button className="action-button launch-button" type="submit" disabled={!interest}>
          LAUNCH MY ADVENTURE <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Button>
        <p className="privacy-note"><LockKeyhole aria-hidden="true" /> Your choices stay in this browser tab. They are never saved or sent to a server.</p>
      </form>
    </section>
  )
}

export function MissionSelectionScreen({
  nickname,
  interest,
  onInvestigate,
}: {
  nickname: string
  interest: ExplorerInterest
  onInvestigate: () => void
}) {
  const explorer = nickname.trim() || "Explorer"

  return (
    <section className="missions-stage" aria-labelledby="stage-title">
      <div className="mission-greeting">
        <div className="eyebrow"><span className="eyebrow-line" /> TRANSMISSION RECEIVED <span className="eyebrow-dot">·</span> EARTH TO MARS</div>
        <h1 id="stage-title" data-stage-title tabIndex={-1}>Welcome aboard, <span>{explorer === "Explorer" ? "Explorer" : `Explorer ${explorer}`}!</span></h1>
        <p>Your next <strong>{interest}</strong> mystery is waiting on Mars.</p>
      </div>
      <div className="missions-heading"><div><span className="section-kicker">PICK YOUR FIRST FIELD MISSION</span><h2>Choose your mystery</h2></div><span className="mission-count"><Globe2 aria-hidden="true" /> 01 PLAYABLE MISSION</span></div>
      <div className="mission-cards">
        <Button className="mission-card mission-card-playable" type="button" onClick={onInvestigate}>
          <span className="mission-card-top"><span className="mission-number">MISSION 01</span><span className="mission-status"><span /> PLAYABLE</span></span>
          <span className="mission-art mars-art" aria-hidden="true"><span className="mars-orbit" /><span className="mars-planet" /><span className="mission-heli"><span /><span /><span /></span><span className="art-star star-one" /><span className="art-star star-two" /><span className="art-star star-three" /><span className="mars-horizon" /></span>
          <span className="mission-card-copy"><span className="mission-title">The Helicopter<br />That Flew on Mars</span><span className="mission-summary">Meet NASA&apos;s Ingenuity helicopter and uncover how it learned to fly.</span></span>
          <span className="mission-card-details"><span><small>ARTIFACT</small><b>Ingenuity Helicopter</b></span><span><small>LOCATION</small><b>Mars · Jezero Crater</b></span></span>
          <span className="mission-card-action">INVESTIGATE <ArrowRight data-icon="inline-end" aria-hidden="true" /></span>
        </Button>

        <article className="mission-card mission-card-soon" aria-label="Mission 02, The Machine Left on the Moon, coming soon">
          <div className="mission-card-top"><span className="mission-number">MISSION 02</span><span className="soon-status"><LockKeyhole aria-hidden="true" /> COMING SOON</span></div>
          <div className="mission-art moon-art" aria-hidden="true"><span className="moon-planet" /><span className="moon-crater crater-one" /><span className="moon-crater crater-two" /><span className="moon-star star-one" /><span className="moon-star star-two" /><span className="moon-horizon" /></div>
          <div className="mission-card-copy"><span className="mission-title">The Machine<br />Left on the Moon</span><span className="mission-summary">A historic lunar lander is waiting for its story to be told.</span></div>
          <div className="mission-card-details"><span><small>ARTIFACT</small><b>Apollo 11 descent stage</b></span><span><small>LOCATION</small><b>The Moon · Tranquility Base</b></span></div>
          <div className="mission-card-action disabled-action">LOCKED FOR NOW <LockKeyhole aria-hidden="true" /></div>
        </article>
      </div>
      <p className="mission-note"><Sparkles aria-hidden="true" /> More mysteries are still out there. This is your first one.</p>
    </section>
  )
}

export function DiscoveryScreen({
  discovered,
  selected,
  onSelect,
  onContinue,
}: {
  discovered: MachinePartId[]
  selected: MachinePartId | null
  onSelect: (part: MachinePartId) => void
  onContinue: () => void
}) {
  const activePart = INGENUITY_PARTS.find((part) => part.id === selected)
  const allDiscovered = discovered.length === INGENUITY_PARTS.length

  return (
    <section className="discovery-stage" aria-labelledby="stage-title">
      <div className="stage-heading-row">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> STAGE 03 <span className="eyebrow-dot">·</span> JEZERO CRATER, MARS</div>
          <h1 id="stage-title" data-stage-title tabIndex={-1}>Meet <span>Ingenuity</span></h1>
          <p className="stage-intro">A small helicopter once made history on Mars. Now it rests silently on the planet&apos;s surface. What made this little machine so extraordinary?</p>
        </div>
        <div className="discovery-meter"><span>PARTS FOUND</span><b>{discovered.length}<i> / 3</i></b><span className="meter-bars" aria-label={`${discovered.length} of 3 parts discovered`}>{INGENUITY_PARTS.map((part) => <i key={part.id} className={discovered.includes(part.id) ? "is-filled" : ""} />)}</span></div>
      </div>

      <div className="discovery-layout">
        <div className="discovery-visual-column">
          <IngenuityScene discovered={discovered} selected={selected} onSelect={onSelect} />
          <div className="discovery-tip"><Lightbulb aria-hidden="true" /><span>Hint: scan the blades, panel, and camera.</span></div>
        </div>
        <aside className="discovery-log" aria-label="Ingenuity discovery log" aria-live="polite">
          <div className="log-heading"><span className="log-icon"><ScanLine aria-hidden="true" /></span><span>FLIGHT LOG <i>·</i> 001</span><span className="log-live"><span /> LIVE</span></div>
          {activePart ? (
            <div className="part-discovery" key={activePart.id}>
              <span className="part-eyebrow">{activePart.eyebrow}</span>
              <h2>{activePart.name}</h2>
              <p>{activePart.description}</p>
              <div className="fact-callout"><span><Lightbulb aria-hidden="true" /></span><p><b>NASA FACT</b>{activePart.fact}</p></div>
              <div className="added-to-log"><Check aria-hidden="true" /> PART ADDED TO YOUR LOG</div>
            </div>
          ) : (
            <div className="log-empty"><span className="scan-orbit"><ScanLine aria-hidden="true" /></span><h2>What makes<br />Ingenuity fly?</h2><p>Tap one of the glowing scan points to explore a real part of the helicopter.</p><span className="log-prompt">START WITH A GLOWING MARKER</span></div>
          )}
          <div className="log-footer"><span className="log-footer-dot" /> YOUR DISCOVERIES STAY IN THIS TAB</div>
        </aside>
      </div>

      <div className="stage-action-row"><span className="stage-action-note">{allDiscovered ? "All three parts are in your log. Ready to think like an engineer?" : `${INGENUITY_PARTS.length - discovered.length} more ${INGENUITY_PARTS.length - discovered.length === 1 ? "part" : "parts"} to discover before your challenge.`}</span><Button className="action-button" type="button" disabled={!allDiscovered} onClick={onContinue}>{allDiscovered ? "THINK LIKE AN ENGINEER" : "SCAN ALL 3 PARTS"} {allDiscovered ? <ArrowRight data-icon="inline-end" aria-hidden="true" /> : <LockKeyhole data-icon="inline-start" aria-hidden="true" />}</Button></div>
    </section>
  )
}

export function EngineeringScreen({
  ready,
  choice,
  onReady,
  onChoose,
  onContinue,
}: {
  ready: boolean
  choice: EngineeringChoiceId | null
  onReady: () => void
  onChoose: (choice: EngineeringChoiceId) => void
  onContinue: () => void
}) {
  const selectedChoice = ENGINEERING_CHOICES.find((option) => option.id === choice)

  return (
    <section className="engineering-stage" aria-labelledby="stage-title">
      <div className="engineering-heading">
        <div className="eyebrow"><span className="eyebrow-line" /> STAGE 04 <span className="eyebrow-dot">·</span> ENGINEERING LAB</div>
        <h1 id="stage-title" data-stage-title tabIndex={-1}>Think like a <span>NASA engineer</span></h1>
        <p className="stage-intro">Mars has an extremely thin atmosphere. How could engineers make a helicopter fly there?</p>
      </div>

      {!ready ? (
        <div className="think-card">
          <div className="think-art" aria-hidden="true"><div className="air-ring ring-one" /><div className="air-ring ring-two" /><Wind /><span>THIN AIR</span></div>
          <div className="think-copy"><span className="section-kicker">YOUR DESIGN CHALLENGE</span><h2>Take a moment to picture it.</h2><p>Imagine a tiny helicopter above the red dust. What kind of rotors could push against so little air?</p><Button className="action-button" type="button" onClick={onReady}>I&apos;M READY TO DECIDE <ArrowRight data-icon="inline-end" aria-hidden="true" /></Button><span className="no-timer-note"><CircleHelp aria-hidden="true" /> No time limit. Think it through at your own pace.</span></div>
        </div>
      ) : (
        <div className="engineering-work">
          <div className="choice-panel">
            <div className="choice-panel-heading"><div><span className="section-kicker">EDUCATIONAL SIMULATION</span><h2>Choose a rotor design</h2></div><span className="choice-step">A <i>·</i> B <i>·</i> C</span></div>
            <fieldset className="choice-list">
              <legend className="sr-only">Pick an engineering design</legend>
              {ENGINEERING_CHOICES.map((option, index) => (
                <label className={`decision-option${choice === option.id ? " is-selected" : ""}`} key={option.id}>
                  <input type="radio" name="engineering-choice" value={option.id} checked={choice === option.id} onChange={() => onChoose(option.id)} />
                  <span className="decision-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="decision-copy"><b>{option.title}</b><small>{index === 0 ? "Keep it small and simple" : index === 1 ? "Go big, spin fast, stay light" : "Use a heavier, familiar design"}</small></span>
                  <span className="decision-check"><Check aria-hidden="true" /></span>
                </label>
              ))}
            </fieldset>
            <p className="simulation-disclaimer"><LockKeyhole aria-hidden="true" /> This activity is an educational simulation inspired by real engineering challenges—not a recreation of NASA&apos;s internal decision process.</p>
          </div>

          <div className="answer-panel" aria-live="polite">
            {selectedChoice ? (
              <>
                <div className={`choice-feedback${selectedChoice.id === "large" ? " feedback-good" : ""}`}><span className="feedback-icon">{selectedChoice.id === "large" ? <Check aria-hidden="true" /> : <Lightbulb aria-hidden="true" />}</span><div><span className="section-kicker">YOUR DESIGN IDEA</span><p>{selectedChoice.feedback}</p></div></div>
                <div className="nasa-answer"><div className="nasa-answer-heading"><span className="nasa-answer-icon"><Rocket aria-hidden="true" /></span><span><small>WHAT NASA ACTUALLY DID</small><b>The real Ingenuity design</b></span></div><p>NASA paired a lightweight helicopter with large, fast-spinning rotors. That combination helped Ingenuity lift in Mars&apos; super-thin air.</p><span className="fact-tag">REAL MISSION FACT</span></div>
                <Button className="action-button continue-button" type="button" onClick={onContinue}>CONTINUE TO THE FINAL DISCOVERY <ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
              </>
            ) : (
              <div className="answer-wait"><span className="answer-orbit"><Lightbulb aria-hidden="true" /></span><h3>Your test flight is waiting.</h3><p>Pick one design to see what might work—and what NASA actually built.</p><span>NO WRONG TURNS. JUST NEW CLUES.</span></div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export function LegacyScreen({
  prediction,
  onPrediction,
  onContinue,
}: {
  prediction: FuturePredictionId | null
  onPrediction: (prediction: FuturePredictionId) => void
  onContinue: () => void
}) {
  const selectedPrediction = FUTURE_PREDICTIONS.find((option) => option.id === prediction)

  return (
    <section className="legacy-stage" aria-labelledby="stage-title">
      <div className="eyebrow"><span className="eyebrow-line" /> STAGE 05 <span className="eyebrow-dot">·</span> THE FINAL DISCOVERY</div>
      <div className="legacy-header"><div><h1 id="stage-title" data-stage-title tabIndex={-1}>A little helicopter.<br /><span>A huge legacy.</span></h1><p>Ingenuity completed 72 flights—far beyond its original five-flight test. After rotor damage during its final landing in January 2024, it could no longer fly. It still rests on Mars.</p></div><div className="legacy-emblem" aria-hidden="true"><div className="legacy-planet"><span /><i /><b /></div><div className="legacy-star legacy-star-one"><Star /></div><div className="legacy-star legacy-star-two"><Sparkles /></div><span className="legacy-emblem-caption">72 FLIGHTS<br />ONE NEW WORLD</span></div></div>

      <div className="legacy-fact-strip"><span className="fact-badge"><Check aria-hidden="true" /> NASA FACT</span><p>Ingenuity proved that controlled, powered flight is possible on another planet.</p><span className="fact-credit">NASA · MARS 2020 MISSION</span></div>

      <div className="legacy-question"><div className="question-heading"><span className="question-mark"><CircleHelp aria-hidden="true" /></span><div><span className="section-kicker">A WHAT-IF QUESTION</span><h2>What if Ingenuity had never flown?</h2><p>Choose one possibility that makes you curious. There are no wrong guesses.</p></div></div>
        <fieldset className="prediction-list">
          <legend className="sr-only">What might humanity have missed?</legend>
          {FUTURE_PREDICTIONS.map((option, index) => (
            <label className={`prediction-option${prediction === option.id ? " is-selected" : ""}`} key={option.id}>
              <input type="radio" name="future-prediction" value={option.id} checked={prediction === option.id} onChange={() => onPrediction(option.id)} />
              <span className="prediction-number">0{index + 1}</span><span>{option.text}</span><span className="prediction-check"><Check aria-hidden="true" /></span>
            </label>
          ))}
        </fieldset>

        {selectedPrediction && <div className="legacy-reveal" role="status"><span className="reveal-icon"><Sparkles aria-hidden="true" /></span><div><span className="section-kicker">WHAT INGENUITY ACTUALLY SHOWED</span><p>That future is a possibility, not a fact. What we know: Ingenuity made the first powered, controlled flights on another planet and showed how aerial scouts could help future missions explore from above.</p></div></div>}

        <div className="legacy-bottom"><a className="nasa-link" href="https://www.jpl.nasa.gov/missions/ingenuity/" target="_blank" rel="noreferrer">VISIT NASA&apos;S INGENUITY MISSION PAGE <ExternalLink aria-hidden="true" /></a>{selectedPrediction && <Button className="action-button" type="button" onClick={onContinue}>BUILD MY MISSION REPORT <ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>}</div>
      </div>
    </section>
  )
}

export function MissionReportScreen({
  nickname,
  engineeringChoice,
  prediction,
  onRestart,
  onBackToMissions,
}: {
  nickname: string
  engineeringChoice: EngineeringChoiceId
  prediction: FuturePredictionId
  onRestart: () => void
  onBackToMissions: () => void
}) {
  const choice = ENGINEERING_CHOICES.find((option) => option.id === engineeringChoice)
  const future = FUTURE_PREDICTIONS.find((option) => option.id === prediction)
  const explorer = nickname.trim() || "Explorer"

  return (
    <section className="report-stage" aria-labelledby="stage-title">
      <div className="report-celebration"><div className="report-spark report-spark-one"><Sparkles aria-hidden="true" /></div><div className="report-spark report-spark-two"><Star aria-hidden="true" /></div><span className="report-medal"><Award aria-hidden="true" /></span></div>
      <div className="report-heading"><div className="eyebrow"><span className="eyebrow-line" /> STAGE 06 <span className="eyebrow-dot">·</span> YOUR MISSION REPORT</div><h1 id="stage-title" data-stage-title tabIndex={-1}>Mission <span>complete.</span></h1><p>Nice work, {explorer}. You uncovered a forgotten explorer&apos;s legacy.</p></div>

      <article className="mission-report-card">
        <div className="report-card-header"><div className="report-card-brand"><span className="report-brand-mark"><Rocket aria-hidden="true" /></span><span><small>FORGOTTEN, NOT GONE</small><b>EXPLORER FIELD REPORT</b></span></div><span className="report-stamp"><Check aria-hidden="true" /> COMPLETE</span></div>
        <div className="report-facts-grid">
          <div><span>EXPLORER</span><b>{explorer}</b></div>
          <div><span>MISSION</span><b>Ingenuity</b></div>
          <div><span>PLANET</span><b>Mars</b></div>
          <div><span>PARTS DISCOVERED</span><b>03 / 03</b></div>
        </div>
        <div className="report-detail-row"><span className="report-detail-icon"><Wind aria-hidden="true" /></span><div><span>YOUR ENGINEERING DECISION</span><b>{choice?.title}</b></div></div>
        <div className="report-detail-row"><span className="report-detail-icon"><Lightbulb aria-hidden="true" /></span><div><span>ONE SCIENTIFIC ACHIEVEMENT</span><b>Ingenuity made the first powered, controlled flights on another planet.</b></div></div>
        <div className="report-detail-row prediction-report"><span className="report-detail-icon"><CircleHelp aria-hidden="true" /></span><div><span>YOUR WHAT-IF</span><b>{future?.text}</b></div></div>
        <div className="report-message"><Heart aria-hidden="true" /><p>Mission Complete — You&apos;ve uncovered a forgotten explorer&apos;s legacy!</p></div>
      </article>

      <div className="report-actions"><Button className="action-button" type="button" onClick={onRestart}><RotateCcw data-icon="inline-start" aria-hidden="true" /> RESTART ADVENTURE</Button><Button className="quiet-button" type="button" variant="outline" onClick={onBackToMissions}>BACK TO MISSION SELECTION <ChevronRight data-icon="inline-end" aria-hidden="true" /></Button></div>
      <p className="report-footer-note"><Star aria-hidden="true" /> The next mystery is still waiting among the stars.</p>
    </section>
  )
}
