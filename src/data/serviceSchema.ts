import { homeSchema } from './homeSchema';
export const SITE = 'https://borgesprev.com.br';
export const institutionalGraph = homeSchema['@graph'].filter(entity => ['LegalService', 'WebSite'].includes(entity['@type']));
export function serviceSchema(slug: string, title: string, description: string, label: string, parent?: string) {
  const url = `${SITE}/${slug}/`;
  const trail = [{ name: 'Início', item: `${SITE}/` }, ...(parent ? [{ name: 'Aposentadoria', item: `${SITE}/aposentadoria/` }] : []), { name: label, item: url }];
  return { '@context': 'https://schema.org', '@graph': [
    ...institutionalGraph,
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'pt-BR', isPartOf: { '@id': `${SITE}/#website` }, publisher: { '@id': `${SITE}/#organization` }, breadcrumb: { '@id': `${url}#breadcrumb` }, primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/img/fachada.jpeg` } },
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: trail.map((item, i) => ({ '@type': 'ListItem', position: i + 1, ...item })) },
  ] };
}
