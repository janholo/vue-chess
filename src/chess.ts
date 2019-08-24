import { Field, Color, Kind, Piece, GameState } from './types';

export class ChessHelper {
    getInitialBoard(): Field[] {
        let board: Field[] = []
        for (let y = 7; y >= 0; y--) {
            for (let x = 0; x < 8; x++) {
                let piece: Piece | undefined = undefined;

                if (y === 7 || y === 0) {
                    if (x === 0 || x === 7) {
                        piece = { color: Color.Black, kind: Kind.Rook };
                    }
                    if (x === 1 || x === 6) {
                        piece = { color: Color.Black, kind: Kind.Knight };
                    }
                    if (x === 2 || x === 5) {
                        piece = { color: Color.Black, kind: Kind.Bishop };
                    }
                    if (x === 3) {
                        piece = { color: Color.Black, kind: Kind.Queen };
                    }
                    if (x === 4) {
                        piece = { color: Color.Black, kind: Kind.King };
                    }
                }
                if (y === 6 || y === 1) {
                    piece = { color: Color.Black, kind: Kind.Pawn };
                }

                if ((y === 1 || y === 0) && piece != undefined) {
                    piece.color = Color.White;
                }

                board.push({ background: this.getBackgroundColor(x, y), name: this.getCoord(x, y), piece: piece })
            }
        }
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
    clickField(fieldId: number, gameState: GameState) {
        // if already selected -> deselect
        if (gameState.selectedPiece === fieldId) {
            gameState.selectedPiece = -1;
            gameState.possibleMoves = [];
            return;
        }

        // if a piece of the person whos turn it is -> select
        let p = gameState.fields[fieldId].piece
        if (p != undefined && p.color === gameState.turn) {
            gameState.selectedPiece = fieldId;
            gameState.possibleMoves = this.calcPossibleMoves(fieldId, gameState);
            return;
        }

        // if this is a legal move -> do it
        if (gameState.possibleMoves.includes(fieldId)) {
            this.movePiece(gameState.selectedPiece, fieldId, gameState);

            gameState.selectedPiece = -1;
            gameState.possibleMoves = [];
            gameState.turn = gameState.turn == Color.White ? Color.Black : Color.White;
            return;
        }
    }
    calcPossibleMoves(fieldId: number, gameState: GameState): number[] {
        let piece = gameState.fields[fieldId].piece as Piece;
        let color = piece.color;
        let kind = piece.kind;

        if (kind === Kind.Pawn) {
            return this.getPawnMoves(fieldId, gameState);
        }


        return [];
    }
    getPawnMoves(fieldId: number, gameState: GameState): number[] {
        let moves = []

        let piece = gameState.fields[fieldId].piece as Piece;
        let color = piece.color;

        //normal move forward
        let forwardId = color === Color.White ? fieldId - 8 : fieldId + 8;
        if (gameState.fields[forwardId].piece == undefined) {
            moves.push(forwardId);

            //check double forward
            if ((color === Color.White && fieldId >= 8 * 6) || (color === Color.Black && fieldId < 16)) {
                let doubleForwardId = color === Color.White ? fieldId - 16 : fieldId + 16;
                if (gameState.fields[doubleForwardId].piece == undefined) {
                    moves.push(doubleForwardId);
                }
            }
        }

        //take to the right
        //let takeLeft = this.getPosition(fieldId, 1, 1);




        return moves;
    }

    movePiece(from: number, to: number, gameState: GameState) {
        let movePiece = gameState.fields[from].piece;
        gameState.fields[from].piece = undefined;

        // add "to" piece to taken pieces
        if (gameState.fields[to].piece as Piece) {
            gameState.takenPieces.push(gameState.fields[to].piece as Piece)
        }

        gameState.fields[to].piece = movePiece;
    }
}