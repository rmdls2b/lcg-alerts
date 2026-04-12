import StructuredDataFr from "../StructuredDataFr"
export default function AccueilFr() {
  const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"
  return (
    <div className="bg-[#080A08] min-h-screen">
      <StructuredDataFr />

      {/* HERO */}
      <div className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 xl:px-40 pt-16 pb-16 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full">

          {/* Left */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-yellow-500/30 text-yellow-500/80">Beta</span>
              <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 text-[#9A9A95]">Open source</span>
            </div>

            <h1 className="font-display text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.07] tracking-[-2px] mb-6">
              Votre wallet :<br />
              une <span className="text-[#00FF85]">alarme</span>silencieuse <br /> 
              en cas d'<span className="text-red-400">agression</span>.
            </h1>

            <p className="text-[#C8C8C2] text-lg leading-relaxed mb-10 max-w-lg">
              Wallert est une alarme open source pour les détenteurs de crypto. Elle surveille un wallet dédié et alerte vos contacts de confiance si vous êtes forcé de transférer vos fonds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a href="/register" className="inline-block px-7 py-3.5 bg-[#00FF85] text-black rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                Essayer Wallert
              </a>
              <a href="#how" className="inline-block px-7 py-3.5 text-[#9A9A95] text-sm hover:text-white transition-colors">
                Fonctionnement
              </a>
            </div>
          </div>

          {/* Flow card */}
          <div className="w-full max-w-[300px] lg:max-w-[320px] mx-auto lg:mx-0 shrink-0">
            <div className="bg-[#111311] border border-white/7 rounded-2xl p-7">
              <div className="flex items-start gap-4 pb-5 border-b border-white/5">
                <div className="w-9 h-9 rounded-lg bg-[#00FF85]/10 border border-[#00FF85]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#9A9A95] uppercase tracking-widest mb-1">Surveillé</p>
                  <p className="text-white text-sm font-medium">Wallet de sécurité</p>
                  <p className="text-[#9A9A95] text-xs font-mono mt-1">0x8a...c9b2 · ETH</p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-5 border-b border-white/5">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#9A9A95] uppercase tracking-widest mb-1">Détecté</p>
                  <p className="text-white text-sm font-medium">Transfert sortant</p>
                  <p className="text-[#9A9A95] text-xs mt-1">Signal déclenché instantanément</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-5">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#9A9A95] uppercase tracking-widest mb-1">Alerté</p>
                  <p className="text-white text-sm font-medium">Cercle de confiance notifié</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400">Email</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400">Telegram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE THREAT */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Menace</p>
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-6">
            Les hardware wallets protègent vos clés.<br />
            Rien ne <em>vous</em> protège, vous.
          </h2>
          <p className="text-[#C8C8C2] text-base leading-relaxed max-w-2xl mb-10">
            Les agressions physiques contre les détenteurs de crypto se multiplient partout dans le monde. Quand quelqu'un s'introduit chez vous et vous menace avec une arme, vous avez quelques secondes pour réagir, aucun moyen d'appeler à l'aide, et personne ne sait que vous êtes en danger.
          </p>
          <p className="text-white text-base font-bold leading-relaxed max-w-2xl mb-10">
            Wallert existe pour que, dans ces secondes, quelqu'un sache et puisse agir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl">
            <div className="bg-red-500/[0.05] border border-red-500/30 rounded-xl p-7">
              <p className="font-display text-xl md:text-2xl font-bold leading-snug">
                <span className="text-red-400">L'agresseur</span><br />
                <span className="text-white">voit un transfert.</span>
              </p>
            </div>
            <div className="bg-[#00FF85]/[0.04] border border-[#00FF85]/30 rounded-xl p-7">
              <p className="font-display text-xl md:text-2xl font-bold leading-snug">
                <span className="text-[#00FF85]">Votre cercle</span><br />
                <span className="text-white">reçoit une alarme.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="border-t border-white/5" id="how">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Comment ça fonctionne</p>
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-12">Trois étapes. Aucune complexité.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Wallet de sécurité", desc: "Mettez un montant crédible sur un wallet dédié, séparé de vos fonds principaux. Cette adresse est placée sous surveillance continue. Elle devient votre déclencheur d'urgence." },
              { num: "02", title: "Cercle de confiance", desc: "Définissez vos contacts d'urgence, vos canaux d'alerte (email, Telegram), et vos instructions précises. Que doivent-ils faire ? Appeler la police ? Contacter le SEAL 911 ? Etc." },
              { num: "03", title: "Signal silencieux", desc: "Faites le transfert depuis le wallet surveillé. L'agresseur voit une transaction. Votre réseau reçoit une alerte instantanée avec vos instructions pour agir rapidement. Les alertes sont renvoyées toutes les 5 minutes jusqu'à confirmation." },
            ].map(s => (
              <div key={s.num} className="bg-[#111311] border border-white/5 rounded-xl p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00FF85] to-transparent" />
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#00FF85] text-xs font-mono tracking-widest">{s.num}</span>
                  <h3 className="font-display text-white font-bold text-base">{s.title}</h3>
                </div>
                <p className="text-[#C8C8C2] text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAPABILITIES */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Fonctionnalités</p>
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-12">Simple à configurer.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, title: "Wallets illimités", desc: "Surveillez autant d'adresses que nécessaire. Chaque wallet est suivi indépendamment." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, title: "Multi-canal", desc: "Email et Telegram simultanément. Multipliez les chances que quelqu'un reçoive l'alerte." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, title: "Instructions d'urgence", desc: "Rédigez des directives précises : qui appeler, quoi dire, que faire avec le hash de la transaction." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: "Détection instantanée", desc: "Surveillance on-chain via Alchemy. L'alerte se déclenche dès que la transaction est diffusée." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, title: "Alertes persistantes", desc: "Les alertes se répètent toutes les 5 minutes jusqu'à ce qu'un contact confirme avoir agi. Aucun message ne se perd." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>, title: "Mode test", desc: "Simulez une alerte complète avant la mise en service. Vérifiez que chaque contact et chaque canal fonctionnent." },
            ].map(f => (
              <div key={f.title} className="border border-white/5 rounded-xl p-6 hover:border-[#00FF85]/20 hover:bg-[#00FF85]/[0.02] transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#00FF85]">{f.icon}</span>
                  <h4 className="font-display text-white font-semibold text-base">{f.title}</h4>
                </div>
                <p className="text-[#9A9A95] text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="border-t border-white/5 bg-[#111311]">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="lg:w-[340px] shrink-0">
              <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Pourquoi Wallert existe</p>
              <h2 className="font-display text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight leading-[1.15] mb-6">
                J'ai vu les deux côtés.
              </h2>
              <p className="text-[#C8C8C2] text-base leading-relaxed mb-4">
                Je suis Rémi D'Alise. 6 ans Head of Product chez Ledger. Je sais ce que protègent les hardware wallets, et ce qu'ils ne protègent pas.
              </p>
              <p className="text-[#C8C8C2] text-base leading-relaxed">
                Depuis 2024, j'aide les détenteurs de crypto à sécuriser leurs fonds. Face à la menace physique réelle et grandissante, j'ai d'abord construit Wallert pour moi. Puis pour tout le monde.
              </p>
            </div>
            <div className="flex-1">
              <blockquote className="border-l-2 border-[#00FF85] pl-6 mb-8">
                <p className="text-white text-lg leading-relaxed italic font-display">
                  "Quand vous êtes en danger, la seule chose qui compte c'est que quelqu'un le sache. Le rôle de Wallert est de briser le silence le plus vite possible."
                </p>
              </blockquote>
              <p className="text-[#C8C8C2] text-base leading-relaxed mb-4">
                La meilleure solution est souvent de se retirer entièrement de l'équation (aucun accès facile à vos fonds). Mais tout le monde ne peut pas faire ce choix.
              </p>
              <p className="text-[#C8C8C2] text-base leading-relaxed mb-8">
                Pour ceux qui détiennent leur crypto en direct, c'est un filet de sécurité. Pas une garantie. Une couche supplémentaire qui ne coûte rien à activer, et qui peut compter quand plus rien d'autre ne compte.
              </p>
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5">
                <p className="text-[#C8A96E] text-base leading-relaxed">
                  <strong className="text-orange-300">⚠ Wallert ne protège pas des agressions ni du vol.</strong> L'objectif est d'alerter votre réseau de confiance le plus vite possible. L'issue dépend de nombreux facteurs hors du contrôle de l'app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECURITY */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Confidentialité & Sécurité</p>
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-4">Conçu pour ne laisser aucune trace.</h2>
          <p className="text-[#C8C8C2] text-base max-w-lg mb-12">Un outil de sécurité ne doit pas devenir un vecteur de risque. Wallert est construit pour minimiser l'exposition, même en cas de compromission.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Anonyme par conception", desc: "Inscription avec un email non nominatif. Aucun lien entre votre identité, votre compte Wallert et vos fonds réels." },
              { title: "Wallet isolé", desc: "Le wallet surveillé doit être dédié et séparé. Assurez-vous qu'il ne peut pas être relié à vos fonds principaux." },
              { title: "Open source & auto-hébergeable", desc: "Code entièrement transparent. Faites tourner votre propre instance si vous voulez un contrôle total sur vos données.", hasGithub: true },
              { title: "Infrastructure privée", desc: "Serveur dédié en France (Scaleway), conteneur isolé, protection DDoS via Cloudflare." },
            ].map(s => (
              <div key={s.title} className="flex items-start gap-4 border border-white/5 rounded-xl p-6">
                <div className="w-6 h-6 rounded-md bg-[#00FF85]/10 border border-[#00FF85]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00FF85" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h4 className="font-display text-white font-semibold text-base mb-1.5">{s.title}</h4>
                  <p className="text-[#9A9A95] text-base leading-relaxed">{s.desc}</p>
                  {s.hasGithub && (
                    <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-[#00FF85] text-sm font-medium hover:opacity-80 transition-opacity">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
                      Voir sur GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-24 text-center">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Commencer</p>
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-extrabold tracking-tight leading-[1.1] mb-4">
            Configurez une fois.<br />Espérez ne jamais l'utiliser.
          </h2>
          <p className="text-[#C8C8C2] text-base mb-10 max-w-md mx-auto">
            5 minutes. Ensuite, vous n'y pensez plus.
          </p>
          <a href="/register" className="inline-block px-10 py-4 bg-[#00FF85] text-black rounded-lg font-bold text-base hover:opacity-90 transition-opacity">
            Essayer Wallert
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[#555] text-sm">© 2025 Wallert. Projet open source.</p>
            <div className="flex items-center gap-6">
              <a href="/fr/about" className="text-[#9A9A95] text-sm hover:text-white transition-colors">À propos de Wallert</a>
              <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[#9A9A95] text-sm hover:text-white transition-colors flex items-center gap-2">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
                GitHub
              </a>
              <a href="mailto:contact@wallert.app" className="text-[#9A9A95] text-sm hover:text-white transition-colors">Contact</a>
              <span className="text-[#555] text-sm">
                <a href="/" className="text-[#9A9A95] hover:text-white transition-colors">EN</a>
                <span className="mx-2">|</span>
                <span className="text-white">FR</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
