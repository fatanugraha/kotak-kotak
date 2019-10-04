package main

import (
	"bytes"
	"errors"
	"fmt"
)

const BoardHeight int = 20
const BoardWidth int = 20

const errorOverlapMessage = "piece can't overlap each other"
const errorOutsideBoardMessage = "can't place piece outside the board"
const errorAdjacentSameColorMessage = "can't place piece adjacent to another piece with same color"
const errorAlreadyPlaced = "piece is already placed"

// Board represents a board
type Board struct {
	Cells [BoardHeight][BoardWidth]*BoardPiece
}

func (b *Board) isInside(y int, x int) bool {
	return x >= 0 && x < BoardWidth && y >= 0 && y < BoardHeight
}

func (b *Board) isValidPlacement(y int, x int, piece *BoardPiece) (valid bool, err error) {
	pieceHeight, pieceWidth := piece.getHeight(), piece.getWidth()

	// make sure piece isn't placed yet
	if piece.Placed {
		return false, errors.New(errorAlreadyPlaced)
	}

	// make sure piece is inside the board
	if !b.isInside(y, x) || !b.isInside(y+pieceWidth-1, x+pieceHeight-1) {
		return false, errors.New(errorOutsideBoardMessage)
	}

	// check for overlap
	for bY, pY := y, 0; pY < pieceHeight; bY, pY = bY+1, pY+1 {
		for bX, pX := x, 0; pX < pieceWidth; bX, pX = bX+1, pX+1 {
			if piece.Cells[pY][pX] && b.Cells[bY][bX] != nil {
				return false, errors.New(errorOverlapMessage)
			}

			// check for adjacent tiles
			for _, dir := range [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
				dY, dX := dir[0], dir[1]
				posY, posX := bY-dY, bX-dX
				if !b.isInside(posY, posX) || !piece.Cells[pY][pX] {
					continue
				}

				if b.Cells[posY][posX] != nil && b.Cells[posY][posX].Color == piece.Color {
					return false, errors.New(errorAdjacentSameColorMessage)
				}
			}

		}
	}

	return true, nil
}

func (b *Board) place(y int, x int, piece *BoardPiece) (err error) {
	if _, err := b.isValidPlacement(y, x, piece); err != nil {
		return err
	}

	pieceHeight, pieceWidth := piece.getHeight(), piece.getWidth()

	for bY, pY := y, 0; pY < pieceHeight; bY, pY = bY+1, pY+1 {
		for bX, pX := x, 0; pX < pieceWidth; bX, pX = bX+1, pX+1 {
			if piece.Cells[pY][pX] {
				b.Cells[bY][bX] = piece
			}
		}
	}

	return nil
}

func (b *Board) printBoard() {
	buf := bytes.Buffer{}
	for i := 0; i < BoardHeight; i++ {
		for j := 0; j < BoardWidth; j++ {
			if b.Cells[i][j] != nil {
				buf.WriteString("x")
			} else {
				buf.WriteString("-")
			}
		}
		buf.WriteString("\n")
	}
	fmt.Println(buf.String())
}
