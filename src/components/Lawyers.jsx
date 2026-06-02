import { motion } from "motion/react";

const lawyers = [
  {
    name: "Dr. Rodrigo",
    role: "Especialista em Direito Previdenciário",
    image: "/img/adv-rodrigo.jpeg",
    imagePosition: "object-[center_28%]",
  },
  {
    name: "Dra. Ariane",
    role: "Especialista em Direito Previdenciário",
    image: "/img/adv-ariane.jpeg",
    imagePosition: "object-[center_24%]",
  },
];

export default function Lawyers() {
  return (
    <section id="advogados" className="py-24">
      <div className="page-section text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
        >
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-6xl">
            Nossos Advogados
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Profissionais preparados para orientar cada cliente com técnica,
            responsabilidade e acolhimento.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
          {lawyers.map((lawyer, index) => (
            <motion.article
              key={lawyer.name}
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="group"
            >
              <div className="mx-auto h-72 w-72 overflow-hidden rounded-full bg-white p-2 shadow-2xl shadow-blue-900/10">
                <img
                  src={lawyer.image}
                  alt={lawyer.name}
                  className={`h-full w-full rounded-full object-cover ${lawyer.imagePosition} transition duration-700 group-hover:scale-[1.03]`}
                />
              </div>
              <h3 className="mt-7 text-2xl font-semibold text-slate-950">
                {lawyer.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{lawyer.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
