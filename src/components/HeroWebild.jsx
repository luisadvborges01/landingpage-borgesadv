import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export default function HeroWebild() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="page-section">
        <div className="grid min-h-[680px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.13 }}
          >
            <motion.div
              variants={item}
              transition={{ duration: 0.65 }}
              className="mb-5 inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#174b9a] shadow-sm"
            >
              Advocacia Previdenciária em Goiânia
            </motion.div>

            <motion.h1
              variants={item}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-slate-950 md:text-6xl lg:text-7xl"
            >
              Borges Advocacia: expertise e acolhimento.
            </motion.h1>

            <motion.p
              variants={item}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg"
            >
              Escritório familiar dedicado ao Direito Previdenciário, com atendimento
              humanizado, análise individual e orientação segura para quem enfrenta
              problemas com benefícios do INSS.
            </motion.p>

            <motion.div
              variants={item}
              transition={{ duration: 0.7 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="https://wa.me/556293161779"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#174b9a] px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-blue-900/20 transition hover:-translate-y-1 hover:bg-[#0d2f68]"
              >
                Falar no WhatsApp
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#areas"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-7 py-4 text-sm font-bold text-slate-900 transition hover:-translate-y-1 hover:bg-white"
              >
                Ver áreas de atuação
              </a>
            </motion.div>

            <motion.div
              variants={item}
              transition={{ duration: 0.7 }}
              className="glass-card mt-10 max-w-xl rounded-[28px] p-5"
            >
              <div className="divide-y divide-slate-200/70">
                <div className="py-3">
                  <h3 className="font-semibold text-slate-950">Atendimento Humanizado</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Cada caso é tratado com atenção, escuta e responsabilidade.
                  </p>
                </div>

                <div className="py-3">
                  <h3 className="font-semibold text-slate-950">Experiência Previdenciária</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Atuação focada em benefícios, revisões e demandas contra o INSS.
                  </p>
                </div>

                <div className="py-3">
                  <h3 className="font-semibold text-slate-950">Atendimento em Goiânia</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Atendimento presencial e online para maior comodidade.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.95, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute -bottom-10 right-8 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />

            <div className="image-soft relative overflow-hidden rounded-[34px] border border-white/80 bg-white p-3">
              <img
                src="/img/fachada.jpeg"
                alt="Fachada da Borges Advocacia"
                className="h-[500px] w-full rounded-[26px] object-cover"
              />
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card absolute -bottom-8 left-6 rounded-[24px] p-5"
            >
              <p className="text-sm font-medium text-slate-500">Foco no INSS</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">Previdenciário</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}