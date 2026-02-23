export default function Accueil() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h1 style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "8px", letterSpacing: "-2px" }}>
          Walle<span style={{ color: "#00d4aa" }}>R</span>t
        </h1>
        <p style={{ color: "#aaa", fontSize: "22px", marginBottom: "12px" }}>
          Transformez votre wallet en alarme silencieuse
        </p>
        <p style={{ color: "#fff", fontSize: "16px", marginBottom: "40px" }}>
          {"Alerte instantanée de vos contacts de confiance en cas de transfert sous la contrainte."}
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <a href="/" style={{ padding: "14px 32px", backgroundColor: "#00d4aa", color: "#000", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>
            Créer un compte
          </a>
          <a href="/login" style={{ padding: "14px 32px", backgroundColor: "transparent", color: "#e0e0e0", border: "1px solid #333", borderRadius: "6px", textDecoration: "none", fontSize: "16px" }}>
            Se connecter
          </a>
        </div>
      </div>
          <div style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "20px", color: "#fff", marginBottom: "32px", textAlign: "center" }}>Principes clés</h2>

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
               {"Enregistrez l'adresse publique de ce portefeuille sur WalleRt. Définissez votre cercle de confiance : proches ou services à prévenir, ainsi que les instructions précises qu'ils recevrons."}
              </p>
            </div>
          </div>

          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "28px", display: "flex", gap: "20px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#00d4aa", minWidth: "40px" }}>3</div>
            <div>
              <h3 style={{ fontSize: "16px", color: "#fff", marginBottom: "8px" }}>Donnez l'alerte par le transfert</h3>
              <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>
                {"En cas d'agression, commencez par transférer les fonds de ce portefeuille. Pour l'agresseur, c'est un butin. Pour WalleRt, c'est le signal instantané qui déclenche l'intervention de votre cercle de confiance."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#0d1f1a", border: "1px solid #1a3a2a", borderRadius: "8px", padding: "24px", marginBottom: "40px" }}>
        <h3 style={{ fontSize: "15px", color: "#00d4aa", marginBottom: "12px" }}>Sécurité & confidentialité</h3>
        <p style={{ color: "#888", fontSize: "13px", lineHeight: "1.7" }}>
          WalleRt ne stocke que les adresses publiques de vos wallets. Les emails de vos contacts sont chiffrés et ne sont jamais partagés avec des tiers.
        </p>
      </div>
    </div>
  )
}
