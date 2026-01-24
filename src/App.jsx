import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "./components/Sidebar";
import GamesList from "./components/GamesList";
import PlayableBoard from "./components/PlayableBoard";
import MockDataBanner from "./components/MockDataBanner";

function App() {
	const navigate = useNavigate();
	const params = useParams();
	const [gameDetail, setGameDetail] = useState(null);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [dataSource, setDataSource] = useState(null);
	const [sortBy, setSortBy] = useState('event');

	// Get route parameters
	const { gameId } = params;
	const { categoryId } = params;
	const activeCategory = categoryId ? decodeURIComponent(categoryId) : null;

	// Load categories for sidebar
	useEffect(() => {
		const loadCategories = async () => {
			try {
				const response = await fetch("/api/games");
				if (!response.ok) {
					throw new Error(`API returned status: ${response.status}`);
				}
				const data = await response.json();

				if (!data.games?.length) {
					console.error("No games data found:", typeof data);
					return;
				}

				// Check if using mock data or database
				if (data.dataSource) {
					setDataSource(data.dataSource);
				}

				// Group by category
				const categoryMap = {};
				data.games.forEach(game => {
					const cat = game.category || 'Uncategorized';
					if (!categoryMap[cat]) {
						categoryMap[cat] = { name: cat, count: 0 };
					}
					categoryMap[cat].count++;
				});

				const categoriesArray = Object.values(categoryMap).sort((a, b) =>
					a.name.localeCompare(b.name)
				);
				setCategories(categoriesArray);
			} catch (error) {
				console.error("Error loading categories:", error);
			}
		};

		loadCategories();
	}, []);

	// Load game details when a game is selected via URL
	useEffect(() => {
		if (!gameId) return;

		const fetchGameDetail = async () => {
			setLoading(true);
			try {
				const gameResponse = await fetch(`/api/games/${gameId}`);

				if (!gameResponse.ok) {
					throw new Error(`API returned status: ${gameResponse.status}`);
				}

				const gameData = await gameResponse.json();
				setGameDetail(gameData.game);
			} catch (error) {
				console.error("Error fetching game details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchGameDetail();
	}, [gameId]);

	const handleSelectCategory = (category) => {
		if (category) {
			navigate(`/category/${encodeURIComponent(category)}`);
		} else {
			navigate("/");
		}
	};

	return (
		<div className="layout">
			<Sidebar
				categories={categories}
				activeCategory={activeCategory}
				onSelectCategory={handleSelectCategory}
			/>

			<main className="main-content">
				{gameId ? (
					loading ? (
						<div className="flex justify-center items-center py-20">
							<div className="h-10 w-10 border-2 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
						</div>
					) : gameDetail ? (
						<PlayableBoard game={gameDetail} />
					) : (
						<div className="text-center py-20 text-gray-600">
							Error loading game
						</div>
					)
				) : (
					<>
						<div className="page-header">
							<h1>{activeCategory ? activeCategory : "Chess Masters"}</h1>
							<p className="text-gray-600">
								{activeCategory
									? `Learn from ${activeCategory.toLowerCase()}`
									: "Learn chess by playing through master games"}
							</p>

							{/* Show banner only when using mock data */}
							{dataSource === "mock" && <MockDataBanner />}
						</div>

						{/* Sort controls */}
						<div className="mb-6 flex justify-end">
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="event">Sort by Event</option>
								<option value="white-asc">White (A-Z)</option>
								<option value="white-desc">White (Z-A)</option>
								<option value="black-asc">Black (A-Z)</option>
								<option value="black-desc">Black (Z-A)</option>
								<option value="date-asc">Date (Oldest)</option>
								<option value="date-desc">Date (Newest)</option>
							</select>
						</div>

						<GamesList category={activeCategory} sortBy={sortBy} />
					</>
				)}
			</main>
		</div>
	);
}

export default App;
