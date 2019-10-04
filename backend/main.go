package main

import "fmt"

func main() {
	piece := BoardPiece{Piece: Piece{Cells: [][]bool{
		{true, false, false},
		{true, true, false},
		{false, true, true},
	}}, Color: Red}

	board := Board{}
	board.place(0, 0, &piece)

	piece.rotate90()
	piece.rotate90()
	err := board.place(0, 2, &piece)
	if err != nil {
		fmt.Println(err)
	}
	board.printBoard()
}
