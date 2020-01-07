import { GameState, Color, Kind, GameResult, Move } from './types';
import { getFieldIdsOfPieces, calcPossibleMoves, getCoordFromId, movePiece, checkGameState } from './chessRules';

export function calculateBestMove(gameState: GameState, depth: number): [Move, number] {
    let startTime = performance.now();
    let moveCount = 0;

    let blackMoves = allMoves(gameState, Color.Black);
    
    let bestMoves: [Move, number][] = blackMoves.map(m => [m, -9999]);
    
    for(let blackMove of blackMoves) {
        // do black move
        let newStateBlack = gameState.copy();
        let result = doAiMove(blackMove.source, blackMove.target, newStateBlack);
        moveCount += 1;
        // discard move is lost or draw
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
            let result = doAiMove(whiteMove.source, whiteMove.target, newStateWhite);
            moveCount += 1;
            // discard move is lost or draw
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

function doAiMove(source: number, target: number, gameState: GameState) {
    movePiece(source, target, gameState);

    let result = checkGameState(gameState);
    if(result !== GameResult.Pending) {
        return result;
    }

    if(gameState.turn === Color.White) {
        gameState.turn = Color.Black;
    } else {
        gameState.turn = Color.White;
    }

    return GameResult.Pending;
}

function allMoves(gameState: GameState, color: Color) {
    let blackPieces = getFieldIdsOfPieces(color, gameState);
    
    let blackMoves = blackPieces.flatMap(fieldId => {
        let moves = calcPossibleMoves(fieldId, gameState);
        return moves.map(m => new Move(fieldId, m));
    });

    return blackMoves;
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

export function calcBoardValue(gameState: GameState): number {
    let value = 0;
    
    for(let p of gameState.fields) {
        if(p.piece == undefined) {
            continue;
        }

        let pieceValue = calcPieceValue(p.piece.kind);
        value += (p.piece.color === Color.Black) ? pieceValue : -pieceValue;
    }
    return value;
}