export default function Accueil() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h1 style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "8px", letterSpacing: "-2px" }}>
          Walle<span style={{ color: "#00d4aa" }}>R</span>t
        </h1>
        <p style={{ color: "#aaa", fontSize: "22px", marginBottom: "12px" }}>
          Surveillance de votre portefeuille
        </p>
        <p style={{ color: "#666", fontSize: "16px", marginBottom: "40px" }}>
          Declenchezune alerte en temps reel en cas de mouvement sortant detecte.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <a href="/" style={{ padding: "14px 32px", backgroundColor: "#00d4aa", color: "#000", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>
            Creer un compte
          </a>
          <a href="/login" style={{ padding: "14px 32px", backgroundColor: "transparent", color: "#e0e0e0", border: "1px solid #333", borderRadius: "6px", textDecoration: "none", fontSize: "16px" }}>
            Se connecter
          </a>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "80px" }}>
        {[
          { title: "Plusieurs wallets", desc: "Surveillez autant d adresses que necessaire depuis un seul compte." },
          { title: "Alertes email en temps reel", desc: "Notification instantanee a chaque transaction sortante detectee." },
          { title: "Plusieurs destinataires", desc: "Configurez plusieurs adresses email pour chaque alerte." },
          { title: "Instructions d urgence", desc: "Redigez des consignes qui s affichent dans chaque email d alerte." },
        ].map(function(item) {
          return (
            <div key={item.title} style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "24px" }}>
              <h3 style={{ fontSize: "15px", color: "#00d4aa", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ color: "#888", fontSize: "13px", lineHeight: "1.6" }}>{item.desc}</p>
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: "center", borderTop: "1px solid #222", paddingTop: "40px", color: "#555", fontSize: "13px" }}>
        Surveillance blockchain professionnelle
      </div>
    </div>
  )
}
