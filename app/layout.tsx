import { Montserrat } from "next/font/google"
import React, { type ReactNode } from "react"

import { cn } from "@/lib/utils"

import "@/app/globals.css"

const MontserratSerif = Montserrat({
  subsets: ["latin"],
  variable: "--font-serif",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(MontserratSerif.variable, "bg-background text-foreground")}
    >
      <body>
        <main className="mt-16 flex w-full justify-center">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
