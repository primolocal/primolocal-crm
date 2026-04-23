"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-extrabold text-white tracking-tight">
              PrimoLocal
            </Link>
            <p className="text-gray-400 mt-2">Revenue Recovery for Houston HVAC</p>
            <a
              href="tel:8327370525"
              className="inline-block mt-4 text-xl font-bold text-white hover:text-action transition-colors"
            >
              (832) 737-0525
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="#calculator" className="text-gray-400 hover:text-white transition-colors">Calculator</Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white transition-colors">Apply</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 PrimoLocal LLC. Houston, Texas. We recover revenue.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
