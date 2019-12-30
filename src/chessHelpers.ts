import { Field, Color, Kind, Piece, GameState, GameResult } from './types';
import { calcPossibleMoves, isOpponentInCheck, movePiece, getBackgroundColor, getCoord } from './chessRules'
import { calculateBestMove } from './chessAi';
var cloneDeep = require('lodash.clonedeep');

export class ChessHelpers {
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

                board.push({ background: getBackgroundColor(x, y), name: getCoord(x, y), piece: piece })
            }
        }
        return board;
    }
    clickField(fieldId: number, gameState: GameState): GameResult {     
        if(gameState.turn == Color.Black) {
            // black is an ai and cannot be controlled by clicking
            return GameResult.Pending;
        }

        return this.clickFieldRaw(fieldId, gameState);
    }
    clickFieldRaw(fieldId: number, gameState: GameState): GameResult {     
       
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
            gameState.possibleMoves = calcPossibleMoves(fieldId, gameState);
            return GameResult.Pending;
        }

        // if this is a legal move -> do it
        if (gameState.possibleMoves.includes(fieldId)) {
            return this.doMove(fieldId, gameState);
        }
        
        return GameResult.Pending;
    }
    doMove(fieldId: number, gameState: GameState) {
        movePiece(gameState.selectedPiece, fieldId, gameState);
        gameState.selectedPiece = -1;
        gameState.possibleMoves = [];
        clearInterval(this.timerId);

        // check for draw or win
        let check = isOpponentInCheck(gameState.turn, gameState);

        let movesPossible = gameState.fields.some((f, i) => {
            if(f.piece == undefined || f.piece.color === gameState.turn) { 
                return false;
            }
            let moves = calcPossibleMoves(i, gameState);
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

        return GameResult.Pending;
    }
    startBackgroundAi(gameState: GameState): GameResult {
        let [piece, target] = calculateBestMove(gameState);
        let tempResult = this.clickFieldRaw(piece, gameState);
        if(tempResult != GameResult.Pending) {
            alert('WTF');
        }
        return this.clickFieldRaw(target, gameState);
    }
}