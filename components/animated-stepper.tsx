"use client"

import { Children, type ReactElement, type ReactNode, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type StepProps = {
  title: string
  children: ReactNode
}

type AnimatedStepperProps = {
  children: ReactNode
  className?: string
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  backButtonText?: string
  nextButtonText?: string
  completeButtonText?: string
  disableStepIndicators?: boolean
  canContinue?: (step: number) => boolean
}

export function Step({ children }: StepProps) {
  return <>{children}</>
}

export function AnimatedStepper({
  children,
  className,
  initialStep = 1,
  onStepChange,
  onFinalStepCompleted,
  backButtonText = "Back",
  nextButtonText = "Continue",
  completeButtonText = "Complete",
  disableStepIndicators = false,
  canContinue = () => true,
}: AnimatedStepperProps) {
  const steps = Children.toArray(children) as ReactElement<StepProps>[]
  const [currentStep, setCurrentStep] = useState(Math.min(Math.max(initialStep, 1), steps.length))
  const [direction, setDirection] = useState(1)
  const reducedMotion = useReducedMotion()
  const activeStep = steps[currentStep - 1]
  const canAdvance = canContinue(currentStep)

  function moveTo(step: number) {
    setDirection(step > currentStep ? 1 : -1)
    setCurrentStep(step)
    onStepChange?.(step)
  }

  function handleNext() {
    if (!canAdvance) return
    if (currentStep === steps.length) {
      onFinalStepCompleted?.()
      return
    }
    moveTo(currentStep + 1)
  }

  return (
    <div className={cn("w-full", className)}>
      <ol className="flex items-center gap-2" aria-label="Explorer profile progress">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCurrent = stepNumber === currentStep
          const isComplete = stepNumber < currentStep

          return (
            <li className="flex min-w-0 flex-1 items-center gap-2" key={step.props.title}>
              <button
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Step ${stepNumber}: ${step.props.title}`}
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-bold transition-colors duration-300",
                  isComplete && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-primary/10 text-primary",
                  !isCurrent && !isComplete && "border-border bg-background text-muted-foreground",
                  !disableStepIndicators && "cursor-pointer hover:border-primary hover:text-primary",
                  disableStepIndicators && "cursor-default",
                )}
                disabled={disableStepIndicators}
                onClick={() => moveTo(stepNumber)}
                type="button"
              >
                {isComplete ? <Check aria-hidden="true" className="size-4" /> : stepNumber}
              </button>
              {index < steps.length - 1 && (
                <span aria-hidden="true" className="h-px min-w-0 flex-1 overflow-hidden rounded-full bg-border">
                  <motion.span
                    animate={{ scaleX: isComplete ? 1 : 0 }}
                    className="block h-full origin-left bg-primary"
                    initial={false}
                    transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.33, 1, 0.68, 1] }}
                  />
                </span>
              )}
            </li>
          )
        })}
      </ol>

      <motion.div className="overflow-hidden" layout transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}>
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.section
            aria-labelledby={`profile-step-${currentStep}`}
            animate="center"
            className="py-5"
            custom={direction}
            exit="exit"
            initial="enter"
            key={currentStep}
            transition={reducedMotion ? { duration: 0 } : { x: { type: "spring", damping: 28, stiffness: 310 }, opacity: { duration: 0.18 } }}
            variants={{
              enter: (entryDirection: number) => ({ opacity: 0, x: reducedMotion ? 0 : entryDirection > 0 ? 24 : -24 }),
              center: { opacity: 1, x: 0 },
              exit: (entryDirection: number) => ({ opacity: 0, x: reducedMotion ? 0 : entryDirection > 0 ? -24 : 24 }),
            }}
          >
            <h3 className="text-lg font-bold tracking-tight text-foreground" id={`profile-step-${currentStep}`}>{activeStep.props.title}</h3>
            <div className="mt-3 text-sm leading-6 text-muted-foreground">{activeStep}</div>
          </motion.section>
        </AnimatePresence>
      </motion.div>

      <div className={cn("flex items-center", currentStep === 1 ? "justify-end" : "justify-between")}>
        {currentStep > 1 && (
          <button className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" onClick={() => moveTo(currentStep - 1)} type="button">
            {backButtonText}
          </button>
        )}
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-xs font-extrabold tracking-[0.08em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
          disabled={!canAdvance}
          onClick={handleNext}
          type="button"
        >
          {currentStep === steps.length ? completeButtonText : nextButtonText}
        </button>
      </div>
    </div>
  )
}
