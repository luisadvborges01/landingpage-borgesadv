import { motion } from "motion/react";
import { Menu } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/556293161779?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20falar%20sobre%20um%20benefício%20do%20INSS.";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed left-0 right-0 top-5 z-50"
    >
      <div className="page-section">
        <div className="glass-card flex items-center justify-between rounded-full px-5 py-3">
          <a href="#inicio" className="text-sm font-semibold tracking-tight text-slate-950">
            Borges Advocacia
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-[#174b9a]" href="#advogados">
              Advogados
            </a>
            <a className="transition hover:text-[#174b9a]" href="#areas">
              Áreas
            </a>
            <a className="transition hover:text-[#174b9a]" href="#diferenciais">
              Diferenciais
            </a>
            <a className="transition hover:text-[#174b9a]" href="#contato">
              Contato
            </a>
          </nav>

          <a
            href={"https://wa.me/556293161779"}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-[#174b9a] px-5 py-2 text-sm font-semibold text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#0d2f68] md:inline-flex"
          >
            Falar agora
          </a>

          <a
            href={"https://wa.me/556293161779"}
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full bg-[#174b9a] text-white shadow-2xl shadow-blue-900/30 transition hover:-translate-y-0.5 md:hidden"
            aria-label="Falar com a Borges Advocacia"
          >
            <Menu size={20} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}