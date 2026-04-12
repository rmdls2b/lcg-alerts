import StructuredData from "./StructuredData"
export default function Accueil() {
  const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"
  return (
    <div className="min-h-screen">
      <StructuredData />

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 xl:px-40 pt-16 pb-16" style={{ background: "linear-gradient(145deg, #FAFBF9 0%, #FFF9F6 100%)" }}>
        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1 rounded-full" style={{ background: "rgba(232,146,13,0.06)", border: "1px solid rgba(232,146,13,0.2)", color: "#92400E" }}>Beta</span>
              <span className="text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1 rounded-full" style={{ background: "rgba(15,166,122,0.06)", border: "1px solid rgba(15,166,122,0.15)", color: "#0C8A66" }}>Open source</span>
            </div>
            <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-normal leading-[1.1] text-ink-dark mb-6 tracking-tight">
              Your wallet:<br />
              a <span className="italic text-brand-green">silent alarm</span><br />
              under <span className="text-brand-terra">duress</span>.
            </h1>
            <p className="text-lg leading-relaxed text-ink-mid mb-10 max-w-lg">
              Wallert is an open-source duress alarm for crypto holders. It monitors a dedicated wallet and alerts your trusted contacts if you're forced to transfer funds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a href="/register" className="inline-block px-7 py-3.5 bg-brand-green text-white rounded-lg font-bold text-sm hover:bg-brand-green-dark transition-colors" style={{ boxShadow: "0 4px 14px rgba(15,166,122,0.25)" }}>Try Wallert</a>
              <a href="#how" className="inline-block px-7 py-3.5 text-ink-light text-sm hover:text-ink-dark transition-colors">See how it works ↓</a>
            </div>
          </div>
          <div className="w-full max-w-[300px] lg:max-w-[320px] mx-auto lg:mx-0 shrink-0">
            <div className="bg-white border border-line rounded-2xl p-7" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
              <div className="flex items-start gap-4 pb-5 border-b border-line-light">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(15,166,122,0.06)", border: "1px solid rgba(15,166,122,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0FA67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-1">Monitored</p>
                  <p className="text-ink-dark text-sm font-medium">Security wallet</p>
                  <p className="text-ink-muted text-xs font-mono mt-1">0x8a...c9b2 · ETH</p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-5 border-b border-line-light">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(232,146,13,0.06)", border: "1px solid rgba(232,146,13,0.2)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8920D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-1">Detected</p>
                  <p className="text-ink-dark text-sm font-medium">Outgoing transfer</p>
                  <p className="text-ink-muted text-xs mt-1">Signal triggered instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(224,90,56,0.06)", border: "1px solid rgba(224,90,56,0.2)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E05A38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-1">Alerted</p>
                  <p className="text-ink-dark text-sm font-medium">Trusted circle notified</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(224,90,56,0.06)", color: "#E05A38" }}>Email</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(224,90,56,0.06)", color: "#E05A38" }}>Telegram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE THREAT */}
      <section className="bg-white border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-brand-terra text-[11px] font-semibold tracking-[3px] uppercase mb-4">The threat</p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal tracking-tight leading-[1.15] mb-6 text-ink-dark">
            Hardware wallets protect your keys.<br />
            Nothing protects <em>you</em>.
          </h2>
          <p className="text-ink-mid text-base leading-relaxed max-w-2xl mb-10">
            Physical attacks on crypto holders are rising worldwide. When someone breaks into your home and threatens you with a weapon, you have seconds to act, no way to call for help, and no one knows you're in danger.
          </p>
          <p className="text-ink-dark text-base font-bold leading-relaxed max-w-2xl mb-10">
            Wallert exists so that, in those seconds, someone knows and can act.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl">
            <div className="rounded-xl p-7" style={{ background: "rgba(224,90,56,0.06)", border: "1px solid rgba(224,90,56,0.25)" }}>
              <p className="font-serif text-xl md:text-2xl font-normal leading-snug">
                <span className="text-brand-terra italic">The attacker</span><br />
                <span className="text-ink-dark">sees a transfer.</span>
              </p>
            </div>
            <div className="rounded-xl p-7" style={{ background: "rgba(15,166,122,0.06)", border: "1px solid rgba(15,166,122,0.25)" }}>
              <p className="font-serif text-xl md:text-2xl font-normal leading-snug">
                <span className="text-brand-green italic">Your circle</span><br />
                <span className="text-ink-dark">receives an alarm.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-bg-soft border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-brand-green text-[11px] font-semibold tracking-[3px] uppercase mb-4">Protocol</p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal tracking-tight leading-[1.15] mb-12 text-ink-dark">Three steps. No complexity.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Security wallet", desc: "Set aside a credible amount on a dedicated wallet, separate from your real holdings. This address is placed under continuous surveillance. It becomes your emergency trigger." },
              { num: "02", title: "Trusted circle", desc: "Define your emergency contacts, alert channels (email, Telegram), and exact instructions. What should they do? Call police? Contact SEAL 911? You decide in advance." },
              { num: "03", title: "Silent signal", desc: "Transfer from the watched wallet. The attacker sees a transaction. Your network receives an instant alert with your instructions, and acts. Alerts resend every 5 minutes until confirmed." },
            ].map(s => (
              <div key={s.num} className="bg-white border border-line rounded-xl p-7 border-t-2 border-t-brand-green">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-brand-green text-xs font-mono tracking-widest font-semibold">{s.num}</span>
                  <h3 className="text-ink-dark font-semibold text-base">{s.title}</h3>
                </div>
                <p className="text-ink-mid text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-white border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-brand-green text-[11px] font-semibold tracking-[3px] uppercase mb-4">Capabilities</p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal tracking-tight leading-[1.15] mb-12 text-ink-dark">Simple to configure.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, title: "Unlimited wallets", desc: "Monitor as many addresses as needed. Each wallet is tracked independently." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, title: "Multi-channel", desc: "Email and Telegram simultaneously. Multiply the chances someone gets through." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, title: "Emergency instructions", desc: "Write precise directives: who to call, what to say, what to do with the transaction hash." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: "Instant detection", desc: "On-chain monitoring via Alchemy. The alert fires the moment the transaction is broadcast." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, title: "Persistent alerts", desc: "Alerts repeat every 5 minutes until a contact confirms they've acted. No message gets lost." },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>, title: "Test mode", desc: "Simulate a full alert before going live. Confirm every contact and channel works." },
            ].map(f => (
              <div key={f.title} className="border border-line rounded-xl p-6 hover:border-brand-green transition-all bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-brand-green">{f.icon}</span>
                  <h4 className="text-ink-dark font-semibold text-base">{f.title}</h4>
                </div>
                <p className="text-ink-light text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-bg-green border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-20">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-[340px] shrink-0">
            <p className="text-brand-green text-[11px] font-semibold tracking-[3px] uppercase mb-4">Why it exists</p>
            <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-normal tracking-tight leading-[1.2] mb-6 text-ink-dark">I've seen both sides.</h2>
            <p className="text-ink-mid text-base leading-relaxed mb-4">I am Rémi D'Alise. 6 years as Head of Product at Ledger. I know what hardware wallets protect, and what they don't.</p>
            <p className="text-ink-mid text-base leading-relaxed">Since 2024, I've been helping crypto holders secure their funds. As the physical threat is real and growing, I built Wallert first for myself. Then for everyone.</p>
          </div>
          <div className="flex-1">
            <blockquote className="border-l-2 border-brand-green pl-6 mb-8">
              <p className="font-serif italic text-ink-dark text-xl leading-relaxed">"When you're under threat, the only thing that matters is that someone knows. Wallert's purpose is to break the silence as fast as possible."</p>
            </blockquote>
            <p className="text-ink-mid text-base leading-relaxed mb-4">The best solution is often to remove yourself from the equation entirely: no easy access to your funds. But not everyone can make that choice.</p>
            <p className="text-ink-mid text-base leading-relaxed mb-8">For those who hold directly: this is a safety net. Not a guarantee. An extra layer that costs nothing to activate, and could matter when nothing else does.</p>
            <div className="rounded-xl p-5" style={{ background: "rgba(232,146,13,0.06)", border: "1px solid rgba(232,146,13,0.25)" }}>
              <p className="text-ink-mid text-base leading-relaxed">
                <strong className="text-brand-amber">⚠ Wallert does not prevent attacks or theft.</strong> It's designed to alert your trusted circle as quickly as possible. Whether that changes the outcome depends on many factors outside our control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="bg-white border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-brand-green text-[11px] font-semibold tracking-[3px] uppercase mb-4">Privacy & Security</p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal tracking-tight leading-[1.15] mb-4 text-ink-dark">Designed to leave no trace.</h2>
          <p className="text-ink-mid text-base max-w-lg mb-12">A security tool must not become a risk vector. Wallert is built to minimize exposure, even in a compromise scenario.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Anonymous by design", desc: "Register with a non-nominal email. No link between your identity, your Wallert account, and your real funds." },
              { title: "Isolated wallet", desc: "The monitored wallet should be dedicated and separate. Make sure it can't be traced back to your main holdings." },
              { title: "Open source & self-hostable", desc: "Full code transparency. Run your own instance if you need complete control over your data.", hasGithub: true },
              { title: "Private infrastructure", desc: "Dedicated server in France (Scaleway), isolated container, DDoS protection via Cloudflare." },
            ].map(s => (
              <div key={s.title} className="flex items-start gap-4 border border-line rounded-xl p-6 bg-white">
                <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(15,166,122,0.06)", border: "1px solid rgba(15,166,122,0.2)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0FA67A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h4 className="text-ink-dark font-semibold text-base mb-1.5">{s.title}</h4>
                  <p className="text-ink-light text-base leading-relaxed">{s.desc}</p>
                  {s.hasGithub && (
                    <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-brand-green text-sm font-medium hover:text-brand-green-dark transition-colors">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-24" style={{ background: "linear-gradient(145deg, #F2FAF6, #FFF9F6)" }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-brand-green text-[11px] font-semibold tracking-[3px] uppercase mb-4">Get started</p>
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal tracking-tight leading-[1.1] mb-4 text-ink-dark">
            Set it up once.<br />Hope to never use it.
          </h2>
          <p className="text-ink-mid text-base mb-10 max-w-md mx-auto">Takes 5 minutes. Then you don't think about it anymore.</p>
          <a href="/register" className="inline-block px-10 py-4 bg-brand-green text-white rounded-lg font-bold text-base hover:bg-brand-green-dark transition-colors" style={{ boxShadow: "0 4px 14px rgba(15,166,122,0.25)" }}>Try Wallert</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line-light bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-32 xl:px-40 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-ink-muted text-sm">© 2025 Wallert. Open source project.</p>
          <div className="flex items-center gap-6">
            <a href="/about" className="text-ink-light text-sm hover:text-ink-dark transition-colors">Behind Wallert</a>
            <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-ink-light text-sm hover:text-ink-dark transition-colors flex items-center gap-2">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
              GitHub
            </a>
            <a href="mailto:contact@wallert.app" className="text-ink-light text-sm hover:text-ink-dark transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
