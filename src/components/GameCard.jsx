import { Link } from 'react-router';

export default function GameCard({ game }) {
  return (
    <div className="card game-card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {game.white} vs {game.black}
            </h3>
            <p className="text-sm text-gray-600 mb-1">{game.event}</p>
            <p className="text-xs text-gray-500">{game.site} • {game.date}</p>
          </div>
          <div className="ml-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              game.result === '1-0'
                ? 'bg-blue-100 text-blue-800'
                : game.result === '0-1'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {game.result}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 line-clamp-3">
            {game.description}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              {game.opening}
            </span>
            <span className={`inline-block text-xs px-2 py-1 rounded ${
              game.difficulty === 'beginner'
                ? 'bg-green-100 text-green-800'
                : game.difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-orange-100 text-orange-800'
            }`}>
              {game.difficulty}
            </span>
          </div>
          <span className="text-xs text-gray-500">{game.totalMoves} moves</span>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {game.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          to={`/game/${game.id}`}
          className="btn-primary inline-block text-center w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Play This Game
        </Link>
      </div>
    </div>
  );
}
