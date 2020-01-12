import { GameState, Color, Kind, GameResult, Move, Piece, BoardState } from './types';
import { getFieldIdsOfPieces, calcPossibleMoves, getCoordFromId, movePiece, checkGameState, getKind, otherColor, isSameColor } from './chessRules';

let moveCount = 0;

function orderMoves(moves: Move[], boardState: BoardState): Move[] {
    let movesAndValues: [Move, number][] = moves.map(m => [m, calcPieceValue(boardState.fields[m.target], m.target) - calcPieceValue(boardState.fields[m.source], m.source)])

    let sortedMoves = movesAndValues.sort((a, b) => b[1] - a[1]);

    return sortedMoves.map(m => m[0]);
}

export function calculateBestHalfMove(turn: Color, boardState: BoardState, depth: number, alpha: number, beta: number): [Move, number] {
    let validMoves = allMoves(boardState, turn);

    let orderedMoves = orderMoves(validMoves, boardState);

    // black turn -> search highest possible score
    // white turn -> search lowest possible score
    let bestMove: [Move, number] = [orderedMoves[0], turn === Color.Black ? -99999 : 99999];

    for (let move of validMoves) {
        // do move
        let newBoardState = boardState.copy();
        let result = doAiMove(move.source, move.target, newBoardState, turn);
        moveCount += 1;
        if (result === GameResult.WhiteWin) {
            if (turn === Color.Black) {
                continue;
            } else {
                return [move, -99999];
            }
        }
        if (result === GameResult.BlackWin) {
            if (turn === Color.Black) {
                return [move, 99999];
            } else {
                continue;
            }
        }
        let score;
        if (result === GameResult.Draw) {
            score = 0;
        } else if (depth > 1) {
            let result = calculateBestHalfMove(otherColor(turn), newBoardState, depth - 1, alpha, beta);
            score = result[1];
        } else {
            score = calcBoardValue(newBoardState);
        }
        if (turn === Color.Black) {
            if (score > bestMove[1]) {
                bestMove = [move, score];
            }
            alpha = Math.max(alpha, bestMove[1])
        } else {
            if (score < bestMove[1]) {
                bestMove = [move, score];
            }
            beta = Math.min(beta, bestMove[1])
        }

        if (alpha >= beta) {
            //console.log("cutoff")
            break;
        }
    }
    return bestMove;
}

export function calculateBestMove(gameState: GameState): [Move, number] {
    let startTime = performance.now();
    moveCount = 0;

    let selectedMove = calculateBestHalfMove(Color.Black, gameState.boardState, 4, -99999, 99999);

    let endTime = performance.now();

    console.log("Selected move: " + getCoordFromId(selectedMove[0].source) + " -> " + getCoordFromId(selectedMove[0].target))
    console.log("Time: " + (endTime - startTime) + " ms");
    console.log("Move Count: " + moveCount);

    return selectedMove;
}

function doAiMove(source: number, target: number, boardState: BoardState, turn: Color) {
    movePiece(source, target, boardState);

    let result = checkGameState(boardState, turn);
    if (result !== GameResult.Pending) {
        return result;
    }

    return GameResult.Pending;
}

function allMoves(boardState: BoardState, color: Color) {
    let pieces = getFieldIdsOfPieces(color, boardState);

    let allMoves = pieces.flatMap(fieldId => {
        let moves = calcPossibleMoves(fieldId, boardState);
        return moves.map(m => new Move(fieldId, m));
    });

    return allMoves;
}

let pieceSquareTablePawn = [ 
    0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0
];

let pieceSquareTableKnight = [
    -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50,
];

let pieceSquareTableBishop = [
    -20,-10,-10,-10,-10,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -10,  0,  5, 10, 10,  5,  0,-10,
    -10,  5,  5, 10, 10,  5,  5,-10,
    -10,  0, 10, 10, 10, 10,  0,-10,
    -10, 10, 10, 10, 10, 10, 10,-10,
    -10,  5,  0,  0,  0,  0,  5,-10,
    -20,-10,-10,-10,-10,-10,-10,-20,
]

let pieceSquareTableRook = [
    0,  0,  0,  0,  0,  0,  0,  0,
    5, 10, 10, 10, 10, 10, 10,  5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
    0,  0,  0,  5,  5,  0,  0,  0
]

let pieceSquareTableQueen = [
    -20,-10,-10, -5, -5,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -10,  0,  5,  5,  5,  5,  0,-10,
     -5,  0,  5,  5,  5,  5,  0, -5,
      0,  0,  5,  5,  5,  5,  0, -5,
    -10,  5,  5,  5,  5,  5,  0,-10,
    -10,  0,  5,  0,  0,  0,  0,-10,
    -20,-10,-10, -5, -5,-10,-10,-20
]

let pieceSquareTableKing = [
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -20,-30,-30,-40,-40,-30,-30,-20,
    -10,-20,-20,-20,-20,-20,-20,-10,
    20, 20,  0,  0,  0,  0, 20, 20,
    20, 30, 10,  0,  0, 10, 30, 20
]

function calcPieceValue(piece: Piece, position: number): number {
    if (piece === Piece.Empty) {
        return 0;
    }
    if(isSameColor(piece, Color.Black)) {
        // mirror position around center
        let oldX = (position % 8);
        let oldY = (Math.floor(position / 8));

        position = (7 - oldY) * 8 + oldX;
    }
    let kind = getKind(piece);
    if (kind === Kind.Pawn) {
        return 100 + pieceSquareTablePawn[position];
    }
    else if (kind === Kind.Bishop) {
        return 300 + pieceSquareTableBishop[position];
    }
    else if (kind === Kind.Knight) {
        return 300 + pieceSquareTableKnight[position];
    }
    else if (kind === Kind.Rook) {
        return 500 + pieceSquareTableRook[position];
    }
    else if (kind === Kind.Queen) {
        return 900 + pieceSquareTableQueen[position];
    }
    else if (kind === Kind.King) {
        return 0 + pieceSquareTableKing[position];
    }

    throw new RangeError("Unknown Kind: " + kind);
}

export function calcBoardValue(boardState: BoardState): number {
    return boardState.fields.map((p, i) => {
        return Math.sign(p) * calcPieceValue(p, i);
    }).reduce((prev, current) => prev + current, 0);
}