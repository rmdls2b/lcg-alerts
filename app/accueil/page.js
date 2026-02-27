export default function Accueil() {
  return (
    <div>
      {/* Hero */}
      <div className="lg:min-h-[calc(100vh-65px)] flex items-center py-16 lg:py-8 px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 w-full">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter leading-none">
              Walle<span className="text-[#00d4aa]">r</span>t
            </h1>
            <p className="text-white text-xl md:text-2xl font-bold mb-6 leading-tight max-w-xl">
              {"Votre wallet déclenche "}
              <span className="text-[#00d4aa] italic">{"l'alerte"}</span>
              {" en cas de transfert de crypto sous contrainte."}
            </p>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg leading-relaxed italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {"Wallert transforme votre portefeuille en alarme silencieuse, instantanée et active 24h/24."}
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
          <div className="hidden lg:flex flex-1 justify-center w-full max-w-sm lg:max-w-none mx-auto">
            <div className="w-full max-w-[320px]">
              <div className="border border-gray-800 rounded-2xl p-6 bg-[#0a0a0a]">
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
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Contexte</p>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-6 leading-tight">
          Face à la contrainte physique, chaque minute compte.
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-12">
          {"Face à une agression et l'obligation de transférer vos fonds sous la force, vous ne pouvez ni fuir, ni appeler à l'aide. Wallert transforme ce transfert forcé en un signal de détresse invisible pour l'agresseur — et chaque seconde gagnée rapproche l'intervention."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Temps gagné</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Pour l'agresseur, c'est un transfert. Pour votre cercle de confiance, c'est un signal d'alarme. Plus vite ils sont alertés, plus vite ils peuvent contacter les autorités et intervenir."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Traçabilité & réponse</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Chaque transfert est horodaté sur la blockchain. Votre cercle de confiance dispose immédiatement des éléments pour solliciter des services spécialisés comme SEAL 911 et lancer le traçage des fonds."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Dissuasion passive</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Si l'existence de ce type de dispositif se répand, chaque transfert sous contrainte devient un risque pour l'agresseur. Ça change le calcul."}
            </p>
          </div>
        </div>
      </div>

      {/* Dispositif — 3 cartes */}
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-16">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Dispositif</p>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-12 leading-tight">
          {"Un protocole de secours en trois étapes."}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <div className="text-2xl font-bold text-[#00d4aa] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>01</div>
            <h3 className="text-base font-bold text-white mb-3">Placer un portefeuille sous surveillance</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Isolez une somme suffisamment crédible pour satisfaire un agresseur sur un portefeuille dédié à votre sécurité, qui devient votre bouton d'urgence. Wallert surveillera les mouvements sortants de cette adresse en continu."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <div className="text-2xl font-bold text-[#00d4aa] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>02</div>
            <h3 className="text-base font-bold text-white mb-3">{"Réseau de confiance et canaux d'alerte"}</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Configurez vos contacts d'urgence et les directives à suivre. Le système est conçu pour diffuser l'alerte simultanément sur plusieurs canaux : Email, Telegram, WhatsApp."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <div className="text-2xl font-bold text-[#00d4aa] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>03</div>
            <h3 className="text-base font-bold text-white mb-3">{"Déclenchement du signal et intervention"}</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Sous la menace, commencez par le transfert des fonds de ce portefeuille de sécurité. Le mouvement est détecté instantanément, et déclenche l'alerte à votre cercle de confiance."}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Wallets illimités</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Ajoutez autant d'adresses à surveiller que nécessaire. Chaque wallet est monitoré en continu."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Multi-canal</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Email, Telegram, WhatsApp — multipliez les canaux d'alerte pour chaque contact."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Récurrence & escalade</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Programmez l'intervalle de relance et les canaux d'escalade en cas de non-réponse."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Consignes sur mesure</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Rédigez un message personnalisé et des directives précises pour chaque alerte."}
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Simulation</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Testez le déclenchement complet avant activation réelle.
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-3">Contrôle total</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Activez, désactivez ou supprimez chaque wallet, canal et contact en un clic.
            </p>
          </div>
        </div>
      </div>

      {/* Fiabilité */}
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-16">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Garantie</p>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-6 leading-tight">
          {"Alerte jusqu'à atteinte de l'objectif."}
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          {"Une simple notification peut passer inaperçue. Wallert fonctionne comme une alarme : l'alerte est relancée automatiquement à intervalle programmable jusqu'à ce qu'un membre de votre réseau confirme sa prise en charge. En cas de non-réponse, le système escalade vers d'autres canaux d'alerte."}
        </p>
      </div>

      {/* Sécurité & Confidentialité */}
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-16">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Sécurité & Confidentialité</p>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-12 leading-tight">
          {"Rien à cacher. Transparence totale sur ce qu'on utilise."}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-4">Infra & stack</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Serveur dédié en France (Scaleway)</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Conteneur isolé via Podman, derrière un chiffrement HTTPS</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Surveillance blockchain via Alchemy</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">Alertes email via Resend</li>
              <li className="text-gray-400 text-base leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#00d4aa] before:font-bold">{"Alertes Telegram via l'API Bot officielle"}</li>
            </ul>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
            <h3 className="text-base font-bold text-white mb-4">Protection des données</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {"Pour une confidentialité maximale, nous recommandons une inscription avec un email non nominatif, un wallet surveillé isolé sans lien avec vos autres portefeuilles, et Telegram comme canal d'alerte avec groupe dédié et identifiants pseudonymes."}
            </p>
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
      <div className="py-8 text-center">
        <p className="text-gray-600 text-xs">© 2026 Wallert</p>
      </div>
    </div>
  )
}
