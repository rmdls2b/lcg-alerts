export default function AboutFr() {
  return (
    <div className="max-w-[680px] mx-auto px-6 pt-32 pb-20">

      <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-[1.05] tracking-[-1px] text-white mb-16">
        Derri&egrave;re Walle<span className="text-[#0FA67A]">r</span>t.
      </h1>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Qui suis-je</h2>
        <p className="text-[#999] text-base leading-relaxed">
          {"Je suis R\u00e9mi D'Alise. J'ai pass\u00e9 6 ans chez Ledger comme Head of Product. Depuis 2024, j'aide les d\u00e9tenteurs de crypto \u00e0 s\u00e9curiser leurs actifs avec "}
          <a href="https://remidalise.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline underline-offset-4">Prot&eacute;gez vos cryptos</a>
          {". J'ai vu ce que la crypto apporte, et les risques qu'elle cr\u00e9e pour ceux qui en d\u00e9tiennent."}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Le probl&egrave;me</h2>
        <p className="text-[#999] text-base leading-relaxed">
          {"Les agressions physiques contre les d\u00e9tenteurs de crypto se multiplient. Home jackings, kidnappings. Face \u00e0 la violence, aucun hardware wallet ne vous prot\u00e8ge. Vous \u00eates seul, et personne ne sait que vous \u00eates en danger."}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Un outil personnel d'abord</h2>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"J'ai construit Wallert d'abord pour moi, comme une couche de protection suppl\u00e9mentaire."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Le concept : un wallet d\u00e9di\u00e9, plac\u00e9 sous surveillance. Un transfert effectu\u00e9 sous la contrainte d\u00e9clenche un signal de d\u00e9tresse silencieux."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"En quelques secondes, votre cercle de confiance re\u00e7oit l'alerte avec vos instructions, peut appeler la police, etc."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"J'ai pr\u00e9sent\u00e9 le concept autour de moi. Les retours ont \u00e9t\u00e9 tr\u00e8s positifs. J'en ai fait quelque chose d'accessible \u00e0 tous."}
        </p>
        <p className="text-[#999] text-base leading-relaxed">
          {"Parce que tout le monde ne peut pas vivre dans un bunker, payer un garde du corps, enfermer ses cl\u00e9s dans un coffre, ou monter un setup multisig complexe."}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Un filet de s&eacute;curit&eacute;, pas un bouclier</h2>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Wallert n'emp\u00eache pas les agressions ni les vols. Son objectif est de briser le silence, rapidement."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Est-ce que la police arrivera \u00e0 temps ? Peut-\u00eatre pas. Mais sans Wallert, personne ne sait que vous \u00eates en danger."}
        </p>
        <p className="text-[#999] text-base leading-relaxed">
          {"C'est un filet de s\u00e9curit\u00e9. Une tranquillit\u00e9 d'esprit au quotidien. Pas une garantie."}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Construit avec Claude</h2>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Je ne suis pas d\u00e9veloppeur. C'est une beta, l'interface et les fonctionnalit\u00e9s vont continuer \u00e0 \u00e9voluer. Mais le c\u0153ur fonctionne : d\u00e9tection, alerte, relance jusqu'\u00e0 ce que quelqu'un r\u00e9ponde."}
        </p>
        <p className="text-[#999] text-base leading-relaxed">
          {"Le code est open source. Vous pouvez le lire, l'auditer, et faire tourner votre propre instance. "}
          <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-white hover:underline underline-offset-4">Voir sur GitHub</a>
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Aidez &agrave; l'am&eacute;liorer</h2>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Wallert est open source et je compte le garder ainsi. Si vous l'utilisez, dites-moi ce qui manque, ce qui vous g\u00eane. Si vous \u00eates d\u00e9veloppeur et que vous rep\u00e9rez des choses \u00e0 am\u00e9liorer, votre avis compte. \u00c9crivez \u00e0 "}
          <a href="mailto:contact@wallert.app" className="text-white hover:underline underline-offset-4">contact@wallert.app</a>
          {". Je lis tout et je r\u00e9ponds."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Si vous voulez soutenir le projet \u2014 un tip ou une pull request, les deux comptent :"}
        </p>
        <div className="border border-white/[0.06] rounded-lg px-4 py-3 mb-6">
          <p className="text-[#555] text-xs uppercase tracking-wider mb-1">ETH</p>
          <p className="text-[#999] font-mono text-sm">{"0x..."} <span className="text-[#444] text-xs ml-2">(bient&ocirc;t)</span></p>
        </div>
        <p className="text-[#999] text-base leading-relaxed">
          {"Merci. Et surtout, restez en s\u00e9curit\u00e9."}
        </p>
      </section>
    </div>
  )
}
