import { Field, Color, Kind, Piece, GameState, GameResult } from './types';
var cloneDeep = require('lodash.clonedeep');

export class ChessHelper {
    timerId: number = 0;
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
    clickField(fieldId: number, gameState: GameState): GameResult {
        // if already selected -> deselect
        if (gameState.selectedPiece === fieldId) {
            gameState.selectedPiece = -1;
            gameState.possibleMoves = [];
            return GameResult.Pending;
        }

        // if a piece of the person whos turn it is -> select
        let p = gameState.fields[fieldId].piece
        if (p != undefined && p.color === gameState.turn) {
            gameState.selectedPiece = fieldId;
            gameState.possibleMoves = this.calcPossibleMoves(fieldId, gameState);
            return GameResult.Pending;
        }

        // if this is a legal move -> do it
        if (gameState.possibleMoves.includes(fieldId)) {
            this.movePiece(gameState.selectedPiece, fieldId, gameState);
            gameState.selectedPiece = -1;
            gameState.possibleMoves = [];
            clearInterval(this.timerId);

            // check for draw or win
            let check = this.isOpponentInCheck(gameState.turn, gameState);

            let movesPossible = gameState.fields.some((f, i) => {
                if(f.piece == undefined || f.piece.color === gameState.turn) { 
                    return false;
                }
                let moves = this.calcPossibleMoves(i, gameState);
                return moves.length > 0;
            });

            if(!movesPossible) {
                gameState.turn = gameState.turn === Color.White ? Color.Black : Color.White;
                if(check) {
                    return gameState.turn === Color.White ? GameResult.BlackWin : GameResult.WhiteWin;
                } else {
                    return GameResult.Draw;
                }
            }

            if(gameState.turn === Color.White) {
                this.timerId = setInterval(() => gameState.timerBlack++, 1000);
                gameState.turn = Color.Black;

            } else {
                this.timerId = setInterval(() => gameState.timerWhite++, 1000);
                gameState.turn = Color.White;
            }
        }
        
        return GameResult.Pending;
    }
    isOpponentInCheck(color: Color, gameState: GameState) {
        let check = gameState.fields.some((f, i) => {
            if(f.piece == undefined || f.piece.color != color) { 
                return false;
            }
            let moves = this.calcPossibleMovesRaw(i, gameState);
            return moves.some(m => {
                let p = gameState.fields[m].piece;
                return p != undefined && p.color != color && p.kind === Kind.King
            });
        });
        return check;
    }
    calcPossibleMovesRaw(fieldId: number, gameState: GameState): number[] {
        let piece = gameState.fields[fieldId].piece as Piece;
        let color = piece.color;
        let kind = piece.kind;

        let moves: number[] = []

        let verticalDirs = [[1,0],[0,1],[-1,0],[0,-1]];
        let diagonalDirs = [[1,1],[1,-1],[-1,1],[-1,-1]];
        let knightMoves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];

        if (kind === Kind.Pawn) {
            moves = moves.concat(this.getPawnMoves(fieldId, gameState));
        }
        if (kind === Kind.Bishop || kind === Kind.Queen) {
            moves = moves.concat(this.getStandardMoves(fieldId, gameState, diagonalDirs, 8));
        }
        if (kind === Kind.Rook || kind === Kind.Queen) {
            moves = moves.concat(this.getStandardMoves(fieldId, gameState, verticalDirs, 8));
        }
        if (kind === Kind.King) {
            moves = moves.concat(this.getStandardMoves(fieldId, gameState, verticalDirs.concat(diagonalDirs), 1));
        }
        if (kind === Kind.Knight) {
            moves = moves.concat(this.getStandardMoves(fieldId, gameState, knightMoves, 1));
        }

        return moves;
    }    
    calcPossibleMoves(fieldId: number, gameState: GameState): number[] {
        let moves = this.calcPossibleMovesRaw(fieldId, gameState);

        let piece = gameState.fields[fieldId].piece as Piece;
        let color = piece.color;

        let validMoves = [];

        // check for each move if it result in check
        for(let m of moves)
        {
            let newGameState = gameState.copy();
            
            this.movePiece(fieldId, m, newGameState);

            if(!this.isOpponentInCheck(color === Color.White ? Color.Black : Color.White, newGameState)) {
                validMoves.push(m);
            }
        }

        return validMoves;
    }
    getStandardMoves(fieldId: number, gameState: GameState, dirs: number[][], maxSteps: number): ConcatArray<number> {
        let moves = []

        let piece = gameState.fields[fieldId].piece as Piece;
        let color = piece.color;

        for(let pos of dirs) {
            let x = pos[0];
            let y = pos[1];
            let count = 1;
            while (count <= maxSteps) {
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
        if ((Math.floor(to / 8) == 0 && color === Color.White || Math.floor(to / 8) == 7 && color === Color.Black) && movePiece.kind === Kind.Pawn) {
            movePiece.kind = Kind.Queen;
        }

        gameState.fields[to].piece = movePiece;
    }
}