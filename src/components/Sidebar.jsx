import { Link } from "react-router";

function Sidebar({ categories = [], activeCategory, onSelectCategory }) {
	return (
		<aside className="sidebar">
			<div className="sidebar-title">♟️ Chess Masters</div>

			<nav className="sidebar-nav">
				<Link
					to="/"
					className={
						activeCategory === null ? "sidebar-link-active" : "sidebar-link"
					}
				>
					All Games
				</Link>

				{categories.length > 0 && (
					<div className="sidebar-section">
						<div className="sidebar-heading">Categories</div>
						{categories.map((category) => (
							<Link
								key={category.name}
								to={`/category/${encodeURIComponent(category.name)}`}
								className={
									activeCategory === category.name
										? "sidebar-link-active"
										: "sidebar-link"
								}
							>
								{category.name}
								<span className="ml-2 text-xs text-gray-500">
									({category.count})
								</span>
							</Link>
						))}
					</div>
				)}
			</nav>

			<div className="mt-auto pt-6 px-6">
				<div className="text-xs text-gray-600">
					Learn chess by
					<br />
					playing master games
					<br />
					<br />
					Powered by
					<br />
					<a
						href="https://cloudflare.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 hover:underline"
					>
						Cloudflare
					</a>
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
