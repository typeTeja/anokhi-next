
export const WORDPRESS_URL = 'https://old.anokhihomes.com/wp-json/wp/v2';

export async function getPosts(perPage = 10, page = 1) {
  const res = await fetch(`${WORDPRESS_URL}/posts?_embed&per_page=${perPage}&page=${page}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(`${WORDPRESS_URL}/posts?_embed&slug=${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  const posts = await res.json();
  return posts[0] || null;
}

export function fixWordPressLinks(html: string) {
  if (!html) return '';
  // Replace absolute WordPress links with local blog links
  // We exclude common WP folders and only replace the base domain with /blog/
  // This helps keep navigation within the current site
  return html.replace(/https?:\/\/old\.anokhihomes\.com\/(?!wp-content|wp-includes|wp-admin|wp-json)([a-zA-Z0-9_-]+)\/?/g, '/blog/$1');
}
