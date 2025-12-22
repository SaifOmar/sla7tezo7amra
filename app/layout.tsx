import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog Platform',
  description: 'A beautiful blog powered by Cosmic CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
            <p>© 2025 Modern Blog Platform. Powered by Cosmic.</p>
          </div>
        </footer>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}