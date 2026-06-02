import { motion } from "motion/react";

const reasons = [
  {
    title: "Foco Total no INSS",
    text: "Atuação direcionada para demandas previdenciárias e assistenciais.",
  },
  {
    title: "Atendimento Presencial",
    text: "Escritório em Goiânia para ouvir sua história de perto.",
  },
  {
    title: "Transparência",
    text: "Informações claras sobre o andamento e as possibilidades do caso.",
  },
];

export default function WhyChoose() {
  return (
    <section id="diferenciais" className="py-24">
      <div className="page-section">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
          >
            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
              Por que escolher a Borges Advocacia?
            </h2>

            <p className="mt-5 max-w-xl text-slate-600">
              Unimos conhecimento técnico e atendimento humano para lidar com
              situações que impactam diretamente a vida do cliente.
            </p>

            <div className="glass-card mt-8 rounded-[28px] p-5">
              <div className="divide-y divide-slate-200/80">
                {reasons.map((reason) => (
                  <div key={reason.title} className="py-4">
                    <h3 className="font-semibold text-slate-950">{reason.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{reason.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 34, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
            className="image-soft overflow-hidden rounded-[34px] bg-white p-3"
          >
            <img
              src="/img/casal1.jpeg"
              alt="Atendimento Borges Advocacia"
              className="h-[420px] w-full rounded-[26px] object-cover object-[center_30%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
