export function buildMetadata({ title, description, path = '' }: { title: string; description: string; path?: string }) {
  const siteName = 'SKY Web Studio';
  const fullTitle = `${title} | ${siteName}`;
  const url = `https://skywebstudio.vn${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type: 'website'
    },
    alternates: {
      canonical: url
    }
  };
}
