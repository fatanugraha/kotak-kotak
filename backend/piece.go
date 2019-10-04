package main

// Piece represents a place-able entity on a Board
// cells must have at least 1 block
type Piece struct {
	Cells [][]bool
}

type BoardPiece struct {
	Piece
	ID       int
	Placed   bool
	Color    Color
	Rotation Rotation
}

type Rotation int

const (
	Deg0 Rotation = iota
	Deg90
	Deg180
	Deg270
)

func (p *Piece) getHeight() int {
	return len(p.Cells)
}

func (p *Piece) getWidth() int {
	return len(p.Cells[0])
}

func (p *BoardPiece) rotate90() {
	height := p.getHeight()
	width := p.getWidth()

	temp := make([][]bool, width)

	for x := 0; x < width; x++ {
		temp[x] = make([]bool, height)
		for y := 0; y < width; y++ {
			temp[x][width-y-1] = p.Cells[y][x]
		}
	}

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			p.Cells[y][x] = temp[y][x]
		}
	}

	p.Rotation = (p.Rotation + 1) % 4
}
