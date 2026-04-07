export default function WhatIsWallert() {
  return (
    <section
      id="what-is-wallert"
      aria-labelledby="what-is-wallert-title"
      className="border-t border-white/5"
    >
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
        <h2
          id="what-is-wallert-title"
          className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-8"
        >
          What is Wallert?
        </h2>
        <p className="text-[#C8C8C2] text-lg leading-relaxed max-w-3xl">
          <strong className="text-white">
            Wallert is an open-source duress alarm system for cryptocurrency holders.
          </strong>{" "}
          It continuously monitors a dedicated decoy wallet, and the moment funds are transferred under physical coercion or a <em>wrench attack</em>, it instantly notifies a pre-defined trusted circle by email and Telegram, with custom emergency instructions.
        </p>
      </div>
    </section>
  )
}
