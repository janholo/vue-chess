import { GameState, Color, Kind, GameResult, Move, Piece, BoardState } from './types';
import { getFieldIdsOfPieces, calcPossibleMoves, getCoordFromId, movePiece, checkGameState, getKind } from './chessRules';

export function calculateBestMove(gameState: GameState, depth: number): [Move, number] {
    let startTime = performance.now();
    let moveCount = 0;

    let blackMoves = allMoves(gameState.boardState, Color.Black);
    
    let bestMoves: [Move, number][] = blackMoves.map(m => [m, -9999]);
    
    for(let blackMove of blackMoves) {
        // do black move
        let newStateBlack = gameState.boardState.copy();
        let result = doAiMove(blackMove.source, blackMove.target, newStateBlack, Color.Black);
        moveCount += 1;
        // discard move if lost or draw
        if(result === GameResult.Draw || result === GameResult.WhiteWin) {
            continue;
        }
        // immediately return move if won
        if(result === GameResult.BlackWin) {
            return [blackMove, 9999]; 
        }

        let whiteMoves = allMoves(newStateBlack, Color.White);
        let worstScore = 9999;
        for(let whiteMove of whiteMoves) {
            let newStateWhite = newStateBlack.copy();
            let result = doAiMove(whiteMove.source, whiteMove.target, newStateWhite, Color.White);
            moveCount += 1;
            // discard move if lost or draw
            if(result === GameResult.Draw || result === GameResult.WhiteWin) {
                continue;
            }
            // immediately return move if won
            if(result === GameResult.BlackWin) {
                return [blackMove, 9999]; 
            }
          
            if(depth > 1) {
                // TODO
            } else {
                let score = calcBoardValue(newStateWhite);
                if(score < worstScore) {
                    worstScore = score;
                }
            }
        }
        // Check if the worst score of all the white moves is better than during the other black moves
        if(worstScore === bestMoves[0][1]) {
            bestMoves.push([blackMove, worstScore]);
        }
        if(worstScore > bestMoves[0][1]) {
            bestMoves = []
            bestMoves.push([blackMove, worstScore]);
        }
    }

    let endTime = performance.now();
    
    // select random move from the best ones
    let selectedMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];

    console.log("Selected move: " + getCoordFromId(selectedMove[0].source) + " -> " + getCoordFromId(selectedMove[0].target))
    console.log("Time: " + (endTime - startTime) + " ms");
    console.log("Move Count: " + moveCount);

    return selectedMove;
}

function doAiMove(source: number, target: number, boardState: BoardState, turn: Color) {
    movePiece(source, target, boardState);

    let result = checkGameState(boardState, turn);
    if(result !== GameResult.Pending) {
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

function calcPieceValue(kind: Kind): number {
    if(kind === Kind.Pawn) {
        return 1;
    }
    if(kind === Kind.Bishop || kind === Kind.Knight) {
        return 3;
    }
    if(kind === Kind.Rook) {
        return 5;
    }
    if(kind === Kind.Queen) {
        return 9;
    }
    if(kind === Kind.King) {
        return 0;
    }

    throw new RangeError("Unknown Kind: " + kind);
}

export function calcBoardValue(boardState: BoardState): number {
    let value = 0;
    
    for(let p of boardState.fields) {
        if(p === Piece.Empty) {
            continue;
        }

        let pieceValue = calcPieceValue(getKind(p));
        value += Math.sign(p) * pieceValue;
    }
    return value;
}