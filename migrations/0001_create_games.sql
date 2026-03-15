CREATE TABLE IF NOT EXISTS games (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  white       TEXT    NOT NULL,
  black       TEXT    NOT NULL,
  event       TEXT,
  site        TEXT,
  date        TEXT,
  round       TEXT,
  result      TEXT,
  white_elo   INTEGER,
  black_elo   INTEGER,
  eco         TEXT,
  opening     TEXT,
  difficulty  TEXT,
  description TEXT,
  pgn         TEXT    NOT NULL,
  total_moves INTEGER,
  tags        TEXT    DEFAULT '[]',  -- JSON array stored as text
  category    TEXT
);

CREATE INDEX IF NOT EXISTS idx_games_category ON games(category);
CREATE INDEX IF NOT EXISTS idx_games_white     ON games(white);
CREATE INDEX IF NOT EXISTS idx_games_black     ON games(black);
CREATE INDEX IF NOT EXISTS idx_games_date      ON games(date);
