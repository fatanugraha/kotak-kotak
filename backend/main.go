package main

import "fmt"

func main() {
	piece := BoardPiece{Piece: Piece{Cells: [][]bool{
		{true, false, false},
		{true, true, false},
		{false, true, true},
	}}, Color: Red}

	piece2 := BoardPiece{Piece: Piece{Cells: [][]bool{
		{true, false, false},
		{true, true, false},
		{false, true, true},
	}}, Color: Red}

	board := Board{}
	board.newBoard()
	board.place(1, 1, &piece)

	piece2.rotate90()
	piece2.rotate90()
	err := board.place(4, 4, &piece2)
	if err != nil {
		fmt.Println(err)
	}
	board.printBoard()
}
