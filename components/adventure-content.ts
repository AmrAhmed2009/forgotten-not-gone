export const EXPLORER_INTERESTS = ["Engineering", "Space Mysteries", "Science"] as const

export type ExplorerInterest = (typeof EXPLORER_INTERESTS)[number]

export const INGENUITY_PARTS = [
  {
    id: "rotors",
    name: "Rotor blades",
    shortName: "Rotors",
    eyebrow: "PART 01 · LIFT SYSTEM",
    description: "Ingenuity’s two long rotor blades spun extremely fast. They pushed against Mars’ thin air to help the helicopter rise.",
    fact: "Mars’ atmosphere has less than 1% of Earth’s surface air density.",
  },
  {
    id: "solar",
    name: "Solar panel",
    shortName: "Solar panel",
    eyebrow: "PART 02 · POWER SYSTEM",
    description: "A solar panel collected sunlight and recharged Ingenuity’s batteries. Those batteries powered its flights and helped it stay warm through chilly Martian nights.",
    fact: "Ingenuity carried its own solar panel and rechargeable batteries on every flight.",
  },
  {
    id: "camera",
    name: "Navigation camera",
    shortName: "Nav camera",
    eyebrow: "PART 03 · FLIGHT CONTROL",
    description: "A camera pointed down at the ground. Its pictures helped the flight computer track where the helicopter was moving.",
    fact: "Ingenuity flew by itself, using onboard computers and camera images to guide each flight.",
  },
] as const

export type MachinePartId = (typeof INGENUITY_PARTS)[number]["id"]

export const ENGINEERING_CHOICES = [
  {
    id: "small",
    title: "Small, slow-spinning rotors",
    feedback:
      "A smart, simple idea for Earth. But Mars has so little air that small, slow rotors would struggle to push enough of it downward.",
  },
  {
    id: "large",
    title: "Large, fast-spinning rotors with a lightweight helicopter",
    feedback:
      "That’s the big idea! Larger blades can push on more air, and spinning them faster helps create lift in Mars’ thin atmosphere.",
  },
  {
    id: "heavy",
    title: "A heavy helicopter with ordinary Earth-style rotors",
    feedback:
      "A fair guess, but extra weight makes takeoff harder. With so little air on Mars, engineers needed a light machine and rotors built for the job.",
  },
] as const

export type EngineeringChoiceId = (typeof ENGINEERING_CHOICES)[number]["id"]

export const FUTURE_PREDICTIONS = [
  {
    id: "powered-flight",
    text: "We might not know that powered flight can work on another planet.",
  },
  {
    id: "aerial-scouts",
    text: "Future missions might miss the chance to scout rough ground from the air.",
  },
  {
    id: "new-views",
    text: "We might miss new ways to explore places a rover cannot easily reach.",
  },
] as const

export type FuturePredictionId = (typeof FUTURE_PREDICTIONS)[number]["id"]
