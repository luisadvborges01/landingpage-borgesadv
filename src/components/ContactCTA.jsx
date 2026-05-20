import { motion } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/556293161779?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20falar%20sobre%20um%20benefício%20do%20INSS.";

export default function ContactCTA() {
  return (
    <section id="contato" className="py-24">
      <div className="page-section">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="glass-card rounded-[38px] px-6 py-20 text-center md:px-16"
        >
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#174b9a] text-white shadow-xl shadow-blue-900/20">
            <MessageCircle size={26} />
          </div>

          <div className="mx-auto mb-5 w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-[#174b9a]">
            Atendimento
          </div>

          <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
            Está com problema no INSS?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Envie uma mensagem para nossa equipe, conte brevemente sua situação e receba
            orientação sobre os próximos passos possíveis.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <a
              href={"https://wa.me/556293161779"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#174b9a] px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-blue-900/20 transition hover:-translate-y-1 hover:bg-[#0d2f68]"
            >
              Chamar no WhatsApp
              <ArrowUpRight size={18} />
            </a>

            <a
              href="#localizacao"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:-translate-y-1"
            >
              Ver localização
            </a>
          </div>

          <p className="mt-5 text-xs text-slate-500">
            O atendimento não representa promessa de resultado. Cada caso será analisado individualmente.
          </p>
        </motion.div>
      </div>
    </section>
  );
}