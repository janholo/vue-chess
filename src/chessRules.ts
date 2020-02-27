import { Color, Kind, Piece, GameResult, BoardState } from './types';
var cloneDeep = require('lodash.clonedeep');

export function otherColor(color: Color): Color {
    return (color + 1) % 2;
}

export function isSameColor(piece: Piece, color: Color) {
    if(piece > 0 && color === Color.Black) {
        return true;
    }
    if(piece < 0 && color === Color.White) {
        return true;
    }
    return false;
}

export function isOtherColor(piece: Piece, color: Color) {
    if(piece > 0 && color === Color.White) {
        return true;
    }
    if(piece < 0 && color === Color.Black) {
        return true;
    }
    return false;
}

export function isSameColorOrEmpty(piece: Piece, color: Color) {
    if(piece >= 0 && color === Color.Black) {
        return true;
    }
    if(piece <= 0 && color === Color.White) {
        return true;
    }
    return false;    
}

export function isOtherColorOrEmpty(piece: Piece, color: Color) {
    if(piece >= 0 && color === Color.White) {
        return true;
    }
    if(piece <= 0 && color === Color.Black) {
        return true;
    }
    return false;    
}

export function getPiece(color: Color, kind: Kind): Piece {
    if(color === Color.White) {
        return -kind;
    }
    return <Piece><unknown>kind;
}

function getColor (piece: Piece) {
    if(piece > 0) {
        return Color.Black;
    }
    if(piece < 0) {
        return Color.White;
    }

    throw new RangeError("Piece has no color"); 
}

export function getKind(piece: Piece): Kind {
    return <Kind>Math.abs(piece);
}

export function isOpponentInCheck(color: Color, boardState: BoardState) {
    let check = boardState.fields.some((f, i) => {
        if(isOtherColorOrEmpty(f, color)) { 
            return false;
        }
        let moves = calcPossibleMovesRaw(i, boardState);
        let colorKing = getPiece(otherColor(color), Kind.King)
        return moves.some(m => {
            let p = boardState.fields[m];
            return p === colorKing;
        });
    });
    return check;
}
export function getFieldIdsOfPieces(color: Color, boardState: BoardState) {
    let ids = [];

    for (let fieldId = 0; fieldId < 64; fieldId++) {
        let piece = boardState.fields[fieldId];
        if(isSameColor(piece, color)) {
            ids.push(fieldId);
        }
    }

    return ids;
}

let verticalDirs = [[1,0],[0,1],[-1,0],[0,-1]];
let diagonalDirs = [[1,1],[1,-1],[-1,1],[-1,-1]];
let knightMoves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];

function calcPossibleMovesRaw(fieldId: number, boardState: BoardState): number[] {
    let piece = boardState.fields[fieldId];
    let kind = getKind(piece);

    let moves: number[] = []

    if (kind === Kind.Pawn) {
        moves = moves.concat(getPawnMoves(fieldId, boardState));
    }
    if (kind === Kind.Bishop || kind === Kind.Queen) {
        moves = moves.concat(getStandardMoves(fieldId, boardState, diagonalDirs, 8));
    }
    if (kind === Kind.Rook || kind === Kind.Queen) {
        moves = moves.concat(getStandardMoves(fieldId, boardState, verticalDirs, 8));
    }
    if (kind === Kind.King) {
        moves = moves.concat(getStandardMoves(fieldId, boardState, verticalDirs.concat(diagonalDirs), 1));
    }
    if (kind === Kind.Knight) {
        moves = moves.concat(getStandardMoves(fieldId, boardState, knightMoves, 1));
    }

    return moves;
}    
export function calcPossibleMoves(fieldId: number, boardState: BoardState): number[] {
    let moves = calcPossibleMovesRaw(fieldId, boardState);

    let piece = boardState.fields[fieldId];
    let color = getColor(piece);

    let validMoves = [];

    // check for each move if it result in check
    for(let m of moves)
    {
        let newBoardState = boardState.copy();
        
        movePiece(fieldId, m, newBoardState);

        if(!isOpponentInCheck(otherColor(color), newBoardState)) {
            validMoves.push(m);
        }
    }

    return validMoves;
}

function getStandardMoves(fieldId: number, boardState: BoardState, dirs: number[][], maxSteps: number): number[] {
    let moves = []

    let piece = boardState.fields[fieldId];
    let color = getColor(piece);

    for(let pos of dirs) {
        let x = pos[0];
        let y = pos[1];
        let count = 1;
        while (count <= maxSteps) {
            let pos = getPosition(fieldId, x * count, y * count);
            if (pos == undefined) {
                break;
            }
            let p = boardState.fields[pos];
            if (p === Piece.Empty) {
                moves.push(pos);
            } else if(canTake(pos, color, boardState)) {
                moves.push(pos);
                break;
            } else {
                break;
            }
            count++;
        }
    }

    return moves;
}
function getPawnMoves(fieldId: number, boardState: BoardState): number[] {
    let moves = []
    let piece = boardState.fields[fieldId];
    let color = getColor(piece);

    //normal move forward
    let forwardId = fieldId + Math.sign(piece) * 8;
    if (boardState.fields[forwardId] === Piece.Empty) {
        moves.push(forwardId);

        //check double forward
        if ((piece === Piece.WhitePawn && fieldId >= 8 * 6) || (piece === Piece.BlackPawn && fieldId < 16)) {
            let doubleForwardId = fieldId + Math.sign(piece) * 16;
            if (boardState.fields[doubleForwardId] === Piece.Empty) {
                moves.push(doubleForwardId);
            }
        }
    }

    //take to the right
    let y = piece === Piece.WhitePawn ? -1 : 1;
    let takeLeft = getPosition(fieldId, -1, y);
    if (canTake(takeLeft, color, boardState)) {
        moves.push(takeLeft as number);
    }
    let takeRight = getPosition(fieldId, 1, y);
    if (canTake(takeRight, color, boardState)) {
        moves.push(takeRight as number);
    }

    return moves;
}
function canTake(piece: number | undefined, turn: Color, boardState: BoardState) {
    if (piece != undefined) {
        let p = boardState.fields[piece]
        if (isOtherColor(p, turn)) {
            return true;
        }
    }

    return false;
}
function getPosition(fieldId: number, x: number, y: number) {
    let targetX = (fieldId % 8) + x;
    let targetY = (Math.floor(fieldId / 8)) + y;
    if (targetX < 0 || targetX >= 8 || targetY < 0 || targetY >= 8) {
        return undefined;
    }
    return targetY * 8 + targetX;
}

export function movePiece(from: number, to: number, boardState: BoardState) {
    let movePiece = boardState.fields[from];
    boardState.fields[from] = Piece.Empty;
    // add "to" piece to taken pieces
    let oldPiece = boardState.fields[to];
    if (oldPiece !== Piece.Empty) {
        boardState.takenPieces.push(oldPiece)
    }

    // transform pawns to queens
    if (Math.floor(to / 8) == 0 && movePiece === Piece.WhitePawn || Math.floor(to / 8) == 7 && movePiece === Piece.BlackPawn) {
        movePiece = movePiece / 3;
    }

    boardState.fields[to] = movePiece;
}

export function checkGameState(boardState: BoardState, turn: Color): GameResult {
    let check = isOpponentInCheck(turn, boardState);

    let movesPossible = boardState.fields.some((f, i) => {
        if(isSameColorOrEmpty(f, turn)) { 
            return false;
        }
        let moves = calcPossibleMoves(i, boardState);
        return moves.length > 0;
    });

    if(!movesPossible) {
        turn = otherColor(turn);
        if(check) {
            return turn === Color.White ? GameResult.BlackWin : GameResult.WhiteWin;
        } else {
            return GameResult.Draw;
        }
    }

    return GameResult.Pending;
}
export function getInitialFields(): Piece[] {
    let board: Piece[] = []
    for (let y = 7; y >= 0; y--) {
        for (let x = 0; x < 8; x++) {
            let piece: Piece = Piece.Empty;

            if (y === 7 || y === 0) {
                if (x === 0 || x === 7) {
                    piece = Piece.BlackRook;
                }
                if (x === 1 || x === 6) {
                    piece = Piece.BlackKnight;
                }
                if (x === 2 || x === 5) {
                    piece = Piece.BlackBishop;
                }
                if (x === 3) {
                    piece = Piece.BlackQueen;
                }
                if (x === 4) {
                    piece = Piece.BlackKing;
                }
            }
            if (y === 6 || y === 1) {
                piece = Piece.BlackPawn;
            }

            if ((y === 1 || y === 0) && piece != undefined) {
                piece = -piece;
            }

            board.push(piece)
        }
    }
    return board;
}
