import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BackgroundEffects } from "@/components/background-effects"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My Projects Timeline",
  description: "A timeline of my projects and their development logs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen">
            <BackgroundEffects />
            <main className="relative z-10">
              <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="container mx-auto px-4 py-4">
                  <h1 className="text-2xl font-bold text-primary">My Projects Timeline</h1>
                </div>
              </header>
              <div className="min-h-screen">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
