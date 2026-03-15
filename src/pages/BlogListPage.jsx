import { useState, useEffect } from 'react';
import { Link } from 'react-router';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => setPosts(data.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blog-list-page">
      <div className="blog-hero">
        <p className="hero-eyebrow">Chess Masters · Learn</p>
        <h1 className="blog-hero-title">Chess Knowledge</h1>
        <p className="blog-hero-desc">
          Guides, history, and strategy to help you understand the game at a deeper level.
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div className="chess-spinner" />
        </div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">♟</div>
          <p style={{ color: '#8a8698' }}>No articles yet.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-emoji">{post.cover_emoji || '♟'}</div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-date">{formatDate(post.published_at)}</span>
                  {post.tags?.slice(0, 2).map(t => (
                    <span key={t} className="blog-card-tag">#{t}</span>
                  ))}
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="blog-card-cta">Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
