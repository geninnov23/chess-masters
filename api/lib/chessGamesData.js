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
  }
];

export const categories = [
  { id: "legendary", name: "Legendary Games", count: 6 },
  { id: "tactics", name: "Tactical Masterpieces", count: 0 },
  { id: "endgame", name: "Endgame Studies", count: 0 },
  { id: "opening", name: "Opening Traps", count: 0 },
];
