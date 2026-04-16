export default function About() {
  return (
    <div className="max-w-[680px] mx-auto px-6 pt-32 pb-20">

      <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-[1.05] tracking-[-1px] text-white mb-16">
        Behind Walle<span className="text-[#0FA67A]">r</span>t.
      </h1>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Who I am</h2>
        <p className="text-[#999] text-base leading-relaxed">
          {"I'm R\u00e9mi D'Alise. I spent 6 years at Ledger as Head of Product. Since 2024, I've been helping people secure their crypto assets through "}
          <a href="https://remidalise.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline underline-offset-4">Protect your crypto</a>
          {". I've seen what crypto brings, and the risks it creates for those who hold it."}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">The problem</h2>
        <p className="text-[#999] text-base leading-relaxed">
          {"Physical attacks on crypto holders are rising. Home invasions, kidnappings, forced transfers. When faced with violence, no hardware wallet protects you. You're alone, and no one knows you're in danger."}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">A personal tool first</h2>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"I built Wallert for myself first, as an additional layer of protection."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"The concept: a dedicated wallet, placed under surveillance. A transfer made under duress triggers a silent distress signal."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Within seconds, a trusted circle receives the alert with your instructions, can call the police, etc."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"I showed the concept around me. And the feedback was very positive. So I turned it into something accessible to everyone."}
        </p>
        <p className="text-[#999] text-base leading-relaxed">
          {"Because not everyone can live in a bunker, pay for a bodyguard, lock their keys in a vault, or use a complex multisig setup."}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">A safety net, not a shield</h2>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Wallert doesn't prevent attacks or theft. Its purpose is to break the silence, fast."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Will the police arrive in time? Maybe not. But without something like Wallert, no one knows you're in danger."}
        </p>
        <p className="text-[#999] text-base leading-relaxed">
          {"It's a safety net. A daily peace of mind. Not a guarantee. But better than nothing."}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">{"Built with Claude"}</h2>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"I'm not a developer. It's a beta, the interface and features will keep improving. But the core works: detection, alert, follow-up until someone responds."}
        </p>
        <p className="text-[#999] text-base leading-relaxed">
          {"The code is open source. You can read it, audit it, run your own instance. "}
          <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-white hover:underline underline-offset-4">View on GitHub</a>
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Help make it better</h2>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"Wallert is open source and I intend to keep it that way. If you use it, tell me what's missing, what bothers you. If you're a developer and spot things to improve, your input matters. Reach out at "}
          <a href="mailto:contact@wallert.app" className="text-white hover:underline underline-offset-4">contact@wallert.app</a>
          {". I read everything and I reply."}
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-4">
          {"If you want to support the project \u2014 a tip or a pull request, both count:"}
        </p>
        <div className="border border-white/[0.06] rounded-lg px-4 py-3 mb-6">
          <p className="text-[#555] text-xs uppercase tracking-wider mb-1">ETH</p>
          <p className="text-[#999] font-mono text-sm">{"0x..."} <span className="text-[#444] text-xs ml-2">(coming soon)</span></p>
        </div>
        <p className="text-[#999] text-base leading-relaxed">
          {"Thanks. And above all, stay safe."}
        </p>
      </section>
    </div>
  )
}
