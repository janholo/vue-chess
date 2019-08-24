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
        if (kind === Kind.Bishop) {
            return this.getBishopMoves(fieldId, gameState);
        }


        return [];
    }
    getBishopMoves(fieldId: number, gameState: GameState): number[] {
        let moves = []

        let piece = gameState.fields[fieldId].piece as Piece;
        let color = piece.color;

        for (let x = -1; x < 2; x = x + 2) {
            for (let y = -1; y < 2; y = y + 2) {
                let count = 1;
                while (true) {
                    let pos = this.getPosition(fieldId, x * count, y * count);
                    if (pos == undefined) {
                        break;
                    }
                    let p = gameState.fields[pos].piece;
                    if (p == undefined) {
                        moves.push(pos as number);
                    } else if(this.canTake(pos, color, gameState)) {
                        moves.push(pos as number);
                        break;
                    } else {
                        break;
                    }
                    count++;
                }
            }
        }

        return moves;
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
        let y = color === Color.White ? -1 : 1;
        let takeLeft = this.getPosition(fieldId, -1, y);
        if (this.canTake(takeLeft, color, gameState)) {
            moves.push(takeLeft as number);
        }
        let takeRight = this.getPosition(fieldId, 1, y);
        if (this.canTake(takeRight, color, gameState)) {
            moves.push(takeRight as number);
        }

        return moves;
    }
    canTake(piece: number | undefined, turn: Color, gameState: GameState) {
        if (piece != undefined) {
            let p = gameState.fields[piece].piece
            if (p != undefined && p.color != turn) {
                return true;
            }
        }

        return false;
    }
    getPosition(fieldId: number, x: number, y: number) {
        let targetX = (fieldId % 8) + x;
        let targetY = (Math.floor(fieldId / 8)) + y;
        if (targetX < 0 || targetX >= 8 || targetY < 0 || targetY >= 8) {
            return undefined;
        }
        return targetY * 8 + targetX;
    }

    movePiece(from: number, to: number, gameState: GameState) {
        let movePiece = gameState.fields[from].piece as Piece;
        gameState.fields[from].piece = undefined;
        let color = movePiece.color;
        // add "to" piece to taken pieces
        if (gameState.fields[to].piece as Piece) {
            gameState.takenPieces.push(gameState.fields[to].piece as Piece)
        }

        // transform pawns to queens
        if (Math.floor(to / 8) == 0 && color === Color.White || Math.floor(to / 8) == 7 && color === Color.Black) {
            movePiece.kind = Kind.Queen;
        }

        gameState.fields[to].piece = movePiece;
    }
}