import StructuredData from "./StructuredData"
export default function Accueil() {
  const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"
  return (
    <div className="bg-[#080A08] min-h-screen">
    <StructuredData />

      {/* HERO */}
      <div className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 xl:px-40 pt-16 pb-16 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full">

          {/* Left */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-yellow-500/30 text-yellow-500/80">Beta</span>
              <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 text-[#9A9A95]">Open source</span>
            </div>

            <h1 className="font-display text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.07] tracking-[-2px] mb-6">
              Your wallet:<br />
              <span className="text-[#00FF85]">a silent alarm</span><br />
              under <span className="text-red-400">duress</span>.
            </h1>

            <p className="text-[#C8C8C2] text-lg leading-relaxed mb-10 max-w-lg">
              Wallert is an open-source duress alarm for crypto holders. It monitors a dedicated wallet and alerts your trusted contacts if you're forced to transfer funds.        
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a href="/register" className="inline-block px-7 py-3.5 bg-[#00FF85] text-black rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                Try Wallert
              </a>
              <a href="#how" className="inline-block px-7 py-3.5 text-[#9A9A95] text-sm hover:text-white transition-colors">
                See how it works ↓
              </a>
            </div>
          </div>

          {/* Flow card */}
          <div className="w-full max-w-[300px] lg:max-w-[320px] mx-auto lg:mx-0 shrink-0">
            <div className="bg-[#111311] border border-white/7 rounded-2xl p-7">
              <div className="flex items-start gap-4 pb-5 border-b border-white/5">
                <div className="w-9 h-9 rounded-lg bg-[#00FF85]/10 border border-[#00FF85]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#9A9A95] uppercase tracking-widest mb-1">Monitored</p>
                  <p className="text-white text-sm font-medium">Security wallet</p>
                  <p className="text-[#9A9A95] text-xs font-mono mt-1">0x8a...c9b2 · ETH</p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-5 border-b border-white/5">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#9A9A95] uppercase tracking-widest mb-1">Detected</p>
                  <p className="text-white text-sm font-medium">Outgoing transfer</p>
                  <p className="text-[#9A9A95] text-xs mt-1">Signal triggered instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-5">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#9A9A95] uppercase tracking-widest mb-1">Alerted</p>
                  <p className="text-white text-sm font-medium">Trusted circle notified</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400">Email</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400">Telegram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE THREAT */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">The threat</p>
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-6">
            Hardware wallets protect your keys.<br />
            Nothing protects <em>you</em>.
          </h2>
          <p className="text-[#C8C8C2] text-base leading-relaxed max-w-2xl mb-10">
            Physical attacks on crypto holders are rising worldwide. When someone breaks into your home and threatens you with a weapon, you have seconds to act, no way to call for help, and no one knows you're in danger.
          </p>
          <p className="text-white text-base font-bold leading-relaxed max-w-2xl mb-10">
          Wallert exists so that, in those seconds, someone knows and can act.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl">
            <div className="bg-red-500/[0.05] border border-red-500/30 rounded-xl p-7">
              <p className="font-display text-xl md:text-2xl font-bold leading-snug">
                <span className="text-red-400">The attacker</span><br />
                <span className="text-white">sees a transfer.</span>
              </p>
            </div>
            <div className="bg-[#00FF85]/[0.04] border border-[#00FF85]/30 rounded-xl p-7">
              <p className="font-display text-xl md:text-2xl font-bold leading-snug">
                <span className="text-[#00FF85]">Your circle</span><br />
                <span className="text-white">receives an alarm.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="border-t border-white/5" id="how">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Protocol</p>
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-12">Three steps. No complexity.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Security wallet", desc: "Set aside a credible amount on a dedicated wallet, separate from your real holdings. This address is placed under continuous surveillance. It becomes your emergency trigger." },
              { num: "02", title: "Trusted circle", desc: "Define your emergency contacts, alert channels (email, Telegram), and exact instructions. What should they do? Call police? Contact SEAL 911? You decide in advance." },
              { num: "03", title: "Silent signal", desc: "Transfer from the watched wallet. The attacker sees a transaction. Your network receives an instant alert with your instructions, and acts. Alerts resend every 5 minutes until confirmed." },
            ].map(s => (
              <div key={s.num} className="bg-[#111311] border border-white/5 rounded-xl p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00FF85] to-transparent" />
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#00FF85] text-xs font-mono tracking-widest">{s.num}</span>
                    <h3 className="font-display text-white font-bold text-base">{s.title}</h3>
                  </div>
                <p className="text-[#C8C8C2] text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAPABILITIES */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Capabilities</p>
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-12">Simple to configure.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, title: "Unlimited wallets", desc: "Monitor as many addresses as needed. Each wallet is tracked independently." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, title: "Multi-channel", desc: "Email and Telegram simultaneously. Multiply the chances someone gets through." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, title: "Emergency instructions", desc: "Write precise directives: who to call, what to say, what to do with the transaction hash." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: "Instant detection", desc: "On-chain monitoring via Alchemy. The alert fires the moment the transaction is broadcast." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, title: "Persistent alerts", desc: "Alerts repeat every 5 minutes until a contact confirms they've acted. No message gets lost." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>, title: "Test mode", desc: "Simulate a full alert before going live. Confirm every contact and channel works." },
            ].map(f => (
              <div key={f.title} className="border border-white/5 rounded-xl p-6 hover:border-[#00FF85]/20 hover:bg-[#00FF85]/[0.02] transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#00FF85]">{f.icon}</span>
                  <h4 className="font-display text-white font-semibold text-base">{f.title}</h4>
                </div>
                <p className="text-[#9A9A95] text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="border-t border-white/5 bg-[#111311]">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="lg:w-[340px] shrink-0">
              <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Why it exists</p>
              <h2 className="font-display text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight leading-[1.15] mb-6">
                I've seen both sides.
              </h2>
              <p className="text-[#C8C8C2] text-base leading-relaxed mb-4">
                I am Rémi D'Alise. 6 years as Head of Product at Ledger. I know what hardware wallets protect, and what they don't.
              </p>
              <p className="text-[#C8C8C2] text-base leading-relaxed">
                Since 2024, I've been helping crypto holders secure their funds. As the physical threat is real and growing, I built Wallert first for myself. Then for everyone.
              </p>
            </div>
            <div className="flex-1">
              <blockquote className="border-l-2 border-[#00FF85] pl-6 mb-8">
                <p className="text-white text-lg leading-relaxed italic font-display">
                  "When you're under threat, the only thing that matters is that someone knows. Wallert's purpose is to break the silence as fast as possible."
                </p>
              </blockquote>
              <p className="text-[#C8C8C2] text-base leading-relaxed mb-4">
                The best solution is often to remove yourself from the equation entirely: no easy access to your funds. But not everyone can make that choice.
              </p>
              <p className="text-[#C8C8C2] text-base leading-relaxed mb-8">
                For those who hold directly: this is a safety net. Not a guarantee. An extra layer that costs nothing to activate, and could matter when nothing else does.
              </p>
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5">
                <p className="text-[#C8A96E] text-base leading-relaxed">
                  <strong className="text-orange-300">⚠ Wallert does not prevent attacks or theft.</strong> It's designed to alert your trusted circle as quickly as possible. Whether that changes the outcome depends on many factors outside our control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECURITY */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Privacy & Security</p>
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-4">Designed to leave no trace.</h2>
          <p className="text-[#C8C8C2] text-base max-w-lg mb-12">A security tool must not become a risk vector. Wallert is built to minimize exposure, even in a compromise scenario.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Anonymous by design", desc: "Register with a non-nominal email. No link between your identity, your Wallert account, and your real funds." },
              { title: "Isolated wallet", desc: "The monitored wallet should be dedicated and separate. Make sure it can't be traced back to your main holdings." },
              { title: "Open source & self-hostable", desc: "Full code transparency. Run your own instance if you need complete control over your data.", hasGithub: true },
              { title: "Private infrastructure", desc: "Dedicated server in France (Scaleway), isolated container, DDoS protection via Cloudflare." },
            ].map(s => (
              <div key={s.title} className="flex items-start gap-4 border border-white/5 rounded-xl p-6">
                <div className="w-6 h-6 rounded-md bg-[#00FF85]/10 border border-[#00FF85]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00FF85" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h4 className="font-display text-white font-semibold text-base mb-1.5">{s.title}</h4>
                  <p className="text-[#9A9A95] text-base leading-relaxed">{s.desc}</p>
                  {s.hasGithub && (
                    <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-[#00FF85] text-sm font-medium hover:opacity-80 transition-opacity">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-24 text-center">
          <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">Get started</p>
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-extrabold tracking-tight leading-[1.1] mb-4">
            Set it up once.<br />Hope to never use it.
          </h2>
          <p className="text-[#C8C8C2] text-base mb-10 max-w-md mx-auto">
            Takes 5 minutes. Then you don't think about it anymore.
          </p>
          <a href="/register" className="inline-block px-10 py-4 bg-[#00FF85] text-black rounded-lg font-bold text-base hover:opacity-90 transition-opacity">
            Try Wallert
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[#555] text-sm">© 2025 Wallert. Open source project.</p>
            <div className="flex items-center gap-6">
              <a href="/about" className="text-[#9A9A95] text-sm hover:text-white transition-colors">Behind Wallert</a>
              <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[#9A9A95] text-sm hover:text-white transition-colors flex items-center gap-2">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
                GitHub
              </a>
              <a href="mailto:contact@wallert.app" className="text-[#9A9A95] text-sm hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
