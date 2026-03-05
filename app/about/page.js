export default function About() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">

      <h1 className="text-2xl font-bold text-white mb-12">Behind Wallert.</h1>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Who I am</h2>
        <p className="text-gray-400 text-base leading-relaxed">
          {"I spent 6 years at Ledger as Head of Product. Since 2024, I've been helping people secure their crypto assets through "}
          <a href="https://remidalise.com" target="_blank" rel="noopener noreferrer" className="text-[#00d4aa] hover:underline">Protect your crypto</a>
          {". I've seen what crypto brings, and the risks it creates for those who hold it."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">The problem</h2>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Physical attacks on crypto holders are rising. Home invasions, kidnappings, forced transfers. When faced with violence, no hardware wallet protects you. You're alone, and no one knows you're in danger."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">A personal tool first</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"I built Wallert for myself first, as an additional layer of protection."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"The concept: a dedicated wallet, placed under surveillance. A transfer is made under duress triggers a silent alarm, a distress signal."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Within seconds, a trusted circle receives an alert with your instructions, call the police, etc."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"When I showed the concept around me, the reaction was unanimous: \"I want the same thing.\"So I turned it into something configurable and accessible to everyone."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">A safety net, not a shield</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Wallert doesn't prevent attacks or theft. That's not its purpose."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Its purpose is to break the silence, fast. Will the police arrive in time? Maybe not. But without something like Wallert, no one knows you're in danger."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"It's a safety net. A daily peace of mind. Not a guarantee. But infinitely better than nothing."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">{"Built with Claude (I'm not a developer)"}</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"I built Wallert entirely with Claude (Anthropic). It's a beta, the interface and features will keep improving. But the core works: detection, alert, follow-up until someone responds."}
        </p>
          <p className="text-gray-400 text-base leading-relaxed">
            {"The code is open source. You can read it, audit it, run your own instance. "}
            <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[#00d4aa] hover:underline">View on GitHub</a>
          </p>
      </section>

<section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Help make it better</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Wallert is free and I intend to keep it that way. If you use it, tell me what's missing, what bothers you. If you're a developer and spot things to improve, your input matters. Reach out at "}
          <a href="mailto:contact@wallert.app" className="text-[#00d4aa] hover:underline">contact@wallert.app</a>
          {" — I read everything and I reply."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"If you want to support the project — a tip or a pull request, both count:"}
        </p>
        <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">ETH</p>
          <p className="text-gray-300 font-mono text-sm">{"0x..."} <span className="text-gray-600 text-xs ml-2">(coming soon)</span></p>
        </div>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Thanks. And above all — stay safe."}
        </p>
      </section>
    </div>
  )
}
