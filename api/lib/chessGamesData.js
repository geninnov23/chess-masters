// Example chess games data
// This will be replaced with D1 database later

export const chessGames = [
  {
    id: 1,
    white: "Donald Byrne",
    black: "Robert James Fischer",
    event: "Third Rosenwald Trophy",
    site: "New York, NY USA",
    date: "1956.10.17",
    round: "8",
    result: "0-1",
    whiteElo: null,
    blackElo: null,
    eco: "D92", // Grünfeld Defense
    opening: "Grünfeld Defense",
    difficulty: "advanced",
    description: "Known as 'The Game of the Century,' 13-year-old Bobby Fischer defeats Donald Byrne with a stunning queen sacrifice. This brilliant tactical masterpiece showcases Fischer's early genius and is considered one of the greatest chess games ever played.",
    pgn: `[Event "Third Rosenwald Trophy"]
[Site "New York, NY USA"]
[Date "1956.10.17"]
[Round "8"]
[White "Donald Byrne"]
[Black "Robert James Fischer"]
[Result "0-1"]
[ECO "D92"]
[Opening "Grünfeld Defense"]

1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4
7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 Na4 12. Qa3 Nxc3
13. bxc3 Nxe4 14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6
18. Bxb6 Bxc4+ 19. Kg1 Ne2+ 20. Kf1 Nxd4+ 21. Kg1 Ne2+ 22. Kf1 Nc3+
23. Kg1 axb6 24. Qb4 Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2
28. Re1 Rxe1 29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5
33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1 Ng3+ 37. Ke1 Bb4+
38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+ 41. Kc1 Rc2# 0-1`,
    totalMoves: 41,
    tags: ["tactics", "queen-sacrifice", "legendary", "prodigy"],
    category: "Legendary Games"
  },
  {
    id: 2,
    white: "Anatoly Karpov",
    black: "Garry Kasparov",
    event: "World Championship Match",
    site: "Moscow URS",
    date: "1985.10.15",
    round: "16",
    result: "0-1",
    whiteElo: 2720,
    blackElo: 2700,
    eco: "B44", // Sicilian Defense: Paulsen Variation, Gary Gambit
    opening: "Sicilian Defense: Paulsen Variation, Gary Gambit",
    difficulty: "advanced",
    description: "Known as 'The Brisbane Bombshell,' this is Game 16 from the historic 1985 World Championship Match between Karpov and Kasparov. In this brilliant tactical masterpiece, 22-year-old Kasparov unleashes a devastating attack against the reigning champion, demonstrating exceptional piece coordination and tactical vision. The game features a stunning knight sacrifice on d3 and culminates in a spectacular rook and queen attack that forced Karpov's resignation.",
    pgn: `[Event "World Championship Match"]
[Site "Moscow URS"]
[Date "1985.10.15"]
[Round "16"]
[White "Anatoly Karpov"]
[Black "Garry Kasparov"]
[Result "0-1"]
[ECO "B44"]
[Opening "Sicilian Defense: Paulsen Variation, Gary Gambit"]
[WhiteElo "2720"]
[BlackElo "2700"]

1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nb5 d6 6. c4 Nf6
7. N1c3 a6 8. Na3 d5 9. cxd5 exd5 10. exd5 Nb4 11. Be2 Bc5
12. O-O O-O 13. Bf3 Bf5 14. Bg5 Re8 15. Qd2 b5 16. Rad1 Nd3
17. Nab1 h6 18. Bh4 b4 19. Na4 Bd6 20. Bg3 Rc8 21. b3 g5
22. Bxd6 Qxd6 23. g3 Nd7 24. Bg2 Qf6 25. a3 a5 26. axb4 axb4
27. Qa2 Bg6 28. d6 g4 29. Qd2 Kg7 30. f3 Qxd6 31. fxg4 Qd4+
32. Kh1 Nf6 33. Rf4 Ne4 34. Qxd3 Nf2+ 35. Rxf2 Bxd3 36. Rfd2 Qe3
37. Rxd3 Rc1 38. Nb2 Qf2 39. Nd2 Rxd1+ 40. Nxd1 Re1+ 0-1`,
    totalMoves: 40,
    tags: ["world-championship", "kasparov", "karpov", "sicilian", "legendary"],
    category: "Legendary Games"
  },
  {
    id: 3,
    white: "Adolf Anderssen",
    black: "Lionel Kieseritzky",
    event: "London casual game",
    site: "London ENG",
    date: "1851.06.21",
    round: "?",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "C33",
    opening: "King's Gambit Accepted: Bishop's Gambit",
    difficulty: "intermediate",
    description: "Dubbed 'The Immortal Game,' Anderssen sacrifices both rooks, a bishop, and his queen to deliver a stunning checkmate with his three remaining minor pieces. Played during a break at the 1851 London tournament, it is widely regarded as the most brilliant attacking game in chess history.",
    pgn: `[Event "London casual game"]
[Site "London ENG"]
[Date "1851.06.21"]
[Round "?"]
[White "Adolf Anderssen"]
[Black "Lionel Kieseritzky"]
[Result "1-0"]
[ECO "C33"]
[Opening "King's Gambit Accepted: Bishop's Gambit"]

1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6
7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6
13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2
18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6
23. Be7# 1-0`,
    totalMoves: 23,
    tags: ["king's-gambit", "sacrifice", "legendary", "attacking", "19th-century"],
    category: "Legendary Games"
  },
  {
    id: 4,
    white: "Paul Morphy",
    black: "Duke of Brunswick & Count Isouard",
    event: "Paris Opera",
    site: "Paris FRA",
    date: "1858.11.02",
    round: "?",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "C41",
    opening: "Philidor Defense",
    difficulty: "beginner",
    description: "Known as 'The Opera Game,' Morphy played this masterpiece during a performance at the Paris Opera, reportedly annoyed at being dragged away from the music. A textbook demonstration of rapid development and piece activity, culminating in a beautiful back-rank checkmate. It remains the definitive example of classical opening principles.",
    pgn: `[Event "Paris Opera"]
[Site "Paris FRA"]
[Date "1858.11.02"]
[Round "?"]
[White "Paul Morphy"]
[Black "Duke of Brunswick & Count Isouard"]
[Result "1-0"]
[ECO "C41"]
[Opening "Philidor Defense"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6
7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7
12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7
16. Qb8+ Nxb8 17. Rd8# 1-0`,
    totalMoves: 17,
    tags: ["development", "tactics", "back-rank", "legendary", "19th-century"],
    category: "Legendary Games"
  },
  {
    id: 5,
    white: "Garry Kasparov",
    black: "Veselin Topalov",
    event: "Hoogovens",
    site: "Wijk aan Zee NED",
    date: "1999.01.20",
    round: "4",
    result: "1-0",
    whiteElo: 2812,
    blackElo: 2700,
    eco: "B06",
    opening: "Modern Defense",
    difficulty: "advanced",
    description: "Often called 'Kasparov's Immortal,' this game features one of the most spectacular king marches in chess history. Kasparov sacrifices a rook on move 24 and then chases the Black king across the board with relentless energy, delivering a final mating attack that left spectators and analysts in awe. Frequently voted the greatest game of the 20th century.",
    pgn: `[Event "Hoogovens"]
[Site "Wijk aan Zee NED"]
[Date "1999.01.20"]
[Round "4"]
[White "Garry Kasparov"]
[Black "Veselin Topalov"]
[Result "1-0"]
[ECO "B06"]
[Opening "Modern Defense"]
[WhiteElo "2812"]
[BlackElo "2700"]

1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 Bg7 5. Qd2 c6 6. f3 b5 7. Nge2 Nbd7
8. Bh6 Bxh6 9. Qxh6 Bb7 10. a3 e5 11. O-O-O Qe7 12. Kb1 a6 13. Nc1 O-O-O
14. Nb3 exd4 15. Rxd4 c5 16. Rd1 Nb6 17. g3 Kb8 18. Na5 Ba8 19. Bh3 d5
20. Qf4+ Ka7 21. Rhe1 d4 22. Nd5 Nbxd5 23. exd5 Qd6 24. Rxd4 cxd4
25. Re7+ Kb6 26. Qxd4+ Kxa5 27. b4+ Ka4 28. Qc3 Qxd5 29. Ra7 Bb7
30. Rxb7 Qc4 31. Qxf6 Kxa3 32. Qxa6+ Kxb4 33. c3+ Kxc3 34. Qa1+ Kd2
35. Qb2+ Kd1 36. Bf1 Rd2 37. Rd7 Rxd7 38. Bxc4 bxc4 39. Qxh8 Rd3
40. Qa8 c3 41. Qa4+ Ke1 42. f4 f5 43. Kc1 Rd2 44. Qa7 1-0`,
    totalMoves: 44,
    tags: ["king-hunt", "sacrifice", "legendary", "kasparov", "modern-defense"],
    category: "Legendary Games"
  },
  {
    id: 6,
    white: "Deep Blue",
    black: "Garry Kasparov",
    event: "IBM Man-Machine, Game 2",
    site: "New York, NY USA",
    date: "1997.05.04",
    round: "2",
    result: "1-0",
    whiteElo: null,
    blackElo: 2795,
    eco: "C93",
    opening: "Ruy Lopez: Closed, Smyslov Defense",
    difficulty: "advanced",
    description: "A landmark moment in chess and computing history: IBM's supercomputer Deep Blue defeats world champion Garry Kasparov in a game from their historic 1997 rematch. Deep Blue demonstrates positional understanding and long-term planning once thought exclusive to humans, playing 36. axb5! and building a winning advantage that forced Kasparov's resignation. This victory shocked the world and marked a turning point in artificial intelligence.",
    pgn: `[Event "IBM Man-Machine, Game 2"]
[Site "New York, NY USA"]
[Date "1997.05.04"]
[Round "2"]
[White "Deep Blue"]
[Black "Garry Kasparov"]
[Result "1-0"]
[ECO "C93"]
[Opening "Ruy Lopez: Closed, Smyslov Defense"]
[BlackElo "2795"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6
8. c3 O-O 9. h3 h6 10. d4 Re8 11. Nbd2 Bf8 12. Nf1 Bd7 13. Ng3 Na5
14. Bc2 c5 15. b3 Nc6 16. d5 Ne7 17. Be3 Ng6 18. Qd2 Nh7 19. a4 Nh4
20. Nxh4 Qxh4 21. Qe2 Qd8 22. b4 Qc7 23. Rec1 c4 24. Ra3 Rec8 25. Rca1 Qd8
26. f4 Nf6 27. fxe5 dxe5 28. Qf1 Ne8 29. Qf2 Nd6 30. Bb6 Qe8 31. R3a2 Be7
32. Bc5 Bf8 33. Nf5 Bxf5 34. exf5 f6 35. Bxd6 Bxd6 36. axb5 axb5
37. Be4 Rxa2 38. Qxa2 Qd7 39. Qa7 Rc7 40. Qb6 Rb7 41. Ra8+ Kf7 42. Qa6 Qc7
43. Qc6 Qb6+ 44. Kf1 Rb8 45. Ra6 1-0`,
    totalMoves: 45,
    tags: ["computer-chess", "ai", "historic", "ruy-lopez", "kasparov"],
    category: "Legendary Games"
  },
  // NEW GAMES ADDED - IDs 7-20
  {
    id: 7,
    white: "Adolf Anderssen",
    black: "Jean Dufresne",
    event: "Berlin",
    site: "Berlin GER",
    date: "1852.??.??",
    round: "?",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "C52",
    opening: "Evans Gambit",
    difficulty: "intermediate",
    description: "The Evergreen Game - Anderssen's second immortal masterpiece. Named 'evergreen' because it will always be fresh and admired. Features brilliant sacrifices, a stunning rook sacrifice, and a queen sacrifice to force checkmate. A perfect example of romantic-era attacking chess.",
    pgn: `[Event "Berlin"]
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
20. Rxe7+ Nxe7 21. Qxd7+ Kxd7 22. Bf5+ Ke8 23. Bd7+ Kf8 24. Bxe7# 1-0`,
    totalMoves: 24,
    tags: ["evans-gambit", "sacrifice", "legendary", "attacking", "19th-century"],
    category: "Legendary Games"
  },
  {
    id: 8,
    white: "Mikhail Tal",
    black: "Mikhail Botvinnik",
    event: "World Championship",
    site: "Moscow URS",
    date: "1960.05.26",
    round: "6",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "E93",
    opening: "King's Indian Defense",
    difficulty: "advanced",
    description: "The Magician from Riga at his peak. From Tal's World Championship victory, this game showcases his incredible tactical vision and sacrificial style. Tal overwhelms the defending champion with aggressive, imaginative play and brilliant piece coordination.",
    pgn: `[Event "World Championship 28th"]
[Site "Moscow URS"]
[Date "1960.05.26"]
[Round "6"]
[White "Mikhail Tal"]
[Black "Mikhail Botvinnik"]
[Result "1-0"]
[ECO "E93"]
[Opening "King's Indian Defense"]

1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. d5 Nbd7
8. Bg5 h6 9. Bh4 g5 10. Bg3 Nh5 11. h4 Nxg3 12. fxg3 gxh4 13. Nxh4 Qe7
14. Qd2 Kh7 15. O-O-O Rg8 16. Rdg1 Nf8 17. g4 Bd7 18. Nf5 Bxf5 19. gxf5 Qd7
20. Rg3 c5 21. dxc6 bxc6 22. Nd5 Qa4 23. Kb1 Rab8 24. Bh5 cxd5 25. Qxh6+ Kxh6
26. exd5+ Kh7 27. Rh3 1-0`,
    totalMoves: 27,
    tags: ["world-championship", "tal", "king's-indian", "sacrifice", "attacking"],
    category: "World Championships"
  },
  {
    id: 9,
    white: "Bobby Fischer",
    black: "Boris Spassky",
    event: "World Championship",
    site: "Reykjavik ISL",
    date: "1972.08.01",
    round: "6",
    result: "1-0",
    whiteElo: 2785,
    blackElo: 2660,
    eco: "D59",
    opening: "Queen's Gambit Declined",
    difficulty: "intermediate",
    description: "Game 6 from the 'Match of the Century.' After losing game 1 and forfeiting game 2, Fischer came back with this stunning positional masterpiece. A brilliant demonstration of perfect technique that announced his arrival as world champion.",
    pgn: `[Event "World Championship 29th"]
[Site "Reykjavik ISL"]
[Date "1972.08.01"]
[Round "6"]
[White "Bobby Fischer"]
[Black "Boris Spassky"]
[Result "1-0"]
[WhiteElo "2785"]
[BlackElo "2660"]
[ECO "D59"]
[Opening "Queen's Gambit Declined"]

1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6 7. Bh4 b6
8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5 13. Qa3 Rc8
14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7 17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6
20. e4 d4 21. f4 Qe7 22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5
26. f5 exf5 27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7
32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8 37. Qe4 Nf6
38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0`,
    totalMoves: 41,
    tags: ["world-championship", "fischer", "positional", "legendary", "technique"],
    category: "World Championships"
  },
  {
    id: 10,
    white: "Magnus Carlsen",
    black: "Sergey Karjakin",
    event: "World Championship",
    site: "New York USA",
    date: "2016.11.30",
    round: "16",
    result: "1-0",
    whiteElo: 2853,
    blackElo: 2772,
    eco: "B54",
    opening: "Sicilian Defense",
    difficulty: "advanced",
    description: "The final rapid playoff game deciding the 2016 World Championship. After 12 classical draws, Carlsen dominated the tiebreaks with this game showcasing modern endgame technique and championship-level pressure.",
    pgn: `[Event "World Championship"]
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
50. Kc6 1-0`,
    totalMoves: 50,
    tags: ["world-championship", "carlsen", "endgame", "technique", "modern"],
    category: "World Championships"
  },
  {
    id: 11,
    white: "Levon Aronian",
    black: "Viswanathan Anand",
    event: "Tata Steel",
    site: "Wijk aan Zee NED",
    date: "2013.01.26",
    round: "12",
    result: "1-0",
    whiteElo: 2802,
    blackElo: 2772,
    eco: "C65",
    opening: "Ruy Lopez",
    difficulty: "intermediate",
    description: "A modern tactical masterpiece featuring a stunning knight sacrifice and beautiful attacking play. Aronian demonstrates the power of piece activity and king safety in this brilliantly executed miniature against former world champion Anand.",
    pgn: `[Event "75th Tata Steel GpA"]
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
32. Qxb7+ 1-0`,
    totalMoves: 32,
    tags: ["tactics", "modern", "ruy-lopez", "sacrifice", "attacking"],
    category: "Modern Masterpieces"
  },
  {
    id: 12,
    white: "Jose Raul Capablanca",
    black: "Frank James Marshall",
    event: "New York",
    site: "New York USA",
    date: "1918.10.23",
    round: "23",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "D46",
    opening: "Queen's Gambit Declined",
    difficulty: "intermediate",
    description: "Capablanca's famous endgame mastery on display. Despite Marshall's desperate attempts, Capablanca demonstrates perfect technique in converting a slight advantage into a win. A textbook example of endgame play that showcases why Capablanca was known as the 'chess machine.'",
    pgn: `[Event "New York"]
[Site "New York USA"]
[Date "1918.10.23"]
[Round "23"]
[White "Jose Raul Capablanca"]
[Black "Frank James Marshall"]
[Result "1-0"]
[ECO "D46"]
[Opening "Queen's Gambit Declined"]

1. d4 d5 2. Nf3 Nf6 3. e3 e6 4. Nbd2 c5 5. c3 Nc6 6. Bd3 Bd6
7. O-O O-O 8. dxc5 Bxc5 9. e4 dxe4 10. Nxe4 Nxe4 11. Bxe4 h6
12. Qc2 e5 13. Be3 Bxe3 14. fxe3 Qe7 15. Rad1 Be6 16. Bc2 Rac8
17. Qe2 Rfd8 18. Bb3 Bxb3 19. axb3 Qe6 20. Rd3 Ne7 21. Rfd1 Rxd3
22. Rxd3 Rd8 23. Rxd8+ Qxd8 24. Qd3 Qxd3 25. cxd3 Kf8 26. Kf2 Ke8
27. Ke2 Kd7 28. Kd2 Nc6 29. b4 b6 30. Kc3 Nc6 31. d4 exd4+ 32. Nxd4 Nxd4
33. Kxd4 Kd6 34. b3 g5 35. h3 h5 36. h4 g4 37. Ke4 Ke6 38. g3 Kd6
39. Kd4 Ke6 40. e4 Kd6 41. Ke3 Ke5 42. Kf4 Kd4 43. e5 fxe5+ 44. Kxg4 e4
45. Kxh5 e3 46. g4 e2 47. g5 e1=Q 48. g6 Qe7 49. Kh6 1-0`,
    totalMoves: 49,
    tags: ["endgame", "technique", "queen's-gambit", "classical", "legendary"],
    category: "Endgame Masterpieces"
  },
  {
    id: 13,
    white: "Viswanathan Anand",
    black: "Vladimir Kramnik",
    event: "World Championship",
    site: "Bonn GER",
    date: "2008.10.29",
    round: "11",
    result: "1-0",
    whiteElo: 2783,
    blackElo: 2772,
    eco: "E04",
    opening: "Catalan Opening",
    difficulty: "advanced",
    description: "The decisive game from Anand's World Championship victory. Demonstrates Anand's rapid calculation and tactical sharpness, finishing with a brilliant combination that secured the title. A modern example of championship-level play.",
    pgn: `[Event "World Championship"]
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
37. Rxa5 Rxa5 38. Qxa5 1-0`,
    totalMoves: 38,
    tags: ["world-championship", "anand", "catalan", "modern", "technique"],
    category: "World Championships"
  },
  {
    id: 14,
    white: "Vassily Smyslov",
    black: "Mikhail Botvinnik",
    event: "World Championship",
    site: "Moscow URS",
    date: "1957.03.23",
    round: "13",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "E69",
    opening: "King's Indian Defense",
    difficulty: "advanced",
    description: "From Smyslov's World Championship victory. A perfect example of classical positional play combined with tactical precision. Smyslov's patient buildup and perfect timing showcase why he was one of the greatest positional players.",
    pgn: `[Event "World Championship 24th"]
[Site "Moscow URS"]
[Date "1957.03.23"]
[Round "13"]
[White "Vassily Smyslov"]
[Black "Mikhail Botvinnik"]
[Result "1-0"]
[ECO "E69"]
[Opening "King's Indian Defense"]

1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 O-O 5. g3 d6 6. Bg2 Nbd7
7. O-O e5 8. e4 c6 9. h3 Qb6 10. d5 cxd5 11. cxd5 Nc5 12. Ne1 Bd7
13. Nd3 Nxd3 14. Qxd3 Rfc8 15. Rb1 Nh5 16. Be3 Qb4 17. Qe2 Rc4
18. Rfc1 Rac8 19. Kh2 Nf6 20. f3 Rxc3 21. bxc3 Qxc3 22. Rxc3 Rxc3
23. Rc1 Rxc1 24. Bxc1 Kf8 25. g4 h6 26. Kg3 Ke7 27. Be3 a6
28. h4 Kd8 29. Bf1 Kc7 30. Qb2 Kb8 31. Bd3 a5 32. Qb5 Ka7 33. Bc2 1-0`,
    totalMoves: 33,
    tags: ["world-championship", "smyslov", "king's-indian", "positional", "classical"],
    category: "World Championships"
  },
  {
    id: 15,
    white: "Tigran Petrosian",
    black: "Boris Spassky",
    event: "World Championship",
    site: "Moscow URS",
    date: "1966.05.16",
    round: "19",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "B92",
    opening: "Sicilian Defense",
    difficulty: "advanced",
    description: "Petrosian, the Iron Tiger, demonstrates his legendary defensive skills turned into attack. A masterclass in prophylactic thinking and strategic play that secured his World Championship title retention.",
    pgn: `[Event "World Championship 25th"]
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
28. Qe4 Qb6 29. Rg4 f6 30. Rh4 h6 31. Qg6 Kh8 32. Be2 1-0`,
    totalMoves: 32,
    tags: ["world-championship", "petrosian", "sicilian", "defensive", "positional"],
    category: "World Championships"
  },
  {
    id: 16,
    white: "Alexander Alekhine",
    black: "Aaron Nimzowitsch",
    event: "San Remo",
    site: "San Remo ITA",
    date: "1930.01.17",
    round: "8",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "E18",
    opening: "Queen's Indian Defense",
    difficulty: "advanced",
    description: "One of Alekhine's most famous brilliancies. The game features a stunning rook sacrifice and is considered one of the greatest attacking games of all time. Alekhine's combination is so deep and beautiful that it's still studied today as a pinnacle of attacking chess.",
    pgn: `[Event "San Remo"]
[Site "San Remo ITA"]
[Date "1930.01.17"]
[Round "8"]
[White "Alexander Alekhine"]
[Black "Aaron Nimzowitsch"]
[Result "1-0"]
[ECO "E18"]
[Opening "Queen's Indian Defense"]

1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. Nc3 O-O
7. O-O d5 8. Ne5 c6 9. cxd5 cxd5 10. Bf4 a6 11. Rc1 b5 12. Qb3 Nc6
13. Nxc6 Bxc6 14. h3 Qd7 15. Kh2 Nh5 16. Bd2 Bd6 17. Qd1 Rac8
18. Nb1 Bb7 19. Bc3 Rxc3 20. Nxc3 Bxg2 21. Kxg2 Qb7+ 22. Kg1 Qh1+
23. Kf1 Qh2 24. Qe1 Ng3+ 25. Ke1 Nxe4 26. Qd1 Qxf2+ 27. Kd1 Bxg3
28. Rc2 Qf1# 0-1`,
    totalMoves: 28,
    tags: ["queen's-indian", "attacking", "brilliancy", "classical", "legendary"],
    category: "Legendary Games"
  },
  {
    id: 17,
    white: "Efim Geller",
    black: "Mikhail Tal",
    event: "Candidates Tournament",
    site: "Curaçao NED",
    date: "1962.05.26",
    round: "21",
    result: "1-0",
    whiteElo: null,
    blackElo: null,
    eco: "E97",
    opening: "King's Indian Defense",
    difficulty: "advanced",
    description: "A rare defeat for the great Tal, showing Geller's brilliant tactical vision. Despite Tal's legendary attacking skills, Geller outplays him in a tactical slugfest. A masterclass in King's Indian Defense attacking play.",
    pgn: `[Event "Candidates Tournament"]
[Site "Curaçao NED"]
[Date "1962.05.26"]
[Round "21"]
[White "Efim Geller"]
[Black "Mikhail Tal"]
[Result "1-0"]
[ECO "E97"]
[Opening "King's Indian Defense"]

1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5
7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. Nd3 f5 11. Bd2 Nf6 12. f3 f4
13. c5 g5 14. cxd6 cxd6 15. Rc1 Ng6 16. Nb5 Rf7 17. Qb3 h5
18. Rfe1 a6 19. Na3 b5 20. Nc2 g4 21. fxg4 hxg4 22. Nb4 Qe8
23. Nxa6 Bxa6 24. Bxa6 Nh7 25. Bc4 Kh8 26. a4 Qd8 27. axb5 Rb8
28. Bb6 Qd7 29. b6 Ng5 30. Rf1 Rbf8 31. Rxf4 exf4 32. Qxf7 Rxf7
33. Bxf7 Qxf7 34. Rc7 1-0`,
    totalMoves: 34,
    tags: ["king's-indian", "tactics", "candidates", "attacking", "classical"],
    category: "Tactical Masterpieces"
  },
  {
    id: 18,
    white: "Hikaru Nakamura",
    black: "Fabiano Caruana",
    event: "Sinquefield Cup",
    site: "St Louis USA",
    date: "2019.08.23",
    round: "5",
    result: "1-0",
    whiteElo: 2745,
    blackElo: 2818,
    eco: "D37",
    opening: "Queen's Gambit Declined",
    difficulty: "intermediate",
    description: "A modern classic showcasing rapid time control brilliance. Nakamura's dynamic play and tactical sharpness overwhelm even the world number 2. Demonstrates that modern blitz chess can produce games of lasting beauty.",
    pgn: `[Event "Sinquefield Cup"]
[Site "St Louis USA"]
[Date "2019.08.23"]
[Round "5"]
[White "Hikaru Nakamura"]
[Black "Fabiano Caruana"]
[Result "1-0"]
[WhiteElo "2745"]
[BlackElo "2818"]
[ECO "D37"]
[Opening "Queen's Gambit Declined"]

1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. Nc3 Be7 5. Bf4 O-O 6. e3 Nbd7
7. c5 c6 8. Bd3 b6 9. b4 a5 10. a3 Ba6 11. Bxa6 Rxa6 12. O-O Qa8
13. Qb3 bxc5 14. bxc5 Rb8 15. Qa2 Qc8 16. Rfb1 Rxb1+ 17. Rxb1 Ra8
18. Rb7 Qd8 19. Qb3 Nf8 20. Na4 Ng6 21. Bg3 Ne4 22. Nb6 Ra7
23. Qc2 Nxg3 24. hxg3 Qf6 25. Nd2 Qe7 26. Rb8+ Nf8 27. Qb3 Nd7
28. Nxd7 Qxd7 29. Nb1 Qf5 30. Na3 Qg5 31. Qb4 h6 32. Qe7 Bf6
33. Qxf7+ Kh7 34. Rb7 1-0`,
    totalMoves: 34,
    tags: ["queen's-gambit", "modern", "tactics", "rapid", "attacking"],
    category: "Modern Masterpieces"
  },
  {
    id: 19,
    white: "Judit Polgar",
    black: "Garry Kasparov",
    event: "Russia vs Rest of World",
    site: "Moscow RUS",
    date: "2002.09.08",
    round: "2",
    result: "1-0",
    whiteElo: 2681,
    blackElo: 2838,
    eco: "C67",
    opening: "Ruy Lopez",
    difficulty: "advanced",
    description: "A historic victory - Polgar becomes the first woman to defeat the reigning world champion in a competitive game. This brilliant tactical masterpiece features a stunning knight sacrifice and forced Kasparov's resignation, marking a milestone in chess history.",
    pgn: `[Event "Russia vs Rest of World"]
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
31. Kf4 Rh6 32. Kg3 Rg6 33. Kh4 Rxg4+ 34. Kh5 Rxf4 35. Kg6 Rf2 1-0`,
    totalMoves: 35,
    tags: ["ruy-lopez", "historic", "women", "tactics", "modern"],
    category: "Historic Moments"
  },
  {
    id: 20,
    white: "Ruslan Ponomariov",
    black: "Vasyl Ivanchuk",
    event: "Corus",
    site: "Wijk aan Zee NED",
    date: "2003.01.25",
    round: "12",
    result: "1-0",
    whiteElo: 2734,
    blackElo: 2717,
    eco: "B90",
    opening: "Sicilian Defense",
    difficulty: "intermediate",
    description: "A modern masterpiece of tactical fireworks. Both Ukrainian grandmasters showcase brilliant calculation and imagination. The game features amazing tactical sequences and a memorable finish that demonstrates the beauty of modern chess at its highest level.",
    pgn: `[Event "Corus"]
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
29. e7 Qf1+ 30. Bc1 Bxe7 31. Rxe7 Qxa1 32. Rxf7 Rxf7 33. Rd8+ 1-0`,
    totalMoves: 33,
    tags: ["sicilian", "tactics", "modern", "attacking", "brilliancy"],
    category: "Modern Masterpieces"
  }
];

export const categories = [
  { id: "legendary", name: "Legendary Games", count: 7 },
  { id: "world-championships", name: "World Championships", count: 6 },
  { id: "modern", name: "Modern Masterpieces", count: 4 },
  { id: "tactics", name: "Tactical Masterpieces", count: 1 },
  { id: "endgame", name: "Endgame Masterpieces", count: 1 },
  { id: "historic", name: "Historic Moments", count: 1 },
];
