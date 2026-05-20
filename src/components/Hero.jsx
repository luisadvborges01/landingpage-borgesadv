import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.22),transparent_35%)]" />

      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur"
        >
          Advocacia Previdenciária
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="max-w-5xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          Teve benefício negado, cortado ou está com problema no INSS?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
          className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-xl"
        >
          Receba orientação jurídica previdenciária com atendimento humanizado,
          análise individual do seu caso e acompanhamento profissional.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="mt-9 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="https://wa.me/SEUNUMEROAQUI"
            className="rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-400"
          >
            Falar no WhatsApp
          </a>

          <a
            href="#como-funciona"
            className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
          >
            Entender como funciona
          </a>
        </motion.div>
      </div>
    </section>
  );
}