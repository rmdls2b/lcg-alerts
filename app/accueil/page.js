export default function Accueil() {
  return (
    <div>
      {/* Hero */}
      <div className="min-h-[calc(100vh-65px)] flex items-center px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 w-full">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter leading-none">
              Walle<span className="text-[#00d4aa]">r</span>t
            </h1>
            <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight max-w-xl">
              {"Donnez l'alerte en cas de transfert crypto sous la contrainte"}
            </p>
            <p className="text-gray-500 text-base md:text-lg mb-12 max-w-lg leading-relaxed">
              {"Wallert transforme votre wallet en alarme silencieuse, instantanée et active 24h/24"}
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="/" className="px-6 py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">
                Activer ma protection
              </a>
              <a href="/login" className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg text-sm hover:border-gray-500 transition-colors">
                Se connecter
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center w-full">
            <div className="w-full max-w-[340px]">
              <div className="border border-gray-800 rounded-2xl p-6 bg-[#0a0a0a]">
                <p className="text-gray-500 text-xs text-center mb-5 uppercase tracking-widest">Surveillance en temps réel</p>
                <div className="border border-gray-800 rounded-xl p-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#00d4aa] text-lg">●</span>
                    <span className="text-gray-300 text-sm font-mono">0x8a3f...c9b2</span>
                    <span className="text-gray-500 text-sm ml-auto">Wallet surveillé</span>
                  </div>
                </div>
                <div className="text-center text-gray-700 text-xl my-2">↓</div>
                <div className="border border-red-500/50 rounded-xl p-4 bg-red-500/5 mb-3">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-red-400 text-sm font-bold tracking-wide">⚡ MOUVEMENT DÉTECTÉ</span>
                    <span className="text-red-400/50 text-xs">Transfert sortant</span>
                  </div>
                </div>
                <div className="text-center text-gray-700 text-xl my-2">↓</div>
                <div className="flex gap-2 justify-center">
                  <div className="border border-gray-800 rounded-xl p-3 text-center flex-1">
                    <span className="text-xl block mb-1">📧</span>
                    <p className="text-gray-500 text-[10px]">Email</p>
                  </div>
                  <div className="border border-gray-800 rounded-xl p-3 text-center flex-1">
                    <span className="text-xl block mb-1">💬</span>
                    <p className="text-gray-500 text-[10px]">Telegram</p>
                  </div>
                  <div className="border border-gray-800 rounded-xl p-3 text-center flex-1">
                    <span className="text-xl block mb-1">📱</span>
                    <p className="text-gray-500 text-[10px]">WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Étapes */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-6">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-7 flex gap-5">
            <div className="text-3xl font-bold text-[#00d4aa] min-w-[40px]">1</div>
            <div>
              <h3 className="text-base text-white mb-2 font-semibold">Dédiez un portefeuille à votre sécurité</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {"Isolez une partie de vos fonds sur une adresse spécifique contenant un montant suffisamment crédible pour satisfaire un agresseur. Ce wallet devient votre bouton d'alarme."}
              </p>
            </div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-xl p-7 flex gap-5">
            <div className="text-3xl font-bold text-[#00d4aa] min-w-[40px]">2</div>
            <div>
              <h3 className="text-base text-white mb-2 font-semibold">Paramétrez votre protocole de secours</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {"Enregistrez l'adresse de ce portefeuille sur Wallert. Définissez votre cercle de confiance : proches ou services à prévenir, ainsi que les instructions précises qu'ils recevrons."}
              </p>
            </div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-xl p-7 flex gap-5">
            <div className="text-3xl font-bold text-[#00d4aa] min-w-[40px]">3</div>
            <div>
              <h3 className="text-base text-white mb-2 font-semibold">{"Donnez l'alerte par le transfert"}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {"En cas d'agression, commencez par transférer les fonds de ce portefeuille. Pour l'agresseur, c'est un butin. Pour Wallert, c'est le signal instantané qui déclenche l'intervention de votre cercle de confiance."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0d1f1a] border border-[#1a3a2a] rounded-xl p-6 mt-10">
          <h3 className="text-sm text-[#00d4aa] mb-3 font-semibold">Sécurité & confidentialité</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Wallert ne stocke que les adresses publiques de vos wallets. Les emails de vos contacts sont chiffrés et ne sont jamais partagés avec des tiers.
          </p>
        </div>
      </div>
    </div>
  )
}
