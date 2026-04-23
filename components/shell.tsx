"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { ThemeProvider } from "./theme-provider";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isMarketing = pathname === "/" || pathname === "/apply" || pathname.startsWith("/apply") || pathname === "/partnership" || pathname === "/about" || pathname === "/privacy" || pathname === "/terms";

  if (isMarketing) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider>
      {isLogin ? (
        <div className="min-h-screen">{children}</div>
      ) : (
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 pl-64">
            <div className="mx-auto max-w-7xl p-6">{children}</div>
          </main>
        </div>
      )}
    </ThemeProvider>
  );
}
