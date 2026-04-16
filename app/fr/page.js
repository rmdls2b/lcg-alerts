import StructuredDataFr from "../StructuredDataFr"

export default function AccueilFr() {
  const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"

  return (
    <div className="min-h-screen">
      <StructuredDataFr />

      {/* HERO */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto pt-32 md:pt-44 pb-24 md:pb-32">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[11px] tracking-widest uppercase text-amber-400/70 border border-amber-400/20 px-3 py-1 rounded-full">Beta</span>
          <span className="text-[11px] tracking-widest uppercase text-[#555] border border-white/[0.08] px-3 py-1 rounded-full">Open source</span>
        </div>
        <h1 className="font-serif text-[clamp(48px,7vw,88px)] leading-[0.95] tracking-[-2px] text-white mb-8">
          Votre wallet,<br />
          une alarme silencieuse.
        </h1>
        <p className="text-[#777] text-xl md:text-2xl leading-relaxed max-w-2xl mb-12">
          Wallert surveille un wallet crypto d&eacute;di&eacute; et alerte instantan&eacute;ment vos contacts de confiance si vous &ecirc;tes forc&eacute; de transf&eacute;rer vos fonds sous la contrainte.
        </p>
        <div className="flex items-center gap-4">
          <a href="/register" className="px-8 py-4 bg-[#0FA67A] text-black rounded-lg font-semibold text-sm hover:bg-[#12b886] transition-colors">
            Essayer Wallert
          </a>
          <a href="#how" className="px-8 py-4 text-[#666] text-sm hover:text-white transition-colors">
            Fonctionnement
          </a>
        </div>
      </section>

      {/* SIGNAL FLOW */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/[0.06] rounded-2xl overflow-hidden">
          {[
            { step: "01", label: "Surveiller", title: "Un wallet sous surveillance", detail: "0x8a...c9b2 \u00b7 ETH", mono: true },
            { step: "02", label: "D\u00e9tecter", title: "Transfert sortant", detail: "D\u00e9clench\u00e9 en secondes", mono: false },
            { step: "03", label: "Alerter", title: "Votre cercle est notifi\u00e9", detail: "Email & Telegram", mono: false },
          ].map((item, i) => (
            <div key={item.step} className={`p-8 md:p-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/[0.06]" : ""}`}>
              <p className="text-[11px] text-[#555] uppercase tracking-widest mb-3 font-mono">{item.step} \u2014 {item.label}</p>
              <p className="text-white text-lg">{item.title}</p>
              <p className={`text-[#555] text-sm mt-2 ${item.mono ? "font-mono" : ""}`}>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[900px] mx-auto py-24 md:py-32">
        <h2 className="font-serif text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-1px] text-white mb-8">
          Les hardware wallets prot&egrave;gent vos cl&eacute;s.<br />
          <span className="text-[#555]">Rien ne <em>vous</em> prot&egrave;ge, vous.</span>
        </h2>
        <p className="text-[#777] text-lg leading-relaxed mb-6 max-w-2xl">
          Les agressions physiques contre les d&eacute;tenteurs de crypto se multiplient partout dans le monde. Quand quelqu'un s'introduit chez vous et vous menace avec une arme, vous avez quelques secondes pour r&eacute;agir, aucun moyen d'appeler &agrave; l'aide, et personne ne sait que vous &ecirc;tes en danger.
        </p>
        <p className="text-white text-lg leading-relaxed max-w-2xl">
          Wallert existe pour que, dans ces secondes, quelqu'un sache et puisse agir.
        </p>
      </section>

      {/* WHAT HAPPENS */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-500/15 rounded-xl p-8 md:p-10">
            <p className="font-serif text-2xl md:text-3xl leading-snug">
              <span className="text-red-400/80">L'agresseur</span><br />
              <span className="text-white">voit un transfert.</span>
            </p>
          </div>
          <div className="border border-white/[0.06] rounded-xl p-8 md:p-10">
            <p className="font-serif text-2xl md:text-3xl leading-snug">
              <span className="text-[#888]">Votre cercle</span><br />
              <span className="text-white">re&ccedil;oit une alarme.</span>
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/[0.06]" id="how">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-24 md:py-32">
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] tracking-[-1px] leading-[1.1] text-white mb-16">
            Trois &eacute;tapes.<br />Aucune complexit&eacute;.
          </h2>
          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-16">
            {[
              { num: "01", title: "Wallet de s\u00e9curit\u00e9", desc: "Mettez un montant cr\u00e9dible sur un wallet d\u00e9di\u00e9, s\u00e9par\u00e9 de vos fonds principaux. Cette adresse est plac\u00e9e sous surveillance continue. Elle devient votre d\u00e9clencheur d'urgence." },
              { num: "02", title: "Cercle de confiance", desc: "D\u00e9finissez vos contacts d'urgence, vos canaux d'alerte \u2014 email, Telegram \u2014 et vos instructions pr\u00e9cises. Que doivent-ils faire ? Appeler la police ? Contacter le SEAL 911 ? Vous d\u00e9cidez en avance." },
              { num: "03", title: "Signal silencieux", desc: "Sous la contrainte, transf\u00e9rez depuis le wallet surveill\u00e9. Votre r\u00e9seau re\u00e7oit une alerte instantan\u00e9e avec vos instructions. Les alertes sont renvoy\u00e9es toutes les 5 minutes jusqu'\u00e0 confirmation." },
            ].map(s => (
              <div key={s.num}>
                <p className="text-[#555] text-sm font-mono mb-3">{s.num}</p>
                <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-[#777] text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-white/[0.06]">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-24 md:py-32">
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] tracking-[-1px] leading-[1.1] text-white mb-16">
            Simple &agrave; configurer.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              { title: "Wallets illimit\u00e9s", desc: "Surveillez autant d'adresses que n\u00e9cessaire. Chaque wallet est suivi ind\u00e9pendamment." },
              { title: "Alertes multi-canal", desc: "Email et Telegram simultan\u00e9ment. Multipliez les chances que quelqu'un re\u00e7oive l'alerte." },
              { title: "Instructions d'urgence", desc: "R\u00e9digez des directives pr\u00e9cises : qui appeler, quoi dire, que faire avec le hash de la transaction." },
              { title: "D\u00e9tection instantan\u00e9e", desc: "Surveillance on-chain via Alchemy. L'alerte se d\u00e9clenche d\u00e8s que la transaction est diffus\u00e9e." },
              { title: "Alertes persistantes", desc: "Les alertes se r\u00e9p\u00e8tent toutes les 5 minutes jusqu'\u00e0 ce qu'un contact confirme avoir agi. Aucun message ne se perd." },
              { title: "Mode test", desc: "Simulez une alerte compl\u00e8te avant la mise en service. V\u00e9rifiez que chaque contact et chaque canal fonctionnent." },
            ].map(f => (
              <div key={f.title} className="border-t border-white/[0.06] pt-6">
                <h4 className="text-white font-medium text-base mb-2">{f.title}</h4>
                <p className="text-[#777] text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT EXISTS */}
      <section className="border-t border-white/[0.06] bg-[#0c0c0e]">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-24 md:py-32">
          <div className="max-w-3xl">
            <blockquote className="mb-12">
              <p className="font-serif italic text-[clamp(24px,3vw,36px)] leading-[1.3] text-white tracking-[-0.5px]">
                &laquo; Quand vous &ecirc;tes en danger, la seule chose qui compte c'est que quelqu'un le sache. &raquo;
              </p>
            </blockquote>
            <p className="text-[#999] text-base leading-relaxed mb-4">
              Je suis R&eacute;mi D'Alise. 6 ans Head of Product chez Ledger. Je sais ce que prot&egrave;gent les hardware wallets &mdash; et ce qu'ils ne prot&egrave;gent pas.
            </p>
            <p className="text-[#999] text-base leading-relaxed mb-8">
              Depuis 2024, j'aide les d&eacute;tenteurs de crypto &agrave; s&eacute;curiser leurs fonds. Face &agrave; la menace physique r&eacute;elle et grandissante, j'ai d'abord construit Wallert pour moi. Puis pour tout le monde.
            </p>
            <div className="border-l-2 border-red-400/30 pl-6 py-1">
              <p className="text-[#999] text-base leading-relaxed">
                <strong className="text-red-400/80">Wallert ne prot&egrave;ge pas des agressions ni du vol.</strong> L'objectif est d'alerter votre r&eacute;seau de confiance le plus vite possible. L'issue d&eacute;pend de nombreux facteurs hors du contr&ocirc;le de l'app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY & SECURITY */}
      <section className="border-t border-white/[0.06]">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-24 md:py-32">
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] tracking-[-1px] leading-[1.1] text-white mb-4">
            Con&ccedil;u pour ne laisser aucune trace.
          </h2>
          <p className="text-[#777] text-base mb-16 max-w-lg">
            Un outil de s&eacute;curit&eacute; ne doit pas devenir un vecteur de risque. Wallert est construit pour minimiser l'exposition, m&ecirc;me en cas de compromission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {[
              { title: "Anonyme par conception", desc: "Inscription avec un email non nominatif. Aucun lien entre votre identit\u00e9, votre compte Wallert et vos fonds r\u00e9els." },
              { title: "Wallet isol\u00e9", desc: "Le wallet surveill\u00e9 doit \u00eatre d\u00e9di\u00e9 et s\u00e9par\u00e9. Assurez-vous qu'il ne peut pas \u00eatre reli\u00e9 \u00e0 vos fonds principaux." },
              { title: "Open source & auto-h\u00e9bergeable", desc: "Code enti\u00e8rement transparent. Faites tourner votre propre instance pour un contr\u00f4le total sur vos donn\u00e9es.", hasGithub: true },
              { title: "Infrastructure priv\u00e9e", desc: "Serveur d\u00e9di\u00e9 en France (Scaleway), conteneur isol\u00e9, protection DDoS via Cloudflare." },
            ].map(s => (
              <div key={s.title} className="flex gap-4">
                <span className="text-[#555] mt-0.5 shrink-0 text-lg leading-none">&mdash;</span>
                <div>
                  <h4 className="text-white font-medium text-base mb-1">{s.title}</h4>
                  <p className="text-[#777] text-base leading-relaxed">{s.desc}</p>
                  {s.hasGithub && (
                    <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-[#888] text-sm hover:text-white transition-colors">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
                      Voir sur GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06]">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-24 md:py-32 text-center">
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] tracking-[-1px] leading-[1.05] text-white mb-4">
            Configurez une fois.<br />Esp&eacute;rez ne jamais l'utiliser.
          </h2>
          <p className="text-[#777] text-base mb-10">
            5 minutes. Ensuite, vous n'y pensez plus.
          </p>
          <a href="/register" className="inline-block px-10 py-4 bg-[#0FA67A] text-black rounded-lg font-semibold text-base hover:bg-[#12b886] transition-colors">
            Essayer Wallert
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06]">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#444] text-sm">&copy; 2025 Wallert</p>
            <div className="flex items-center gap-6">
              <a href="/fr/about" className="text-[#666] text-sm hover:text-white transition-colors">&Agrave; propos</a>
              <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[#666] text-sm hover:text-white transition-colors flex items-center gap-2">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
                GitHub
              </a>
              <a href="mailto:contact@wallert.app" className="text-[#666] text-sm hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
