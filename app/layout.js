import "./globals.css"
export const metadata = {
  title: "Wallert — Turn a wallet into a silent alarm.",
  description: "Real-time alerts for your crypto wallets.",
}
const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#e0e0e0] min-h-screen">
        <nav className="border-b border-[#1a1a1a]">
          <div className="px-6 md:px-16 lg:px-32 xl:px-40 py-4 max-w-[1400px] mx-auto flex justify-between items-center">
            <a href="/" className="text-white font-bold text-xl md:text-2xl no-underline">
              Walle<span className="text-[#00d4aa]">r</span>t
            </a>
            <div className="flex gap-3 md:gap-5 text-xs md:text-sm items-center">
              <a href="/about" className="text-white no-underline">ABOUT</a>
              <a href="/my-account" className="text-[#00d4aa] border border-[rgba(0,212,170,0.25)] px-3 py-1 md:px-3.5 md:py-1.5 rounded-md no-underline font-semibold text-xs md:text-[13px]">My account</a>
              <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[#9a9a95] no-underline hidden md:flex items-center">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d={githubPath} />
                </svg>
              </a>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
