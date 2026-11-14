import { cn } from "@/lib/utils"

type AnimatedHeadingProps = {
  children: string
  className?: string
}

export function AnimatedHeading({ children, className }: AnimatedHeadingProps) {
  return (
    <h3 className={cn("text-pretty text-2xl font-bold leading-tight tracking-[-0.035em] text-foreground transition-colors duration-300 sm:text-3xl", className)} aria-label={children}>
      <span aria-hidden="true">
        {Array.from(children).map((character, index) =>
          character === " " ? (
            <span className="inline-block w-[0.28em]" key={`space-${index}`} />
          ) : (
            <span
              className="inline-block translate-y-3 blur-sm opacity-0 [animation:letter-reveal_700ms_cubic-bezier(0.16,1,0.3,1)_forwards] motion-reduce:translate-y-0 motion-reduce:blur-none motion-reduce:opacity-100 motion-reduce:[animation:none]"
              key={`${character}-${index}`}
              style={{ animationDelay: `${index * 34}ms` }}
            >
              {character}
            </span>
          ),
        )}
      </span>
    </h3>
  )
}
