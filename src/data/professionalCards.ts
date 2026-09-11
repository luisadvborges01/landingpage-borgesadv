export type ProfessionalCard = {
  slug: string;
  displayName: string;
  contactHeading: string;
  saveLabel: string;
  instagramHandle: string;
  structuredName: string;
  vcardTitle: string;
  vcardNote?: string;
  oab?: string;
  role: string;
  company: string;
  phoneDisplay: string;
  phoneE164: string;
  email: string;
  bio: string;
  areas: string[];
  address: {
    full: string;
    line1: string;
    line2: string;
  };
  links: {
    page: string;
    whatsapp: string;
    maps: string;
    instagram: string;
  };
  image: {
    src: string;
    alt: string;
    position: string;
  };
  wallet: {
    appleEnabled: boolean;
  };
};

const officeAddress = {
  full: "R. Canana, Qd. 201 - Lt. 03, Sala 02 - Parque Amazônia, Goiânia - GO",
  line1: "R. Canana, Qd. 201 - Lt. 03, Sala 02",
  line2: "Parque Amazônia — Goiânia/GO",
};

export const professionalCards: Record<string, ProfessionalCard> = {
  rodrigo: {
    slug: "rodrigo",
    displayName: "Dr. Rodrigo",
    contactHeading: "Contato do Dr. Rodrigo",
    saveLabel: "Salvar Dr. Rodrigo",
    instagramHandle: "@dr.rodrigooborgess",
    structuredName: "Rodrigo",
    vcardTitle: "Advogado — Direito Previdenciário",
    oab: "OAB/GO 78.605",
    role: "Advogado | Direito Previdenciário",
    company: "Borges Advocacia",
    phoneDisplay: "+55 62 98168-4561",
    phoneE164: "+5562981684561",
    email: "rodrigo.santos30@hotmail.com",
    bio: "Advogado com atuação em Direito Previdenciário na Borges Advocacia, dedicado à análise individualizada de questões relacionadas ao INSS, planejamento previdenciário e proteção dos direitos previdenciários e assistenciais.",
    areas: [
      "Aposentadorias",
      "Planejamento Previdenciário",
      "BPC / LOAS",
      "Benefício por Incapacidade Temporária",
      "Aposentadoria por Incapacidade Permanente",
      "Pensão por Morte",
      "Auxílio-Acidente",
      "Revisões de Benefícios",
      "Salário-Maternidade",
      "Análise de CNIS",
      "Benefícios Negados",
      "Benefícios Cessados",
    ],
    address: officeAddress,
    links: {
      page: "https://borgesprev.com.br/cartao/rodrigo",
      whatsapp: "https://wa.me/5562981684561",
      maps: "https://maps.app.goo.gl/bJycvcG9wSZE4ZCt5",
      instagram: "https://www.instagram.com/dr.rodrigooborgess/",
    },
    image: {
      src: "/img/adv-rodrigo.jpeg",
      alt: "Retrato profissional do Dr. Rodrigo",
      position: "center 28%",
    },
    wallet: {
      appleEnabled: false,
    },
  },
  ariane: {
    slug: "ariane",
    displayName: "Dra. Ariane",
    contactHeading: "Contato da Dra. Ariane",
    saveLabel: "Salvar Dra. Ariane",
    instagramHandle: "@arianeborgessantos",
    structuredName: "Ariane",
    vcardTitle: "Advogada — Direito Previdenciário",
    vcardNote: "OAB/GO 51.634",
    oab: "OAB/GO 51.634",
    role: "Advogada | Direito Previdenciário",
    company: "Borges Advocacia",
    phoneDisplay: "+55 62 98178-7779",
    phoneE164: "+5562981787779",
    email: "arianeborgesadv@hotmail.com",
    bio: "Advogada com atuação em Direito Previdenciário na Borges Advocacia, dedicada à orientação jurídica individualizada e à proteção dos direitos previdenciários e assistenciais.",
    areas: [
      "Aposentadorias",
      "Planejamento Previdenciário",
      "BPC / LOAS",
      "Benefício por Incapacidade Temporária",
      "Aposentadoria por Incapacidade Permanente",
      "Pensão por Morte",
      "Auxílio-Acidente",
      "Revisões de Benefícios",
      "Salário-Maternidade",
      "Análise de CNIS",
      "Benefícios Negados",
      "Benefícios Cessados",
    ],
    address: officeAddress,
    links: {
      page: "https://borgesprev.com.br/cartao/ariane",
      whatsapp: "https://wa.me/5562981787779",
      maps: "https://maps.app.goo.gl/bJycvcG9wSZE4ZCt5",
      instagram: "https://www.instagram.com/arianeborgessantos/",
    },
    image: {
      src: "/img/adv-ariane.jpeg",
      alt: "Retrato profissional da Dra. Ariane",
      position: "center 24%",
    },
    wallet: {
      appleEnabled: false,
    },
  },
};

export const professionalCardSlugs = Object.keys(professionalCards);

export const officeContact = {
  slug: "borges-advocacia",
  displayName: "Borges Advocacia",
  company: "Borges Advocacia",
  phoneDisplay: "+55 62 3582-4711",
  phoneE164: "+556235824711",
  address: officeAddress,
  links: {
    whatsapp: "https://wa.me/556235824711",
    instagram: "https://www.instagram.com/borgesadvprevidencia/",
    vcard: "/cartao/borges-advocacia.vcf",
  },
} as const;

export function getProfessionalCard(slug: string | undefined) {
  return slug && Object.prototype.hasOwnProperty.call(professionalCards, slug)
    ? professionalCards[slug]
    : undefined;
}
