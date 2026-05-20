import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O atendimento pode começar pelo WhatsApp?",
    answer:
      "Sim. O primeiro contato pode ser feito pelo WhatsApp para que nossa equipe entenda sua situação inicial e oriente sobre os próximos passos.",
  },
  {
    question: "Quais casos previdenciários o escritório atende?",
    answer:
      "Atendemos demandas relacionadas a aposentadorias, BPC/LOAS, pensão por morte, revisões, benefícios negados, cessados, suspensos ou parados na análise do INSS.",
  },
  {
    question: "Preciso levar documentos logo no primeiro contato?",
    answer:
      "No primeiro contato, você pode explicar brevemente o caso. Depois, a equipe informa quais documentos são importantes para análise, como documentos pessoais, cartas do INSS, laudos, CNIS e comprovantes.",
  },
  {
    question: "O atendimento é presencial?",
    answer:
      "Sim. O escritório realiza atendimento presencial em Goiânia, preferencialmente mediante agendamento. Também é possível iniciar o atendimento de forma online.",
  },
  {
    question: "Vocês garantem que o benefício será concedido?",
    answer:
      "Não. Cada caso depende de análise individual, documentos, histórico previdenciário e entendimento do INSS ou do Judiciário. O escritório atua com orientação técnica e responsável, sem promessa de resultado.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24">
      <div className="page-section">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-4 w-fit rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#174b9a] shadow-sm">
              Dúvidas frequentes
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
              Perguntas comuns antes do atendimento
            </h2>

            <p className="mt-5 max-w-xl text-slate-600">
              Algumas respostas para quem está enfrentando problema com benefício do INSS
              e ainda não sabe por onde começar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
            className="space-y-3"
          >
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className="glass-card overflow-hidden rounded-[24px]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-bold text-slate-950 md:text-lg">
                      {item.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#174b9a]/10 text-[#174b9a]"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-6 leading-7 text-slate-600">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}