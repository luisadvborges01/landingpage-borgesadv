import { motion } from "motion/react";
import { ArrowUpRight, ShieldCheck, FileText, MessageCircle } from "lucide-react";

import { WHATSAPP_URL } from "../data/homeContact";

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
              Borges Advocacia
            </motion.div>

            <motion.h1
              variants={item}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl text-4xl font-semibold sm:text-5xl tracking-[-0.055em] text-slate-950 md:text-6xl lg:text-7xl"
            >
              Advocacia Previdenciária em Goiânia
            </motion.h1>

            <motion.p
              variants={item}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg"
            >
              Atuamos em Direito Previdenciário, com orientação em aposentadorias,
              BPC/LOAS, pensões e benefícios do INSS. Inicie o contato pelo WhatsApp
              e conte brevemente sua situação.
            </motion.p>

            <motion.div
              variants={item}
              transition={{ duration: 0.7 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#174b9a] px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-blue-900/20 transition hover:-translate-y-1 hover:bg-[#0d2f68]"
              >
                Falar pelo WhatsApp
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
                <div className="flex gap-3 py-3">
                  <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#174b9a]/10 text-[#174b9a]">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">Primeiro contato simples</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Você chama no WhatsApp e conta brevemente sua situação.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 py-3">
                  <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#174b9a]/10 text-[#174b9a]">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">Análise individual</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Cada caso é observado conforme seus documentos e histórico.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 py-3">
                  <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#174b9a]/10 text-[#174b9a]">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">Orientação responsável</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Atendimento técnico e transparente.
                    </p>
                  </div>
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
                className="hero-facade h-[340px] w-full rounded-[26px] object-cover md:h-[500px]"
              />
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card absolute -bottom-8 left-3 right-3 sm:left-6 sm:right-auto rounded-[24px] p-5"
            >
              <p className="text-sm font-medium text-slate-500">Atuação focada em</p>
              <p className="mt-1 text-xl font-bold sm:text-2xl text-slate-950">Direito Previdenciário</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}