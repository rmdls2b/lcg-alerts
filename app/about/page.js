import "./globals.css"
export const metadata = {
  title: "Wallert — Surveillance Blockchain",
  description: "Surveillance blockchain — alertes en temps reel",
}
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{backgroundColor: "#0a0a0a", color: "#e0e0e0", minHeight: "100vh"}}>
        <nav style={{borderBottom: "1px solid #1a1a1a"}}>
          <div className="px-6 md:px-16 lg:px-32 xl:px-40 py-4 max-w-[1400px] mx-auto flex justify-between items-center">
            <a href="/accueil" style={{color: "#fff", fontWeight: "bold", fontSize: "24px", textDecoration: "none"}}>
              Walle<span style={{color: "#00d4aa"}}>r</span>t
            </a>
            <div style={{display: "flex", gap: "20px", fontSize: "14px", alignItems: "center"}}>
              <a href="/about" style={{color: "#ccc", textDecoration: "none"}}>A propos</a>
              <a href="/mon-espace" style={{color: "#ccc", textDecoration: "none"}}>Mon espace</a>
              <a href="/dashboard" style={{color: "#555", textDecoration: "none"}}>Admin</a>
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
