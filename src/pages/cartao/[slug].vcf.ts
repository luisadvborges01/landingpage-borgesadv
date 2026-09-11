import type { APIRoute, GetStaticPaths } from "astro";
import {
  getProfessionalCard,
  officeContact,
  professionalCardSlugs,
} from "../../data/professionalCards";

export const getStaticPaths = (() =>
  [...professionalCardSlugs, officeContact.slug].map((slug) => ({ params: { slug } }))) satisfies GetStaticPaths;

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export const GET: APIRoute = ({ params }) => {
  const card = getProfessionalCard(params.slug);
  const isOffice = params.slug === officeContact.slug;
  const contact = isOffice
    ? {
        name: officeContact.displayName,
        structuredName: officeContact.displayName,
        company: officeContact.company,
        phone: officeContact.phoneE164,
        address: officeContact.address.full,
      }
    : card
      ? {
          name: card.displayName,
          structuredName: card.structuredName,
          company: card.company,
          phone: card.phoneE164,
          email: card.email,
          url: card.links.page,
          title: card.vcardTitle,
          note: card.vcardNote,
          address: card.address.full,
        }
      : undefined;

  if (!contact) return new Response("Not found", { status: 404 });

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:" + escapeVCard(contact.structuredName) + ";;;;",
    "FN:" + escapeVCard(contact.name),
    "ORG:" + escapeVCard(contact.company),
  ];
  if ("title" in contact) lines.push("TITLE:" + escapeVCard(contact.title));
  if ("note" in contact && contact.note) lines.push("NOTE:" + escapeVCard(contact.note));
  lines.push("TEL;TYPE=CELL,VOICE:" + contact.phone);
  if ("email" in contact) lines.push("EMAIL;TYPE=INTERNET,WORK:" + contact.email);
  if ("url" in contact) lines.push("URL:" + contact.url);
  lines.push("ADR;TYPE=WORK:;;" + escapeVCard(contact.address) + ";;;;Brasil", "END:VCARD");

  const vcard = lines.join("\r\n");
  const filename = contact.name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".vcf";

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="' + filename + '"',
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
