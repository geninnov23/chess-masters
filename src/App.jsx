import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Sidebar from "./components/Sidebar";
import GamesList from "./components/GamesList";
import PlayableBoard from "./components/PlayableBoard";
import MockDataBanner from "./components/MockDataBanner";
import AuthButton from "./components/AuthButton";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";

function HeroBanner({ totalGames }) {
	return (
		<div className="hero-banner">
			<p className="hero-eyebrow">Chess Masters</p>
			<h1 className="hero-title">
				Study the Greatest Games<br />Ever Played
			</h1>
			<p className="hero-description">
				Replay landmark games move by move, understand the tactics and
				strategy of the world's finest players, and sharpen your own game.
			</p>
			<div className="hero-stats">
				<div className="hero-stat">
					<span className="hero-stat-value">{totalGames}</span>
					<span className="hero-stat-label">Master Games</span>
				</div>
				<span className="hero-divider">·</span>
				<div className="hero-stat">
					<span className="hero-stat-value">148</span>
					<span className="hero-stat-label">Years of Chess</span>
				</div>
				<span className="hero-divider">·</span>
				<div className="hero-stat">
					<span className="hero-stat-value">3</span>
					<span className="hero-stat-label">Difficulty Levels</span>
				</div>
			</div>
		</div>
	);
}

function App({ page }) {
	const navigate = useNavigate();
	const params = useParams();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [gameDetail, setGameDetail] = useState(null);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [dataSource, setDataSource] = useState(null);
	const [sortBy, setSortBy] = useState("event");

	const { gameId } = params;
	const { categoryId } = params;
	const activeCategory = categoryId ? decodeURIComponent(categoryId) : null;

	const totalGames = categories.reduce((sum, c) => sum + c.count, 0);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const response = await fetch("/api/games");
				if (!response.ok) throw new Error(`API returned status: ${response.status}`);

				const data = await response.json();
				if (!data.games?.length) return;

				if (data.dataSource) setDataSource(data.dataSource);

				const categoryMap = {};
				data.games.forEach((game) => {
					const cat = game.category || "Uncategorized";
					if (!categoryMap[cat]) categoryMap[cat] = { name: cat, count: 0 };
					categoryMap[cat].count++;
				});

				setCategories(
					Object.values(categoryMap).sort((a, b) => a.name.localeCompare(b.name))
				);
			} catch (error) {
				console.error("Error loading categories:", error);
			}
		};

		loadCategories();
	}, []);

	useEffect(() => {
		if (!gameId) return;

		const fetchGameDetail = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/games/${gameId}`);
				if (!res.ok) throw new Error(`API returned status: ${res.status}`);
				const data = await res.json();
				setGameDetail(data.game);
			} catch (error) {
				console.error("Error fetching game details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchGameDetail();
	}, [gameId]);

	const handleSelectCategory = (category) => {
		setSidebarOpen(false);
		if (category) {
			navigate(`/category/${encodeURIComponent(category)}`);
		} else {
			navigate("/");
		}
	};

	return (
		<>
			{/* Top bar — always visible on all screen sizes */}
			<header className="top-bar">
				<button
					className="top-bar-toggle"
					onClick={() => setSidebarOpen(o => !o)}
					aria-label="Toggle navigation"
				>
					{sidebarOpen ? '✕' : '☰'}
				</button>
				<Link to="/" className="top-bar-logo" onClick={() => setSidebarOpen(false)}>
					<span className="top-bar-logo-icon">♟</span>
					<span className="top-bar-logo-name">Chess Masters</span>
				</Link>
				<div className="top-bar-right">
					<Link to="/blog" className="top-bar-link" onClick={() => setSidebarOpen(false)}>Learn</Link>
					<AuthButton />
				</div>
			</header>

			<div className={`layout ${sidebarOpen ? 'layout-sidebar-open' : ''}`}>
				<Sidebar
					categories={categories}
					activeCategory={activeCategory}
					onSelectCategory={handleSelectCategory}
					isOpen={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>

				<main className="main-content">
					{page === 'blog' ? (
						<BlogListPage />
					) : page === 'blog-post' ? (
						<BlogPostPage />
					) : gameId ? (
						loading ? (
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "20rem",
								}}
							>
								<div className="chess-spinner" />
							</div>
						) : gameDetail ? (
							<PlayableBoard game={gameDetail} />
						) : (
							<div
								style={{
									textAlign: "center",
									padding: "5rem 2rem",
									color: "#8a8698",
								}}
							>
								Game not found.
							</div>
						)
					) : (
						<>
							{/* Hero — only on "All Games" root view */}
							{!activeCategory && <HeroBanner totalGames={totalGames} />}

							{/* Category page header */}
							{activeCategory && (
								<div className="page-header">
									<h1>{activeCategory}</h1>
									<p style={{ color: "#8a8698", margin: 0 }}>
										Learn from {activeCategory.toLowerCase()}
									</p>
								</div>
							)}

							{dataSource === "mock" && <MockDataBanner />}

							{/* Sort bar */}
							<div className="sort-bar">
								<span className="sort-label">Sort by</span>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="sort-select"
								>
									<option value="event">Event name</option>
									<option value="white-asc">White player (A–Z)</option>
									<option value="white-desc">White player (Z–A)</option>
									<option value="black-asc">Black player (A–Z)</option>
									<option value="black-desc">Black player (Z–A)</option>
									<option value="date-asc">Date (oldest first)</option>
									<option value="date-desc">Date (newest first)</option>
								</select>
							</div>

							<GamesList category={activeCategory} sortBy={sortBy} />
						</>
					)}
				</main>
			</div>
		</>
	);
}

export default App;
