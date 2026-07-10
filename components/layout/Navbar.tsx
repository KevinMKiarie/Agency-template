"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const NAV_HEIGHT = 64

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 16)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        style={{ height: NAV_HEIGHT }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-white/95 shadow-[0_1px_0_rgba(10,37,64,0.08)] backdrop-blur-md"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-[15px] font-bold tracking-tight text-[#635bff]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#635bff]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M6 2h4a3 3 0 0 1 0 6H7v3H6V2Z" fill="white" />
                <path d="M6 8h1v3H6V8Z" fill="white" opacity="0.5" />
              </svg>
            </span>
            {siteConfig.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13.5px] font-medium transition-colors duration-150",
                  pathname === item.href ? "text-[#0a2540]" : "text-[#425466] hover:text-[#0a2540]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-5 md:flex">
            <Link
              href="/contact"
              className="text-[13.5px] font-medium text-[#425466] transition-colors hover:text-[#0a2540]"
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-[#635bff] px-5 py-2 text-[13.5px] font-semibold text-white transition-all duration-150 hover:bg-[#7a73ff] hover:shadow-[0_4px_14px_rgba(99,91,255,0.4)]"
            >
              Start now →
            </Link>
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={cn(
                "block h-[1.5px] w-5 origin-center rounded-full bg-[#0a2540] transition-all duration-200",
                menuOpen && "translate-y-[6.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-5 rounded-full bg-[#0a2540] transition-all duration-200",
                menuOpen ? "scale-x-0 opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-5 origin-center rounded-full bg-[#0a2540] transition-all duration-200",
                menuOpen && "-translate-y-[6.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ top: NAV_HEIGHT }}
            className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-white"
          >
            <ul className="flex flex-col px-5 pt-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex w-full items-center border-b border-[rgba(10,37,64,0.07)] py-[18px] text-[17px] font-medium transition-colors",
                      pathname === item.href
                        ? "text-[#0a2540]"
                        : "text-[#425466] active:text-[#0a2540]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 flex flex-col gap-3 px-5"
              style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
            >
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#635bff] text-[15px] font-semibold text-white"
              >
                Start now
              </Link>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex h-12 w-full items-center justify-center rounded-full border border-[rgba(10,37,64,0.15)] text-[15px] font-medium text-[#425466]"
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
