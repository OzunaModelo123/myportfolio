import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://danbuilds.work';

/**
 * SPA SEO tags. Must render under BrowserRouter so useLocation works.
 *
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.name]
 * @param {string} [props.type='website']
 * @param {string} [props.image] — absolute URL or path starting with /
 * @param {string} [props.robots]
 * @param {boolean} [props.noIndex]
 * @param {object|object[]} [props.jsonLd]
 */
export default function SEO({
  title,
  description,
  name = 'Daniel Ozoani',
  type = 'website',
  image,
  robots,
  noIndex,
  jsonLd,
}) {
  const location = useLocation();
  const path = location.pathname || '/';
  const canonicalUrl = `${SITE_URL}${path}`;
  let ogImage =
    `${SITE_URL}/og-image.png`;
  if (image) {
    ogImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
  }

  const robotsContent = noIndex ? 'noindex, follow' : (robots || 'index, follow');

  const jsonLdBlocks = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
