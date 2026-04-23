"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

const links = {
  product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Partnership", href: "#partnership" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "Apply", href: "/apply" },
    { label: "About", href: "/about" },
    { label: "Partnership", href: "/partnership" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-navy">
              <Phone className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">PrimoLocal</span>
          </div>
          <p className="text-gray-400 text-sm">Partnership Revenue Systems</p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Contact</h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Office</p>
                <a
                  href="tel:832-743-2900"
                  className="text-lg font-bold text-white hover:text-gray-200 transition-colors"
                >
                  (832) 743-2900
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500">Demo Line</p>
                <a
                  href="tel:832-737-0525"
                  className="text-lg font-bold text-white hover:text-gray-200 transition-colors"
                >
                  (832) 737-0525
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2026 PrimoLocal LLC. Houston, Texas.
            </p>
            <p className="text-sm text-gray-400">
              Questions?{" "}
              <a href="tel:832-743-2900" className="text-white hover:underline">
                (832) 743-2900
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
