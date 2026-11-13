export const EXPLORER_INTERESTS = ["Engineering", "Space Mysteries", "Science"] as const

export type ExplorerInterest = (typeof EXPLORER_INTERESTS)[number]
export type MissionId = "ingenuity" | "apollo-15" | "sojourner" | "insight"
export type AgeBand = "younger" | "older" | "unknown"

export type MissionComponent = {
  id: string
  name: string
  description: string
  observation: string
}

export type MissionChoice = {
  id: string
  label: string
  hint: string
  feedback: string
  consequence: string
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
    components: [
      { id: "rotors", name: "Counter-rotating rotors", description: "Two long rotor blades spun fast enough to push against Mars' thin atmosphere.", observation: "More blade area and high speed can create lift when the air is scarce." },
      { id: "solar", name: "Solar panel and batteries", description: "A top-mounted panel gathered sunlight, then the batteries powered flights and kept the helicopter warm overnight.", observation: "A mission must solve the problem that happens between adventures, not just during them." },
      { id: "navigation", name: "Navigation camera", description: "A downward-looking camera helped the onboard computer track movement over the ground.", observation: "Ingenuity flew autonomously because radio signals take too long for live joystick control." },
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
  },
  {
    id: "apollo-15",
    number: "02",
    title: "The Car That Never Came Home",
    shortTitle: "Apollo 15 Rover",
    subtitle: "The electric vehicle left on the Moon",
    artifact: "Apollo 15 Lunar Roving Vehicle",
    location: "Hadley-Apennine · Moon",
    planet: "Moon",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Apollo15LunarRover.jpg",
    imageAlt: "Apollo 15 astronaut David Scott with the lunar roving vehicle",
    imageCredit: "NASA / David Scott",
    imageSource: "https://images.nasa.gov/details/AS15-85-11471",
    missionSource: "https://science.nasa.gov/mission/apollo-15/",
    sourceLabel: "NASA Science",
    accent: "moon",
    arrival: "A fold-out electric rover is still parked on the Moon. Choose where to send the crew's limited time and wheels to learn the most.",
    why: "Apollo 15 was the first of the J missions, designed for longer surface stays and more geology. The Lunar Roving Vehicle extended how far astronauts could travel from the lander.",
    components: [
      { id: "wheels", name: "Wire-mesh wheels", description: "Flexible wheels gripped the dusty lunar ground without needing air-filled tires.", observation: "The surface decides what a wheel needs to be." },
      { id: "navigation", name: "Navigation system", description: "Distance and heading information helped the crew know how far they were from the lander.", observation: "Exploration needs a way to know where you are before you can choose where to go." },
      { id: "power", name: "Electric drive system", description: "Battery-powered motors moved the rover across the Moon without an engine or fuel tank.", observation: "A quiet electric system can be a powerful choice when every kilogram counts." },
    ],
    challengeTitle: "Plan the science route",
    challengeIntro: "Pick a destination, a scientific priority, and a route that respects limited time. This is a simplified planning exercise, not a replay of NASA's exact traverse.",
    challengeType: "route",
    challengeChoices: [
      { id: "ridge", label: "Visit the mountain front", hint: "Big geological context", feedback: "You chose a place where layered rock can reveal a longer history of the Moon.", consequence: "High context: you trade distance for a wider geological story." },
      { id: "crater", label: "Investigate a crater rim", hint: "Fresh exposed material", feedback: "A crater can expose material from below the surface—useful evidence for lunar geology.", consequence: "High evidence: you focus on a fresh window into the Moon." },
      { id: "soil", label: "Collect varied soil samples", hint: "Compare small clues", feedback: "Comparing samples from different ground types can reveal how the surface changes across a route.", consequence: "High comparison: you build a map from many smaller clues." },
    ],
    nasaApproach: "Apollo 15 used the Lunar Roving Vehicle to reach more geologic sites around Hadley-Apennine. Astronauts photographed terrain, used instruments, and collected samples to bring lunar evidence home.",
    actualResult: "The rover expanded the astronauts' range and helped them investigate mountains, craters, and soil in a way that walking alone could not.",
    finalTransmission: "Apollo 15's rover stayed on the Moon because returning the vehicle was not part of the mission plan. Its tracks remain part of the surface record.",
    status: "Parked near the Apollo 15 landing site on the Moon",
    legacyTitle: "A longer reach for geology",
    legacy: "The rover turned the lunar surface into a larger field site. More distance meant more samples, more views, and more questions about how the Moon formed.",
    whatIfPrompt: "Without the rover, what might the Apollo 15 crew have had less of?",
    whatIfChoices: ["Time and energy to reach several geologic sites.", "A way to compare samples from farther apart.", "A vehicle test showing how humans could travel across another world."],
    discoveries: ["The Lunar Roving Vehicle extended human exploration on the Moon.", "Geology gets stronger when samples can be compared across a landscape.", "Leaving hardware behind can still leave a scientific trail."],
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
