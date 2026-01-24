import { Hono } from 'hono';
import { chessGames } from '../lib/chessGamesData.js';

const games = new Hono();

// GET /api/games - List all games with optional filtering
games.get('/', async (c) => {
  try {
    const { category, sort } = c.req.query();

    let filteredGames = [...chessGames];

    // Filter by category if provided
    if (category) {
      filteredGames = filteredGames.filter(
        game => game.category === category
      );
    }

    // Sort games
    if (sort) {
      filteredGames.sort((a, b) => {
        switch (sort) {
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
    }

    return c.json({
      games: filteredGames,
      dataSource: 'mock'
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return c.json({ error: 'Failed to fetch games' }, 500);
  }
});

// GET /api/games/:id - Get specific game details
games.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const game = chessGames.find(g => g.id === id);

    if (!game) {
      return c.json({ error: 'Game not found' }, 404);
    }

    return c.json({
      game,
      dataSource: 'mock'
    });
  } catch (error) {
    console.error('Error fetching game:', error);
    return c.json({ error: 'Failed to fetch game' }, 500);
  }
});

export default games;
