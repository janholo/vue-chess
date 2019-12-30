import { GameState, Color } from './types';
import { getFieldIdsOfPieces, calcPossibleMoves, getCoordFromId } from './chessRules';

export function calculateBestMove(gameState: GameState): [number, number] {
    let moves = allBlackMoves(gameState);

    let selectedMove = randomMove(moves);

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

export function calcBoardValue(gameState: GameState): number {
    return 1;
}