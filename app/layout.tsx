import "./globals.css"

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vercel OSS Program - Projects Directory",
  description: "Browse open source projects participating in the Vercel OSS Program",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased flex min-h-screen flex-col`}>
        <NuqsAdapter>
          <Suspense>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className="flex-1">{children}</div>
              <Footer />
            </ThemeProvider>
          </Suspense>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  )
}
