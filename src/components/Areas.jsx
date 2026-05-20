import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  Heart,
  ShieldCheck,
  FileSearch,
  Landmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const areas = [
  {
    title: "Aposentadorias",
    text: "Orientação em aposentadoria por idade, tempo de contribuição, invalidez e casos especiais.",
    icon: Briefcase,
  },
  {
    title: "BPC / LOAS",
    text: "Atuação em benefícios assistenciais para idosos e pessoas com deficiência.",
    icon: Heart,
  },
  {
    title: "Pensões",
    text: "Análise de pensão por morte e proteção previdenciária da família.",
    icon: ShieldCheck,
  },
  {
    title: "Revisões",
    text: "Verificação de benefícios que podem ter sido concedidos com erro.",
    icon: FileSearch,
  },
  {
    title: "Problemas com INSS",
    text: "Benefícios negados, cortados, cessados ou parados na análise.",
    icon: Landmark,
  },
];

export default function Areas() {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);

  function scrollToCard(index) {
    const total = areas.length;
    const safeIndex = (index + total) % total;
    const card = cardRefs.current[safeIndex];

    if (carouselRef.current && card) {
      carouselRef.current.scrollTo({
        left: card.offsetLeft - carouselRef.current.offsetLeft,
        behavior: "smooth",
      });
    }

    setActive(safeIndex);
  }

  function next() {
    scrollToCard(active + 1);
  }

  function prev() {
    scrollToCard(active - 1);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => {
        const nextIndex = (current + 1) % areas.length;
        const card = cardRefs.current[nextIndex];

        if (carouselRef.current && card) {
          carouselRef.current.scrollTo({
            left: card.offsetLeft - carouselRef.current.offsetLeft,
            behavior: "smooth",
          });
        }

        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="areas" className="overflow-hidden py-24">
      <div className="page-section">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="text-center"
        >
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-6xl">
            Nossas Áreas de Atuação
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Atuação focada em Direito Previdenciário, com análise cuidadosa de cada situação.
          </p>
        </motion.div>

        <div className="relative mt-12">
          <div
            ref={carouselRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-8"
          >
            {areas.map((area, index) => {
              const Icon = area.icon;

              return (
                <motion.article
                  key={area.title}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  whileHover={{
                    y: -14,
                    scale: 1.025,
                  }}
                  className="glass-card group min-w-[310px] snap-start rounded-[30px] p-7 transition md:min-w-[350px]"
                >
                  <div className="mb-20 flex justify-center">
                    <motion.div
                      whileHover={{
                        rotate: [0, -6, 6, 0],
                      }}
                      transition={{ duration: 0.45 }}
                      className="relative grid h-24 w-24 place-items-center rounded-full bg-[#174b9a] text-white shadow-2xl shadow-blue-900/25 transition group-hover:bg-[#0d2f68]"
                    >
                      <div className="absolute -top-24 h-24 w-px bg-[#174b9a]/30" />
                      <div className="absolute -bottom-24 h-24 w-px bg-[#174b9a]/30" />
                      <Icon size={34} strokeWidth={1.8} />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-semibold text-slate-950">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {area.text}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow-lg shadow-blue-900/10 transition hover:-translate-y-1 hover:bg-[#174b9a] hover:text-white"
              aria-label="Área anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {areas.map((area, index) => (
                <button
                  key={area.title}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all ${
                    active === index
                      ? "w-8 bg-[#174b9a]"
                      : "w-2 bg-[#174b9a]/20 hover:bg-[#174b9a]/50"
                  }`}
                  aria-label={`Ir para ${area.title}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow-lg shadow-blue-900/10 transition hover:-translate-y-1 hover:bg-[#174b9a] hover:text-white"
              aria-label="Próxima área"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}