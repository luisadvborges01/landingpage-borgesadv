import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    "question": "Como funciona o primeiro atendimento?",
    "answer": "Você conta brevemente sua situação. A equipe informa os dados e documentos necessários para a análise individual e orienta sobre os próximos passos."
  },
  {
    "question": "Posso iniciar pelo WhatsApp?",
    "answer": "Sim. Você pode iniciar o contato pelo WhatsApp do escritório e explicar sua dúvida."
  },
  {
    "question": "Posso buscar orientação para um familiar?",
    "answer": "Sim. Conte brevemente a situação do seu familiar. A equipe orientará sobre as informações necessárias e a participação da pessoa interessada."
  },
  {
    "question": "Meu benefício foi negado. O que devo separar?",
    "answer": "Se tiver, separe a comunicação de negativa do INSS, seus documentos pessoais e o CNIS. A equipe indicará outros documentos conforme o caso."
  },
  {
    "question": "Preciso enviar documentos no primeiro contato?",
    "answer": "Você pode começar explicando sua situação. Aguarde a orientação da equipe sobre quais documentos enviar."
  },
  {
    "question": "O escritório atende aposentadoria?",
    "answer": "Sim. O escritório atua com aposentadorias e planejamento previdenciário, conforme a situação e o histórico de cada pessoa."
  },
  {
    "question": "O escritório atende BPC/LOAS?",
    "answer": "Sim. A equipe analisa questões de BPC/LOAS para idosos e pessoas com deficiência. O atendimento não significa que o benefício será concedido."
  },
  {
    "question": "O escritório atende benefícios por incapacidade?",
    "answer": "Sim. Atua com auxílio por incapacidade temporária e aposentadoria por incapacidade permanente, mediante análise individual."
  },
  {
    "question": "O atendimento é presencial?",
    "answer": "Sim, em Goiânia, preferencialmente mediante agendamento. O primeiro contato também pode ser feito pelo WhatsApp."
  },
  {
    "question": "Existe garantia de resultado?",
    "answer": "Não. Cada caso depende dos documentos, da análise individual e da decisão do INSS ou do Judiciário. Não há promessa de resultado."
  }
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
              Respostas sobre o atendimento e as áreas de atuação do escritório.
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
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
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
                        id={`faq-answer-${index}`}
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