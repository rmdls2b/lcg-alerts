import "./globals.css"

export const metadata = {
  title: "Alerts — Surveillance Blockchain",
  description: "Surveillance blockchain — alertes en temps reel",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{backgroundColor: "#0a0a0a", color: "#e0e0e0", minHeight: "100vh"}}>
        <nav style={{borderBottom: "1px solid #1a1a1a", padding: "16px"}}>
          <div style={{maxWidth: "800px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <a href="/accueil" style={{color: "#00d4aa", fontWeight: "bold", fontSize: "18px", textDecoration: "none"}}>Alerts</a>
            <div style={{display: "flex", gap: "20px", fontSize: "14px"}}>
              <a href="/mon-espace" style={{color: "#ccc", textDecoration: "none"}}>Mon espace</a>
              <a href="/dashboard" style={{color: "#555", textDecoration: "none", fontSize: "12px"}}>Admin</a>
            </div>
          </div>
        </nav>
        <main style={{maxWidth: "800px", margin: "0 auto", padding: "24px"}}>
          {children}
        </main>
      </body>
    </html>
  )
}
