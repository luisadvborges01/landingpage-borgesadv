import { createSign } from "node:crypto";
import type { ProfessionalCard } from "../data/professionalCards";

type WalletResult = {
  jwt: string;
  saveUrl: string;
};

const requiredEnvironmentKeys = [
  "GOOGLE_WALLET_ISSUER_ID",
  "GOOGLE_WALLET_CLASS_SUFFIX",
  "GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_WALLET_PRIVATE_KEY",
  "GOOGLE_WALLET_ORIGINS",
] as const;

function encodeBase64Url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function localized(value: string) {
  return { defaultValue: { language: "pt-BR", value } };
}

function parseOrigins(rawOrigins: string) {
  const origins = rawOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (
    origins.length === 0 ||
    origins.some((origin) => {
      try {
        const url = new URL(origin);
        return url.origin !== origin || url.protocol !== "https:";
      } catch {
        return true;
      }
    })
  ) {
    throw new Error("GOOGLE_WALLET_ORIGINS deve conter origens HTTPS válidas separadas por vírgula.");
  }

  return origins;
}

export function createGoogleWalletSaveLink(card: ProfessionalCard): WalletResult | null {
  if (import.meta.env.GOOGLE_WALLET_ENABLED !== "true") return null;

  const missingKey = requiredEnvironmentKeys.find((key) => !import.meta.env[key]?.trim());
  if (missingKey) {
    console.warn(`[Google Wallet] Integração desabilitada: variável ${missingKey} ausente.`);
    return null;
  }

  const issuerId = import.meta.env.GOOGLE_WALLET_ISSUER_ID.trim();
  const classSuffix = import.meta.env.GOOGLE_WALLET_CLASS_SUFFIX.trim();
  const serviceAccountEmail = import.meta.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL.trim();
  const privateKey = import.meta.env.GOOGLE_WALLET_PRIVATE_KEY.replace(/\\n/g, "\n");
  const origins = parseOrigins(import.meta.env.GOOGLE_WALLET_ORIGINS);

  if (!/^\d+$/.test(issuerId) || !/^[A-Za-z0-9._-]+$/.test(classSuffix)) {
    throw new Error("Google Wallet Issuer ID ou Class Suffix inválido.");
  }

  const classId = `${issuerId}.${classSuffix}`;
  const objectId = `${issuerId}.${classSuffix}_${card.slug}`;
  const logoUrl = "https://borgesprev.com.br/img/logo.png";

  const claims = {
    iss: serviceAccountEmail,
    aud: "google",
    origins,
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    payload: {
      genericClasses: [
        {
          id: classId,
          issuerName: card.company,
          reviewStatus: "UNDER_REVIEW",
        },
      ],
      genericObjects: [
        {
          id: objectId,
          classId,
          state: "ACTIVE",
          cardTitle: localized(card.company),
          header: localized(card.displayName),
          subheader: localized(card.role),
          hexBackgroundColor: "#0d2f68",
          logo: {
            sourceUri: { uri: logoUrl },
            contentDescription: localized(card.company),
          },
          barcode: {
            type: "QR_CODE",
            value: card.links.page,
            alternateText: card.links.page,
          },
          textModulesData: [
            { id: "oab", header: "OAB", body: card.oab },
            {
              id: "contato",
              header: "Contato",
              body: `${card.phoneDisplay}\n${card.email}\n${card.address.line2}`,
            },
          ],
          linksModuleData: {
            uris: [
              { id: "site", uri: card.links.page, description: "Cartão Digital" },
              { id: "phone", uri: `tel:${card.phoneE164}`, description: "Telefone" },
              { id: "email", uri: `mailto:${card.email}`, description: "E-mail" },
              { id: "maps", uri: card.links.maps, description: "Localização" },
            ],
          },
        },
      ],
    },
  };

  const encodedHeader = encodeBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const encodedClaims = encodeBase64Url(JSON.stringify(claims));
  const unsignedToken = `${encodedHeader}.${encodedClaims}`;
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(privateKey);
  const jwt = `${unsignedToken}.${encodeBase64Url(signature)}`;

  return {
    jwt,
    saveUrl: `https://pay.google.com/gp/v/save/${jwt}`,
  };
}
