import { Link } from "react-router";

function Sidebar({ categories = [], activeCategory, onSelectCategory, isOpen, onClose }) {
	const totalGames = categories.reduce((sum, c) => sum + c.count, 0);

	return (
		<>
			{isOpen && (
				<div
					className="sidebar-overlay"
					onClick={onClose}
					aria-hidden="true"
				/>
			)}
			<aside className={`sidebar${isOpen ? ' sidebar-is-open' : ''}`}>
				<div className="sidebar-header">
					<div className="sidebar-logo">
						<span className="sidebar-logo-icon">♟</span>
						<span className="sidebar-title">Chess Masters</span>
					</div>
					<div className="sidebar-subtitle">Learn from the greats</div>
				</div>

				<nav className="sidebar-nav">
					<Link
						to="/"
						onClick={onClose}
						className={
							activeCategory === null ? "sidebar-link-active" : "sidebar-link"
						}
					>
						<span>All Games</span>
						{totalGames > 0 && (
							<span className="sidebar-count">{totalGames}</span>
						)}
					</Link>

					{categories.length > 0 && (
						<div className="sidebar-section">
							<div className="sidebar-heading">Collections</div>
							{categories.map((category) => (
								<Link
									key={category.name}
									to={`/category/${encodeURIComponent(category.name)}`}
									onClick={onClose}
									className={
										activeCategory === category.name
											? "sidebar-link-active"
											: "sidebar-link"
									}
								>
									<span>{category.name}</span>
									<span className="sidebar-count">{category.count}</span>
								</Link>
							))}
						</div>
					)}
				</nav>

				<div className="sidebar-section" style={{ marginTop: 'auto' }}>
					<div className="sidebar-heading">Resources</div>
					<Link to="/blog" onClick={onClose} className="sidebar-link">
						<span>📖 Learn Chess</span>
					</Link>
				</div>

			<div className="sidebar-footer">
					<p style={{ fontSize: "0.7rem", color: "#8a8698", lineHeight: 1.7, margin: 0 }}>
						Study the moves of the masters.<br />
						Understand every idea.
					</p>
					<a
						href="https://cloudflare.com"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							display: "inline-block",
							marginTop: "0.625rem",
							fontSize: "0.68rem",
							color: "#7a6528",
							textDecoration: "none",
							letterSpacing: "0.04em",
						}}
					>
						Powered by Cloudflare ↗
					</a>
				</div>
			</aside>
		</>
	);
}

export default Sidebar;
