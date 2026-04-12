export default function StructuredDataFr() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://wallert.app/#organization",
    name: "Wallert",
    url: "https://wallert.app",
    logo: "https://wallert.app/logo.png",
    description:
      "Alarme silencieuse open-source pour détenteurs de cryptomonnaies. Surveille un wallet dédié et alerte un cercle de confiance dès qu'un transfert est effectué sous la contrainte.",
    founder: { "@id": "https://wallert.app/#founder" },
    sameAs: ["https://github.com/rmdls2b/wallert"],
  };

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://wallert.app/#software",
    name: "Wallert",
    applicationCategory: "SecurityApplication",
    applicationSubCategory: "Alarme silencieuse pour cryptomonnaies",
    operatingSystem: "Web, auto-hébergeable (Linux)",
    url: "https://wallert.app/fr",
    description:
      "Wallert est une alarme silencieuse open-source pour les détenteurs de cryptomonnaies. Le service surveille en continu un wallet dédié et alerte instantanément un cercle de confiance préalablement défini, par email et Telegram, dès qu'un transfert est effectué sous la contrainte physique.",
    inLanguage: "fr",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    license: "https://github.com/rmdls2b/wallert/blob/main/LICENSE",
    softwareVersion: "Beta",
    author: { "@id": "https://wallert.app/#founder" },
    publisher: { "@id": "https://wallert.app/#organization" },
    isAccessibleForFree: true,
    featureList: [
      "Surveillance on-chain d'un wallet dédié",
      "Alertes instantanées par email et Telegram vers un cercle de confiance",
      "Renvoi des alertes toutes les 5 minutes jusqu'à confirmation",
      "Instructions d'urgence personnalisées par contact",
      "Mode test pour valider la chaîne complète d'alerte",
      "Open source et auto-hébergeable",
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://wallert.app/#founder",
    name: "Rémi D'Alise",
    jobTitle: "Fondateur, Wallert",
    description:
      "Fondateur de Wallert. Ancien Head of Product chez Ledger pendant 6 ans. Conseil indépendant en sécurité crypto.",
    url: "https://remidalise.com",
    worksFor: { "@id": "https://wallert.app/#organization" },
    alumniOf: {
      "@type": "Organization",
      name: "Ledger",
    },
    sameAs: [
      "https://remidalise.com",
      "https://github.com/rmdls2b",
      "https://www.linkedin.com/in/remidalise",
      "https://x.com/remidalise",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://wallert.app/#website-fr",
    url: "https://wallert.app/fr",
    name: "Wallert",
    publisher: { "@id": "https://wallert.app/#organization" },
    inLanguage: "fr",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
