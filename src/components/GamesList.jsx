import { useState, useEffect } from "react";
import GameCard from "./GameCard";

function useGames(category = null) {
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dataSource, setDataSource] = useState("");

	useEffect(() => {
		const fetchGames = async () => {
			setLoading(true);
			try {
				const url = category
					? `/api/games?category=${category}`
					: "/api/games";

				const response = await fetch(url);
				const data = await response.json();

				setGames(data.games || []);
				setDataSource(data.dataSource || "mock");
			} catch (error) {
				console.error("Error fetching games:", error);
				setGames([]);
			} finally {
				setLoading(false);
			}
		};

		fetchGames();
	}, [category]);

	return { games, loading, dataSource };
}

export default function GamesList({ category, sortBy = "event" }) {
	const { games, loading } = useGames(category);
	const [sortedGames, setSortedGames] = useState([]);

	useEffect(() => {
		if (!games.length) return;

		const sorted = [...games].sort((a, b) => {
			switch (sortBy) {
				case "white-asc":
					return a.white.localeCompare(b.white);
				case "white-desc":
					return b.white.localeCompare(a.white);
				case "black-asc":
					return a.black.localeCompare(b.black);
				case "black-desc":
					return b.black.localeCompare(a.black);
				case "date-asc":
					return a.date.localeCompare(b.date);
				case "date-desc":
					return b.date.localeCompare(a.date);
				default:
					return a.event.localeCompare(b.event);
			}
		});

		setSortedGames(sorted);
	}, [games, sortBy]);

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "16rem",
				}}
			>
				<div className="chess-spinner" />
			</div>
		);
	}

	if (!sortedGames.length) {
		return (
			<div className="empty-state">
				<div className="empty-state-icon">♟</div>
				<p style={{ color: "#504d60", fontSize: "0.95rem", margin: 0 }}>
					No games found in this collection.
				</p>
			</div>
		);
	}

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
				gap: "1.25rem",
			}}
		>
			{sortedGames.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	);
}
