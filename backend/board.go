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
const errorFirstPieceNotInCorner = "first piece must be placed in corner"
const errorFirstPieceMustTouchCorner = "first piece must touch the corner"
const errorPieceMustShareCorner = "piece must share a corner with a piece with same color"

// Board represents a board
type Board struct {
	Cells               [BoardHeight + 2][BoardWidth + 2]*BoardPiece
	piecesPlacedByColor map[Color]int
}

func (b *Board) isInside(y int, x int) bool {
	return x >= 1 && x <= BoardWidth && y >= 1 && y <= BoardHeight
}

func (b *Board) newBoard() {
	b.Cells[0][0] = &BoardPiece{
		Piece: Piece{Cells: [][]bool{{true}}},
		Color: Red,
	}
	b.Cells[0][BoardWidth+1] = &BoardPiece{
		Piece: Piece{Cells: [][]bool{{true}}},
		Color: Green,
	}
	b.Cells[BoardHeight+1][BoardWidth+1] = &BoardPiece{
		Piece: Piece{Cells: [][]bool{{true}}},
		Color: Blue,
	}
	b.Cells[BoardHeight+1][0] = &BoardPiece{
		Piece: Piece{Cells: [][]bool{{true}}},
		Color: Yellow,
	}
	b.piecesPlacedByColor = make(map[Color]int)
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
	sharedCorner := false
	for bY, pY := y, 0; pY < pieceHeight; bY, pY = bY+1, pY+1 {
		for bX, pX := x, 0; pX < pieceWidth; bX, pX = bX+1, pX+1 {
			if piece.Cells[pY][pX] && b.Cells[bY][bX] != nil {
				return false, errors.New(errorOverlapMessage)
			}

			for dY := -1; dY <= 1; dY++ {
				for dX := -1; dX <= 1; dX++ {
					posY, posX := bY-dY, bX-dX
					currentCell := b.Cells[posY][posX]

					if !piece.Cells[pY][pX] {
						continue
					}

					// check for adjacent tiles
					if dX == 0 || dY == 0 {
						if currentCell != nil && currentCell.Color == piece.Color {
							return false, errors.New(errorAdjacentSameColorMessage)
						}
					} else { // check must shared a corner with same color (ristek folks rule)
						if currentCell != nil && currentCell.Color == piece.Color {
							sharedCorner = true
						}
					}
				}
			}
		}
	}

	if !sharedCorner {
		if b.piecesPlacedByColor[piece.Color] == 0 {
			return false, errors.New(errorFirstPieceMustTouchCorner)
		}

		return false, errors.New(errorPieceMustShareCorner)
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

	piece.Placed = true
	b.piecesPlacedByColor[piece.Color]++

	return nil
}

func (b *Board) printBoard() {
	buf := bytes.Buffer{}
	for i := 0; i < BoardHeight+2; i++ {
		for j := 0; j < BoardWidth+2; j++ {
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
