export default function Preview() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen">

      {/* ======= HERO ======= */}
      <section
        className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 xl:px-40 pt-20 pb-16"
        style={{ background: "linear-gradient(180deg, #10141A 0%, #141921 100%)" }}
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span
                className="text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1 rounded-full"
                style={{ background: "rgba(232,146,13,0.08)", border: "1px solid rgba(232,146,13,0.25)", color: "#E8A840" }}
              >
                Beta
              </span>
              <span
                className="text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#807D75" }}
              >
                Open source
              </span>
            </div>

            <h1 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.07] tracking-[-2px] mb-6" style={{ color: "#F0EFEB" }}>
              Your wallet:<br />
              a silent <span style={{ color: "#0FA67A" }}>alarm</span><br />
              under <span style={{ color: "#D4634B" }}>duress</span>.
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#B0ADA5" }}>
              Wallert is an open-source duress alarm for crypto holders. It monitors a dedicated wallet and alerts your trusted contacts if you're forced to transfer funds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a
                href="/register"
                className="inline-block px-7 py-3.5 rounded-lg font-bold text-sm transition-colors"
                style={{ background: "#0FA67A", color: "#fff", boxShadow: "0 4px 20px rgba(15,166,122,0.2)" }}
              >
                Try Wallert
              </a>
              <a href="#threat" className="inline-block px-7 py-3.5 text-sm transition-colors" style={{ color: "#807D75" }}>
                How it works
              </a>
            </div>
          </div>

          {/* Flow card */}
          <div className="w-full max-w-[300px] lg:max-w-[320px] mx-auto lg:mx-0 shrink-0">
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            >
              {/* Monitor */}
              <div className="flex items-start gap-4 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(15,166,122,0.08)", border: "1px solid rgba(15,166,122,0.2)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0FA67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#6B6860" }}>Monitored</p>
                  <p className="text-sm font-medium" style={{ color: "#F0EFEB" }}>Security wallet</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "#6B6860" }}>0x8a...c9b2 · ETH</p>
                </div>
              </div>
              {/* Detect */}
              <div className="flex items-start gap-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(232,146,13,0.08)", border: "1px solid rgba(232,146,13,0.2)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8920D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#6B6860" }}>Detected</p>
                  <p className="text-sm font-medium" style={{ color: "#F0EFEB" }}>Outgoing transfer</p>
                  <p className="text-xs mt-1" style={{ color: "#6B6860" }}>Signal triggered instantly</p>
                </div>
              </div>
              {/* Alert */}
              <div className="flex items-start gap-4 pt-5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(212,99,75,0.08)", border: "1px solid rgba(212,99,75,0.2)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4634B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#6B6860" }}>Alerted</p>
                  <p className="text-sm font-medium" style={{ color: "#F0EFEB" }}>Trusted circle notified</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(212,99,75,0.08)", color: "#D4634B" }}>Email</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(212,99,75,0.08)", color: "#D4634B" }}>Telegram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= THE THREAT ======= */}
      <section id="threat" style={{ background: "#181517", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase mb-4" style={{ color: "#D4634B" }}>The threat</p>
          <h2 className="text-[clamp(26px,3.5vw,44px)] font-bold tracking-tight leading-[1.12] mb-6" style={{ color: "#F0EFEB" }}>
            Hardware wallets protect your keys.<br />
            Nothing protects <em>you</em>.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "#B0ADA5" }}>
            Physical attacks on crypto holders are rising worldwide. When someone breaks into your home and threatens you with a weapon, you have seconds to act, no way to call for help, and no one knows you're in danger.
          </p>
          <p className="text-base font-bold leading-relaxed max-w-2xl mb-10" style={{ color: "#F0EFEB" }}>
            Wallert exists so that, in those seconds, someone knows and can act.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl">
            <div className="rounded-xl p-7" style={{ background: "rgba(212,99,75,0.06)", border: "1px solid rgba(212,99,75,0.2)" }}>
              <p className="text-xl md:text-2xl font-bold leading-snug">
                <span style={{ color: "#D4634B" }}>The attacker</span><br />
                <span style={{ color: "#F0EFEB" }}>sees a transfer.</span>
              </p>
            </div>
            <div className="rounded-xl p-7" style={{ background: "rgba(15,166,122,0.05)", border: "1px solid rgba(15,166,122,0.2)" }}>
              <p className="text-xl md:text-2xl font-bold leading-snug">
                <span style={{ color: "#0FA67A" }}>Your circle</span><br />
                <span style={{ color: "#F0EFEB" }}>receives an alarm.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= SPACER / NOTE ======= */}
      <div className="py-20 text-center" style={{ background: "#10141A" }}>
        <p style={{ color: "#5A5751" }} className="text-sm">
          Preview — hero + threat only. The rest of the page follows if you validate this direction.
        </p>
      </div>
    </div>
  )
}
