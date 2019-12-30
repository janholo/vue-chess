import { Field, Color, Kind, Piece, GameState, GameResult } from './types';
var cloneDeep = require('lodash.clonedeep');

export function isOpponentInCheck(color: Color, gameState: GameState) {
    let check = gameState.fields.some((f, i) => {
        if(f.piece == undefined || f.piece.color != color) { 
            return false;
        }
        let moves = calcPossibleMovesRaw(i, gameState);
        return moves.some(m => {
            let p = gameState.fields[m].piece;
            return p != undefined && p.color != color && p.kind === Kind.King
        });
    });
    return check;
}
export function getFieldIdsOfPieces(color: Color, gameState: GameState) {
    let ids = [];

    for (let fieldId = 0; fieldId < 64; fieldId++) {
        let piece = gameState.fields[fieldId].piece;
        if(piece != undefined && piece.color === color) {
            ids.push(fieldId);
        }
    }

    return ids;
}
function calcPossibleMovesRaw(fieldId: number, gameState: GameState): number[] {
    let piece = gameState.fields[fieldId].piece as Piece;
    let color = piece.color;
    let kind = piece.kind;

    let moves: number[] = []

    let verticalDirs = [[1,0],[0,1],[-1,0],[0,-1]];
    let diagonalDirs = [[1,1],[1,-1],[-1,1],[-1,-1]];
    let knightMoves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];

    if (kind === Kind.Pawn) {
        moves = moves.concat(getPawnMoves(fieldId, gameState));
    }
    if (kind === Kind.Bishop || kind === Kind.Queen) {
        moves = moves.concat(getStandardMoves(fieldId, gameState, diagonalDirs, 8));
    }
    if (kind === Kind.Rook || kind === Kind.Queen) {
        moves = moves.concat(getStandardMoves(fieldId, gameState, verticalDirs, 8));
    }
    if (kind === Kind.King) {
        moves = moves.concat(getStandardMoves(fieldId, gameState, verticalDirs.concat(diagonalDirs), 1));
    }
    if (kind === Kind.Knight) {
        moves = moves.concat(getStandardMoves(fieldId, gameState, knightMoves, 1));
    }

    return moves;
}    
export function calcPossibleMoves(fieldId: number, gameState: GameState): number[] {
    let moves = calcPossibleMovesRaw(fieldId, gameState);

    let piece = gameState.fields[fieldId].piece as Piece;
    let color = piece.color;

    let validMoves = [];

    // check for each move if it result in check
    for(let m of moves)
    {
        let newGameState = gameState.copy();
        
        movePiece(fieldId, m, newGameState);

        if(!isOpponentInCheck(color === Color.White ? Color.Black : Color.White, newGameState)) {
            validMoves.push(m);
        }
    }

    return validMoves;
}
function getStandardMoves(fieldId: number, gameState: GameState, dirs: number[][], maxSteps: number): ConcatArray<number> {
    let moves = []

    let piece = gameState.fields[fieldId].piece as Piece;
    let color = piece.color;

    for(let pos of dirs) {
        let x = pos[0];
        let y = pos[1];
        let count = 1;
        while (count <= maxSteps) {
            let pos = getPosition(fieldId, x * count, y * count);
            if (pos == undefined) {
                break;
            }
            let p = gameState.fields[pos].piece;
            if (p == undefined) {
                moves.push(pos as number);
            } else if(canTake(pos, color, gameState)) {
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
function getPawnMoves(fieldId: number, gameState: GameState): number[] {
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
    let takeLeft = getPosition(fieldId, -1, y);
    if (canTake(takeLeft, color, gameState)) {
        moves.push(takeLeft as number);
    }
    let takeRight = getPosition(fieldId, 1, y);
    if (canTake(takeRight, color, gameState)) {
        moves.push(takeRight as number);
    }

    return moves;
}
function canTake(piece: number | undefined, turn: Color, gameState: GameState) {
    if (piece != undefined) {
        let p = gameState.fields[piece].piece
        if (p != undefined && p.color != turn) {
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

export function movePiece(from: number, to: number, gameState: GameState) {
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
export function getCoord(x: number, y: number): string {
    let map = ["A", "B", "C", "D", "E", "F", "G", "H"];
    return map[x] + (y + 1).toString();
}
export function getCoordFromId(fieldId: number) {
    return getCoord(fieldId % 8, 7 - Math.floor(fieldId / 8));
}
export function getBackgroundColor(x: number, y: number): Color {
    if (y % 2 != 0) {
        return x % 2 === 0 ? Color.White : Color.Black;
    }
    else {
        return x % 2 === 0 ? Color.Black : Color.White;
    }
}