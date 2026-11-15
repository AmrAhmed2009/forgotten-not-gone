"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

type StoryProgressStore = Record<string, SavedStoryProgress>

export type SavedStoryProgress = {
  storyId: string
  chapterIndex: number
  dialogueMessageIndex: number
  completedChapters: number[]
  questionAnswers: Record<string, string>
}

type ChapterNavigationProps = {
  storyName: string
  storyMeta: string
  chapterTitles: string[]
  chapterIndex: number
  onExit: () => void
}

type ChapterNavigationActionsProps = {
  chapterIndex: number
  totalChapters: number
  dialogueOpen: boolean
  dialogueCompleted: boolean
  completed: boolean
  onExit: () => void
  onPrevious: () => void
  onNext: () => void
  onFinish: () => void
  onReplayNova: () => void
}

type StoryResumePromptProps = {
  storyName: string
  savedProgress: SavedStoryProgress
  chapterTitles: string[]
  onContinue: () => void
  onStartBeginning: () => void
}

const STORAGE_KEY = "forgotten-not-gone:story-progress:v1"

function readStore(): StoryProgressStore {
  if (typeof window === "undefined") return {}
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as unknown
    return value && typeof value === "object" ? value as StoryProgressStore : {}
  } catch {
    return {}
  }
}

function isValidProgress(value: unknown, storyId: string, chapterCount: number): value is SavedStoryProgress {
  if (!value || typeof value !== "object") return false
  const progress = value as Partial<SavedStoryProgress>
  return progress.storyId === storyId
    && typeof progress.chapterIndex === "number"
    && Number.isInteger(progress.chapterIndex)
    && progress.chapterIndex >= 0
    && progress.chapterIndex < chapterCount
    && typeof progress.dialogueMessageIndex === "number"
    && Number.isInteger(progress.dialogueMessageIndex)
    && progress.dialogueMessageIndex >= 0
    && Array.isArray(progress.completedChapters)
    && typeof progress.questionAnswers === "object"
    && progress.questionAnswers !== null
}

export function hasStoryProgress(progress: SavedStoryProgress | null) {
  return Boolean(progress && (progress.chapterIndex > 0 || progress.dialogueMessageIndex > 0 || progress.completedChapters.length > 0 || Object.keys(progress.questionAnswers).length > 0))
}

export function useStoryProgress(storyId: string, chapterCount: number) {
  const [savedProgress, setSavedProgress] = useState<SavedStoryProgress | null>(null)
  const [progressLoaded, setProgressLoaded] = useState(false)

  useEffect(() => {
    const stored = readStore()[storyId]
    setSavedProgress(isValidProgress(stored, storyId, chapterCount) ? stored : null)
    setProgressLoaded(true)
  }, [chapterCount, storyId])

  const saveProgress = useCallback((progress: SavedStoryProgress) => {
    if (typeof window === "undefined") return
    try {
      const store = readStore()
      store[storyId] = progress
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
      setSavedProgress(progress)
    } catch {
      // Storage can be unavailable in private browsing; the story remains playable.
    }
  }, [storyId])

  const clearProgress = useCallback(() => {
    if (typeof window === "undefined") return
    try {
      const store = readStore()
      delete store[storyId]
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
      setSavedProgress(null)
    } catch {
      // Storage can be unavailable in private browsing; the story remains playable.
    }
  }, [storyId])

  return { savedProgress, progressLoaded, saveProgress, clearProgress }
}

export function ChapterNavigation({ storyName, storyMeta, chapterTitles, chapterIndex, onExit }: ChapterNavigationProps) {
  const totalChapters = chapterTitles.length
  const currentTitle = chapterTitles[chapterIndex] ?? chapterTitles[0]
  const chapterAnnouncement = `Chapter ${chapterIndex + 1} of ${totalChapters}: ${currentTitle}`

  return <>
    <header className="chapter-navigation-header">
      <button type="button" className="chapter-exit" onClick={onExit}><ChevronLeft aria-hidden="true" data-icon="inline-start" /> All Stories</button>
      <div><p>{storyMeta}</p><h1 id="chapter-navigation-title">{storyName}</h1></div>
      <span className="chapter-header-count" aria-label={chapterAnnouncement}>{chapterIndex + 1} / {String(totalChapters).padStart(2, "0")}</span>
    </header>
    <section className="chapter-progress" aria-labelledby="chapter-progress-title">
      <div className="chapter-progress-copy"><span id="chapter-progress-title">CHAPTER {chapterIndex + 1} OF {totalChapters}</span><strong>{currentTitle}</strong></div>
      <p className="sr-only" aria-live="polite">{chapterAnnouncement}</p>
      <ol aria-hidden="true">{chapterTitles.map((title, index) => <li key={`${index}-${title}`} className={index === chapterIndex ? "is-current" : index < chapterIndex ? "is-complete" : ""}><span>{index + 1}</span></li>)}</ol>
    </section>
  </>
}

export function ChapterNavigationActions({ chapterIndex, totalChapters, dialogueOpen, dialogueCompleted, completed, onExit, onPrevious, onNext, onFinish, onReplayNova }: ChapterNavigationActionsProps) {
  const canNavigate = !dialogueOpen && dialogueCompleted && !completed
  return !completed && <nav className={`chapter-navigation${dialogueOpen ? " is-blocked" : ""}`} aria-label="Chapter navigation" aria-describedby={dialogueOpen ? "chapter-navigation-help" : undefined}>
    <p id="chapter-navigation-help" className="sr-only">Finish Captain Nova&apos;s dialogue before using chapter navigation.</p>
    {chapterIndex === 0 ? <button type="button" className="chapter-navigation-secondary" onClick={onExit} disabled={dialogueOpen}><ChevronLeft aria-hidden="true" data-icon="inline-start" /> All Stories</button> : <button type="button" className="chapter-navigation-secondary" onClick={onPrevious} disabled={!canNavigate}><ChevronLeft aria-hidden="true" data-icon="inline-start" /> Previous Chapter</button>}
    <button type="button" className="chapter-replay" onClick={onReplayNova} disabled={dialogueOpen}><RotateCcw aria-hidden="true" data-icon="inline-start" /> Replay Nova</button>
    {chapterIndex === totalChapters - 1 ? <button type="button" className="chapter-navigation-primary" onClick={onFinish} disabled={!canNavigate}>Finish Story <ChevronRight aria-hidden="true" data-icon="inline-end" /></button> : <button type="button" className="chapter-navigation-primary" onClick={onNext} disabled={!canNavigate}>Next Chapter <ChevronRight aria-hidden="true" data-icon="inline-end" /></button>}
  </nav>
}

export function StoryResumePrompt({ storyName, savedProgress, chapterTitles, onContinue, onStartBeginning }: StoryResumePromptProps) {
  const chapterTitle = chapterTitles[savedProgress.chapterIndex] ?? chapterTitles[0]
  return <section className="story-resume-prompt" aria-labelledby="story-resume-title">
    <div><p className="story-resume-eyebrow">ARCHIVE CHECKPOINT</p><h2 id="story-resume-title">Continue {storyName}?</h2><p>You last reached Chapter {savedProgress.chapterIndex + 1} of {chapterTitles.length}: <strong>{chapterTitle}</strong>.</p></div>
    <div className="story-resume-actions"><button type="button" className="chapter-navigation-primary" onClick={onContinue}>Continue Story <ChevronRight aria-hidden="true" data-icon="inline-end" /></button><button type="button" className="chapter-navigation-secondary" onClick={onStartBeginning}>Start from Beginning</button></div>
  </section>
}
