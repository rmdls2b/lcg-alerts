// app/components/StructuredData.jsx
//
// Server component. Renders JSON-LD structured data inline in the initial HTML
// (server-side), which is what LLM crawlers and search engines prefer.
//
// Mount once in app/layout.js inside <body>, ideally near the top.
// This covers every page of the site without per-page wiring.
//
// To update:
// - Bump softwareVersion when leaving beta.
// - Add LinkedIn / X URLs to the Person.sameAs array when Rem wants.
// - Update logo path if /logo.png is not the canonical asset.

export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://wallert.app/#organization",
    name: "Wallert",
    url: "https://wallert.app",
    logo: "https://wallert.app/logo.png",
    description:
      "Open-source duress alarm system for cryptocurrency holders. Monitors a dedicated decoy wallet and alerts a trusted circle the moment funds are transferred under physical coercion.",
    founder: { "@id": "https://wallert.app/#founder" },
    sameAs: ["https://github.com/rmdls2b/wallert"],
  };

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://wallert.app/#software",
    name: "Wallert",
    applicationCategory: "SecurityApplication",
    applicationSubCategory: "Cryptocurrency duress alarm",
    operatingSystem: "Web, self-hostable (Linux)",
    url: "https://wallert.app",
    description:
      "Wallert is an open-source duress alarm system for cryptocurrency holders. It continuously monitors a dedicated decoy wallet and instantly notifies a pre-defined trusted circle by email and Telegram the moment funds are transferred under physical coercion (a wrench attack).",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    license: "https://github.com/rmdls2b/wallert/blob/main/LICENSE",
    softwareVersion: "Beta",
    author: { "@id": "https://wallert.app/#founder" },
    publisher: { "@id": "https://wallert.app/#organization" },
    isAccessibleForFree: true,
    featureList: [
      "On-chain monitoring of a dedicated decoy wallet",
      "Instant email and Telegram alerts to a trusted circle",
      "Persistent re-alerting every 5 minutes until acknowledged",
      "Custom emergency instructions per contact",
      "Test mode to validate the full alert chain",
      "Open source and self-hostable",
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://wallert.app/#founder",
    name: "Rémi D'Alise",
    jobTitle: "Founder, Wallert",
    description:
      "Founder of Wallert. Former Head of Product at Ledger (6 years). Independent crypto security advisor.",
    url: "https://remidalise.com",
    worksFor: { "@id": "https://wallert.app/#organization" },
    alumniOf: {
      "@type": "Organization",
      name: "Ledger",
    },
    sameAs: [
      "https://remidalise.com",
      "https://github.com/rmdls2b",
      // Add LinkedIn / X here when ready, e.g.:
      "https://www.linkedin.com/in/remidalise",
      "https://x.com/remidalise",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://wallert.app/#website",
    url: "https://wallert.app",
    name: "Wallert",
    publisher: { "@id": "https://wallert.app/#organization" },
    inLanguage: "en",
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
