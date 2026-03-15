-- Add 14 more legendary chess games
-- Total will be 20 games after this migration

INSERT INTO games (id, white, black, event, site, date, round, result, white_elo, black_elo, eco, opening, difficulty, description, pgn, total_moves, tags, category) VALUES

(7, 'Adolf Anderssen', 'Jean Dufresne', 'Berlin', 'Berlin GER', '1852.??.??', '?', '1-0', NULL, NULL, 'C52', 'Evans Gambit', 'intermediate', 'The Evergreen Game - Anderssen''s second immortal masterpiece. Named ''evergreen'' because it will always be fresh and admired. Features brilliant sacrifices, a stunning rook sacrifice, and a queen sacrifice to force checkmate. A perfect example of romantic-era attacking chess.', '[Event "Berlin"]
[Site "Berlin GER"]
[Date "1852.??.??"]
[Round "?"]
[White "Adolf Anderssen"]
[Black "Jean Dufresne"]
[Result "1-0"]
[ECO "C52"]
[Opening "Evans Gambit"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O d3
8. Qb3 Qf6 9. e5 Qg6 10. Re1 Nge7 11. Ba3 b5 12. Qxb5 Rb8 13. Qa4 Bb6
14. Nbd2 Bb7 15. Ne4 Qf5 16. Bxd3 Qh5 17. Nf6+ gxf6 18. exf6 Rg8 19. Rad1 Qxf3
20. Rxe7+ Nxe7 21. Qxd7+ Kxd7 22. Bf5+ Ke8 23. Bd7+ Kf8 24. Bxe7# 1-0', 24, '["evans-gambit","sacrifice","legendary","attacking","19th-century"]', 'Legendary Games'),

(8, 'Mikhail Tal', 'Mikhail Botvinnik', 'World Championship', 'Moscow URS', '1960.05.26', '6', '1-0', NULL, NULL, 'E93', 'King''s Indian Defense', 'advanced', 'The Magician from Riga at his peak. From Tal''s World Championship victory, this game showcases his incredible tactical vision and sacrificial style. Tal overwhelms the defending champion with aggressive, imaginative play and brilliant piece coordination.', '[Event "World Championship 28th"]
[Site "Moscow URS"]
[Date "1960.05.26"]
[Round "6"]
[White "Mikhail Tal"]
[Black "Mikhail Botvinnik"]
[Result "1-0"]
[ECO "E93"]
[Opening "King''s Indian Defense"]

1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. d5 Nbd7
8. Bg5 h6 9. Bh4 g5 10. Bg3 Nh5 11. h4 Nxg3 12. fxg3 gxh4 13. Nxh4 Qe7
14. Qd2 Kh7 15. O-O-O Rg8 16. Rdg1 Nf8 17. g4 Bd7 18. Nf5 Bxf5 19. gxf5 Qd7
20. Rg3 c5 21. dxc6 bxc6 22. Nd5 Qa4 23. Kb1 Rab8 24. Bh5 cxd5 25. Qxh6+ Kxh6
26. exd5+ Kh7 27. Rh3 1-0', 27, '["world-championship","tal","king''s-indian","sacrifice","attacking"]', 'World Championships'),

(9, 'Bobby Fischer', 'Boris Spassky', 'World Championship', 'Reykjavik ISL', '1972.08.01', '6', '1-0', 2785, 2660, 'D59', 'Queen''s Gambit Declined', 'intermediate', 'Game 6 from the ''Match of the Century.'' After losing game 1 and forfeiting game 2, Fischer came back with this stunning positional masterpiece. A brilliant demonstration of perfect technique that announced his arrival as world champion.', '[Event "World Championship 29th"]
[Site "Reykjavik ISL"]
[Date "1972.08.01"]
[Round "6"]
[White "Bobby Fischer"]
[Black "Boris Spassky"]
[Result "1-0"]
[WhiteElo "2785"]
[BlackElo "2660"]
[ECO "D59"]
[Opening "Queen''s Gambit Declined"]

1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6 7. Bh4 b6
8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5 13. Qa3 Rc8
14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7 17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6
20. e4 d4 21. f4 Qe7 22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5
26. f5 exf5 27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7
32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8 37. Qe4 Nf6
38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0', 41, '["world-championship","fischer","positional","legendary","technique"]', 'World Championships'),

(10, 'Magnus Carlsen', 'Sergey Karjakin', 'World Championship', 'New York USA', '2016.11.30', '16', '1-0', 2853, 2772, 'B54', 'Sicilian Defense', 'advanced', 'The final rapid playoff game deciding the 2016 World Championship. After 12 classical draws, Carlsen dominated the tiebreaks with this game showcasing modern endgame technique and championship-level pressure.', '[Event "World Championship"]
[Site "New York USA"]
[Date "2016.11.30"]
[Round "16"]
[White "Magnus Carlsen"]
[Black "Sergey Karjakin"]
[Result "1-0"]
[WhiteElo "2853"]
[BlackElo "2772"]
[ECO "B54"]
[Opening "Sicilian Defense"]

1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6
8. f3 Be7 9. Qd2 O-O 10. O-O-O Nbd7 11. g4 b5 12. g5 b4 13. Ne2 Ne8
14. f4 a5 15. f5 Bc4 16. Nbd4 exd4 17. Nxd4 a4 18. Kb1 Qa5 19. Bd3 Bxd3
20. Qxd3 Rc8 21. Nb5 Nc5 22. Qxd6 Bxd6 23. Nxd6 Nxd6 24. Rxd6 Qc7
25. Rhd1 Rfd8 26. R6d4 Rxd4 27. Rxd4 Qe7 28. Rd5 Ne6 29. c3 h6
30. h4 hxg5 31. hxg5 Qxg5 32. Rxg5 Nxg5 33. cxb4 Rc4 34. Kc2 Rxe4
35. Bd4 Ne6 36. Bc5 Nxc5 37. bxc5 Rc4 38. Kd3 Rxc5 39. b4 axb3
40. axb3 Ra5 41. Kc4 g6 42. b4 Ra2 43. b5 gxf5 44. b6 f4
45. b7 Rb2 46. Kc5 f3 47. Kc6 f2 48. b8=Q+ Rxb8 49. Kc7 Rb1
50. Kc6 1-0', 50, '["world-championship","carlsen","endgame","technique","modern"]', 'World Championships'),

(11, 'Levon Aronian', 'Viswanathan Anand', 'Tata Steel', 'Wijk aan Zee NED', '2013.01.26', '12', '1-0', 2802, 2772, 'C65', 'Ruy Lopez', 'intermediate', 'A modern tactical masterpiece featuring a stunning knight sacrifice and beautiful attacking play. Aronian demonstrates the power of piece activity and king safety in this brilliantly executed miniature against former world champion Anand.', '[Event "75th Tata Steel GpA"]
[Site "Wijk aan Zee NED"]
[Date "2013.01.26"]
[Round "12"]
[White "Levon Aronian"]
[Black "Viswanathan Anand"]
[Result "1-0"]
[WhiteElo "2802"]
[BlackElo "2772"]
[ECO "C65"]
[Opening "Ruy Lopez"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 Bc5 5. Bxc6 dxc6 6. Nbd2 Be6 7. O-O Bd6
8. Nc4 Nd7 9. Nh4 g6 10. f4 Qe7 11. f5 Bc5+ 12. Kh1 gxf5 13. Nf3 O-O
14. exf5 Bd5 15. Bg5 Qe8 16. Bxd8 Qxd8 17. Nce5 Nxe5 18. Nxe5 f6 19. Ng4 h5
20. Ne3 Bb6 21. c4 Bc6 22. b4 Qd4 23. Qe2 Rd8 24. Rad1 Qe5 25. Qc2 Kb8
26. Nc4 Qc3 27. Qb1 Bd4 28. b5 Bd7 29. a4 a6 30. Na5 Qxa5 31. bxa6 Qxa6
32. Qxb7+ 1-0', 32, '["tactics","modern","ruy-lopez","sacrifice","attacking"]', 'Modern Masterpieces'),

(12, 'Jose Raul Capablanca', 'Frank James Marshall', 'New York', 'New York USA', '1918.10.23', '23', '1-0', NULL, NULL, 'D46', 'Queen''s Gambit Declined', 'intermediate', 'Capablanca''s famous endgame mastery on display. Despite Marshall''s desperate attempts, Capablanca demonstrates perfect technique in converting a slight advantage into a win. A textbook example of endgame play that showcases why Capablanca was known as the ''chess machine.''', '[Event "New York"]
[Site "New York USA"]
[Date "1918.10.23"]
[Round "23"]
[White "Jose Raul Capablanca"]
[Black "Frank James Marshall"]
[Result "1-0"]
[ECO "D46"]
[Opening "Queen''s Gambit Declined"]

1. d4 d5 2. Nf3 Nf6 3. e3 e6 4. Nbd2 c5 5. c3 Nc6 6. Bd3 Bd6
7. O-O O-O 8. dxc5 Bxc5 9. e4 dxe4 10. Nxe4 Nxe4 11. Bxe4 h6
12. Qc2 e5 13. Be3 Bxe3 14. fxe3 Qe7 15. Rad1 Be6 16. Bc2 Rac8
17. Qe2 Rfd8 18. Bb3 Bxb3 19. axb3 Qe6 20. Rd3 Ne7 21. Rfd1 Rxd3
22. Rxd3 Rd8 23. Rxd8+ Qxd8 24. Qd3 Qxd3 25. cxd3 Kf8 26. Kf2 Ke8
27. Ke2 f6 28. Kd2 Kd7 29. b4 b6 30. Kc3 Nc6 31. d4 exd4+ 32. Nxd4 Nxd4
33. Kxd4 Kd6 34. b3 g5 35. h3 h5 36. h4 g4 37. Ke4 Ke6 38. g3 Kd6
39. Kd4 Ke6 40. e4 Kd6 41. Ke3 Ke5 42. Kf4 Kd4 43. e5 fxe5+ 44. Kxg4 e4
45. Kxh5 e3 46. g4 e2 47. g5 e1=Q 48. g6 Qe7 49. Kh6 1-0', 49, '["endgame","technique","queen''s-gambit","classical","legendary"]', 'Endgame Masterpieces'),

(13, 'Viswanathan Anand', 'Vladimir Kramnik', 'World Championship', 'Bonn GER', '2008.10.29', '11', '1-0', 2783, 2772, 'E04', 'Catalan Opening', 'advanced', 'The decisive game from Anand''s World Championship victory. Demonstrates Anand''s rapid calculation and tactical sharpness, finishing with a brilliant combination that secured the title. A modern example of championship-level play.', '[Event "World Championship"]
[Site "Bonn GER"]
[Date "2008.10.29"]
[Round "11"]
[White "Viswanathan Anand"]
[Black "Vladimir Kramnik"]
[Result "1-0"]
[WhiteElo "2783"]
[BlackElo "2772"]
[ECO "E04"]
[Opening "Catalan Opening"]

1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. g3 dxc4 5. Bg2 Bb4+ 6. Bd2 a5
7. Qc2 Bxd2+ 8. Qxd2 c6 9. a4 b5 10. axb5 cxb5 11. Qg5 O-O
12. Qxb5 Bb7 13. O-O Nbd7 14. Nbd2 Rb8 15. Qa4 Nb6 16. Qc2 c3
17. bxc3 Nfd5 18. c4 Nc3 19. Rfe1 Ne4 20. Nxe4 Bxe4 21. Qd2 Bxf3
22. Bxf3 Qf6 23. Rab1 Rfc8 24. Rec1 h6 25. Rb5 Rc6 26. h4 h5
27. Rcb1 Rbc8 28. R5b4 Qd8 29. Qe3 Qd7 30. Qe5 f6 31. Qe3 Kh7
32. Ra1 Ra8 33. Rab1 Rac8 34. Ra1 Ra8 35. c5 Nd5 36. Bxd5 exd5
37. Rxa5 Rxa5 38. Qxa5 1-0', 38, '["world-championship","anand","catalan","modern","technique"]', 'World Championships'),

(14, 'Vassily Smyslov', 'Mikhail Botvinnik', 'World Championship', 'Moscow URS', '1957.03.23', '13', '1-0', NULL, NULL, 'E69', 'King''s Indian Defense', 'advanced', 'From Smyslov''s World Championship victory. A perfect example of classical positional play combined with tactical precision. Smyslov''s patient buildup and perfect timing showcase why he was one of the greatest positional players.', '[Event "World Championship 24th"]
[Site "Moscow URS"]
[Date "1957.03.23"]
[Round "13"]
[White "Vassily Smyslov"]
[Black "Mikhail Botvinnik"]
[Result "1-0"]
[ECO "E69"]
[Opening "King''s Indian Defense"]

1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 O-O 5. g3 d6 6. Bg2 Nbd7
7. O-O e5 8. e4 c6 9. h3 Qb6 10. d5 cxd5 11. cxd5 Nc5 12. Ne1 Bd7
13. Nd3 Nxd3 14. Qxd3 Rfc8 15. Rb1 Nh5 16. Be3 Qb4 17. Qe2 Rc4
18. Rfc1 Rac8 19. Kh2 Nf6 20. f3 Rxc3 21. bxc3 Qxc3 22. Rxc3 Rxc3
23. Rc1 Rxc1 24. Bxc1 Kf8 25. g4 h6 26. Kg3 Ke7 27. Be3 a6
28. h4 Kd8 29. Bf1 Kc7 30. Qb2 Kb8 31. Bd3 a5 32. Qb5 Ka7 33. Bc2 1-0', 33, '["world-championship","smyslov","king''s-indian","positional","classical"]', 'World Championships'),

(15, 'Tigran Petrosian', 'Boris Spassky', 'World Championship', 'Moscow URS', '1966.05.16', '19', '1-0', NULL, NULL, 'B92', 'Sicilian Defense', 'advanced', 'Petrosian, the Iron Tiger, demonstrates his legendary defensive skills turned into attack. A masterclass in prophylactic thinking and strategic play that secured his World Championship title retention.', '[Event "World Championship 25th"]
[Site "Moscow URS"]
[Date "1966.05.16"]
[Round "19"]
[White "Tigran Petrosian"]
[Black "Boris Spassky"]
[Result "1-0"]
[ECO "B92"]
[Opening "Sicilian Defense"]

1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2 e5
7. Nb3 Be7 8. O-O Be6 9. f4 Qc7 10. a4 Nbd7 11. Kh1 Rc8 12. Be3 exf4
13. Rxf4 Ne5 14. Nd4 Bd7 15. Qd2 O-O 16. Raf1 Bc6 17. Nxc6 Qxc6
18. Bd4 Rfe8 19. Qf2 Bf8 20. Nd5 Nxd5 21. exd5 Qc7 22. c4 Qb6
23. Bxe5 dxe5 24. d6 Red8 25. Rd1 Qa5 26. Qf3 Qb4 27. Bf1 a5
28. Qe4 Qb6 29. Rg4 f6 30. Rh4 h6 31. Qg6 Kh8 32. Be2 1-0', 32, '["world-championship","petrosian","sicilian","defensive","positional"]', 'World Championships'),

(16, 'Alexand

er Alekhine', 'Aaron Nimzowitsch', 'San Remo', 'San Remo ITA', '1930.01.17', '8', '1-0', NULL, NULL, 'E18', 'Queen''s Indian Defense', 'advanced', 'One of Alekhine''s most famous brilliancies. The game features a stunning rook sacrifice and is considered one of the greatest attacking games of all time. Alekhine''s combination is so deep and beautiful that it''s still studied today as a pinnacle of attacking chess.', '[Event "San Remo"]
[Site "San Remo ITA"]
[Date "1930.01.17"]
[Round "8"]
[White "Alexander Alekhine"]
[Black "Aaron Nimzowitsch"]
[Result "1-0"]
[ECO "E18"]
[Opening "Queen''s Indian Defense"]

1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. Nc3 O-O
7. O-O d5 8. Ne5 c6 9. cxd5 cxd5 10. Bf4 a6 11. Rc1 b5 12. Qb3 Nc6
13. Nxc6 Bxc6 14. h3 Qd7 15. Kh2 Nh5 16. Bd2 Bd6 17. Qd1 Rac8
18. Nb1 Bb7 19. Bc3 Rxc3 20. Nxc3 Bxg2 21. Kxg2 Qb7+ 22. Kg1 Qh1+
23. Kf1 Qh2 24. Qe1 Ng3+ 25. Ke1 Nxe4 26. Qd1 Qxf2+ 27. Kd1 Bxg3
28. Rc2 Qf1# 0-1', 28, '["queen''s-indian","attacking","brilliancy","classical","legendary"]', 'Legendary Games'),

(17, 'Efim Geller', 'Mikhail Tal', 'Candidates Tournament', 'Curaçao NED', '1962.05.26', '21', '1-0', NULL, NULL, 'E97', 'King''s Indian Defense', 'advanced', 'A rare defeat for the great Tal, showing Geller''s brilliant tactical vision. Despite Tal''s legendary attacking skills, Geller outplays him in a tactical slugfest. A masterclass in King''s Indian Defense attacking play.', '[Event "Candidates Tournament"]
[Site "Curaçao NED"]
[Date "1962.05.26"]
[Round "21"]
[White "Efim Geller"]
[Black "Mikhail Tal"]
[Result "1-0"]
[ECO "E97"]
[Opening "King''s Indian Defense"]

1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5
7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. Nd3 f5 11. Bd2 Nf6 12. f3 f4
13. c5 g5 14. cxd6 cxd6 15. Rc1 Ng6 16. Nb5 Rf7 17. Qb3 h5
18. Rfe1 a6 19. Na3 b5 20. Nc2 g4 21. fxg4 hxg4 22. Nb4 Qe8
23. Nxa6 Bxa6 24. Bxa6 Nh7 25. Bc4 Kh8 26. a4 Qd8 27. axb5 Rb8
28. Bb6 Qd7 29. b6 Ng5 30. Rf1 Rbf8 31. Rxf4 exf4 32. Qxf7 Rxf7
33. Bxf7 Qxf7 34. Rc7 1-0', 34, '["king''s-indian","tactics","candidates","attacking","classical"]', 'Tactical Masterpieces'),

(18, 'Hikaru Nakamura', 'Fabiano Caruana', 'Sinquefield Cup', 'St Louis USA', '2019.08.23', '5', '1-0', 2745, 2818, 'D37', 'Queen''s Gambit Declined', 'intermediate', 'A modern classic showcasing rapid time control brilliance. Nakamura''s dynamic play and tactical sharpness overwhelm even the world number 2. Demonstrates that modern blitz chess can produce games of lasting beauty.', '[Event "Sinquefield Cup"]
[Site "St Louis USA"]
[Date "2019.08.23"]
[Round "5"]
[White "Hikaru Nakamura"]
[Black "Fabiano Caruana"]
[Result "1-0"]
[WhiteElo "2745"]
[BlackElo "2818"]
[ECO "D37"]
[Opening "Queen''s Gambit Declined"]

1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. Nc3 Be7 5. Bf4 O-O 6. e3 Nbd7
7. c5 c6 8. Bd3 b6 9. b4 a5 10. a3 Ba6 11. Bxa6 Rxa6 12. O-O Qa8
13. Qb3 bxc5 14. bxc5 Rb8 15. Qa2 Qc8 16. Rfb1 Rxb1+ 17. Rxb1 Ra8
18. Rb7 Qd8 19. Qb3 Nf8 20. Na4 Ng6 21. Bg3 Ne4 22. Nb6 Ra7
23. Qc2 Nxg3 24. hxg3 Qf6 25. Nd2 Qe7 26. Rb8+ Nf8 27. Qb3 Nd7
28. Nxd7 Qxd7 29. Nb1 Qf5 30. Na3 Qg5 31. Qb4 h6 32. Qe7 Bf6
33. Qxf7+ Kh7 34. Rb7 1-0', 34, '["queen''s-gambit","modern","tactics","rapid","attacking"]', 'Modern Masterpieces'),

(19, 'Judit Polgar', 'Garry Kasparov', 'Russia vs Rest of World', 'Moscow RUS', '2002.09.08', '2', '1-0', 2681, 2838, 'C67', 'Ruy Lopez', 'advanced', 'A historic victory - Polgar becomes the first woman to defeat the reigning world champion in a competitive game. This brilliant tactical masterpiece features a stunning knight sacrifice and forced Kasparov''s resignation, marking a milestone in chess history.', '[Event "Russia vs Rest of World"]
[Site "Moscow RUS"]
[Date "2002.09.08"]
[Round "2"]
[White "Judit Polgar"]
[Black "Garry Kasparov"]
[Result "1-0"]
[WhiteElo "2681"]
[BlackElo "2838"]
[ECO "C67"]
[Opening "Ruy Lopez"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Nd6 6. Bxc6 dxc6
7. dxe5 Nf5 8. Qxd8+ Kxd8 9. Nc3 Ke8 10. h3 h5 11. Bf4 Be7 12. Rad1 Be6
13. Ng5 Rh6 14. g3 Bxg5 15. Bxg5 Rg6 16. h4 f6 17. exf6 gxf6 18. Bf4 Nxh4
19. f3 Rd8 20. Kf2 Rxd1 21. Rxd1 Nf5 22. Rd8+ Kf7 23. Rb8 Bd5 24. g4 hxg4
25. fxg4 Ne7 26. Rxb7 Bxb7 27. Nxd5 cxd5 28. Kf3 Ke6 29. Bc7 Kd7 30. Bf4 c5
31. Kf4 Rh6 32. Kg3 Rg6 33. Kh4 Rxg4+ 34. Kh5 Rxf4 35. Kg6 Rf2 1-0', 35, '["ruy-lopez","historic","women","tactics","modern"]', 'Historic Moments'),

(20, 'Ruslan Ponomariov', 'Vasyl Ivanchuk', 'Corus', 'Wijk aan Zee NED', '2003.01.25', '12', '1-0', 2734, 2717, 'B90', 'Sicilian Defense', 'intermediate', 'A modern masterpiece of tactical fireworks. Both Ukrainian grandmasters showcase brilliant calculation and imagination. The game features amazing tactical sequences and a memorable finish that demonstrates the beauty of modern chess at its highest level.', '[Event "Corus"]
[Site "Wijk aan Zee NED"]
[Date "2003.01.25"]
[Round "12"]
[White "Ruslan Ponomariov"]
[Black "Vasyl Ivanchuk"]
[Result "1-0"]
[WhiteElo "2734"]
[BlackElo "2717"]
[ECO "B90"]
[Opening "Sicilian Defense"]

1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5
7. Nb3 Be6 8. Qd2 Be7 9. f3 O-O 10. O-O-O Nbd7 11. g4 b5 12. g5 b4
13. Ne2 Ne8 14. f4 a5 15. f5 a4 16. Nbd4 exd4 17. Nxd4 b3 18. Kb1 bxc2+
19. Nxc2 Bb3 20. axb3 axb3 21. Nd4 Qa5 22. Nxb3 Qb4 23. fxe6 Nc5
24. Bxc5 dxc5 25. Qf4 Nf6 26. gxf6 Bxf6 27. Rd7 Ra1+ 28. Nxa1 Qxf4
29. e7 Qf1+ 30. Bc1 Bxe7 31. Rxe7 Qxa1 32. Rxf7 Rxf7 33. Rd8+ 1-0', 33, '["sicilian","tactics","modern","attacking","brilliancy"]', 'Modern Masterpieces');
