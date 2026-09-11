import type { APIRoute, GetStaticPaths } from "astro";
import {
  getProfessionalCard,
  professionalCardSlugs,
} from "../../data/professionalCards";

export const getStaticPaths = (() =>
  professionalCardSlugs.map((slug) => ({ params: { slug } }))) satisfies GetStaticPaths;

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export const GET: APIRoute = ({ params }) => {
  const card = getProfessionalCard(params.slug);
  if (!card) return new Response("Not found", { status: 404 });

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:Rodrigo;;;;`,
    `FN:${escapeVCard(card.displayName)}`,
    `ORG:${escapeVCard(card.company)}`,
    `TITLE:${escapeVCard("Advogado — Direito Previdenciário")}`,
    `TEL;TYPE=CELL,VOICE:${card.phoneE164}`,
    `EMAIL;TYPE=INTERNET,WORK:${card.email}`,
    `URL:${card.links.page}`,
    `ADR;TYPE=WORK:;;${escapeVCard(card.address.full)};;;;Brasil`,
    "END:VCARD",
  ].join("\r\n");

  const filename = card.displayName.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".vcf";

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="' + filename + '"',
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
