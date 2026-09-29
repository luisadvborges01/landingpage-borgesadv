import { officeContact, professionalCards } from './professionalCards';

const siteUrl = 'https://borgesprev.com.br/';
const organizationId = `${siteUrl}#organization`;

// LegalService inherits Organization through LocalBusiness: one office, one entity.
// Public professional names and office details confirmed by the office.
export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': organizationId,
      name: officeContact.displayName,
      url: siteUrl,
      logo: new URL('/img/logo.png', siteUrl).href,
      telephone: officeContact.phoneE164,
      email: 'borgesadvprevi@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${officeContact.address.line1} - Parque Amazônia`,
        addressLocality: 'Goiânia',
        addressRegion: 'Goiás',
        addressCountry: 'BR',
        postalCode: '74835-595',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '18:00',
      },
      sameAs: [officeContact.links.instagram],
      knowsAbout: 'Direito Previdenciário',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: officeContact.displayName,
      inLanguage: 'pt-BR',
      publisher: { '@id': organizationId },
    },
    ...['rodrigo', 'ariane'].map((slug) => {
      const person = professionalCards[slug];
      return {
        '@type': 'Person',
        '@id': `${siteUrl}#${slug}`,
        name: slug === 'rodrigo' ? 'Rodrigo Borges' : 'Ariane Borges',
        jobTitle: person.role,
        image: new URL(person.image.src, siteUrl).href,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'OAB',
          value: person.oab,
        },
        worksFor: { '@id': organizationId },
      };
    }),
  ],
};
