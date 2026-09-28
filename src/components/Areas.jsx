import { Briefcase, Heart, ShieldCheck, FileSearch, Landmark, Activity } from "lucide-react";
const areas = [
  ["aposentadorias", "Aposentadorias", "Orientação em aposentadorias e planejamento previdenciário, conforme seu histórico de contribuição.", Briefcase],
  ["bpc-loas", "BPC/LOAS", "Análise de benefícios assistenciais para idosos e pessoas com deficiência.", Heart],
  ["incapacidade", "Benefícios por incapacidade", "Auxílio por incapacidade temporária e aposentadoria por incapacidade permanente.", Activity],
  ["pensao", "Pensão por morte", "Orientação sobre pensão por morte e análise da situação dos dependentes.", ShieldCheck],
  ["revisoes", "Revisão de benefícios", "Verificação de possíveis erros na concessão ou no cálculo de benefícios.", FileSearch],
  ["beneficios-negados", "Benefícios negados ou cortados", "Análise de benefícios negados, suspensos, cessados ou que aguardam decisão do INSS.", Landmark],
];
export default function Areas() {
  return <section id="areas" className="py-24"><div className="page-section">
    <div className="text-center"><h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-6xl">Áreas de atuação</h2>
    <p className="mx-auto mt-4 max-w-2xl text-slate-600">Atuação em Direito Previdenciário, com análise individual de cada situação.</p></div>
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{areas.map(([id, title, text, Icon]) =>
      <article id={id} key={id} className="glass-card min-w-0 rounded-[30px] p-7">
        <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-[#174b9a] text-white shadow-xl shadow-blue-900/20"><Icon size={26} /></div>
        <h3 className="text-2xl font-semibold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
      </article>)}</div>
  </div></section>;
}
