import { officeContact } from "./professionalCards";

export { officeContact };
export const WHATSAPP_URL = `${officeContact.links.whatsapp}?text=${encodeURIComponent(
  "Olá. Encontrei o site da Borges Advocacia e gostaria de saber como funciona o atendimento."
)}`;
