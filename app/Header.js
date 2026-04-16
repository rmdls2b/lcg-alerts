"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname() || "/"

  const isFr = pathname === "/fr" || pathname.startsWith("/fr/")

  const pathWithoutLang = isFr ? (pathname.replace(/^\/fr/, "") || "/") : pathname
  const enHref = pathWithoutLang
  const frHref = pathWithoutLang === "/" ? "/fr" : `/fr${pathWithoutLang}`

  const labels = isFr
    ? { about: "A propos", account: "Mon compte", cta: "Commencer" }
    : { about: "About", account: "My account", cta: "Get started" }

  const aboutHref = isFr ? "/fr/about" : "/about"
  const homeHref = isFr ? "/fr" : "/"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="px-6 md:px-16 lg:px-24 py-4 max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href={homeHref} className="text-white font-semibold text-lg no-underline tracking-[-0.5px]">
          Walle<span className="text-[#0FA67A]">r</span>t
        </a>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 text-sm items-center">
          <a href={aboutHref} className="text-[#888] hover:text-white transition-colors no-underline">{labels.about}</a>
          <a href="/my-account" className="text-[#888] hover:text-white transition-colors no-underline">{labels.account}</a>
          <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-colors no-underline">
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          {/* Language switcher */}
          <span className="text-[#333] text-sm flex items-center gap-2 pl-4 border-l border-white/[0.06]">
            <a href={enHref} className={isFr ? "text-[#555] hover:text-white transition-colors no-underline" : "text-white no-underline"}>EN</a>
            <span className="text-[#333]">/</span>
            <a href={frHref} className={isFr ? "text-white no-underline" : "text-[#555] hover:text-white transition-colors no-underline"}>FR</a>
          </span>
          <a href="/register" className="bg-white text-[#09090b] px-4 py-1.5 rounded-md no-underline font-medium text-[13px] hover:bg-white/90 transition-colors ml-1">
            {labels.cta}
          </a>
        </div>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
          aria-label="Menu"
        >
          <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>
      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#09090b]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4">
          <a href={aboutHref} className="text-[#ccc] no-underline text-sm" onClick={() => setMenuOpen(false)}>{labels.about}</a>
          <a href="/my-account" className="text-[#ccc] no-underline text-sm" onClick={() => setMenuOpen(false)}>{labels.account}</a>
          <a href="/register" className="bg-white text-[#09090b] px-4 py-2.5 rounded-md no-underline font-medium text-sm text-center" onClick={() => setMenuOpen(false)}>{labels.cta}</a>
          <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[#666] no-underline text-sm flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          {/* Language switcher mobile */}
          <div className="border-t border-white/[0.06] pt-4 mt-1 flex items-center gap-3 text-sm">
            <a href={enHref} className={isFr ? "text-[#666] no-underline" : "text-white no-underline font-medium"} onClick={() => setMenuOpen(false)}>EN</a>
            <span className="text-[#333]">/</span>
            <a href={frHref} className={isFr ? "text-white no-underline font-medium" : "text-[#666] no-underline"} onClick={() => setMenuOpen(false)}>FR</a>
          </div>
        </div>
      )}
    </nav>
  )
}
