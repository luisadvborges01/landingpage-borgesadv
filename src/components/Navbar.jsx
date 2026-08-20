import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/556235824711?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20falar%20sobre%20um%20benefício%20do%20INSS.";

const links = [
  { label: "Advogados", href: "#advogados" },
  { label: "Áreas", href: "#areas" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Localização", href: "#localizacao" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed left-0 right-0 top-5 z-50"
      >
        <div className="page-section">
          <div className="glass-card flex items-center justify-between rounded-full px-5 py-3">
            <a href="#inicio" className="flex items-center gap-3">
              <img
                src="/img/logo.png"
                alt="Borges Advocacia"
                className="h-8 w-auto object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <span className="text-sm font-semibold tracking-tight text-slate-950">
                Borges Advocacia
              </span>
            </a>

            <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  className="transition hover:text-[#174b9a]"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={"https://wa.me/556235824711"}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-[#174b9a] px-5 py-2 text-sm font-semibold text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#0d2f68] lg:inline-flex"
            >
              Falar agora
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-[#174b9a] text-white shadow-2xl shadow-blue-900/30 transition hover:-translate-y-0.5 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] bg-slate-950/35 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-[#f8fbff] p-6 shadow-2xl shadow-slate-950/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/img/logo.png"
                    alt="Borges Advocacia"
                    className="h-9 w-auto object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      Borges Advocacia
                    </p>
                    <p className="text-xs text-slate-500">
                      Direito Previdenciário
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-950 shadow-lg shadow-blue-900/10"
                  aria-label="Fechar menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8 rounded-[28px] bg-white p-3 shadow-xl shadow-blue-900/8">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold text-slate-800 transition hover:bg-[#eef5fb] hover:text-[#174b9a]"
                  >
                    {link.label}
                    <span className="h-2 w-2 rounded-full bg-[#174b9a]/30" />
                  </a>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                <a
                  href="#localizacao"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-blue-900/8"
                >
                  <MapPin size={18} />
                  Ver localização
                </a>

                <a
                  href={"https://wa.me/556235824711"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#174b9a] px-5 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/20"
                >
                  <MessageCircle size={18} />
                  Falar no WhatsApp
                </a>

                <p className="px-2 text-center text-xs leading-5 text-slate-500">
                  Atendimento sujeito à análise individual do caso.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}