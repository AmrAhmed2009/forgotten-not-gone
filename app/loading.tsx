import { BrandLogo } from "@/components/brand-logo"

export default function Loading() {
  return (
    <main className="brand-loading" aria-live="polite" aria-label="Preparing your mission">
      <div className="brand-loading-orbit" aria-hidden="true" />
      <BrandLogo variant="loading" />
      <p>Preparing your mission...</p>
    </main>
  )
}
