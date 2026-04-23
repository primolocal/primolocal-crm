import { Geist } from "next/font/google"
import "../globals.css"
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("antialiased", "font-sans", geist.variable)}>
      {children}
    </div>
  );
}
