CREATE TABLE IF NOT EXISTS blog_posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  title        TEXT    NOT NULL,
  slug         TEXT    NOT NULL UNIQUE,
  excerpt      TEXT,
  body         TEXT    NOT NULL,
  author       TEXT    DEFAULT 'Chess Masters',
  published_at TEXT,
  tags         TEXT    DEFAULT '[]',
  cover_emoji  TEXT    DEFAULT '♟'
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at);
