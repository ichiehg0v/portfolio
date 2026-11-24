function httpsUrl(value: unknown) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

export async function loadArticles(grid: HTMLElement) {
  const document = grid.ownerDocument;
  const { locale, viewMore, errorMessage } = grid.dataset;
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@chiehg0v');
    if (!response.ok) throw new Error('Article feed request failed');
    const data = await response.json();
    if (data?.status !== 'ok' || !Array.isArray(data.items)) throw new Error('Invalid article feed');

    const articles = document.createDocumentFragment();
    for (const item of data.items.slice(0, 5)) {
      const url = httpsUrl(item?.link);
      if (!url || typeof item.title !== 'string') continue;

      const card = document.createElement('div');
      card.className = 'article-card';
      const imageUrl = httpsUrl(typeof item.content === 'string'
        ? item.content.match(/<img\b[^>]*\ssrc="([^">]+)"/i)?.[1]
        : null);
      if (imageUrl) {
        const block = document.createElement('div');
        block.className = 'img-block';
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = item.title;
        image.loading = 'lazy';
        block.append(image);
        card.append(block);
      }

      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'article-content';
      const title = document.createElement('h3');
      title.textContent = item.title;
      const meta = document.createElement('div');
      meta.className = 'article-meta';
      const date = document.createElement('span');
      date.className = 'date';
      const published = typeof item.pubDate === 'string' ? new Date(item.pubDate) : null;
      date.textContent = published && Number.isFinite(published.getTime()) ? published.toLocaleDateString(locale) : '';
      meta.append(date);
      const description = document.createElement('p');
      if (typeof item.description === 'string') {
        description.textContent = item.description.replace(/<[^>]*>/g, '').slice(0, 100) + '...';
      }
      link.append(title, meta, description);
      card.append(link);
      articles.append(card);
    }

    const more = document.createElement('div');
    more.className = 'view-more-container';
    const link = document.createElement('a');
    link.href = 'https://medium.com/@chiehg0v';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'view-more-btn';
    link.textContent = viewMore ?? '';
    more.append(link);
    articles.append(more);
    grid.replaceChildren(articles);
  } catch {
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = errorMessage ?? '';
    grid.replaceChildren(error);
  }
}
