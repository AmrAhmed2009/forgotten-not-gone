export const EXPLORER_INTERESTS = ["Engineering", "Space Mysteries", "Science"] as const

export type ExplorerInterest = (typeof EXPLORER_INTERESTS)[number]
export type MissionId = "ingenuity" | "apollo-11" | "sojourner" | "insight"
export type AgeBand = "caregiver" | "younger" | "teen" | "adult" | "unknown"
export type FlightOutcome = "insufficient" | "marginal" | "suitable"
export type FlightTest = { attempt: number; rotorSize: number; rotorSpeed: number; weight: number; score: number; outcome: FlightOutcome; feedback: string; summary: string }

export type MissionComponent = {
  id: string
  name: string
  description: string
  observation: string
  nova?: string
  interaction?: string
}

export type MissionChoice = {
  id: string
  label: string
  hint: string
  feedback: string
  consequence: string
}

export type MissionNarrative = {
  arrival: string
  investigation: string
  history: string
  transmission: string
  legacy: string
  report: string
}

export type MissionRecord = {
  id: MissionId
  number: string
  title: string
  shortTitle: string
  subtitle: string
  artifact: string
  location: string
  planet: string
  image: string
  imageAlt: string
  imageCredit: string
  imageSource: string
  missionSource: string
  sourceLabel: string
  accent: "mars" | "moon" | "science"
  arrival: string
  why: string
  narrative: MissionNarrative
  components: MissionComponent[]
  challengeTitle: string
  challengeIntro: string
  challengeType: "rotor" | "route" | "terrain" | "signals"
  challengeChoices: MissionChoice[]
  nasaApproach: string
  actualResult: string
  finalTransmission: string
  status: string
  legacyTitle: string
  legacy: string
  whatIfPrompt: string
  whatIfChoices: string[]
  discoveries: string[]
  diagramCaption: string
  hotspots: { id: string; x: number; y: number }[]
}

export const INTEREST_PROFILES: Record<ExplorerInterest, { lens: string; arrival: string; clue: string; skill: string }> = {
  Engineering: {
    lens: "You will notice the parts, trade-offs, and clever fixes that kept each machine moving.",
    arrival: "Your engineering lens is online. Look for the design decision hiding in plain sight.",
    clue: "Trace the component that turns a problem into a working system.",
    skill: "systems thinking",
  },
  "Space Mysteries": {
    lens: "You will follow clues, compare evidence, and solve the mystery of where each machine's story ended.",
    arrival: "Your mystery lens is online. Every mark, signal, and silence is a clue.",
    clue: "Find the detail that changes what you think happened.",
    skill: "evidence hunting",
  },
  Science: {
    lens: "You will connect observations to evidence and see how a machine became a scientific instrument.",
    arrival: "Your science lens is online. Notice what the mission measured, tested, or revealed.",
    clue: "Separate an observation from a guess, then build your explanation.",
    skill: "evidence-based reasoning",
  },
}

export const MISSION_DATA: MissionRecord[] = [
  {
    id: "ingenuity",
    number: "01",
    title: "The Helicopter That Defied Mars",
    shortTitle: "Ingenuity",
    subtitle: "The first powered flight on another planet",
    artifact: "Ingenuity Mars Helicopter",
    location: "Jezero Crater · Mars",
    planet: "Mars",
    image: "/mission-images/ingenuity.jpg",
    imageAlt: "NASA's Ingenuity helicopter on the Martian surface",
    imageCredit: "NASA/JPL-Caltech",
    imageSource: "https://images.nasa.gov/details/PIA26236",
    missionSource: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    sourceLabel: "NASA Science",
    accent: "mars",
    arrival: "A tiny rotorcraft is resting on Mars after 72 flights. Your mission is to work out how it ever lifted off in air thinner than Earth's.",
    why: "Ingenuity was a technology demonstration attached to Perseverance: a small test of whether powered, controlled flight could work on another world.",
    narrative: {
      arrival: "Imagine with me: red sand, a thin sky, and a tiny machine waiting in the distance. It looks like a helicopter — but Mars has less than one percent of Earth’s atmospheric density. How could it possibly lift off?",
      investigation: "Let’s discover something amazing. Each glowing part helped Ingenuity solve a problem that an Earth helicopter barely has to think about.",
      history: "Now for the real moment: on April 19, 2021, Ingenuity rose, hovered, turned, and landed. It was the first powered, controlled flight on another planet.",
      transmission: "But wait a minute — after 72 flights, damage to a rotor blade during its final January 2024 flight meant Ingenuity could not fly again. The evidence tells us what ended the flights, not every detail of that last landing.",
      legacy: "What do you think happened next? Ingenuity began as a five-flight test, then became an aerial scout. Its success made flying above another world a demonstrated possibility.",
      report: "You tested the trade-offs that make a thin atmosphere so difficult, Explorer. Ingenuity proved that a small machine can open a whole new view of Mars.",
    },
    components: [
      { id: "blades", name: "Blades", description: "Four carbon-fiber blades formed two counter-rotating rotors. Each rotor was about 1.2 meters across and turned at about 2,400 rpm in the original flight design.", observation: "Large, fast rotors moved enough of Mars' thin air to create lift.", nova: "Look at those enormous blades! Why would a tiny helicopter need them so large?", interaction: "Compare the upper and lower rotors: they spin in opposite directions in flight." },
      { id: "antennas", name: "Antennas", description: "Ingenuity sent its information to the Perseverance rover, which relayed it onward through the Mars communications network.", observation: "Ingenuity did not make a direct phone call to Earth; Perseverance was its nearby communications partner.", nova: "How could a helicopter millions of kilometers away get a message home?", interaction: "Trace the route: Ingenuity → Perseverance → Mars communications network → Mission Control." },
      { id: "solar", name: "Solar panel", description: "The solar array gathered sunlight and recharged Ingenuity's batteries between flights.", observation: "Sunlight supplied new energy while the helicopter rested on the Martian surface.", nova: "Flying takes energy. Where could a tiny helicopter get more electricity on Mars?", interaction: "Imagine sunlight filling the battery indicator between flights." },
      { id: "batteries", name: "Batteries", description: "A six-battery rechargeable lithium-ion system powered flight operations and supported the helicopter's systems.", observation: "Stored energy had to cover both flight and survival through cold Martian nights.", nova: "What happens when the motors need power—or the night gets freezing cold?", interaction: "Compare stored energy for flight with energy for keeping systems warm." },
      { id: "avionics", name: "Avionics & body", description: "The lightweight fuselage housed electronics that supported autonomous flight. Insulation and heaters protected sensitive systems during cold Martian nights.", observation: "Because Earth could not steer every movement instantly, Ingenuity used onboard information to control its flight.", nova: "This is the helicopter's brain. Could someone on Earth steer every movement in real time?", interaction: "Follow the simple loop: sensors → onboard computer → controlled flight." },
      { id: "sensors", name: "Sensors & cameras", description: "Ingenuity had a downward-facing navigation camera and a separate color camera. Its onboard navigation used information from sensors and cameras.", observation: "Navigation needs visible ground features—an important clue for understanding Flight 72 later in the mission.", nova: "How can a helicopter know where it is going when nobody is inside to look out?", interaction: "Look for terrain features a navigation camera could track." },
      { id: "legs", name: "Legs", description: "Lightweight carbon-composite legs supported Ingenuity during takeoff and landing.", observation: "A successful flight still needs a stable, controlled touchdown.", nova: "Even a brilliant flight is not complete unless the helicopter can land. Why do these long legs matter?", interaction: "Compare a level, controlled touchdown with a fictional unstable landing setup." },
    ],
    challengeTitle: "Make lift in thin air",
    challengeIntro: "Tune a simplified test flight. You are not recreating NASA's calculations—just exploring how size, speed, and mass change the balance.",
    challengeType: "rotor",
    challengeChoices: [
      { id: "small", label: "Small rotors", hint: "Less blade area", feedback: "The helicopter feels nimble, but there is not enough blade area to push against the thin air.", consequence: "Low lift: the design skims the dust." },
      { id: "large", label: "Large rotors", hint: "More air to push", feedback: "A strong direction. More area gives the rotors a better chance to move enough Martian air.", consequence: "Good lift: the design reaches a stable hover." },
      { id: "heavy", label: "Heavy body", hint: "More mass to carry", feedback: "The rotors still work, but every extra gram makes the climb harder.", consequence: "Low lift: the design burns its margin too quickly." },
    ],
    nasaApproach: "NASA's engineers made Ingenuity light and gave it large, fast-spinning rotors. Its flight computer used sensors and images to stabilize each flight without a live pilot.",
    actualResult: "Ingenuity flew 72 times—far beyond its original technology-demonstration goal. During its final landing in January 2024, rotor damage ended flight operations.",
    finalTransmission: "The helicopter cannot fly again, but it remains a working record of a first: powered, controlled flight on another planet.",
    status: "Resting at Valinor Hills on Mars",
    legacyTitle: "A new way to scout",
    legacy: "Ingenuity showed that future explorers might look down from the sky, reach rough ground, and plan routes that a rover cannot see from the surface.",
    whatIfPrompt: "If Ingenuity had never flown, what possibility might have stayed untested?",
    whatIfChoices: ["Aerial scouting might have stayed an idea instead of a proven demonstration.", "Rovers would still explore, but mission planners would have one less view from above.", "We might have needed longer to learn how autonomous flight behaves on another world."],
    discoveries: ["Thin atmospheres change familiar engineering rules.", "Autonomy matters when radio signals cannot steer every move.", "A technology demonstration can change the design of future missions."],
    diagramCaption: "NASA Ames Research Center technical presentation, page 15. The original annotated diagram is shown as a reference; interactive markers are an added learning layer.",
    hotspots: [{ id: "blades", x: 17.8, y: 31.6 }, { id: "antennas", x: 45.3, y: 27.2 }, { id: "solar", x: 58.1, y: 26.4 }, { id: "batteries", x: 41, y: 51.8 }, { id: "avionics", x: 49.5, y: 57.2 }, { id: "sensors", x: 47.5, y: 53.4 }, { id: "legs", x: 20.8, y: 72.1 }],
  },
  {
    id: "apollo-11",
    number: "02",
    title: "Eagle — The Machine That Stayed on the Moon",
    shortTitle: "Apollo 11 Eagle",
    subtitle: "The lunar module that carried two explorers down — and left science behind",
    artifact: "Apollo 11 Lunar Module Eagle",
    location: "Sea of Tranquility · Moon",
    planet: "Moon",
    image: "https://images-assets.nasa.gov/image/as11-40-5903/as11-40-5903~orig.jpg",
    imageAlt: "Apollo 11 lunar module Eagle on the Moon",
    imageCredit: "NASA / Buzz Aldrin",
    imageSource: "https://images.nasa.gov/details/as11-40-5903",
    missionSource: "https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/",
    sourceLabel: "NASA",
    accent: "moon",
    arrival: "Imagine with me: for thousands of years, people looked up at the Moon and dreamed of walking there. On July 16, 1969, Armstrong, Aldrin, and Collins launched toward that impossible-looking world.",
    why: "Apollo 11 carried Columbia in lunar orbit and Eagle to the surface. On July 20, 1969, Eagle landed in the Sea of Tranquility while Michael Collins continued orbiting above.",
    narrative: {
      arrival: "Imagine with me! For thousands of years, people looked up at the Moon and dreamed of walking on its surface. On Apollo 11, Armstrong, Aldrin, and Collins turned that dream into a journey — but only two would ride Eagle down.",
      investigation: "And guess what? Eagle was not one single machine doing one single job. Its lower stage had to land safely; its upper stage had to carry the crew back to Columbia.",
      history: "The landing was real history, not a simulation. On July 20, 1969, Armstrong guided Eagle away from a crater field and into the Sea of Tranquility while Collins orbited the Moon in Columbia.",
      transmission: "After about 21 hours and 36 minutes on the Moon, Eagle’s ascent stage carried Armstrong and Aldrin back to Columbia. The descent stage, science equipment, and a record of their work stayed behind.",
      legacy: "Now here’s something really interesting: one Apollo 11 experiment stopped taking commands in 1969, while its passive laser reflector still helps scientists measure the Earth–Moon distance.",
      report: "You followed Eagle from a daring descent to a scientific legacy, Explorer. The Moon kept its machines, but not their ability to teach us.",
    },
    components: [
      { id: "descent", name: "Descent stage and landing legs", description: "The descent stage carried the engine that slowed Eagle for landing and the legs that stayed on the Moon after liftoff.", observation: "The part that got Eagle safely down was designed to remain behind." },
      { id: "ascent", name: "Ascent stage and crew cabin", description: "Armstrong and Aldrin lived in this upper section. Its engine later carried them back to Columbia in lunar orbit.", observation: "One spacecraft could have two stages with different jobs — landing, then returning." },
      { id: "experiments", name: "EASEP science package", description: "Apollo 11 deployed a passive seismic experiment, lunar dust detector, and laser-ranging retroreflector; the crew also deployed a separate solar-wind experiment.", observation: "Some lunar equipment stopped long ago, while the passive retroreflector can still return laser light." },
    ],
    challengeTitle: "Guide Eagle toward a safe landing",
    challengeIntro: "Choose a priority for a fictional training descent. This is an educational simulation, not a reproduction of Apollo 11’s flight computer or landing procedure.",
    challengeType: "route",
    challengeChoices: [
      { id: "slow", label: "Protect a gentle descent", hint: "Trade speed for control", feedback: "A careful descent leaves more time to observe the surface and reduce landing speed. Eagle’s real descent needed precise braking.", consequence: "Training clue: slowing safely protects the crew and the lander." },
      { id: "clear", label: "Choose a clearer landing area", hint: "Avoid a rough patch", feedback: "A safer-looking area matters. Armstrong manually guided Eagle past a crater field during the final approach.", consequence: "Training clue: the landing target can change at the last moment." },
      { id: "fast", label: "Aim for the first target fast", hint: "Save time", feedback: "Speed can preserve time, but it leaves less room to inspect hazards. The real crew had to balance fuel, speed, and terrain.", consequence: "Training clue: a rushed landing leaves less margin." },
    ],
    nasaApproach: "Eagle separated from Columbia, descended to the Sea of Tranquility, and landed after Armstrong guided it away from a crater field. The astronauts later used the ascent stage to return to Collins in Columbia.",
    actualResult: "Apollo 11 achieved the first crewed lunar landing. Armstrong and Aldrin spent about 21 hours and 36 minutes on the Moon; the descent stage and its equipment remained on the surface.",
    finalTransmission: "The solar-powered seismic experiment stopped accepting commands on August 25, 1969. The passive laser-ranging retroreflector, which needs no electrical power, continues to support Earth–Moon measurements.",
    status: "Eagle’s descent stage remains in the Sea of Tranquility; the ascent stage’s final fate is uncertain.",
    legacyTitle: "A reflector that still answers",
    legacy: "Apollo 11’s laser-ranging retroreflector lets scientists bounce light from Earth back toward the Moon. Its round-trip time reveals the Earth–Moon distance without requiring power on the lunar surface.",
    whatIfPrompt: "How can something left behind on the Moon continue helping people on Earth?",
    whatIfChoices: ["A passive reflector can return laser light for precise distance measurements.", "A science package can leave a record even after its powered life ends.", "The design lessons from Eagle can guide future lunar explorers."],
    discoveries: ["Eagle’s descent and ascent stages had different jobs.", "Apollo 11’s surface science included EASEP and a separate solar-wind experiment.", "A passive lunar reflector can keep supporting science long after astronauts leave."],
    diagramCaption: "A simplified, accessible guide to Eagle’s descent stage, ascent stage, and science equipment. It is an educational diagram, not a flight drawing.",
    hotspots: [{ id: "descent", x: 33, y: 70 }, { id: "ascent", x: 56, y: 38 }, { id: "experiments", x: 74, y: 62 }],
  },
  {
    id: "sojourner",
    number: "03",
    title: "The Little Rover, the Big Discovery",
    shortTitle: "Sojourner",
    subtitle: "The small rover that made Mars feel reachable",
    artifact: "Mars Pathfinder Sojourner",
    location: "Ares Vallis · Mars",
    planet: "Mars",
    image: "/mission-images/sojourner.jpg",
    imageAlt: "NASA's Sojourner rover exploring the Martian surface",
    imageCredit: "NASA/JPL-Caltech",
    imageSource: "https://images.nasa.gov/details/PIA00890",
    missionSource: "https://science.nasa.gov/mission/mars-pathfinder/",
    sourceLabel: "NASA Science",
    accent: "mars",
    arrival: "A six-wheeled pioneer is waiting beside a field of rocks. Pick a safe route, then decide which rock deserves a closer look.",
    why: "Sojourner was the first successful wheeled rover on Mars. Mars Pathfinder demonstrated a new landing approach and a way for a small rover to explore beyond the lander.",
    narrative: {
      arrival: "Imagine being millions of kilometers from Earth, steering a robot no bigger than a small household appliance. On July 4, 1997, Pathfinder bounced into Ares Vallis inside giant airbags — and released Sojourner to explore.",
      investigation: "But how could such a tiny rover explore without a human beside it? Look closely: its wheels, cameras, and spectrometer turned a rocky landscape into a place scientists could investigate.",
      history: "Pathfinder used a parachute and airbags to land, then Sojourner rolled down a ramp on its second Martian day. The mission’s operators guided it through images and careful commands from far away.",
      transmission: "Here’s the mystery’s honest ending: Pathfinder’s final transmission arrived on September 27, 1997. Attempts to restore communication did not succeed, so the rover’s precise final activity is not known.",
      legacy: "Sojourner was planned for about seven days, yet Pathfinder returned data for 83 days. Can you imagine that tiny rover helping make future Mars rovers feel possible?",
      report: "You navigated a distant landscape and asked a rock what it was made of, Explorer. Sojourner showed that small robotic explorers could make Mars feel reachable.",
    },
    components: [
      { id: "wheels", name: "Six wheels", description: "Six independently useful contact points helped the rover cross small rocks and uneven ground.", observation: "Mobility is a science tool: it lets instruments reach new evidence." },
      { id: "cameras", name: "Front and rear cameras", description: "Cameras helped operators understand the terrain and plan a safe path from Earth.", observation: "A rover's eyes turn a distant surface into a navigable landscape." },
      { id: "alpha", name: "Alpha Proton X-ray Spectrometer", description: "The APXS measured the elemental makeup of rocks and soil after the rover reached them.", observation: "A rock can become a data set when an instrument asks the right question." },
    ],
    challengeTitle: "Choose a path to the rock",
    challengeIntro: "Select a route through a miniature terrain. Each path teaches you something different about safety, distance, and science.",
    challengeType: "terrain",
    challengeChoices: [
      { id: "ridge", label: "Rocky ridge", hint: "Short, bumpy route", feedback: "You found a direct route, but the rover must slow down and watch its wheel placement.", consequence: "Fast science, higher terrain risk." },
      { id: "valley", label: "Sandy valley", hint: "Long, smoother route", feedback: "The valley is gentler terrain, but the longer drive uses more planning and time.", consequence: "Safer travel, slower arrival." },
      { id: "shadow", label: "Shadowed pass", hint: "A mystery shortcut", feedback: "The pass may hide an interesting rock, but limited visibility makes every camera frame important.", consequence: "More mystery, less certainty." },
    ],
    nasaApproach: "Pathfinder operators used images and careful commands to guide Sojourner around rocks. The rover used the APXS to study rocks and soil, including targets such as Barnacle Bill.",
    actualResult: "Sojourner proved a small rover could deploy, drive on Mars, investigate rocks, and return science through a lander relay.",
    finalTransmission: "After Mars Pathfinder stopped communicating in 1997, Sojourner remained near the lander in Ares Vallis.",
    status: "Resting near the Pathfinder lander on Mars",
    legacyTitle: "Small machines, huge reach",
    legacy: "Sojourner helped make rover exploration feel repeatable. Its ideas shaped the larger rover missions that followed.",
    whatIfPrompt: "Without Sojourner, what might have taken longer to learn?",
    whatIfChoices: ["How to drive a small rover across another planet.", "How a lander and rover can work together as one mission.", "How close-up rock measurements can change a landscape story."],
    discoveries: ["A small rover can test a whole new way to explore.", "Images are both navigation tools and scientific evidence.", "Rocks help scientists compare worlds, not just photograph them."],
    diagramCaption: "A labeled educational diagram of Sojourner. Markers describe equipment locations in the diagram, not an ambiguous Mars landscape photo.",
    hotspots: [{ id: "wheels", x: 33, y: 70 }, { id: "cameras", x: 61, y: 39 }, { id: "alpha", x: 49, y: 56 }],
  },
  {
    id: "insight",
    number: "04",
    title: "Listening to a Silent Planet",
    shortTitle: "InSight",
    subtitle: "The stationary lander that listened inside Mars",
    artifact: "NASA InSight Lander",
    location: "Elysium Planitia · Mars",
    planet: "Mars",
    image: "/mission-images/insight.jpg",
    imageAlt: "NASA InSight's first image from the surface of Mars",
    imageCredit: "NASA/JPL-Caltech",
    imageSource: "https://images.nasa.gov/details/PIA22829",
    missionSource: "https://science.nasa.gov/mission/insight/",
    sourceLabel: "NASA Science",
    accent: "science",
    arrival: "A quiet lander is listening through the red dust. Sort the vibrations around it and find the signal that can reveal Mars' hidden interior.",
    why: "InSight was built to study the deep interior of Mars using seismic waves, heat flow, and the planet's wobble.",
    narrative: {
      arrival: "Imagine standing on Mars. It seems silent — no oceans, forests, or cities. But what if the ground beneath your boots is carrying a story in tiny vibrations?",
      investigation: "InSight stayed in one place after arriving on November 26, 2018. Instead of driving across Mars, it listened beneath the surface with instruments that could notice a planet shiver.",
      history: "A waveform is a clue, not an answer by itself. NASA scientists compared patterns from InSight’s seismometer to separate marsquakes, impacts, and environmental noise.",
      transmission: "Not everything went as planned: the heat probe, nicknamed the mole, struggled in unexpected soil and did not reach its intended depth. Later, dust covered the solar panels and the mission ended in December 2022.",
      legacy: "Can you imagine learning about a whole planet without digging through it? InSight detected more than 1,300 marsquakes and gave scientists new evidence about Mars’ crust, mantle, and core.",
      report: "You listened for clues beneath a quiet world, Explorer. InSight showed that a stationary lander can investigate an entire planet from the inside out.",
    },
    components: [
      { id: "seismometer", name: "Seismometer", description: "The SEIS instrument detected tiny vibrations, including marsquakes and impacts.", observation: "A planet can tell its story through waves moving below the surface." },
      { id: "solar", name: "Solar panels", description: "Two solar arrays turned sunlight into power for the lander and its instruments.", observation: "Power is a scientific resource: dust can slowly change what a mission can do." },
      { id: "heat", name: "Heat-flow experiment", description: "The mission attempted to measure heat moving up from Mars' interior.", observation: "Interior science connects a surface measurement to a whole planet's history." },
    ],
    challengeTitle: "Read the hidden signal",
    challengeIntro: "Not every vibration is a marsquake. Compare simplified signal patterns and explain what evidence makes one clue stronger than another.",
    challengeType: "signals",
    challengeChoices: [
      { id: "quake", label: "Deep, sharp arrival", hint: "Energy travels through Mars", feedback: "This pattern is a strong marsquake candidate: a sudden signal with energy moving through the planet.", consequence: "Evidence level: strong quake clue." },
      { id: "wind", label: "Soft surface rumble", hint: "The environment is moving", feedback: "Wind or lander vibrations can make surface noise. It is a useful observation, but not proof of a quake.", consequence: "Evidence level: environmental noise." },
      { id: "impact", label: "Short burst, known time", hint: "A sudden outside event", feedback: "A brief burst could come from an impact. Scientists compare timing and wave shape before deciding.", consequence: "Evidence level: possible impact clue." },
    ],
    nasaApproach: "InSight placed its seismometer directly on the Martian ground and used it to detect marsquakes and impacts. Scientists combine wave observations with models to infer the planet's interior layers.",
    actualResult: "InSight detected more than 1,300 marsquakes before the mission ended after dust on its solar panels reduced available power in 2022.",
    finalTransmission: "The lander stopped communicating in December 2022, but its seismic archive continues to help scientists understand Mars.",
    status: "Silent at Elysium Planitia on Mars",
    legacyTitle: "A planet heard from within",
    legacy: "InSight transformed tiny vibrations into evidence about Mars' crust, mantle, and core—showing that a stationary machine can explore an entire planet's interior.",
    whatIfPrompt: "Without InSight, what kind of evidence about Mars would be harder to collect?",
    whatIfChoices: ["Direct seismic clues about the planet's deep interior.", "A long record of how Mars responds to impacts and quakes.", "A way to compare Mars' inner structure with Earth's."],
    discoveries: ["Signals can reveal places a camera cannot see.", "Scientists separate evidence from noise by comparing patterns.", "A mission's final transmission can still begin new research."],
    diagramCaption: "A labeled educational diagram of InSight. The scientific clues are highlighted on a diagram because the selected landscape image does not show every instrument clearly.",
    hotspots: [{ id: "seismometer", x: 38, y: 64 }, { id: "solar", x: 69, y: 48 }, { id: "heat", x: 51, y: 75 }],
  },
]

export const FUTURE_PREDICTIONS = [
  { id: "powered-flight", text: "We might not know that powered flight can work on another planet." },
  { id: "aerial-scouts", text: "Future missions might miss the chance to scout rough ground from the air." },
  { id: "new-views", text: "We might miss new ways to explore places a rover cannot easily reach." },
] as const

export type FuturePredictionId = (typeof FUTURE_PREDICTIONS)[number]["id"]
export type MachinePartId = string
export type EngineeringChoiceId = string
export const INGENUITY_PARTS = MISSION_DATA[0].components
export const ENGINEERING_CHOICES = MISSION_DATA[0].challengeChoices
