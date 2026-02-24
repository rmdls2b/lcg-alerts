export default function Accueil() {
  return (
    <div>
      {/* Hero - plein écran */}
      <div style={{ minHeight: "calc(100vh - 65px)", display: "flex", alignItems: "center", padding: "0 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ flex: 1, paddingRight: "60px" }}>
          <h1 style={{ fontSize: "56px", fontWeight: "bold", marginBottom: "28px", letterSpacing: "-3px", lineHeight: "1.05" }}>
            Walle<span style={{ color: "#00d4aa" }}>r</span>t
          </h1>
          <p style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", marginBottom: "16px", lineHeight: "1.4", maxWidth: "500px" }}>
            {"Donnez l'alerte en cas de transfert crypto sous la contrainte"}
          </p>
          <p style={{ color: "#888", fontSize: "17px", marginBottom: "48px", lineHeight: "1.6", maxWidth: "440px" }}>
            {"Wallert transforme votre wallet en alarme silencieuse, instantanée et active 24h/24"}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="/" style={{ padding: "14px 28px", backgroundColor: "#00d4aa", color: "#000", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>
              Activer ma protection
            </a>
            <a href="/login" style={{ padding: "14px 28px", backgroundColor: "transparent", color: "#e0e0e0", border: "1px solid #333", borderRadius: "6px", textDecoration: "none", fontSize: "16px" }}>
              Se connecter
            </a>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: "380px", width: "100%" }}>
            <div style={{ border: "1px solid #222", borderRadius: "12px", padding: "32px", background: "#111" }}>
              <p style={{ color: "#888", fontSize: "14px", textAlign: "center", marginBottom: "24px" }}>Surveillance en temps réel</p>
              <div style={{ border: "1px solid #222", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ color: "#00d4aa", fontSize: "16px" }}>●</span>
                  <span style={{ color: "#ccc", fontSize: "13px", fontFamily: "monospace" }}>0x8a3f...c9b2</span>
                </div>
                <span style={{ color: "#555", fontSize: "12px" }}>Wallet surveillé</span>
              </div>
              <div style={{ textAlign: "center", color: "#333", fontSize: "20px", marginBottom: "16px" }}>↓</div>
              <div style={{ border: "1px solid #ff4444", borderRadius: "8px", padding: "16px", background: "#1a0000" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span style={{ color: "#ff4444", fontSize: "14px", fontWeight: "bold" }}>⚡ MOUVEMENT DÉTECTÉ</span>
                </div>
              </div>
              <div style={{ textAlign: "center", color: "#333", fontSize: "20px", marginBottom: "16px", marginTop: "16px" }}>↓</div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <div style={{ border: "1px solid #222", borderRadius: "8px", padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ fontSize: "18px" }}>📧</span>
                  <p style={{ color: "#888", fontSize: "11px", marginTop: "4px" }}>Email</p>
                </div>
                <div style={{ border: "1px solid #222", borderRadius: "8px", padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ fontSize: "18px" }}>💬</span>
                  <p style={{ color: "#888", fontSize: "11px", marginTop: "4px" }}>Telegram</p>
                </div>
                <div style={{ border: "1px solid #222", borderRadius: "8px", padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ fontSize: "18px" }}>📱</span>
                  <p style={{ color: "#888", fontSize: "11px", marginTop: "4px" }}>SMS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Étapes */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "28px", display: "flex", gap: "20px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#00d4aa", minWidth: "40px" }}>1</div>
            <div>
              <h3 style={{ fontSize: "16px", color: "#fff", marginBottom: "8px" }}>Dédiez un portefeuille à votre sécurité</h3>
              <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>
                {"Isolez une partie de vos fonds sur une adresse spécifique contenant un montant suffisamment crédible pour satisfaire un agresseur. Ce wallet devient votre bouton d'alarme."}
              </p>
            </div>
          </div>

          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "28px", display: "flex", gap: "20px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#00d4aa", minWidth: "40px" }}>2</div>
            <div>
              <h3 style={{ fontSize: "16px", color: "#fff", marginBottom: "8px" }}>Paramétrez votre protocole de secours</h3>
              <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>
                {"Enregistrez l'adresse de ce portefeuille sur Wallert. Définissez votre cercle de confiance : proches ou services à prévenir, ainsi que les instructions précises qu'ils recevrons."}
              </p>
            </div>
          </div>

          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "28px", display: "flex", gap: "20px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#00d4aa", minWidth: "40px" }}>3</div>
            <div>
              <h3 style={{ fontSize: "16px", color: "#fff", marginBottom: "8px" }}>Donnez l'alerte par le transfert</h3>
              <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>
                {"En cas d'agression, commencez par transférer les fonds de ce portefeuille. Pour l'agresseur, c'est un butin. Pour Wallert, c'est le signal instantané qui déclenche l'intervention de votre cercle de confiance."}
              </p>
            </div>
          </div>
        </div>

        <div style={{ background: "#0d1f1a", border: "1px solid #1a3a2a", borderRadius: "8px", padding: "24px", marginTop: "40px" }}>
          <h3 style={{ fontSize: "15px", color: "#00d4aa", marginBottom: "12px" }}>Sécurité & confidentialité</h3>
          <p style={{ color: "#888", fontSize: "13px", lineHeight: "1.7" }}>
            Wallert ne stocke que les adresses publiques de vos wallets. Les emails de vos contacts sont chiffrés et ne sont jamais partagés avec des tiers.
          </p>
        </div>
      </div>
    </div>
  )
}
