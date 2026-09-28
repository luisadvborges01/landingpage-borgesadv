const situations = [
  ["Quero me aposentar", "Entenda quais informações ajudam a analisar suas possibilidades de aposentadoria.", "aposentadorias"],
  ["Meu benefício foi negado ou cortado", "Busque orientação para compreender a decisão do INSS e os possíveis próximos passos.", "beneficios-negados"],
  ["Estou doente ou não consigo trabalhar", "Conheça o atendimento sobre benefícios por incapacidade e a análise dos documentos.", "incapacidade"],
  ["Preciso saber sobre BPC/LOAS", "Tire dúvidas sobre o benefício assistencial e a análise da sua situação.", "bpc-loas"],
  ["Preciso entender pensão por morte", "Busque informações sobre o benefício e os documentos para avaliar o caso.", "pensao"],
  ["Estou buscando orientação para um familiar", "Saiba como iniciar o contato e apresentar a situação de um familiar.", "como-funciona"],
];
export default function Situations() {
  return <section id="situacoes" className="py-16"><div className="page-section">
    <h2 className="text-center text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-6xl">Em qual situação você está?</h2>
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{situations.map(([title, description, target]) =>
      <a key={target} href={`#${target}`} className="glass-card min-w-0 rounded-[30px] p-7 transition hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#174b9a]">
        <h3 className="text-xl font-semibold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <span className="mt-5 inline-block text-sm font-semibold text-[#174b9a]">Saiba mais →</span>
      </a>)}</div>
  </div></section>;
}
