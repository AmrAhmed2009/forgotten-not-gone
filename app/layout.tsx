import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { InteractiveCursor } from '@/components/interactive-cursor'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forgotten, Not Gone | Interactive NASA Space Adventure',
  description: 'An interactive Mars adventure for curious explorers. Discover NASA’s Ingenuity helicopter, its engineering, and its legacy.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080f1c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <InteractiveCursor />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
