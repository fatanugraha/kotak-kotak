package main

type Game struct {
	Board Board
	Turn  *GamePlayer
}

type GamePlayer struct {
	*Player
	Color    Color
	NextTurn *GamePlayer
}
