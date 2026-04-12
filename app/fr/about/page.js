export default function AboutFr() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">

      <h1 className="text-2xl font-bold text-white mb-12">À propos de Wallert.</h1>

      <section className="mb-12">
        <h2 className="text-[#0FA67A] text-xs font-semibold tracking-widest uppercase mb-4">Qui suis-je</h2>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Je suis Rémi D'Alise. J'ai passé 6 ans chez Ledger comme Head of Product. Depuis 2024, j'aide les détenteurs de crypto à sécuriser leurs actifs avec "}
          <a href="https://remidalise.com" target="_blank" rel="noopener noreferrer" className="text-[#0FA67A] hover:underline">Protégez vos cryptos</a>
          {". J'ai vu ce que la crypto apporte, et les risques qu'elle crée pour ceux qui en détiennent."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#0FA67A] text-xs font-semibold tracking-widest uppercase mb-4">Le problème</h2>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Les agressions physiques contre les détenteurs de crypto se multiplient. Home jackings, kidnappings. Face à la violence, aucun hardware wallet ne vous protège. Vous êtes seul, et personne ne sait que vous êtes en danger."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#0FA67A] text-xs font-semibold tracking-widest uppercase mb-4">Un outil personnel d'abord</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"J'ai construit Wallert d'abord pour moi, comme une couche de protection supplémentaire."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Le concept : un wallet dédié, placé sous surveillance. Un transfert effectué sous la contrainte déclenche un signal de détresse silencieux."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"En quelques secondes, votre cercle de confiance reçoit l'alerte avec vos instructions, peut appeler la police, etc."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"J'ai présenté le concept autour de moi. Les retours ont été très positifs. J'en ai fait quelque chose d'accessible à tous."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Parce que tout le monde ne peut pas vivre dans un bunker, payer un garde du corps, enfermer ses clés dans un coffre, ou monter un setup multisig complexe."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#0FA67A] text-xs font-semibold tracking-widest uppercase mb-4">Un filet de sécurité, pas un bouclier</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Wallert n'empêche pas les agressions ni les vols. Son objectif est de briser le silence, rapidement."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Est-ce que la police arrivera à temps ? Peut-être pas. Mais sans Wallert, personne ne sait que vous êtes en danger."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"C'est un filet de sécurité. Une tranquillité d'esprit au quotidien. Pas une garantie."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#0FA67A] text-xs font-semibold tracking-widest uppercase mb-4">{"Construit avec Claude (je ne suis pas développeur)"}</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"C'est une beta, l'interface et les fonctionnalités vont continuer à évoluer. Mais le cœur fonctionne : détection, alerte, relance jusqu'à ce que quelqu'un réponde."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Le code est open source. Vous pouvez le lire, l'auditer, et faire tourner votre propre instance. "}
          <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[#0FA67A] hover:underline">Voir sur GitHub</a>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#0FA67A] text-xs font-semibold tracking-widest uppercase mb-4">Aidez à l'améliorer</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Wallert est open source et je compte le garder ainsi. Si vous l'utilisez, dites-moi ce qui manque, ce qui vous gêne. Si vous êtes développeur et que vous repérez des choses à améliorer, votre avis compte. Écrivez à "}
          <a href="mailto:contact@wallert.app" className="text-[#0FA67A] hover:underline">contact@wallert.app</a>
          {". Je lis tout et je réponds."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Si vous voulez soutenir le projet, un tip ou une pull request, les deux comptent :"}
        </p>
        <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">ETH</p>
          <p className="text-gray-300 font-mono text-sm">{"0x..."} <span className="text-gray-600 text-xs ml-2">(bientôt)</span></p>
        </div>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Merci. Et surtout, restez en sécurité."}
        </p>
      </section>

      {/* Switcher EN/FR */}
      <div className="border-t border-white/10 pt-8 mt-8 text-center">
        <span className="text-[#555] text-sm">
          <a href="/about" className="text-[#9A9A95] hover:text-white transition-colors">EN</a>
          <span className="mx-2">|</span>
          <span className="text-white">FR</span>
        </span>
      </div>
    </div>
  )
}
