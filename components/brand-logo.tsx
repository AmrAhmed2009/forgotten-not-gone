type BrandLogoProps = {
  variant?: "hero" | "navigation" | "subtle" | "report" | "loading"
  className?: string
}

const logoSource = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Forgotten%2C%20Not%20Gone%20Space%20Logo-GuYsoHTTH08gJr1HoDObCA5ByBzAKq.png"

export function BrandLogo({ variant = "navigation", className = "" }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo-${variant} ${className}`.trim()}>
      <img
        src={logoSource}
        alt="Forgotten, Not Gone"
        width={2048}
        height={640}
        decoding={variant === "hero" ? "sync" : "async"}
      />
    </span>
  )
}

export function BrandLogoButton({ onActivate }: { onActivate: () => void }) {
  return (
    <button className="brand" type="button" onClick={onActivate} aria-label="Forgotten, Not Gone, return to the home screen">
      <BrandLogo />
    </button>
  )
}
