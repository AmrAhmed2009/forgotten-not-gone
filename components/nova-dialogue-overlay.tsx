"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

const portraitUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captain%20Nova%20Astronaut%20Portrait-hiFfjYQkdCNLl34lSe7MfLH0CYJ9ZT.png"

type NovaDialogueOverlayProps = {
  children: React.ReactNode
  actionLabel: string
  onAction: () => void
  title?: string
}

export function NovaDialogueOverlay({ children, actionLabel, onAction, title = "Captain Nova" }: NovaDialogueOverlayProps) {
  const [mounted, setMounted] = useState(false)
  const actionRef = useRef<HTMLButtonElement>(null)
  const priorFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
    priorFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.setTimeout(() => actionRef.current?.focus(), 0)
    return () => {
      document.body.style.overflow = previousOverflow
      priorFocus.current?.focus()
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="nova-dialogue-overlay" role="presentation">
      <div className="nova-dialogue-overlay__backdrop" />
      <section className="nova-dialogue-overlay__panel" role="dialog" aria-modal="true" aria-labelledby="nova-overlay-title">
        <div className="nova-dialogue-overlay__portrait">
          <img src={portraitUrl} alt="Captain Nova, a friendly fictional astronaut guide" />
        </div>
        <div className="nova-dialogue-overlay__content">
          <p className="nova-dialogue-overlay__eyebrow">MISSION GUIDE</p>
          <h2 id="nova-overlay-title">{title}</h2>
          <div className="nova-dialogue-overlay__copy">{children}</div>
          <button ref={actionRef} type="button" className="action-button nova-dialogue-overlay__action" onClick={onAction}>{actionLabel}</button>
        </div>
      </section>
    </div>,
    document.body,
  )
}

type EvidenceOverlayProps = { onClose: () => void }

export function EvidenceOverlay({ onClose }: EvidenceOverlayProps) {
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.setTimeout(() => closeRef.current?.focus(), 0)
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="evidence-overlay" role="presentation">
      <div className="evidence-overlay__backdrop" />
      <section className="evidence-overlay__panel" role="dialog" aria-modal="true" aria-labelledby="evidence-title">
        <div className="evidence-overlay__header">
          <div><p>NASA ARCHIVE · FEBRUARY 2024</p><h2 id="evidence-title">Ingenuity at Valinor Hills</h2></div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close archival evidence"><X aria-hidden="true" /></button>
        </div>
        <p>This post-flight evidence was captured after Ingenuity&apos;s final flight. The original panorama is a distant 415-meter view; NASA&apos;s Figure B marks the helicopter&apos;s position.</p>
        <div className="evidence-overlay__images">
          <figure><img src="/mission-images/ingenuity-valinor-hills.jpg" alt="NASA PIA26237 panorama of Valinor Hills where Ingenuity is visible at a distance" /><figcaption>PIA26237 · Original final-airfield panorama</figcaption></figure>
          <figure><img src="/mission-images/ingenuity-valinor-figure-b.jpg" alt="NASA Figure B magnifying Ingenuity's location in the Valinor Hills panorama" /><figcaption>NASA Figure B · Magnified location</figcaption></figure>
        </div>
        <div className="evidence-overlay__footer"><a href="https://science.nasa.gov/photojournal/ingenuity-at-valinor-hills/" target="_blank" rel="noreferrer">Open the official NASA source</a><button type="button" className="action-button" onClick={onClose}>Back to Investigation</button></div>
      </section>
    </div>,
    document.body,
  )
}
