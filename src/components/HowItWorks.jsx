import { motion } from "motion/react";
import { MessageCircle, ClipboardCheck, FileSearch, Scale } from "lucide-react";

const steps = [
  {
    title: "Você chama no WhatsApp",
    text: "O primeiro contato é simples: você informa o que aconteceu com seu benefício ou dúvida previdenciária.",
    icon: MessageCircle,
  },
  {
    title: "Entendemos sua situação",
    text: "Nossa equipe organiza as informações iniciais e identifica quais documentos podem ser necessários.",
    icon: ClipboardCheck,
  },
  {
    title: "Analisamos o caso",
    text: "O caso é avaliado de forma individual, considerando documentos, histórico e situação junto ao INSS.",
    icon: FileSearch,
  },
  {
    title: "Orientamos os próximos passos",
    text: "Você recebe orientação clara sobre os caminhos possíveis, sempre sem promessa de resultado.",
    icon: Scale,
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24">
      <div className="page-section">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 w-fit rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#174b9a] shadow-sm">
            Como funciona
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-6xl">
            Um atendimento claro do primeiro contato à orientação jurídica
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            O objetivo é tirar você da dúvida e indicar os próximos passos com segurança,
            organização e transparência.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-[30px] p-7"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#174b9a] text-white shadow-xl shadow-blue-900/20">
                    <Icon size={25} />
                  </div>

                  <span className="text-4xl font-black tracking-[-0.06em] text-[#174b9a]/15">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.025em] text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}