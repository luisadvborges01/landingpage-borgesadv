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
    `N:Rodrigo;Dr.;;;`,
    `FN:${escapeVCard(card.displayName)}`,
    `ORG:${escapeVCard(card.company)}`,
    `TITLE:${escapeVCard("Advogado — Direito Previdenciário")}`,
    `TEL;TYPE=CELL,VOICE:${card.phoneE164}`,
    `EMAIL;TYPE=INTERNET,WORK:${card.email}`,
    `URL:${card.links.page}`,
    `ADR;TYPE=WORK:;;${escapeVCard(card.address.full)};;;;Brasil`,
    "END:VCARD",
    "",
  ].join("\r\n");

  return new Response(`\uFEFF${vcard}`, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"${card.slug}-borges-advocacia.vcf\"`,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
