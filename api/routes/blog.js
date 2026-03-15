import { Hono } from 'hono';

const blog = new Hono();

// GET /api/blog — list all published posts (no body, for listing page)
blog.get('/', async (c) => {
  const db = c.env?.chess_masters_db;
  if (!db) return c.json({ posts: [] });

  try {
    const { results } = await db
      .prepare(
        `SELECT id, title, slug, excerpt, author, published_at, tags, cover_emoji
         FROM blog_posts
         ORDER BY published_at DESC`
      )
      .all();

    const posts = results.map(p => ({
      ...p,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || []),
    }));

    return c.json({ posts });
  } catch (err) {
    console.error('Blog list error:', err);
    return c.json({ posts: [] });
  }
});

// GET /api/blog/:slug — full post including body
blog.get('/:slug', async (c) => {
  const db = c.env?.chess_masters_db;
  if (!db) return c.json({ error: 'Not found' }, 404);

  try {
    const slug = c.req.param('slug');
    const post = await db
      .prepare('SELECT * FROM blog_posts WHERE slug = ?')
      .bind(slug)
      .first();

    if (!post) return c.json({ error: 'Post not found' }, 404);

    return c.json({
      post: {
        ...post,
        tags: typeof post.tags === 'string' ? JSON.parse(post.tags) : (post.tags || []),
      },
    });
  } catch (err) {
    console.error('Blog post error:', err);
    return c.json({ error: 'Failed to fetch post' }, 500);
  }
});

export default blog;
