import "./globals.css"

export const metadata = {
  title: "Legacy Crypto Guard",
  description: "Surveillance Blockchain",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{backgroundColor: "#0a0a0a", color: "#e0e0e0", minHeight: "100vh"}}>
        <nav style={{borderBottom: "1px solid #333", padding: "16px"}}>
          <div style={{maxWidth: "800px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <a href="/" style={{color: "#00d4aa", fontWeight: "bold", fontSize: "18px", textDecoration: "none"}}>Legacy Crypto Guard</a>
            <div style={{display: "flex", gap: "16px", fontSize: "14px"}}>
              <a href="/" style={{color: "#ccc", textDecoration: "none"}}>Accueil</a>
              <a href="/dashboard" style={{color: "#ccc", textDecoration: "none"}}>Dashboard</a>
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
