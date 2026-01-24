import { useState, useEffect } from 'react';
import GameCard from './GameCard';

function useGames(category = null) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const url = category
          ? `/api/games?category=${category}`
          : '/api/games';

        const response = await fetch(url);
        const data = await response.json();

        setGames(data.games || []);
        setDataSource(data.dataSource || 'mock');
      } catch (error) {
        console.error('Error fetching games:', error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [category]);

  return { games, loading, dataSource };
}

export default function GamesList({ category, sortBy = 'event' }) {
  const { games, loading } = useGames(category);
  const [sortedGames, setSortedGames] = useState([]);

  useEffect(() => {
    if (!games.length) return;

    const sorted = [...games].sort((a, b) => {
      switch (sortBy) {
        case 'white-asc':
          return a.white.localeCompare(b.white);
        case 'white-desc':
          return b.white.localeCompare(a.white);
        case 'black-asc':
          return a.black.localeCompare(b.black);
        case 'black-desc':
          return b.black.localeCompare(a.black);
        case 'date-asc':
          return a.date.localeCompare(b.date);
        case 'date-desc':
          return b.date.localeCompare(a.date);
        default:
          return a.event.localeCompare(b.event);
      }
    });

    setSortedGames(sorted);
  }, [games, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!sortedGames.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No games found.</p>
      </div>
    );
  }

  return (
    <div className="games-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
