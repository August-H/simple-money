"use client";

import Link from "next/link";
import { DollarSign } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "How It Works", href: "#features" },
    { label: "VIP Levels", href: "/levels" },
    { label: "Salary Benefits", href: "/salary" },
    { label: "Referral Program", href: "/invite" },
  ],
  account: [
    { label: "Sign In", href: "/login" },
    { label: "Create Account", href: "/signup" },
    { label: "Dashboard", href: "/home" },
    { label: "Deposit", href: "/deposit" },
  ],
  support: [
    { label: "Help Center", href: "/faq" },
    { label: "Contact Us", href: "/service" },
    { label: "Company Info", href: "/company" },
    { label: "About Us", href: "/about" },
  ],
  legal: [
    { label: "Terms of Service", href: "/agreement" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Platform Rules", href: "/rules" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground">
                Simple Money
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted platform for daily earnings. Complete tasks, earn
              commissions, and grow your income.
            </p>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Account
            </h4>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Simple Money. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img
                src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdt.png"
                alt="USDT"
                className="h-5 w-5"
              />
              <img
                src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png"
                alt="ETH"
                className="h-5 w-5"
              />
              <img
                src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png"
                alt="BTC"
                className="h-5 w-5"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              Crypto payments accepted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
