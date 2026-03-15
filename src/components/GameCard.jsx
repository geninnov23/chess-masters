import { Link } from "react-router";

const DIFFICULTY = {
	beginner: {
		strip: "#22c55e",
		chipClass: "chip-difficulty-beginner",
		label: "Beginner",
	},
	intermediate: {
		strip: "#f59e0b",
		chipClass: "chip-difficulty-intermediate",
		label: "Intermediate",
	},
	advanced: {
		strip: "#ef4444",
		chipClass: "chip-difficulty-advanced",
		label: "Advanced",
	},
};

function getYear(dateStr) {
	return dateStr ? dateStr.split(".")[0] : "?";
}

function ResultBadge({ result }) {
	if (result === "1-0")
		return <span className="game-card-result game-card-result-white">1-0</span>;
	if (result === "0-1")
		return <span className="game-card-result game-card-result-black">0-1</span>;
	return <span className="game-card-result game-card-result-draw">½-½</span>;
}

export default function GameCard({ game }) {
	const diff = DIFFICULTY[game.difficulty] || DIFFICULTY.intermediate;

	return (
		<div className="game-card">
			{/* Difficulty colour strip */}
			<div
				className="game-card-difficulty-strip"
				style={{ backgroundColor: diff.strip }}
			/>

			<div className="game-card-body">
				{/* Players + year + result */}
				<div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.625rem" }}>
					<div className="game-card-players" style={{ flex: 1, minWidth: 0, margin: 0 }}>
						<div className="game-card-player-row">
							<span className="game-card-piece" style={{ color: "#f0e6cc" }}>♔</span>
							<span className="game-card-player-name">{game.white}</span>
						</div>
						<div className="game-card-player-row" style={{ marginBottom: 0 }}>
							<span className="game-card-piece" style={{ color: "#6b6880" }}>♚</span>
							<span className="game-card-player-name">{game.black}</span>
						</div>
					</div>
					<div className="game-card-badges">
						<span className="game-card-year">{getYear(game.date)}</span>
						<ResultBadge result={game.result} />
					</div>
				</div>

				{/* Event */}
				<p className="game-card-event" style={{ margin: "0 0 0.75rem" }}>
					{game.event}
					{game.site ? ` · ${game.site}` : ""}
				</p>

				{/* Description */}
				<p className="game-card-description">{game.description}</p>

				{/* Opening + difficulty + moves */}
				<div className="game-card-chips">
					<span className="chip-opening" title={game.opening}>
						{game.opening}
					</span>
					<span className={diff.chipClass}>{diff.label}</span>
					<span className="chip-moves">{game.totalMoves} moves</span>
				</div>

				{/* Tags */}
				{game.tags?.length > 0 && (
					<div className="game-card-tags">
						{game.tags.slice(0, 5).map((tag, i) => (
							<span key={i} className="game-card-tag">
								#{tag}
							</span>
						))}
					</div>
				)}

				{/* CTA */}
				<Link to={`/game/${game.id}`} className="game-card-cta">
					▶ Study This Game
				</Link>
			</div>
		</div>
	);
}
