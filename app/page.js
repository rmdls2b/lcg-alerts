import StructuredData from "./StructuredData"

export default function Home() {
  const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"

  return (
    <div className="min-h-screen">
      <StructuredData />

      {/* HERO */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto pt-32 md:pt-44 pb-24 md:pb-32">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[11px] tracking-widest uppercase text-amber-400/70 border border-amber-400/20 px-3 py-1 rounded-full">Beta</span>
          <span className="text-[11px] tracking-widest uppercase text-[#555] border border-white/[0.08] px-3 py-1 rounded-full">Open source</span>
        </div>
        <h1 className="font-serif text-[clamp(48px,7vw,88px)] leading-[0.95] tracking-[-2px] text-white mb-8">
          Your wallet,<br />
          a silent alarm.
        </h1>
        <p className="text-[#777] text-xl md:text-2xl leading-relaxed max-w-2xl mb-12">
          Wallert monitors a dedicated crypto wallet and instantly alerts your trusted contacts if you're forced to transfer funds under duress.
        </p>
        <div className="flex items-center gap-4">
          <a href="/register" className="px-8 py-4 bg-[#0FA67A] text-black rounded-lg font-semibold text-sm hover:bg-[#12b886] transition-colors">
            Try Wallert
          </a>
          <a href="#how" className="px-8 py-4 text-[#666] text-sm hover:text-white transition-colors">
            How it works
          </a>
        </div>
      </section>

      {/* SIGNAL FLOW */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/[0.06] rounded-2xl overflow-hidden">
          {[
            { step: "01", label: "Monitor", title: "A wallet under watch", detail: "0x8a...c9b2 \u00b7 ETH", mono: true },
            { step: "02", label: "Detect", title: "Outgoing transfer", detail: "Triggered in seconds", mono: false },
            { step: "03", label: "Alert", title: "Your circle is notified", detail: "Email & Telegram", mono: false },
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
          Hardware wallets protect your keys.<br />
          <span className="text-[#555]">Nothing protects <em>you</em>.</span>
        </h2>
        <p className="text-[#777] text-lg leading-relaxed mb-6 max-w-2xl">
          Physical attacks on crypto holders are rising worldwide. When someone breaks into your home and threatens you with a weapon, you have seconds to act, no way to call for help, and no one knows you're in danger.
        </p>
        <p className="text-white text-lg leading-relaxed max-w-2xl">
          Wallert exists so that, in those seconds, someone knows and can act.
        </p>
      </section>

      {/* WHAT HAPPENS */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-500/15 rounded-xl p-8 md:p-10">
            <p className="font-serif text-2xl md:text-3xl leading-snug">
              <span className="text-red-400/80">The attacker</span><br />
              <span className="text-white">sees a transfer.</span>
            </p>
          </div>
          <div className="border border-white/[0.06] rounded-xl p-8 md:p-10">
            <p className="font-serif text-2xl md:text-3xl leading-snug">
              <span className="text-[#888]">Your circle</span><br />
              <span className="text-white">receives an alarm.</span>
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/[0.06]" id="how">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-24 md:py-32">
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] tracking-[-1px] leading-[1.1] text-white mb-16">
            Three steps.<br />No complexity.
          </h2>
          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-16">
            {[
              { num: "01", title: "Security wallet", desc: "Set aside a credible amount on a dedicated wallet, separate from your real holdings. This address is placed under continuous surveillance. It becomes your emergency trigger." },
              { num: "02", title: "Trusted circle", desc: "Define your emergency contacts, alert channels \u2014 email, Telegram \u2014 and your exact instructions. What should they do? Call police? Contact SEAL 911? You decide in advance." },
              { num: "03", title: "Silent signal", desc: "Under duress, transfer from the watched wallet. Your network receives an instant alert with your instructions. Alerts resend every 5 minutes until confirmed." },
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
            Simple to configure.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              { title: "Unlimited wallets", desc: "Monitor as many addresses as needed. Each wallet is tracked independently." },
              { title: "Multi-channel alerts", desc: "Email and Telegram simultaneously. Multiply the chances someone gets through." },
              { title: "Emergency instructions", desc: "Write precise directives: who to call, what to say, what to do with the transaction hash." },
              { title: "Instant detection", desc: "On-chain monitoring via Alchemy. The alert fires the moment the transaction is broadcast." },
              { title: "Persistent alerts", desc: "Alerts repeat every 5 minutes until a contact confirms they've acted. No message gets lost." },
              { title: "Test mode", desc: "Simulate a full alert before going live. Confirm every contact and channel works." },
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
                "When you're under threat, the only thing that matters is that someone knows."
              </p>
            </blockquote>
            <p className="text-[#999] text-base leading-relaxed mb-4">
              I am R&eacute;mi D'Alise. 6 years as Head of Product at Ledger. I know what hardware wallets protect &mdash; and what they don't.
            </p>
            <p className="text-[#999] text-base leading-relaxed mb-8">
              Since 2024, I've been helping crypto holders secure their funds. The physical threat is real and growing. I built Wallert first for myself. Then for everyone.
            </p>
            <div className="border-l-2 border-red-400/30 pl-6 py-1">
              <p className="text-[#999] text-base leading-relaxed">
                <strong className="text-red-400/80">Wallert does not prevent attacks or theft.</strong> It's designed to alert your trusted circle as quickly as possible. Whether that changes the outcome depends on factors outside our control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY & SECURITY */}
      <section className="border-t border-white/[0.06]">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-24 md:py-32">
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] tracking-[-1px] leading-[1.1] text-white mb-4">
            Designed to leave no trace.
          </h2>
          <p className="text-[#777] text-base mb-16 max-w-lg">
            A security tool must not become a risk vector. Wallert is built to minimize exposure, even in a compromise scenario.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {[
              { title: "Anonymous by design", desc: "Register with a non-nominal email. No link between your identity, your Wallert account, and your real funds." },
              { title: "Isolated wallet", desc: "The monitored wallet should be dedicated and separate. It can't be traced back to your main holdings." },
              { title: "Open source & self-hostable", desc: "Full code transparency. Run your own instance for complete control over your data.", hasGithub: true },
              { title: "Private infrastructure", desc: "Dedicated server in France (Scaleway), isolated container, DDoS protection via Cloudflare." },
            ].map(s => (
              <div key={s.title} className="flex gap-4">
                <span className="text-[#555] mt-0.5 shrink-0 text-lg leading-none">&mdash;</span>
                <div>
                  <h4 className="text-white font-medium text-base mb-1">{s.title}</h4>
                  <p className="text-[#777] text-base leading-relaxed">{s.desc}</p>
                  {s.hasGithub && (
                    <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-[#888] text-sm hover:text-white transition-colors">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
                      View on GitHub
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
            Set it up once.<br />Hope to never use it.
          </h2>
          <p className="text-[#777] text-base mb-10">
            Takes 5 minutes. Then you don't think about it anymore.
          </p>
          <a href="/register" className="inline-block px-10 py-4 bg-[#0FA67A] text-black rounded-lg font-semibold text-base hover:bg-[#12b886] transition-colors">
            Try Wallert
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06]">
        <div className="px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#444] text-sm">&copy; 2025 Wallert</p>
            <div className="flex items-center gap-6">
              <a href="/about" className="text-[#666] text-sm hover:text-white transition-colors">About</a>
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
