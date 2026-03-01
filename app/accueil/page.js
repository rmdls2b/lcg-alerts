export default function Accueil() {
  return (
    <div>
      {/* Hero */}
      <div className="lg:min-h-[calc(100vh-65px)] flex items-center py-16 lg:py-8 px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-20 w-full">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter leading-none">
              Walle<span className="text-[#00d4aa]">r</span>t
            </h1>
            <p className="text-white text-xl md:text-2xl font-bold mb-6 leading-tight max-w-xl">
              {"Votre wallet déclenche "}
              <span className="text-[#00d4aa] italic">{"l'alerte"}</span>
              {" en cas de "}
              <span className="text-red-400 italic">{"transfert forcé"}</span>
              {" de crypto."}
            </p>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg leading-relaxed italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {"Une protection active 24h/24. Simple, silencieuse, invisible pour l'agresseur et immédiate."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <a href="/" className="inline-block w-fit px-6 py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">
                Activer ma protection
              </a>
              <a href="/login" className="inline-block w-fit px-6 py-3 border border-gray-700 text-gray-300 rounded-lg text-sm hover:border-gray-500 transition-colors">
                Se connecter
              </a>
            </div>
          </div>
          <div className="flex flex-1 justify-center w-full max-w-[240px] lg:max-w-none mx-auto">
            <div className="w-full max-w-[240px] lg:max-w-[320px]">
              <div className="border border-gray-800 rounded-2xl p-4 lg:p-6 bg-[#0a0a0a]">  
                <div className="border border-gray-800 rounded-xl p-4 mb-3">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-300 text-xs font-bold">WALLET SURVEILLÉ</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00d4aa] text-sm">●</span>
                      <span className="text-gray-300 text-xs font-mono">0x8a...c9b2</span>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-700 text-lg my-1">↓</div>
                <div className="border border-red-500/50 rounded-xl p-3 bg-red-500/5 mb-3">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-red-400 text-xs font-bold tracking-wide">MOUVEMENT DÉTECTÉ</span>
                    <span className="text-red-400/50 text-[13px]">Transfert sortant</span>
                  </div>
                </div>
                <div className="text-center text-gray-700 text-lg my-1">↓</div>
                <div className="border border-[#00d4aa]/30 rounded-xl p-3 bg-[#00d4aa]/5 mb-3">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-[#00d4aa] text-xs font-bold tracking-wide">ALERTE DÉCLENCHÉE</span>
                    <span className="text-[#00d4aa]/50 text-[13px]">Cercle de confiance informé</span>
                  </div>
                </div>
                <div className="flex gap-2 justify-center">
                  <div className="border border-gray-800 rounded-lg p-2 text-center flex-1">
                    <span className="text-base block">📧</span>
                    <p className="text-white text-[12px]">Email</p>
                  </div>
                  <div className="border border-gray-800 rounded-lg p-2 text-center flex-1">
                    <span className="text-base block">💬</span>
                    <p className="text-white text-[12px]">Telegram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contexte & Gains */}
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-16">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Pourquoi c'est utile</p>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-6 leading-tight">
          Face à une agression, chaque seconde compte.
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-12">
          {"En cas d'agression, vous ne pouvez ni fuir, ni appeler à l'aide. Grace à un signal de détresse invisible pour l'agresseur, chaque seconde gagnée rapproche l'intervention de vos proches et des forces de police."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Temps</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Pour l'agresseur, c'est un transfert. Pour vos proche, c'est un signal d'alarme. Plus l'alerte est rapide, plus l'intervention de la police est efficace."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Traçabilité</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Votre cercle de confiance reçoit immédiatement les détails de la transaction et peuvent solliciter SEAL 911 et tracer les fonds."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Dissuasion passive</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Chaque transfert sous contrainte devient un risque pour l'agresseur. La généralisation de ce type de dispositif devient une défense."}
            </p>
          </div>
        </div>
      </div>

      {/* Dispositif — 3 cartes */}
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-16">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Fonctionnement</p>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-12 leading-tight">
          {"Un protocole en 3 étapes."}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <div className="text-2xl font-bold text-[#00d4aa] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>01</div>
            <h3 className="text-base font-bold text-white mb-3">Wallet de sécurité</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Isolez une somme crédible sur un portefeuille dédié et sous surveillance. Ce « wallet de sécurité » devient votre bouton d'urgence."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <div className="text-2xl font-bold text-[#00d4aa] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>02</div>
            <h3 className="text-base font-bold text-white mb-3">{"Cercle de confiance"}</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Définissez vos contacts d'urgence (proches, experts...), canaux d'alerte (mail, Telegram), et instructions à suivre."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <div className="text-2xl font-bold text-[#00d4aa] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>03</div>
            <h3 className="text-base font-bold text-white mb-3">{"Signal d'alerte silencieux"}</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Sous la menace, effectuez un transfert depuis ce portefeuille. L'alerte est déclenchée instantanément. Votre réseau peut intervenir."}
            </p>
          </div>
        </div>
      </div>

      {/* Interface */}
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-16">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Interface</p>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-12 leading-tight">
          Simple, modulable, sous votre contrôle.
        </h2>

        {/* Mockup interface */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-[700px]">
            <div className="border border-gray-800 rounded-2xl bg-[#111] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm font-bold tracking-tight">Walle<span className="text-[#00d4aa]">r</span>t</span>
                  <span className="text-gray-600 text-xs">Mon espace</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00d4aa]"></span>
                  <span className="text-gray-500 text-xs">Protection active</span>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-3">Wallet surveillé</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#00d4aa]"></span>
                        <span className="text-gray-300 text-sm font-mono">0x8a...c9b2</span>
                      </div>
                      <span className="text-gray-600 text-xs">ETH · Actif</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-3">{"Canaux d'alerte"}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">📧</span>
                        <span className="text-gray-300 text-sm">a****@proton.me</span>
                      </div>
                      <span className="text-[#00d4aa] text-xs font-semibold">Actif</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">💬</span>
                        <span className="text-gray-300 text-sm">Groupe Telegram</span>
                      </div>
                      <span className="text-[#00d4aa] text-xs font-semibold">Actif</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-3">{"Instructions d'urgence"}</p>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3">
                    <p className="text-gray-400 text-sm leading-relaxed">{"Appeler immédiatement le 17. Suivre ces instructions : ..."}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="px-3 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-[11px] sm:text-xs sm:px-4 sm:py-2.5">
                    {"Tester l'alerte"}
                  </div>
                  <div className="px-3 py-2 border border-gray-700 text-gray-400 rounded-lg text-[11px] sm:text-xs sm:px-4 sm:py-2.5">
                    Désactiver la protection
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 text-xs mt-4">{"Aperçu de l'espace utilisateur — données fictives"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Wallets illimités</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Ajoutez autant d'adresses que nécessaire. Chaque wallet est monitoré en continu."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Multi-canal</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Email, Telegram — multipliez les canaux d'alerte pour vos contacts."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Alertes persistantes</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Le système relance vos contacts tant que personne n'a confirmé la prise en charge."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">{"Instructions d'urgence"}</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Définissez un protocole d'urgence et rédigez des directives précises."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Simulation</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Testez le déclenchement complet avant activation réelle.
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Contrôle absolu</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Activez ou coupez votre protection en un clic.
            </p>
          </div>
        </div>
      </div>

      {/* Sécurité & Confidentialité */}
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-16">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Sécurité & Confidentialité</p>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-12 leading-tight">
          {"Transparence totale. Rien à cacher. Tout à protéger."}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-4">Infra & stack</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Serveur dédié en France (Scaleway)</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Base de données PostgreSQL locale</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Conteneur isolé via Podman, derrière un chiffrement HTTPS</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Protection DDoS via Cloudflare</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Surveillance blockchain via Alchemy</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">{"Alertes: email via Resend, Telegram via l'API Bot officielle"}</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">
                {"Code open source et "}
                <a href="https://github.com/rmdls2b/lcg-alerts" target="_blank" rel="noopener noreferrer" className="text-[#00d4aa] underline hover:text-[#00b892] transition-colors">self-hostable</a>
              </li>
            </ul>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-4">Protection des données</h3>
            <p className="text-gray-400 text-base leading-relaxed mb-4">Pour une confidentialité maximale, nous recommandons :</p>
            <ul className="space-y-2">
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Email non nominatif pour la création de compte</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Wallet surveillé isolé, sans lien avec vos autres portefeuilles</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">{"Groupe Telegram anonyme comme canal d'alerte"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-16 text-center">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-8">
          Ne laissez rien au hasard.
        </h2>
        <a href="/" className="inline-block px-8 py-4 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-all hover:shadow-[0_8px_24px_rgba(0,212,170,0.2)]">
          Activer Wallert
        </a>
      </div>

      {/* Footer */}
      <div className="py-8 flex items-center justify-center gap-4">
        <p className="text-gray-600 text-xs">© 2026 Wallert</p>
        <span className="text-gray-800">·</span>
        <a href="https://github.com/rmdls2b/lcg-alerts" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-xs hover:text-gray-400 transition-colors flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          GitHub
        </a>
      </div>
    </div>
  )
}
