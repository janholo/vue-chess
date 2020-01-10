import { GameState, Color, Kind, GameResult, Move, Piece, BoardState } from './types';
import { getFieldIdsOfPieces, calcPossibleMoves, getCoordFromId, movePiece, checkGameState, getKind, otherColor } from './chessRules';

let moveCount = 0;

function orderMoves(moves: Move[], boardState: BoardState): Move[] {
    let movesAndValues: [Move, number][] = moves.map(m => [m, calcPieceValue(boardState.fields[m.target]) - calcPieceValue(boardState.fields[m.source])])

    let sortedMoves = movesAndValues.sort((a,b) => b[1] - a[1]);

    return sortedMoves.map(m => m[0]);
}

export function calculateBestHalfMove(turn: Color, boardState: BoardState, depth: number, alpha: number, beta: number): [Move, number] {
    let validMoves = allMoves(boardState, turn);

    let orderedMoves = orderMoves(validMoves, boardState);

    // black turn -> search highest possible score
    // white turn -> search lowest possible score
    let bestMove: [Move, number] = [orderedMoves[0], turn === Color.Black ? -9999 : 9999];

    for (let move of validMoves) {
        // do move
        let newBoardState = boardState.copy();
        let result = doAiMove(move.source, move.target, newBoardState, turn);
        moveCount += 1;
        if (result === GameResult.WhiteWin) {
            if (turn === Color.Black) {
                continue;
            } else {
                return [move, -9999];
            }
        }
        if (result === GameResult.BlackWin) {
            if (turn === Color.Black) {
                return [move, 9999];
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

    let selectedMove = calculateBestHalfMove(Color.Black, gameState.boardState, 4, -9999, 9999);

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

function calcPieceValue(piece: Piece): number {
    if(piece === Piece.Empty) {
        return 0;
    }
    let kind = getKind(piece);
    if (kind === Kind.Pawn) {
        return 10;
    }
    if (kind === Kind.Bishop || kind === Kind.Knight) {
        return 30;
    }
    if (kind === Kind.Rook) {
        return 50;
    }
    if (kind === Kind.Queen) {
        return 90;
    }
    if (kind === Kind.King) {
        return 0;
    }

    throw new RangeError("Unknown Kind: " + kind);
}

export function calcBoardValue(boardState: BoardState): number {
    let value = 0;

    for (let p of boardState.fields) {
        // TODO piece square tables https://www.chessprogramming.org/Simplified_Evaluation_Function
        let pieceValue = calcPieceValue(p);
        value += Math.sign(p) * pieceValue;
    }
    return value;
}