import { Field, Color, Kind, Piece } from './types';

export class ChessHelper {
    public getInitialBoard(): Field[] {
        let board: Field[] = []
        for (let y = 7; y >= 0; y--) {
            for (let x = 0; x < 8; x++) {
                let piece: Piece | undefined = undefined;

                if (y === 7 || y === 0) {
                    if(x === 0 || x === 7)
                    {
                        piece = {color: Color.Black, kind: Kind.Rook};
                    }
                    if(x === 1 || x === 6)
                    {
                        piece = {color: Color.Black, kind: Kind.Knight};
                    }
                    if(x === 2 || x === 5)
                    {
                        piece = {color: Color.Black, kind: Kind.Bishop};
                    }
                    if(x === 3)
                    {
                        piece = {color: Color.Black, kind: Kind.Queen};
                    }
                    if(x === 4)
                    {
                        piece = {color: Color.Black, kind: Kind.King};
                    }
                }
                if (y === 6 || y === 1) {
                    piece = {color: Color.Black, kind: Kind.Pawn};
                }

                if ((y === 1 || y === 0) && piece != undefined) {
                    piece.color = Color.White;
                }

                board.push({ background: this.getBackgroundColor(x, y), name: this.getCoord(x, y), piece: piece })
            }
        }
        // eslint-disable-next-line
        console.log(board)
        return board;
    }
    getCoord(x: number, y: number): string {
        let map = ["A", "B", "C", "D", "E", "F", "G", "H"];
        return map[x] + (y + 1).toString();

    }
    getBackgroundColor(x: number, y: number): Color {
        if (y % 2 != 0) {
            return x % 2 === 0 ? Color.White : Color.Black;
        }
        else {
            return x % 2 === 0 ? Color.Black : Color.White;
        }
    }
}