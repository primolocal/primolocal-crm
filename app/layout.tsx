import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { RouteGuard } from "@/components/route-guard"
import { Shell } from "@/components/shell"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <AuthProvider>
          <RouteGuard>
            <Shell>{children}</Shell>
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  )
}
