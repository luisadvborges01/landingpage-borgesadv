import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    title: "Entendi o que estava acontecendo",
    text: "Fui atendido com calma e consegui entender melhor o motivo do problema com meu benefício. A orientação foi clara desde o primeiro contato.",
    name: "Pedro Mendes",
    date: "06/2024",
  },
  {
    title: "Atendimento humano em momento difícil",
    text: "Procurei o escritório porque estava insegura com a situação no INSS. Fui ouvida com paciência e recebi explicações que me ajudaram muito.",
    name: "Maria Silva",
    date: "10/2024",
  },
  {
    title: "Organização e clareza",
    text: "A equipe explicou quais documentos eram importantes e quais seriam os próximos passos. Isso trouxe mais segurança para lidar com o caso.",
    name: "João Carvalho",
    date: "02/2025",
  },
  {
    title: "Orientação responsável",
    text: "Gostei da forma transparente como tudo foi explicado. Não prometeram resultado, mas mostraram os caminhos possíveis com seriedade.",
    name: "Ana Ferreira",
    date: "04/2025",
  },
];

export default function Testimonials() {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);

  function scrollToCard(index) {
    const total = testimonials.length;
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
        const nextIndex = (current + 1) % testimonials.length;
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
    <section className="overflow-hidden py-24">
      <div className="page-section">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
        >
          <div className="mb-4 w-fit rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#174b9a] shadow-sm">
            Depoimentos
          </div>

          <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
            Relatos de quem buscou orientação
          </h2>

          <p className="mt-4 max-w-xl text-slate-600">
            Experiências sobre atendimento, clareza e acolhimento durante a análise do caso.
          </p>
        </motion.div>

        <div className="carousel-shell mt-10 px-0 pb-2 pt-1">
          <div
            ref={carouselRef}
            className="carousel-track hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-8 pt-2"
          >
            {testimonials.map((item, index) => (
              <motion.article
                key={`${item.name}-${item.title}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.015 }}
                className="glass-card flex min-h-[380px] min-w-[360px] snap-start flex-col justify-between rounded-[32px] p-8 transition md:min-w-[520px]"
              >
                <div>
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-[#174b9a]/10 text-[#174b9a]">
                    <Quote size={22} />
                  </div>

                  <p className="text-sm font-medium text-slate-500">
                    Cliente
                  </p>

                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-5 leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#174b9a] text-sm font-bold text-white shadow-xl shadow-blue-900/20">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.date}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="relative z-10 mt-1 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow-lg shadow-blue-900/10 transition hover:-translate-y-1 hover:bg-[#174b9a] hover:text-white"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all ${
                    active === index
                      ? "w-8 bg-[#174b9a]"
                      : "w-2 bg-[#174b9a]/20 hover:bg-[#174b9a]/50"
                  }`}
                  aria-label={`Ir para depoimento de ${item.name}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow-lg shadow-blue-900/10 transition hover:-translate-y-1 hover:bg-[#174b9a] hover:text-white"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">
          Os relatos acima têm finalidade informativa e não representam promessa de resultado.
          Cada caso depende de análise individual.
        </p>
      </div>
    </section>
  );
}