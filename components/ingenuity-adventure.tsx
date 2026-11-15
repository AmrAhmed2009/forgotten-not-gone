"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { ArrowLeft, BatteryCharging, Camera, ExternalLink, Info, MapPin, Maximize2, Printer, Radio, RotateCcw, Satellite, Sun, Thermometer, Wind, X } from "lucide-react"
import { CaptainNovaDialogue } from "@/components/captain-nova-dialogue"
import { ChapterNavigation, ChapterNavigationActions, StoryResumePrompt, hasStoryProgress, useStoryProgress } from "@/components/chapter-navigation"

const NASA_DIAGRAM_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anatomy-of-ingenuity-mars-helicopter-OMWWegjUtxd5UxTnKah0vp8xM5H6AA.jpg"
const MISSION_SOURCE = "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"

type StoryImage = {
  src: string
  alt: string
  title: string
  date: string
  credit: string
  href: string
  caption: string
}

type Chapter = {
  id: string
  label: string
  title: string
  subtitle: string
  messages: string[]
  finalAction: string
}

const images = {
  close: {
    src: "/mission-images/nasa/ingenuity-pia25881.jpg",
    alt: "Ingenuity Mars Helicopter standing on the surface of Mars, photographed by Perseverance",
    title: "Ingenuity at Two Years on Mars — PIA25881",
    date: "April 16, 2023",
    credit: "NASA/JPL-Caltech/ASU/MSSS",
    href: "https://science.nasa.gov/photojournal/ingenuity-at-two-years-on-mars/",
    caption: "Ingenuity is clearly visible on the Martian surface, with its dusty solar panel and rotor system.",
  },
  deployment: {
    src: "/mission-images/nasa/ingenuity-deployment-pia24424.jpg",
    alt: "Ingenuity attached beneath NASA's Perseverance rover before deployment",
    title: "Ingenuity Attached to Perseverance — PIA24424",
    date: "Mars 2020 mission",
    credit: "NASA/JPL-Caltech",
    href: "https://images.nasa.gov/details/PIA24424",
    caption: "Ingenuity traveled to Mars attached beneath Perseverance, protected for the journey.",
  },
  deployed: {
    src: "/mission-images/ingenuity-deployed-2021.jpg",
    alt: "Ingenuity on the Martian surface after Perseverance deployed it",
    title: "Ingenuity Deployed on Mars — PIA24541",
    date: "April 2021",
    credit: "NASA/JPL-Caltech",
    href: "https://science.nasa.gov/photojournal/ingenuity-deployed-on-mars/",
    caption: "After arrival, Perseverance placed Ingenuity on the surface so its flight experiment could begin.",
  },
  firstFlight: {
    src: "/mission-images/nasa/ingenuity-first-flight-pia24591.jpg",
    alt: "Ingenuity flying above the Martian surface during its first powered flight",
    title: "Ingenuity's First Flight — PIA24591",
    date: "April 19, 2021",
    credit: "NASA/JPL-Caltech",
    href: "https://images.nasa.gov/details/PIA24591",
    caption: "This NASA image records the first powered, controlled flight on another planet.",
  },
  finalAirfield: {
    src: "/mission-images/nasa/ingenuity-pia26236.jpg",
    alt: "Ingenuity visible at Valinor Hills after its final flight",
    title: "Perseverance Spots Ingenuity at Its Final Airfield — PIA26236",
    date: "February 4, 2024",
    credit: "NASA/JPL-Caltech/ASU/MSSS",
    href: "https://science.nasa.gov/photojournal/perseverance-spots-ingenuity-at-its-final-airfield/",
    caption: "Ingenuity appears small in the Valinor Hills landscape after flight operations ended.",
  },
  valinor: {
    src: "/mission-images/ingenuity-valinor-hills.jpg",
    alt: "Valinor Hills panorama on Mars with Ingenuity visible as a small speck in the landscape",
    title: "Ingenuity at Valinor Hills — PIA26237",
    date: "February 2024",
    credit: "NASA/JPL-Caltech/ASU/MSSS",
    href: "https://science.nasa.gov/photojournal/ingenuity-at-valinor-hills/",
    caption: "A wide panorama shows how small Ingenuity is against the landscape it helped us explore from above.",
  },
} satisfies Record<string, StoryImage>

const launchImage: StoryImage = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Mars_2020_Perseverance_Launch_(NHQ202007300022).jpg",
  alt: "Mars 2020 Perseverance launch on an Atlas V rocket",
  title: "Mars 2020 Perseverance Launch — NHQ202007300022",
  date: "July 30, 2020",
  credit: "NASA/Joel Kowsky",
  href: MISSION_SOURCE,
  caption: "The Atlas V launched Perseverance and its tiny helicopter passenger from Earth.",
}

const chapters: Chapter[] = [
  {
    id: "dream",
    label: "The Dream",
    title: "Could a Helicopter Really Fly on Mars?",
    subtitle: "A dream that became reality.",
    messages: [
      "Life on Mars? Flying on the surface of another planet?",
      "What if I told you that this is not science fiction?",
      "It all started with an idea, but on February 18, 2021, that idea took its first real step towards becoming reality.",
      "The plan was for the helicopter to complete just 5 flights, but it surprised everyone by completing 72 flights instead.",
      "A helicopter that went beyond expectations and put flight technology to the test, achieving the first powered, controlled flight on another planet.",
      "It flew for a total of 128.8 minutes,\ncovered a distance of 17 kilometers,\nand reached an altitude of 24 meters.\nAnd trust me, the numbers are only part of the story.",
      "All of this happened under an atmosphere with less than 1% of Earth's atmospheric density.\nAnd Temperatures may reach -90 degrees Celsius.\n\nIt weighed approximately 1.8 kg, with rotor blades spanning 1.2 meters.",
      "We're talking about..\n\nIngenuity Mars Helicopter.",
    ],
    finalAction: "Meet Ingenuity",
  },
  {
    id: "journey",
    label: "Journey",
    title: "The Journey to Mars",
    subtitle: "A little helicopter traveling with a giant rover.",
    messages: [
      "But how did a tiny helicopter manage to make history on a planet millions of kilometers away? Let's take a closer look.",
      "This helicopter has a somewhat unique story; it is the first helicopter to fly on another planet.",
      "It was sent to Mars by NASA as part of the Mars 2020 mission, traveling attached to the underside of the Perseverance rover.",
      "It arrived on Mars on February 18, 2021, then detached from the rover and settled onto the Martian surface.",
    ],
    finalAction: "See Ingenuity's Journey",
  },
  {
    id: "purpose",
    label: "Purpose",
    title: "A Tiny Helicopter with a Big Purpose",
    subtitle: "Testing the impossible.",
    messages: [
      "But why was it sent?",
      "Its primary objective was to test the feasibility of powered flight on another planet—a first in human history.",
    ],
    finalAction: "Explore Ingenuity's Design",
  },
  {
    id: "challenges",
    label: "Challenges",
    title: "Flying Where the Air Is Thin",
    subtitle: "An extraordinary engineering challenge.",
    messages: [
      "The mission faced several challenges, including:",
      "• Atmospheric density;\n• A thin atmosphere, which makes generating lift more difficult;",
      "• Extremely harsh temperatures;\n• The vast distance between Earth and Mars;\n• The high energy requirements for flight;\n• Martian winds and dust.",
      "But every need had a solution.",
    ],
    finalAction: "Discover the Engineering Solutions",
  },
  {
    id: "history",
    label: "History",
    title: "Beyond All Expectations",
    subtitle: "A small helicopter that changed history.",
    messages: [
      "The mission was initially planned to consist of just five flights over a 30-day period, intended to explore the terrain and capture images of areas inaccessible to the rover.",
    ],
    finalAction: "See the Historic Flights",
  },
  {
    id: "final-flight",
    label: "Final Flight",
    title: "The Day Ingenuity Stopped Flying",
    subtitle: "January 18, 2024.",
    messages: [
      "On January 18, 2024, during its 72nd—and final—flight, the helicopter sustained damage to several of its rotor blades while landing after a short aerial excursion.",
      "This damage was identified through photographs, rendering the helicopter unable to fly again.",
      "On January 25, 2024, NASA announced the conclusion of its mission.",
    ],
    finalAction: "See What Happened to Ingenuity",
  },
  {
    id: "legacy",
    label: "Legacy",
    title: "Forgotten? Never.",
    subtitle: "A legacy beyond the final flight.",
    messages: [
      "Although the aircraft remains on the surface of Mars and its mission has ended, its legacy endures through the data it gathered—information that will prove instrumental in the design of future aircraft intended for planetary exploration.",
      "Some missions may come to an end, but the impact they leave behind lasts far beyond their final flight.",
    ],
    finalAction: "Finish Ingenuity's Story",
  },
]

const challenges = [
  { id: "thin-air", icon: Wind, title: "Thin atmosphere", detail: "Mars' thin atmosphere makes it difficult for rotor blades to produce sufficient lift.", solution: "NASA addressed this with lightweight construction and specialized, fast-spinning rotors." },
  { id: "cold", icon: Thermometer, title: "Cold temperatures", detail: "Ingenuity used insulation, batteries, heaters, and careful energy management to survive cold Martian nights.", solution: "Energy planning helped protect the helicopter while it waited for sunlight." },
  { id: "distance", icon: Radio, title: "Distance from Earth", detail: "Communication delays meant engineers could not pilot Ingenuity in real time from Earth.", solution: "The helicopter relied on autonomous flight control." },
  { id: "energy", icon: Sun, title: "Energy requirements", detail: "Ingenuity used solar energy to recharge its batteries.", solution: "Its flight and nighttime survival systems required careful energy planning." },
  { id: "dust", icon: Wind, title: "Wind and dust", detail: "Mars' environment introduced flight and navigation risks.", solution: "NASA used onboard sensors, autonomous control, and carefully planned flights." },
]

function PhotoCard({ image, onOpen, compact = false }: { image: StoryImage; onOpen?: () => void; compact?: boolean }) {
  return (
    <figure className={`ing-seven-photo${compact ? " is-compact" : ""}`} style={{ "--story-image": `url("${image.src}")` } as CSSProperties}>
      <div className="ing-seven-photo-image">
        <img src={image.src} alt={image.alt} />
        {onOpen && <button type="button" className="ing-photo-open" onClick={onOpen}><Maximize2 aria-hidden="true" /> Inspect photo</button>}
      </div>
      <figcaption>
        <strong>{image.title}</strong>
        <span>{image.date} · {image.credit}</span>
        <p>{image.caption}</p>
        <a href={image.href} target="_blank" rel="noreferrer">Open NASA source <ExternalLink aria-hidden="true" /></a>
      </figcaption>
    </figure>
  )
}

function StatStrip() {
  return <div className="ing-stat-strip" aria-label="Verified Ingenuity flight statistics"><div><b>72</b><span>flights</span></div><div><b>128.8</b><span>flying minutes</span></div><div><b>17 km</b><span>distance</span></div><div><b>24 m</b><span>maximum altitude</span></div></div>
}

function ChapterVisual({ chapterIndex, selectedJourney, setSelectedJourney, selectedDesign, setSelectedDesign, selectedChallenge, setSelectedChallenge, selectedFlight, setSelectedFlight, onOpenPhoto }: { chapterIndex: number; selectedJourney: number; setSelectedJourney: (value: number) => void; selectedDesign: string; setSelectedDesign: (value: string) => void; selectedChallenge: string; setSelectedChallenge: (value: string) => void; selectedFlight: number; setSelectedFlight: (value: number) => void; onOpenPhoto: (image: StoryImage) => void }) {
  if (chapterIndex === 0) return <div className="ing-seven-visual-stack"><PhotoCard image={images.close} onOpen={() => onOpenPhoto(images.close)} /><div className="ing-name-reveal"><span>NAME REVEALED</span><b>Ingenuity Mars Helicopter</b><small>February 18, 2021 was its arrival on Mars. The first powered, controlled flight followed on April 19, 2021.</small></div><StatStrip /></div>

  if (chapterIndex === 1) {
    const journey = [
      { date: "July 30, 2020", title: "Launch from Earth", text: "Mars 2020 launches with Perseverance and Ingenuity aboard.", image: launchImage },
      { date: "Traveling to Mars", title: "A tiny passenger", text: "Ingenuity travels attached beneath Perseverance.", image: images.deployment },
      { date: "February 18, 2021", title: "Arrival on Mars", text: "Perseverance and Ingenuity arrive at Jezero Crater.", image: undefined },
      { date: "April 2021", title: "Deployment", text: "Ingenuity is settled onto the Martian surface.", image: images.deployed },
    ]
    const active = journey[selectedJourney]
    return <div className="ing-seven-visual-stack"><div className="ing-journey-timeline" role="list" aria-label="Ingenuity journey timeline">{journey.map((event, index) => <button type="button" role="listitem" key={event.title} className={selectedJourney === index ? "is-selected" : ""} onClick={() => setSelectedJourney(index)}><span>{String(index + 1).padStart(2, "0")}</span><b>{event.date}</b><strong>{event.title}</strong></button>)}</div><div className="ing-event-detail">{active.image ? <PhotoCard image={active.image} onOpen={() => onOpenPhoto(active.image!)} compact /> : <div className="ing-arrival-card"><MapPin aria-hidden="true" /><b>{active.date}</b><strong>{active.title}</strong><p>{active.text}</p><small>Timeline milestone — no landing photograph is shown here.</small></div>}<p className="ing-detail-note">{active.text}</p></div></div>
  }

  if (chapterIndex === 2) return <div className="ing-seven-visual-stack"><div className="ing-diagram-frame"><div className="ing-diagram-toolbar"><span>NASA TECHNICAL REFERENCE</span><a href="https://www.jpl.nasa.gov/news/press_kits/ingenuity/landing/mission/spacecraft/" target="_blank" rel="noreferrer">Source <ExternalLink aria-hidden="true" /></a></div><img src={NASA_DIAGRAM_URL} alt="NASA annotated anatomy diagram of the Ingenuity Mars Helicopter" /></div><div className="ing-design-groups" aria-label="Optional Ingenuity design discoveries">{[{ id: "flight", icon: Satellite, title: "Flight system", text: "Rotor blades and lightweight structure helped generate lift." }, { id: "power", icon: BatteryCharging, title: "Power system", text: "The solar panel and batteries recharged and powered the helicopter." }, { id: "navigation", icon: Camera, title: "Navigation system", text: "Cameras, sensors, avionics, and antennas supported autonomous flights." }].map((group) => { const Icon = group.icon; return <button type="button" key={group.id} className={selectedDesign === group.id ? "is-selected" : ""} onClick={() => setSelectedDesign(group.id)}><Icon aria-hidden="true" /><b>{group.title}</b><span>{group.text}</span></button> })}</div></div>

  if (chapterIndex === 3) return <div className="ing-seven-visual-stack"><div className="ing-atmosphere-card"><div className="ing-atmosphere-earth"><span>EARTH</span><b>100%</b><i>dense atmosphere</i></div><div className="ing-atmosphere-arrow">→</div><div className="ing-atmosphere-mars"><span>MARS</span><b>&lt; 1%</b><i>of Earth's atmospheric density</i></div><p>Educational illustration · not a NASA photograph</p></div><div className="ing-challenge-grid" aria-label="Optional engineering solutions">{challenges.map((challenge) => { const Icon = challenge.icon; return <button type="button" key={challenge.id} className={selectedChallenge === challenge.id ? "is-selected" : ""} onClick={() => setSelectedChallenge(challenge.id)}><Icon aria-hidden="true" /><b>{challenge.title}</b><span>{selectedChallenge === challenge.id ? `${challenge.detail} ${challenge.solution}` : "Tap to reveal the engineering solution."}</span></button> })}</div></div>

  if (chapterIndex === 4) {
    const flights = [
      { date: "April 19, 2021", title: "First powered flight", text: "Ingenuity's first powered, controlled flight lasted approximately 39.1 seconds.", image: images.firstFlight },
      { date: "Original demonstration", title: "Five flights planned", text: "NASA initially planned up to five experimental flights over 30 days." },
      { date: "Extended operations", title: "Aerial scouting", text: "Ingenuity continued operating and gathered engineering experience for future Mars aircraft." },
      { date: "72 flights completed", title: "Beyond expectations", text: "Ingenuity completed 72 flights, 128.8 flying minutes, 17 kilometers, and reached 24 meters maximum altitude." },
    ]
    const active = flights[selectedFlight]
    return <div className="ing-seven-visual-stack"><div className="ing-history-timeline" role="list" aria-label="Historic Ingenuity flights">{flights.map((flight, index) => <button type="button" role="listitem" key={flight.title} className={selectedFlight === index ? "is-selected" : ""} onClick={() => setSelectedFlight(index)}><span>{String(index + 1).padStart(2, "0")}</span><b>{flight.date}</b><strong>{flight.title}</strong></button>)}</div>{active.image ? <PhotoCard image={active.image} onOpen={() => onOpenPhoto(active.image!)} compact /> : <div className="ing-milestone-detail"><span>{active.date}</span><b>{active.title}</b><p>{active.text}</p></div>}<StatStrip /><a className="ing-evidence-link" href={MISSION_SOURCE} target="_blank" rel="noreferrer">Open NASA flight log and mission evidence <ExternalLink aria-hidden="true" /></a></div>
  }

  if (chapterIndex === 5) return <div className="ing-seven-visual-stack"><div className="ing-before-after"><button type="button" className={selectedFlight === 0 ? "is-selected" : ""} onClick={() => setSelectedFlight(0)}><PhotoCard image={images.close} compact /><span>Before the final flight · verified historical photograph</span></button><button type="button" className={selectedFlight === 1 ? "is-selected" : ""} onClick={() => setSelectedFlight(1)}><PhotoCard image={images.finalAirfield} compact /><span>After the final flight · final-airfield evidence</span></button></div><div className="ing-evidence-note"><Info aria-hidden="true" /><p>NASA photographs identify the rotor damage and final airfield evidence. They do not show the exact moment of damage.</p></div></div>

  return <div className="ing-seven-visual-stack"><PhotoCard image={images.valinor} onOpen={() => onOpenPhoto(images.valinor)} /><div className="ing-legacy-facts"><span>THE ARCHIVE REMEMBERS</span><b>First flight · April 19, 2021</b><b>72 flights completed</b><b>Final flight · January 18, 2024</b></div></div>
}

export function IngenuityAdventure({ nickname, onReplay, onChooseAnother, onFinished }: { nickname: string; onReplay: () => void; onChooseAnother: () => void; onFinished: () => void }) {
  const explorer = nickname.trim() || "Explorer"
  const { savedProgress, progressLoaded, saveProgress, clearProgress } = useStoryProgress("ingenuity", chapters.length)
  const [chapterIndex, setChapterIndex] = useState(0)
  const [dialogueMessageIndex, setDialogueMessageIndex] = useState(0)
  const [showNova, setShowNova] = useState(false)
  const [dialogueCompleted, setDialogueCompleted] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [resumeResolved, setResumeResolved] = useState(false)
  const [finished, setFinished] = useState(false)
  const [selectedJourney, setSelectedJourney] = useState(0)
  const [selectedDesign, setSelectedDesign] = useState("flight")
  const [selectedChallenge, setSelectedChallenge] = useState("thin-air")
  const [selectedFlight, setSelectedFlight] = useState(0)
  const [photo, setPhoto] = useState<StoryImage | null>(null)
  const chapter = chapters[chapterIndex]
  const chapterTitles = chapters.map((item) => item.title)

  useEffect(() => {
    if (!progressLoaded || resumeResolved) return
    if (hasStoryProgress(savedProgress)) setShowResume(true)
    else { setResumeResolved(true); setShowNova(true) }
  }, [progressLoaded, resumeResolved, savedProgress])
  useEffect(() => {
    if (!resumeResolved) return
    setShowNova(true)
    setDialogueCompleted(false)
    setPhoto(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [chapterIndex, resumeResolved])
  useEffect(() => {
    if (!resumeResolved || finished) return
    const completedChapters = Array.from({ length: chapterIndex }, (_, index) => index)
    if (dialogueCompleted && !completedChapters.includes(chapterIndex)) completedChapters.push(chapterIndex)
    saveProgress({ storyId: "ingenuity", chapterIndex, dialogueMessageIndex, completedChapters, questionAnswers: {} })
  }, [chapterIndex, dialogueCompleted, dialogueMessageIndex, finished, resumeResolved, saveProgress])

  function continueStory() {
    const savedChapter = Math.max(0, Math.min(savedProgress?.chapterIndex ?? 0, chapters.length - 1))
    setChapterIndex(savedChapter)
    setDialogueMessageIndex(Math.max(0, savedProgress?.dialogueMessageIndex ?? 0))
    setShowResume(false)
    setResumeResolved(true)
    setShowNova(true)
  }
  function startFromBeginning() {
    clearProgress()
    setChapterIndex(0)
    setDialogueMessageIndex(0)
    setDialogueCompleted(false)
    setShowResume(false)
    setResumeResolved(true)
    setFinished(false)
    setSelectedJourney(0)
    setSelectedDesign("flight")
    setSelectedChallenge("thin-air")
    setSelectedFlight(0)
    setShowNova(true)
  }
  function enterChapter(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= chapters.length) return
    setDialogueMessageIndex(0)
    setChapterIndex(nextIndex)
    setFinished(false)
  }
  function completeDialogue() { setDialogueCompleted(true); setShowNova(false) }
  function finishStory() { setFinished(true); onFinished() }
  function restart() { clearProgress(); startFromBeginning() }
  function replayNova() { setDialogueMessageIndex(0); setDialogueCompleted(false); setShowNova(true) }

  return <section className="ing-seven" aria-labelledby="chapter-navigation-title"><ChapterNavigation storyName="Ingenuity Mars Helicopter" storyMeta="MISSION 01 · MARS STORYBOOK" chapterTitles={chapterTitles} chapterIndex={chapterIndex} onExit={onChooseAnother} />{showResume && savedProgress && <StoryResumePrompt storyName="Ingenuity" savedProgress={savedProgress} chapterTitles={chapterTitles} onContinue={continueStory} onStartBeginning={startFromBeginning} />}<article className="ing-seven-chapter" key={chapter.id} aria-live="polite"><div className="ing-seven-copy"><p className="ing-seven-kicker">CHAPTER {chapterIndex + 1} · {chapter.label.toUpperCase()}</p><h2>{chapter.title}</h2><p className="ing-seven-subtitle">{chapter.subtitle}</p><p className="ing-seven-instruction">Captain Nova will tell the story. When the dialogue ends, explore the evidence at your own pace.</p><div className="ing-seven-chapter-fact"><span>NASA STORYBOOK</span><b>{chapterIndex === 0 ? "Begin with wonder." : chapterIndex === 6 ? "A legacy beyond the final flight." : "Observe. Discover. Continue."}</b></div></div><ChapterVisual chapterIndex={chapterIndex} selectedJourney={selectedJourney} setSelectedJourney={setSelectedJourney} selectedDesign={selectedDesign} setSelectedDesign={setSelectedDesign} selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} onOpenPhoto={setPhoto} /></article><CaptainNovaDialogue open={showNova} onOpenChange={setShowNova} title="Captain Nova" dialogueId={`ingenuity-seven-${chapter.id}`} sequenceMessages={chapter.messages} initialMessageIndex={dialogueMessageIndex} onMessageIndexChange={setDialogueMessageIndex} finalActionLabel={chapter.finalAction} onDialogueComplete={completeDialogue} dismissible={false} /><ChapterNavigationActions chapterIndex={chapterIndex} totalChapters={chapters.length} dialogueOpen={showNova} dialogueCompleted={dialogueCompleted} completed={finished} onExit={onChooseAnother} onPrevious={() => enterChapter(chapterIndex - 1)} onNext={() => enterChapter(chapterIndex + 1)} onFinish={finishStory} onReplayNova={replayNova} />{finished && <section className="ing-seven-summary" aria-labelledby="ing-seven-summary-title"><div className="ing-summary-heading"><p>YOUR STORY SUMMARY</p><h2 id="ing-seven-summary-title">{explorer}, you followed Ingenuity beyond the final flight.</h2><p>A little helicopter that changed the history of planetary flight.</p></div><PhotoCard image={images.valinor} onOpen={() => setPhoto(images.valinor)} compact /><div className="ing-summary-facts"><b>Arrived on Mars <span>February 18, 2021</span></b><b>First flight <span>April 19, 2021</span></b><b>Completed <span>72 flights</span></b><b>Total flight time <span>128.8 minutes</span></b><b>Distance <span>17 kilometers</span></b><b>Maximum altitude <span>24 meters</span></b><b>Final flight <span>January 18, 2024</span></b><b>Flying mission ended <span>January 25, 2024</span></b></div><div className="ing-summary-actions"><button type="button" onClick={restart}><RotateCcw aria-hidden="true" /> Read Story Again</button><button type="button" onClick={onChooseAnother}><ArrowLeft aria-hidden="true" /> Explore Another Story</button><button type="button" onClick={() => window.print()}><Printer aria-hidden="true" /> Save My Story</button></div></section>}{photo && <div className="ing-photo-modal" role="presentation" onClick={() => setPhoto(null)}><section role="dialog" aria-modal="true" aria-labelledby="ing-photo-modal-title" onClick={(event) => event.stopPropagation()}><button type="button" aria-label="Close photo" onClick={() => setPhoto(null)}><X aria-hidden="true" /></button><img src={photo.src} alt={photo.alt} /><h2 id="ing-photo-modal-title">{photo.title}</h2><p>{photo.date} · {photo.credit}</p><a href={photo.href} target="_blank" rel="noreferrer">Open NASA source <ExternalLink aria-hidden="true" /></a></section></div>}</section>
}
