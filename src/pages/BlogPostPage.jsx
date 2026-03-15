import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetch(`/api/blog/${slug}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then(data => data && setPost(data.post))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
        <div className="chess-spinner" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#8a8698' }}>
        <p>Article not found.</p>
        <Link to="/blog" style={{ color: '#c9a84c' }}>← Back to articles</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <Link to="/blog" className="blog-back-link">← All articles</Link>

      <div className="blog-post-header">
        <div className="blog-post-emoji">{post.cover_emoji || '♟'}</div>
        <div className="blog-card-meta" style={{ marginBottom: '0.75rem' }}>
          <span className="blog-card-date">{formatDate(post.published_at)}</span>
          {post.tags?.map(t => (
            <span key={t} className="blog-card-tag">#{t}</span>
          ))}
        </div>
        <h1 className="blog-post-title">{post.title}</h1>
        <p className="blog-post-excerpt">{post.excerpt}</p>
      </div>

      <div className="blog-post-body">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      <div className="blog-post-footer">
        <Link to="/blog" className="blog-back-link">← All articles</Link>
        <Link to="/" className="btn-chess-secondary" style={{ display: 'inline-flex', marginLeft: '1rem' }}>
          ▶ Study Master Games
        </Link>
      </div>
    </div>
  );
}
