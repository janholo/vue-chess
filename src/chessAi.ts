import { GameState, Color, Kind } from './types';
import { getFieldIdsOfPieces, calcPossibleMoves, getCoordFromId } from './chessRules';

export function calculateBestMove(gameState: GameState): [number, number] {
    let moves = allBlackMoves(gameState);

    let selectedMove = randomMove(moves);

    console.log("Board value: " + calcBoardValue(gameState))

    console.log("Selected move: " + getCoordFromId(selectedMove[0]) + " -> " + getCoordFromId(selectedMove[1]))

    return [selectedMove[0], selectedMove[1]];
}

function randomMove(moves: number[][]) {
    return moves[Math.floor(Math.random() * moves.length)];
}

function allBlackMoves(gameState: GameState) {
    let blackPieces = getFieldIdsOfPieces(Color.Black, gameState);
    
    let blackMoves = blackPieces.flatMap(fieldId => {
        let moves = calcPossibleMoves(fieldId, gameState);
        return moves.map(m => [fieldId, m]);
    });

    /* eslint-disable */
    console.log("BlackMoves")
    for(let m of blackMoves) {
        console.log(getCoordFromId(m[0]) + " -> " + getCoordFromId(m[1]))
    }

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