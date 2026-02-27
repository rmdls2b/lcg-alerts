export default function About() {
  return (
    <div className="max-w-[640px] mx-auto px-6 py-16">

      <h1 className="text-2xl font-bold text-white mb-12">Pourquoi Wallert existe.</h1>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Le probleme</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"J'ai passé 6 ans chez Ledger, en tant que Head of Product. Et depuis 2024 j'accompagne des particuliers et des professionnels dans la sécurisation de leurs actifs numériques. J'ai vu de près ce que la crypto peut apporter — mais aussi les risques qu'elle fait peser sur ceux qui en détiennent."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Ces derniers temps, les agressions physiques ciblant les détenteurs de crypto se sont multipliées. Home-jackings, enlèvements, extorsions. Les victimes sont identifiées, surveillées, attaquées, contraintes de transférer leurs fonds sous la violence."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Face à une agression de ce type, aucun hardware wallet, aucun mot de passe, aucune seed phrase ne vous protège. Vous êtes SEUL, et personne ne sait que vous êtes en danger."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {"IMPORTANT : aujourd'hui la meilleure solution reste de sortir de l'équation et de ne pas avoir accès à ses fonds trivialement. Mais tout le monde ne fait pas ce choix."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">{"L'idée"}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"J'ai construit Wallert comme une couche de protection supplémentaire."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Le principe : un wallet dédié, placé sous surveillance. Si un transfert est effectué sous la contrainte, ce mouvement déclenche une alerte silencieuse. L'agresseur voit un butin. En réalité, c'est un signal d'alarme."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {"En quelques secondes, un cercle de confiance reçoit une alerte avec des instructions précises : appeler la police, contacter des personnes clés, agir."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Conçu pour laisser le moins de trace possible</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Un outil de sécurité ne doit pas devenir un vecteur de risque. Wallert est pensé pour minimiser l'impact en cas de fuite de données."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"La configuration optimale repose sur trois piliers :"}
        </p>
        <div className="space-y-3 mb-4">
          <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-white text-sm font-medium mb-1">{"Adresse email non nominative"}</p>
            <p className="text-gray-500 text-xs">{"Le compte est créé avec une adresse qui ne révèle pas votre identité."}</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-white text-sm font-medium mb-1">{"Wallet isolé et dédié"}</p>
            <p className="text-gray-500 text-xs">{"Le wallet surveillé est séparé de vos fonds principaux. Il ne sert qu'à déclencher l'alerte."}</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-white text-sm font-medium mb-1">{"Groupe Telegram anonyme"}</p>
            <p className="text-gray-500 text-xs">{"Les alertes arrivent dans un groupe où les membres utilisent des pseudonymes. Aucun nom réel exposé."}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          {"Résultat : même en cas de compromission, aucun lien direct entre Wallert, votre identité, et vos fonds."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">{"D'abord un outil perso, puis un service"}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"J'ai d'abord construit Wallert pour mon propre usage. Quand j'ai présenté le concept autour de moi, la réaction a été unanime : \"je veux la même chose.\""}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Alors j'ai transformé cet outil en quelque chose de configurable, via mon service "}
          <a href="https://www.remidalise.com" target="_blank" rel="noopener noreferrer" className="text-[#00d4aa] hover:underline">{"Protégez vos cryptos"}</a>
          {". Même principe, adapté à chaque situation, chaque cercle de confiance, chaque consigne."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {"Aujourd'hui je mets Wallert à disposition de tous."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Soyons clairs</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Wallert n'empêche pas les agressions. Il n'empêche pas non plus le vol de vos fonds. Ce n'est pas son rôle."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Son rôle, c'est de vous donner une alarme silencieuse. Que quelqu'un sache que vous êtes en danger, le plus vite possible. Est-ce que la police arrivera à temps ? Peut-être pas. Mais sans Wallert, personne ne sait rien — et c'est le pire scénario."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {"C'est un filet de sécurité. Pas une garantie. Mais c'est un plus énorme par rapport à ne rien avoir du tout. Et surtout, c'est du peace of mind au quotidien."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Une beta, construite avec Claude</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Je vais être honnête : je ne suis pas développeur. J'ai construit Wallert avec l'aide de Claude. Fonctionnalité par fonctionnalité."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {"Le résultat n'est certainement pas parfait. L'interface peut être améliorée. Il y a sûrement des cas de figure que je n'ai pas anticipés. Mais le cœur du système : la détection, l'alerte, la récurrence jusqu'à prise en charge. Ça, ça fonctionne."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">{"Aidez-moi à l'améliorer"}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Ce projet évoluera peut-être."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Si vous utilisez Wallert, dites-moi ce qui manque, ce qui vous gêne, ce que vous aimeriez voir. Si vous êtes développeur et que vous voyez des choses à améliorer, vos retours sont précieux. Si vous avez des idées de fonctionnalités n'hésitez pas non plus."}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {"Chaque retour compte. Envoyez-moi un message à "}
          <a href="mailto:contact@wallert.app" className="text-[#00d4aa] hover:underline">contact@wallert.app</a>
          {", je lis tout et je réponds."}
        </p>
      </section>

 <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Soutenir le projet</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {"Wallert est gratuit, j'espère le garder accessible. Si vous trouvez le projet utile et que vous voulez contribuer à son maintien (serveurs, développement, temps), vous pouvez envoyer du code :) ou un tip :) :"}
        </p>
        <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">ETH</p>
          <p className="text-gray-300 font-mono text-sm">{"0x..."} <span className="text-gray-600 text-xs ml-2">(bientôt)</span></p>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          {"Merci d'avance. Et surtout, restez en sécurité."}
        </p>
      </section>

      <div className="border-t border-gray-800 pt-8">
        <p className="text-gray-500 text-sm">Rémi</p>
      </div>

    </div>
  )
}
