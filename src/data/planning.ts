import { officeContact } from './professionalCards';
import { institutionalGraph } from './serviceSchema';

export const planning = {
  title: 'Planejamento Previdenciário e análise do CNIS | Borges Advocacia',
  description: 'Saiba como o planejamento previdenciário organiza CNIS, contribuições e documentos para avaliar cenários de aposentadoria e orientar decisões.',
  canonical: 'https://borgesprev.com.br/planejamento-previdenciario/',
  whatsapp: `${officeContact.links.whatsapp}?text=${encodeURIComponent('Olá. Li a página sobre planejamento previdenciário e gostaria de entender como funciona o atendimento.')}`,
};

export const planningSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': `${planning.canonical}#webpage`, url: planning.canonical,
      name: planning.title, description: planning.description, inLanguage: 'pt-BR',
      isPartOf: { '@id': 'https://borgesprev.com.br/#website' },
      publisher: { '@id': 'https://borgesprev.com.br/#organization' },
      breadcrumb: { '@id': `${planning.canonical}#breadcrumb` },
      primaryImageOfPage: { '@type': 'ImageObject', url: 'https://borgesprev.com.br/img/fachada.jpeg' },
    },
    {
      '@type': 'BreadcrumbList', '@id': `${planning.canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://borgesprev.com.br/' },
        { '@type': 'ListItem', position: 2, name: 'Planejamento Previdenciário', item: planning.canonical },
      ],
    },
    ...institutionalGraph,
  ],
};

export const faqs = [
  ['Planejamento é útil mesmo faltando muitos anos para me aposentar?', 'Pode ser útil para identificar registros ausentes, reunir documentos antigos e compreender a forma de contribuição. A profundidade da análise depende do seu momento profissional e das decisões que você precisa tomar. Uma projeção distante exige mais cautela, pois o histórico e as regras podem mudar.'],
  ['A simulação do Meu INSS substitui a análise do histórico?', 'A simulação é uma referência inicial baseada nas informações disponíveis no sistema. Ela não garante o direito ao benefício. Vínculos ausentes, remunerações divergentes e períodos que dependem de comprovação podem alterar a análise. Inserir uma informação no simulador não equivale ao reconhecimento desse período pelo INSS.'],
  ['Contribuir sobre um valor maior sempre aumenta a aposentadoria?', 'Não há aumento garantido. O efeito depende do histórico, da regra de cálculo e dos limites legais. A base de contribuição também precisa ser adequada à categoria: quem exerce atividade remunerada não pode simplesmente escolher qualquer valor, sem considerar a remuneração e as regras aplicáveis. Complementar uma alíquota reduzida não significa, por si só, elevar a base usada no cálculo. A análise deve distinguir esses pagamentos antes de projetar seus efeitos.'],
  ['Posso pagar contribuições antigas antes de fazer o planejamento?', 'Primeiro, verifique a categoria, a época, quem era responsável pelo recolhimento e quais documentos comprovam a atividade. O contribuinte individual com pagamentos sob sua responsabilidade e o facultativo seguem condições diferentes. Também é necessário separar os efeitos para carência e tempo de contribuição. O pagamento de uma guia, isoladamente, não confirma que o período poderá ser usado para a finalidade desejada.'],
  ['Quem é MEI ou trabalha por conta própria também pode fazer planejamento?', 'Sim. O MEI pode ter suas contribuições regulares consideradas para aposentadoria por idade ou programada, conforme a regra aplicável e os demais requisitos, sem complementação apenas por ser MEI. Para usar períodos com alíquota reduzida em aposentadoria por tempo de contribuição, inclusive na transição aplicável, ou na contagem entre regimes, há exigência de complementação nas condições legais. Isso não dispensa os demais requisitos nem garante benefício maior. A finalidade e a época do período devem ser conferidas antes do pagamento.'],
  ['Um período que não aparece no CNIS está perdido?', 'Não necessariamente. É possível solicitar inclusão ou correção de vínculos e remunerações com documentos adequados à categoria e à época. A carteira física, registros do vínculo e comprovantes de remuneração podem ajudar. A carteira digital pode reproduzir informações do próprio CNIS e não resolver, sozinha, uma divergência. Alterar dados no simulador não corrige o cadastro: a atualização depende do procedimento próprio e da análise das informações.'],
  ['Planejamento garante uma data ou um valor de aposentadoria?', 'Não. Planejamento é uma análise jurídica; projeção é uma estimativa condicionada às informações e hipóteses utilizadas. Contribuições futuras não são períodos já cumpridos: seus efeitos dependem da atividade ou filiação, do recolhimento válido e da regra aplicável. O reconhecimento do direito exige verificar os requisitos e as provas no procedimento competente. Uma simulação ou um planejamento não vincula a decisão do INSS.'],
  ['Quando devo revisar um planejamento já realizado?', 'Uma revisão pode fazer sentido quando há mudança de trabalho ou de categoria de contribuição, interrupção de recolhimentos, documentos novos, correção do CNIS ou alteração relevante nas regras. Também é importante conferir as informações antes do requerimento. A necessidade e o momento da revisão dependem da situação individual.'],
  ['Preciso enviar todos os documentos no primeiro contato?', 'Não é necessário ter tudo organizado para começar a conversa. Explique brevemente sua situação e sua dúvida. A equipe informa quais documentos serão necessários e como encaminhá-los. Não envie senhas de acesso ao gov.br ou ao Meu INSS.'],
];

export const documents = [
  ['Identificação e CNIS', 'Documento de identificação e extrato de contribuições atualizado.', 'Permitem conferir dados pessoais, vínculos, remunerações e indicadores do cadastro.'],
  ['Carteiras de trabalho', 'Registros físicos ou digitais dos vínculos de emprego.', 'A carteira digital pode refletir o próprio CNIS. Uma divergência pode exigir outros documentos do vínculo.'],
  ['Guias e comprovantes', 'Carnês, GPS, DAS e comprovantes de pagamento que você possuir.', 'Permitem relacionar competência, categoria e recolhimento. A necessidade depende da sua atividade.'],
  ['Registros de remuneração', 'Contracheques e outros comprovantes pertinentes ao período.', 'Podem ajudar na análise de salários de contribuição e divergências cadastrais.'],
  ['Períodos específicos', 'PPP, documentação rural ou certidão de tempo de contribuição, quando aplicáveis.', 'Dão suporte à análise de atividades ou regimes que exigem documentação própria.'],
  ['Pedidos anteriores', 'Decisões, cartas, exigências e cópias de processos previdenciários.', 'Ajudam a entender o que já foi solicitado, reconhecido ou questionado.'],
];
