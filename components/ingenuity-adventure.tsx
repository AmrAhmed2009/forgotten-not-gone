"use client"

import { ChevronLeft, ChevronRight, ExternalLink, Info, RotateCcw, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { CaptainNovaDialogue } from "@/components/captain-nova-dialogue"
import { IngenuityScene } from "@/components/ingenuity-scene"
import type { MachinePartId } from "@/components/adventure-content"

type StoryScene = {
  eyebrow: string
  title: string
  story: string[]
  nova: string
  image?: {
    src: string
    alt: string
    caption: string
    credit: string
    href: string
  }
}

const storyScenes: StoryScene[] = [
  {
    eyebrow: "Scene 1 · A question in thin air",
    title: "Could a helicopter fly where the air is almost gone?",
    story: [
      "NASA built Ingenuity to answer one daring question: can a small aircraft make a controlled flight on Mars?",
      "Near the ground, Mars has only about 1% as much atmosphere as Earth. That gives helicopter blades very little air to push against.",
    ],
    nova: "A helicopter on Mars sounds impossible at first. That is exactly why NASA tried it.",
    image: {
      src: "/mission-images/ingenuity-deployed-2021.jpg",
      alt: "NASA's Ingenuity Mars Helicopter standing on the surface of Mars after deployment.",
      caption: "Ingenuity waited on Mars for its first chance to test a completely new kind of flight.",
      credit: "NASA/JPL-Caltech · Mars 2020",
      href: "https://science.nasa.gov/mission/mars-2020-perseverance/",
    },
  },
  {
    eyebrow: "Scene 2 · A tiny passenger",
    title: "Ingenuity crossed space beneath a rover.",
    story: [
      "On July 30, 2020, Ingenuity launched from Earth tucked underneath NASA's Perseverance rover, behind a protective shield.",
      "Perseverance landed in Jezero Crater on February 18, 2021. On April 3, the rover carefully set the helicopter down on Martian ground.",
    ],
    nova: "Imagine riding all the way to Mars underneath a rover. Ingenuity needed Perseverance to reach its runway.",
  },
  {
    eyebrow: "Scene 3 · Built for a strange sky",
    title: "Every part had a job.",
    story: [
      "Ingenuity was light, solar-powered, and topped with two pairs of carbon-fiber blades that spun in opposite directions. Its rotors were about 4 feet, or 1.2 meters, across.",
      "Its camera and onboard computer helped it steer itself. Signals from Earth take too long for a person to fly it with a joystick in real time.",
    ],
    nova: "Tap one of the glowing parts if you want a closer look. You never need to solve this to keep reading.",
  },
  {
    eyebrow: "Scene 4 · A first for another world",
    title: "Then the little helicopter lifted off.",
    story: [
      "On April 19, 2021, Ingenuity climbed about 3 meters, hovered, turned, and landed. The whole first flight lasted 39.1 seconds.",
      "It became the first aircraft to achieve powered, controlled flight on another planet. For a moment, Mars had a helicopter in its sky.",
    ],
    nova: "This was more than a short hop. It proved that powered flight could work on another world.",
    image: {
      src: "/mission-images/ingenuity.jpg",
      alt: "Ingenuity Mars Helicopter on the Martian surface, photographed by the Perseverance rover.",
      caption: "Perseverance photographed Ingenuity after its historic first flight on April 19, 2021.",
      credit: "NASA/JPL-Caltech/ASU/MSSS · First-flight image",
      href: "https://science.nasa.gov/photojournal/ingenuitys-first-flight-recorded-by-mastcam-z/",
    },
  },
  {
    eyebrow: "Scene 5 · Five became seventy-two",
    title: "A small test became a long adventure.",
    story: [
      "Ingenuity was planned for up to five flights over 30 days. It did so well that NASA kept flying it for nearly three years.",
      "By scouting terrain and trying new routes, it helped engineers learn how an aerial explorer could support a rover. In all, Ingenuity completed 72 flights.",
    ],
    nova: "Seventy-two flights! Ingenuity turned one brave experiment into a whole new view of Mars.",
    image: {
      src: "/mission-images/ingenuity-clear-2023.jpg",
      alt: "NASA photograph of Ingenuity on Mars in April 2023, showing its solar panel and rotor blades.",
      caption: "After two years on Mars, dust covered Ingenuity's solar panel and rotors—but it was still flying.",
      credit: "NASA/JPL-Caltech/ASU/MSSS · PIA25881",
      href: "https://science.nasa.gov/photojournal/ingenuity-at-two-years-on-mars/",
    },
  },
  {
    eyebrow: "Scene 6 · The last landing",
    title: "Flight 72 ended differently.",
    story: [
      "On January 18, 2024, Ingenuity rose for its 72nd flight. During the landing, its navigation system had trouble tracking features in a field of nearly featureless sand ripples.",
      "The helicopter landed hard. All four rotor blades were damaged, so Ingenuity could not fly again. NASA ended flight operations one week later, on January 25.",
    ],
    nova: "It is okay to feel sad about the final landing. Even in that hard moment, engineers learned from the evidence.",
    image: {
      src: "/mission-images/ingenuity-valinor-figure-b.jpg",
      alt: "NASA close view locating Ingenuity in the sand ripples at Valinor Hills after its final flight.",
      caption: "NASA's Figure B helps locate Ingenuity at Valinor Hills, the site of its final flight.",
      credit: "NASA/JPL-Caltech/ASU/MSSS · PIA26237 Figure B",
      href: "https://science.nasa.gov/photojournal/ingenuity-at-valinor-hills/",
    },
  },
  {
    eyebrow: "Scene 7 · A lasting lift",
    title: "Its story is still helping the next explorers.",
    story: [
      "Ingenuity showed that flying in the thin atmosphere of Mars is possible. Its flights gave engineers real lessons about autonomous navigation, aerial scouting, and spacecraft design.",
      "It remains at Valinor Hills, silent but not forgotten—a small machine that opened the sky on another world.",
    ],
    nova: "You followed Ingenuity from one big question to a lasting answer. That is how an experiment becomes a legacy.",
    image: {
      src: "/mission-images/ingenuity-valinor-hills.jpg",
      alt: "NASA panorama of Valinor Hills on Mars, with Ingenuity visible as a small speck among the sand ripples.",
      caption: "Ingenuity sits just left of center in this February 2024 NASA panorama of Valinor Hills.",
      credit: "NASA/JPL-Caltech/ASU/MSSS · PIA26237",
      href: "https://science.nasa.gov/photojournal/ingenuity-at-valinor-hills/",
    },
  },
]

function StoryPhoto({ image, expanded, onToggle }: { image: NonNullable<StoryScene["image"]>; expanded: boolean; onToggle: () => void }) {
  return (
    <figure className={`story-photo${expanded ? " is-expanded" : ""}`}>
      <button type="button" className="story-photo-button" onClick={onToggle} aria-expanded={expanded}>
        <img src={image.src} alt={image.alt} />
        <span className="story-photo-hint"><Info aria-hidden="true" /> {expanded ? "Hide photo note" : "Explore this NASA image"}</span>
      </button>
      <figcaption>
        <p>{image.caption}</p>
        {expanded && <div className="story-photo-note">This is a real NASA image from the story. Look closely: the picture is scientific evidence, not just decoration.</div>}
        <a href={image.href} target="_blank" rel="noreferrer">{image.credit} <ExternalLink aria-hidden="true" /></a>
      </figcaption>
    </figure>
  )
}

export function IngenuityAdventure({ nickname, onReplay, onChooseAnother, onFinished }: { nickname: string; onReplay: () => void; onChooseAnother: () => void; onFinished: () => void }) {
  const explorer = nickname.trim() || "Explorer"
  const [sceneIndex, setSceneIndex] = useState(0)
  const [expandedPhoto, setExpandedPhoto] = useState(false)
  const [selectedPart, setSelectedPart] = useState<MachinePartId | null>(null)
  const [discoveredParts, setDiscoveredParts] = useState<MachinePartId[]>([])
  const [prediction, setPrediction] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [showNova, setShowNova] = useState(true)

  const scene = storyScenes[sceneIndex]
  const isFinalScene = sceneIndex === storyScenes.length - 1

  useEffect(() => {
    setExpandedPhoto(false)
    setShowNova(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [sceneIndex])

  function choosePart(part: MachinePartId) {
    setSelectedPart(part)
    setDiscoveredParts((current) => current.includes(part) ? current : [...current, part])
  }

  function moveTo(nextIndex: number) {
    if (nextIndex === storyScenes.length - 1 && !completed) {
      setCompleted(true)
      onFinished()
    }
    setSceneIndex(nextIndex)
  }

  function restart() {
    setSceneIndex(0)
    setExpandedPhoto(false)
    setSelectedPart(null)
    setDiscoveredParts([])
    setPrediction(null)
    setCompleted(false)
    onReplay()
  }

  return (
    <section className="storybook" aria-labelledby="ingenuity-story-title">
      <header className="storybook-header">
        <button type="button" className="storybook-back-link" onClick={onChooseAnother}><ChevronLeft aria-hidden="true" /> All stories</button>
        <div>
          <p>MISSION 01 · STORYBOOK</p>
          <h1 id="ingenuity-story-title">Ingenuity: The Little Helicopter That Could</h1>
        </div>
        <p className="storybook-count" aria-label={`Scene ${sceneIndex + 1} of ${storyScenes.length}`}>{sceneIndex + 1} / {storyScenes.length}</p>
      </header>

      <ol className="storybook-progress" aria-label="Ingenuity story scenes">
        {storyScenes.map((item, index) => <li key={item.title} className={index === sceneIndex ? "is-current" : index < sceneIndex ? "is-read" : ""} aria-current={index === sceneIndex ? "step" : undefined}><span>{index + 1}</span><em>{item.title}</em></li>)}
      </ol>

      <article className={`storybook-scene${sceneIndex === 2 ? " storybook-scene-parts" : ""}`} key={scene.title} aria-live="polite">
        <div className="storybook-copy">
          <p className="storybook-eyebrow">{scene.eyebrow}</p>
          <h2>{scene.title}</h2>
          {scene.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          {sceneIndex === 0 && <section className="story-interaction" aria-label="Prediction activity"><p><Sparkles aria-hidden="true" /> Before NASA tested it, what do you think mattered most?</p><div><button type="button" className={prediction === "light" ? "is-selected" : ""} onClick={() => setPrediction("light")}>Keeping it light</button><button type="button" className={prediction === "rotors" ? "is-selected" : ""} onClick={() => setPrediction("rotors")}>Fast, wide rotors</button><button type="button" className={prediction === "both" ? "is-selected" : ""} onClick={() => setPrediction("both")}>Both together</button></div>{prediction && <small>Good thinking. Ingenuity needed a lightweight body, fast counter-rotating rotors, power, and autonomous navigation working together.</small>}</section>}

        </div>

        {sceneIndex === 2 ? <div className="storybook-visual storybook-parts-visual"><section className="story-illustration" aria-label="Explore Ingenuity's components"><p>Tap a highlighted part to discover what it does.</p><IngenuityScene discovered={discoveredParts} selected={selectedPart} onSelect={choosePart} /></section></div> : <div className="storybook-visual">
          {scene.image ? <StoryPhoto image={scene.image} expanded={expandedPhoto} onToggle={() => setExpandedPhoto((value) => !value)} /> : <figure className="story-space-art"><div className="story-space-art-orbit" /><div className="story-space-art-planet"><span>EARTH</span><i /></div><div className="story-space-art-rover"><b>PERSEVERANCE</b><small>Ingenuity rode below</small></div><figcaption>NASA's Mars 2020 mission carried Ingenuity safely from Earth to Mars.</figcaption></figure>}
        </div>}
      </article>

      <CaptainNovaDialogue key={sceneIndex} open={showNova} onOpenChange={setShowNova} title="Captain Nova" actionLabel="Keep reading" onAction={() => setShowNova(false)} dismissible>
        <p>{scene.nova}</p>
      </CaptainNovaDialogue>

      <nav className="storybook-nav" aria-label="Story controls">
        <button type="button" className="storybook-nav-button storybook-nav-secondary" onClick={() => moveTo(Math.max(0, sceneIndex - 1))} disabled={sceneIndex === 0}><ChevronLeft aria-hidden="true" /> Back</button>
        {isFinalScene ? <button type="button" className="storybook-nav-button" onClick={onChooseAnother}>Explore Another Story <ChevronRight aria-hidden="true" /></button> : <button type="button" className="storybook-nav-button" onClick={() => moveTo(sceneIndex + 1)}>Next <ChevronRight aria-hidden="true" /></button>}
      </nav>

      {isFinalScene && <section className="storybook-summary" aria-label="Your Ingenuity story summary"><p className="storybook-eyebrow">{explorer}&apos;s story summary</p><h2>You followed a question all the way to a new sky.</h2><p>Ingenuity traveled to Mars beneath Perseverance, became the first aircraft to fly on another planet, completed 72 flights, and left engineers with a lasting map for future aerial explorers.</p><button type="button" className="storybook-replay" onClick={restart}><RotateCcw aria-hidden="true" /> Read Ingenuity&apos;s story again</button></section>}

      <style jsx>{`
        .storybook { width:min(1120px, calc(100% - 32px)); margin:24px auto 72px; color:#e5efed; }
        .storybook-header { display:grid; grid-template-columns:auto minmax(0, 1fr) auto; gap:18px; align-items:end; padding:0 0 18px; border-bottom:1px solid rgba(113,226,225,.24); }
        .storybook-header p,.storybook-eyebrow { margin:0; color:#89d5d2; font:800 10px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:1.2px; }
        .storybook-header h1 { margin:7px 0 0; color:#f8f3e9; font-family:Georgia,serif; font-size:clamp(24px,4vw,40px); line-height:1.05; }
        .storybook-back-link { display:inline-flex; align-items:center; gap:4px; padding:6px 0; border:0; background:transparent; color:#b7ece7; font:800 10px ui-monospace,SFMono-Regular,Menlo,monospace; cursor:pointer; }.storybook-back-link svg{width:15px}
        .storybook-count { white-space:nowrap; }
        .storybook-progress { display:flex; gap:5px; padding:18px 0; margin:0; list-style:none; overflow:auto; scrollbar-width:none; }.storybook-progress::-webkit-scrollbar{display:none}.storybook-progress li { display:flex; flex:0 0 auto; align-items:center; gap:7px; color:#758c96; font:700 8px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.6px; }.storybook-progress span { display:grid; width:24px; height:24px; place-items:center; border:1px solid #46616b; border-radius:50%; }.storybook-progress em { font-style:normal; max-width:92px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.storybook-progress li.is-read span { border-color:#80d4ca; color:#a7e3dc; }.storybook-progress li.is-current span { border-color:#efa868; background:#efa868; color:#102431; }.storybook-progress li.is-current em { color:#f4ddbe; }
        .storybook-scene { display:grid; grid-template-columns:minmax(0, .95fr) minmax(0, 1.05fr); gap:clamp(24px,5vw,56px); align-items:center; min-height:440px; padding:clamp(24px,5vw,58px); border:1px solid rgba(113,226,225,.22); border-radius:26px; background:radial-gradient(circle at 84% 16%, rgba(239,168,104,.12), transparent 24rem), linear-gradient(135deg,rgba(19,49,62,.94),rgba(9,24,39,.96)); box-shadow:0 24px 70px rgba(0,0,0,.2); animation:scene-enter .42s ease both; }
        .storybook-scene-parts { grid-template-columns:minmax(260px, .7fr) minmax(0, 1.3fr); min-height:0; }
        .storybook-copy h2,.storybook-summary h2 { margin:8px 0 15px; color:#f7f1e8; font-family:Georgia,serif; font-weight:400; font-size:clamp(30px,4vw,49px); line-height:1.03; }.storybook-copy > p:not(.storybook-eyebrow),.storybook-summary > p:not(.storybook-eyebrow) { margin:0 0 13px; color:#c4d5d5; font-size:15px; line-height:1.68; }
        .storybook-visual { min-width:0; }.storybook-parts-visual { display:flex; align-items:center; justify-content:center; }.story-photo,.story-space-art { margin:0; overflow:hidden; border:1px solid rgba(156,211,209,.28); border-radius:18px; background:#091723; box-shadow:0 16px 40px rgba(0,0,0,.25); }.story-photo-button { position:relative; display:block; width:100%; padding:0; border:0; background:#101f2c; cursor:pointer; }.story-photo img { display:block; width:100%; min-height:290px; max-height:420px; object-fit:cover; transition:transform .5s ease; }.story-photo-button:hover img { transform:scale(1.025); }.story-photo-hint { position:absolute; right:12px; bottom:12px; display:inline-flex; min-height:32px; align-items:center; gap:6px; padding:0 10px; border:1px solid rgba(224,243,239,.34); border-radius:999px; background:rgba(6,17,27,.78); color:#ecf5ef; font:800 8px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.75px; }.story-photo-hint svg{width:14px;color:#efaa67}.story-photo figcaption,.story-space-art figcaption { padding:13px 15px 15px; color:#aebfc2; font-size:12px; line-height:1.45; }.story-photo figcaption p { margin:0; }.story-photo figcaption a { display:inline-flex; align-items:center; gap:5px; margin-top:8px; color:#90ddd8; font:800 8px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.7px; text-decoration:none; }.story-photo figcaption svg { width:12px; }.story-photo-note { margin-top:10px; padding:9px 10px; border-left:2px solid #efaa67; background:rgba(239,170,103,.1); color:#dceae5; font-size:11px; line-height:1.45; animation:note-enter .25s ease both; }
        .story-interaction { margin-top:21px; padding:15px; border:1px solid rgba(113,226,225,.25); border-radius:13px; background:rgba(5,20,32,.5); }.story-interaction p { display:flex; align-items:center; gap:7px; margin:0 0 10px; color:#dcece8; font-size:13px; font-weight:700; }.story-interaction p svg{width:16px;color:#efaa67}.story-interaction div { display:flex; flex-wrap:wrap; gap:7px; }.story-interaction button { min-height:37px; padding:0 11px; border:1px solid rgba(139,212,208,.35); border-radius:8px; background:#123140; color:#dcece8; font-size:11px; cursor:pointer; }.story-interaction button.is-selected { border-color:#efaa67; background:rgba(239,170,103,.16); color:#ffe2be; }.story-interaction small { display:block; margin-top:10px; color:#acd6d2; font-size:11px; line-height:1.45; }
        .story-illustration { width:100%; margin:0; }.story-illustration :global(.ingenuity-figure) { width:100%; margin:0; }.story-illustration > p { margin:0 0 10px; color:#b7e8e4; font-size:12px; font-weight:700; line-height:1.45; }
        .story-space-art { position:relative; display:grid; min-height:390px; place-items:center; overflow:hidden; background:radial-gradient(circle at 70% 27%,#eaa56f 0 2px,transparent 3px),radial-gradient(circle at 30% 18%,#c5e5e2 0 1px,transparent 2px),radial-gradient(circle at 62% 48%,rgba(47,110,126,.62),transparent 40%),#0b1b2b; }.story-space-art::before { position:absolute; inset:0; background-image:radial-gradient(circle at 7% 19%,#d8f0ee 0 1px,transparent 1.5px),radial-gradient(circle at 78% 12%,#d8f0ee 0 1px,transparent 1.5px),radial-gradient(circle at 88% 76%,#d8f0ee 0 1px,transparent 1.5px); content:""; opacity:.6; }.story-space-art-orbit { position:absolute; width:130%; height:57%; border:1px solid rgba(113,226,225,.24); border-radius:50%; transform:rotate(-22deg); }.story-space-art-planet { position:relative; z-index:1; display:grid; width:126px; height:126px; place-items:center; border-radius:50%; background:radial-gradient(circle at 34% 28%,#69c9c5 0 8%,#24677a 34%,#11354c 66%,#07182a); box-shadow:inset -20px -15px 26px rgba(0,0,0,.42),0 0 34px rgba(95,203,200,.16); color:#e4f2ee; font:800 10px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:1px; }.story-space-art-planet i { position:absolute; width:165px; height:44px; border:1px solid rgba(239,170,103,.72); border-radius:50%; transform:rotate(-19deg); }.story-space-art-rover { position:absolute; z-index:2; right:11%; bottom:21%; display:grid; gap:4px; padding:10px; border:1px solid rgba(239,170,103,.45); border-radius:8px; background:rgba(10,25,39,.86); color:#f2bc85; font:800 8px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.7px; }.story-space-art-rover small { color:#b8ced0; font-size:8px; }.story-space-art figcaption { position:absolute; right:0; bottom:0; left:0; z-index:3; background:rgba(5,16,26,.82); }
        .storybook-nav { display:flex; justify-content:space-between; gap:12px; margin-top:20px; }.storybook-nav-button,.storybook-replay { display:inline-flex; min-height:48px; align-items:center; justify-content:center; gap:6px; padding:0 17px; border:1px solid #71e2e1; border-radius:12px; background:#71e2e1; color:#071721; font:800 10px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.6px; cursor:pointer; transition:transform .2s ease,background .2s ease; }.storybook-nav-button:hover,.storybook-replay:hover { background:#a3f6ef; transform:translateY(-2px); }.storybook-nav-button:disabled { border-color:#36535c; background:transparent; color:#66808a; cursor:not-allowed; transform:none; }.storybook-nav-secondary { background:transparent; color:#b8dfdc; }.storybook-nav-button svg,.storybook-replay svg{width:15px}
        .storybook-summary { margin-top:22px; padding:clamp(22px,4vw,38px); border:1px solid rgba(239,170,103,.42); border-radius:22px; background:radial-gradient(circle at 90% 12%,rgba(239,170,103,.15),transparent 20rem),rgba(16,42,53,.92); animation:scene-enter .45s ease both; }.storybook-summary h2 { font-size:clamp(26px,3.5vw,42px); }.storybook-replay { margin-top:8px; border-color:rgba(239,170,103,.7); background:transparent; color:#f8c58e; }
        @keyframes scene-enter { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} } @keyframes note-enter { from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)} }
        @media (max-width:720px) { .storybook { width:min(100% - 20px, 600px); margin:10px auto 42px; }.storybook-header { grid-template-columns:minmax(0,1fr) auto; gap:7px 12px; }.storybook-back-link { grid-column:1/-1; }.storybook-header h1 { font-size:27px; }.storybook-header p { font-size:8px; }.storybook-progress { padding:13px 0; }.storybook-progress em { display:none; }.storybook-scene { grid-template-columns:1fr; gap:20px; min-height:0; padding:20px; border-radius:19px; }.storybook-copy h2,.storybook-summary h2 { font-size:32px; }.storybook-copy > p:not(.storybook-eyebrow),.storybook-summary > p:not(.storybook-eyebrow) { font-size:14px; line-height:1.58; }.storybook-visual { order:-1; }.storybook-scene-parts .storybook-visual { order:initial; }.story-photo img { min-height:220px; max-height:275px; }.story-space-art { min-height:244px; }.story-space-art-planet { width:94px; height:94px; }.story-space-art-rover { right:6%; bottom:16%; }.story-interaction { margin-top:16px; }.storybook-nav-button { min-height:46px; flex:1; padding:0 10px; font-size:9px; }.storybook-summary { padding:22px; } }
        @media (prefers-reduced-motion:reduce) { .storybook-scene,.storybook-summary,.story-photo-note { animation:none; }.story-photo img,.storybook-nav-button,.storybook-replay { transition:none; } }
      `}</style>
    </section>
  )
}
