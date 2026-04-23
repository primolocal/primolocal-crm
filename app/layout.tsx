import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrimoLocal — Revenue Recovery for Houston HVAC",
  description:
    "Houston HVAC contractors lose $47K/year to voicemail. Novo recovers after-hours revenue. 14-Day Prove-It on your line. Zero cost. 5 spots only.",
  openGraph: {
    title: "PrimoLocal — Revenue Recovery for Houston HVAC",
    description:
      "Stop losing after-hours repair calls to voicemail. Novo answers 24/7, books appointments, forwards emergencies. 14-Day Prove-It, zero cost.",
    url: "https://primolocal.org",
    siteName: "PrimoLocal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimoLocal — Revenue Recovery for Houston HVAC",
    description:
      "Stop losing after-hours repair calls to voicemail. 14-Day Prove-It, zero cost.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
