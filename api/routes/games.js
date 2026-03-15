import { Hono } from 'hono';
import { chessGames } from '../lib/chessGamesData.js';

const games = new Hono();

// Convert a D1 row (snake_case) to the shape the frontend expects
function rowToGame(row) {
  return {
    id: row.id,
    white: row.white,
    black: row.black,
    event: row.event,
    site: row.site,
    date: row.date,
    round: row.round,
    result: row.result,
    whiteElo: row.white_elo,
    blackElo: row.black_elo,
    eco: row.eco,
    opening: row.opening,
    difficulty: row.difficulty,
    description: row.description,
    pgn: row.pgn,
    totalMoves: row.total_moves,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : (row.tags || []),
    category: row.category,
  };
}

// GET /api/games
games.get('/', async (c) => {
  const db = c.env?.chess_masters_db;
  const { category } = c.req.query();

  try {
    if (db) {
      let query = 'SELECT * FROM games';
      const params = [];
      if (category) {
        query += ' WHERE category = ?';
        params.push(category);
      }
      query += ' ORDER BY event ASC';

      const { results } = await db.prepare(query).bind(...params).all();
      return c.json({ games: results.map(rowToGame), dataSource: 'db' });
    }
  } catch (err) {
    console.error('D1 error, falling back to mock:', err);
  }

  // Mock fallback
  let filtered = category
    ? chessGames.filter(g => g.category === category)
    : [...chessGames];

  return c.json({ games: filtered, dataSource: 'mock' });
});

// GET /api/games/:id
games.get('/:id', async (c) => {
  const db = c.env?.chess_masters_db;
  const id = parseInt(c.req.param('id'));

  try {
    if (db) {
      const row = await db.prepare('SELECT * FROM games WHERE id = ?').bind(id).first();
      if (!row) return c.json({ error: 'Game not found' }, 404);
      return c.json({ game: rowToGame(row), dataSource: 'db' });
    }
  } catch (err) {
    console.error('D1 error, falling back to mock:', err);
  }

  // Mock fallback
  const game = chessGames.find(g => g.id === id);
  if (!game) return c.json({ error: 'Game not found' }, 404);
  return c.json({ game, dataSource: 'mock' });
});

export default games;
