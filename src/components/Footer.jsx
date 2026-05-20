import { motion } from "motion/react";
import { MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/556293161779?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20falar%20sobre%20um%20benefício%20do%20INSS.";

const INSTAGRAM_URL = "https://www.instagram.com/borgesadvprevidencia";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-8 pt-10">
      <div className="page-section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-[34px] p-8"
        >
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/img/logo.png"
                  alt="Borges Advocacia"
                  className="h-10 w-auto object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <div>
                  <p className="font-bold text-slate-950">Borges Advocacia</p>
                  <p className="text-sm text-slate-500">Direito Previdenciário</p>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">
                Atendimento previdenciário humanizado em Goiânia para aposentadorias,
                BPC/LOAS, pensões, revisões e problemas com benefícios do INSS.
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-950">Navegação</p>

              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <a href="#inicio" className="hover:text-[#174b9a]">
                  Início
                </a>

                <a href="#areas" className="hover:text-[#174b9a]">
                  Áreas de atuação
                </a>

                <a href="#localizacao" className="hover:text-[#174b9a]">
                  Localização
                </a>

                <a href="#faq" className="hover:text-[#174b9a]">
                  FAQ
                </a>

                <a href="#contato" className="hover:text-[#174b9a]">
                  Contato
                </a>
              </div>
            </div>

            <div>
              <p className="font-bold text-slate-950">Contato</p>

              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <a
                  href={"https://wa.me/556293161779"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#174b9a]"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>

                <a
                  href="#localizacao"
                  className="flex items-center gap-2 hover:text-[#174b9a]"
                >
                  <MapPin size={17} />
                  Goiânia - GO
                </a>

                <a
                  href={"https://www.instagram.com/borgesadvprevidencia"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#174b9a]"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200/80 pt-6">
            <p className="text-xs leading-5 text-slate-500">
              As informações deste site possuem caráter informativo e não substituem consulta
              jurídica individualizada. A atuação profissional depende da análise específica de
              cada caso, sem promessa de resultado.
            </p>

            <div className="mt-5 flex flex-col justify-between gap-3 text-xs text-slate-500 md:flex-row">
              <p>© {year} Borges Advocacia. Todos os direitos reservados.</p>
              <p>Desenvolvido para atendimento previdenciário digital.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}