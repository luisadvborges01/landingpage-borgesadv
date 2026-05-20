import { motion } from "motion/react";
import { MapPin, Navigation, Clock, CalendarCheck } from "lucide-react";

const MAP_LINK = "https://maps.app.goo.gl/R8wY6S6oCHSbqBUK9";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=-16.7269729,-49.2783546&z=16&output=embed";

export default function LocationMap() {
  return (
    <section id="localizacao" className="py-24">
      <div className="page-section">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-4 w-fit rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#174b9a] shadow-sm">
            Localização
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-6xl">
            Estamos em Goiânia
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Atendimento presencial em ambiente preparado para receber você com segurança e acolhimento.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
            className="glass-card rounded-[32px] p-7"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#174b9a] text-white shadow-xl shadow-blue-900/20">
              <MapPin size={26} />
            </div>

            <h3 className="mt-6 text-3xl font-semibold tracking-[-0.035em] text-slate-950">
              Borges Advocacia
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Escritório especializado em Direito Previdenciário, com atendimento
              humanizado para aposentadorias, BPC/LOAS, pensões, revisões e demais
              questões envolvendo benefícios do INSS.
            </p>

            <div className="mt-7 space-y-4">
              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#174b9a]/10 text-[#174b9a]">
                  <Navigation size={18} />
                </div>

                <div>
                  <p className="font-semibold text-slate-950">Endereço</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    BORGES ADVOCACIA PQ. AMAZÔNIA, Goiânia - GO
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#174b9a]/10 text-[#174b9a]">
                  <Clock size={18} />
                </div>

                <div>
                  <p className="font-semibold text-slate-950">Horário de atendimento</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Segunda a sexta, em horário comercial.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#174b9a]/10 text-[#174b9a]">
                  <CalendarCheck size={18} />
                </div>

                <div>
                  <p className="font-semibold text-slate-950">Agendamento</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Prontos para te receber e ouvir sua história. Agende seu atendimento pelo WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#174b9a] px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-blue-900/20 transition hover:-translate-y-1 hover:bg-[#0d2f68]"
            >
              Abrir rota no Google Maps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
            className="image-soft overflow-hidden rounded-[34px] border border-white/80 bg-white p-3"
          >
            <iframe
              title="Localização Borges Advocacia no Google Maps"
              src={MAP_EMBED_URL}
              className="h-[460px] w-full rounded-[26px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}