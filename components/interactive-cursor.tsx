"use client"

import { useEffect, useRef } from "react"

const INTERACTIVE_SELECTOR = "a, button, [role=\"button\"], input, select, textarea, summary, [data-cursor-interactive]"
const TRAIL_LIMIT = 24

export function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (!finePointer.matches || reducedMotion.matches) return

    const cursor = cursorRef.current
    const spotlight = spotlightRef.current
    const halo = haloRef.current
    const center = centerRef.current
    const trail = trailRef.current
    const pulse = pulseRef.current

    if (!cursor || !spotlight || !halo || !center || !trail || !pulse) return

    const root = document.documentElement
    const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...current }
    let animationFrame = 0
    let lastParticleAt = 0
    let lastPointer = { x: current.x, y: current.y }

    const setPosition = (element: HTMLElement, x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const animate = () => {
      current.x += (target.x - current.x) * 0.16
      current.y += (target.y - current.y) * 0.16
      setPosition(spotlight, current.x, current.y)
      setPosition(halo, current.x, current.y)
      animationFrame = window.requestAnimationFrame(animate)
    }

    const createParticle = (x: number, y: number, angle: number) => {
      const particle = document.createElement("span")
      particle.className = "interactive-cursor__particle"
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      particle.style.setProperty("--particle-angle", `${angle}rad`)
      trail.appendChild(particle)

      while (trail.childElementCount > TRAIL_LIMIT) {
        trail.firstElementChild?.remove()
      }

      window.setTimeout(() => particle.remove(), 620)
    }

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      setPosition(center, target.x, target.y)
      cursor.classList.add("is-active")

      const interactiveTarget = event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)
      cursor.classList.toggle("is-hovering", Boolean(interactiveTarget))

      const dx = target.x - lastPointer.x
      const dy = target.y - lastPointer.y
      const distance = Math.hypot(dx, dy)
      const now = performance.now()
      if (distance > 10 && now - lastParticleAt > 35) {
        const particleCount = Math.min(2, Math.max(1, Math.floor(distance / 28)))
        const angle = Math.atan2(dy, dx)
        for (let index = 0; index < particleCount; index += 1) {
          createParticle(target.x - dx * 0.35 - index * 2, target.y - dy * 0.35 - index * 2, angle)
        }
        lastParticleAt = now
      }
      lastPointer = { x: target.x, y: target.y }
    }

    const handlePointerLeave = () => {
      cursor.classList.remove("is-active")
    }

    const handleClick = (event: MouseEvent) => {
      pulse.style.left = `${event.clientX}px`
      pulse.style.top = `${event.clientY}px`
      pulse.classList.remove("is-pulsing")
      void pulse.offsetWidth
      pulse.classList.add("is-pulsing")
    }

    root.classList.add("cursor-effects-enabled")
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("click", handleClick, { passive: true })
    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("click", handleClick)
      root.classList.remove("cursor-effects-enabled")
      trail.replaceChildren()
      pulse.classList.remove("is-pulsing")
    }
  }, [])

  return (
    <div ref={cursorRef} className="interactive-cursor" aria-hidden="true">
      <div ref={spotlightRef} className="interactive-cursor__spotlight" />
      <div ref={trailRef} className="interactive-cursor__trail" />
      <div ref={haloRef} className="interactive-cursor__halo" />
      <div ref={centerRef} className="interactive-cursor__center" />
      <div ref={pulseRef} className="interactive-cursor__pulse" />
    </div>
  )
}
