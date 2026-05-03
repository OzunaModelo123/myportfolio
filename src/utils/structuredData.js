import { SITE_URL } from '../components/SEO.jsx';

/**
 * Article JSON-LD for research posts. Omits undefined keys via JSON round-trip.
 */
export function buildArticleJsonLd({
  headline,
  description,
  pathname,
  datePublished,
  dateModified,
  image,
}) {
  const url = `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  const img = image?.startsWith('http') ? image : image ? `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}` : `${SITE_URL}/og-image.png`;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: [img],
    author: {
      '@type': 'Person',
      name: 'Daniel Ozoani',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Daniel Ozoani',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  };

  return JSON.parse(JSON.stringify(data));
}
