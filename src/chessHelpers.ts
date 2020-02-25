import { Color, GameState, GameResult } from './types';
import { calcPossibleMoves, movePiece, checkGameState, isSameColor, otherColor } from './chessRules'
import { calculateBestMove } from './chessAi';

export class ChessHelpers {
    timerId: number = 0;
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
        let p = gameState.boardState.fields[fieldId]
        if (isSameColor(p, gameState.turn)) {
            gameState.selectedPiece = fieldId;
            gameState.possibleMoves = calcPossibleMoves(fieldId, gameState.boardState);
            return GameResult.Pending;
        }

        // if this is a legal move -> do it
        if (gameState.possibleMoves.includes(fieldId)) {
            return this.doMove(fieldId, gameState);
        }
        
        return GameResult.Pending;
    }
    doMove(fieldId: number, gameState: GameState) {
        gameState.oldPieceAndPosition = [gameState.selectedPiece, gameState.boardState.fields[gameState.selectedPiece]];
        movePiece(gameState.selectedPiece, fieldId, gameState.boardState);
        gameState.selectedPiece = -1;
        gameState.possibleMoves = [];
        clearInterval(this.timerId);

        let result = checkGameState(gameState.boardState, gameState.turn);
        if(result !== GameResult.Pending) {
            gameState.turn = otherColor(gameState.turn);
            return result;
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
    startBackgroundAi(gameState: GameState, setResult: (r: GameResult) => void): void {
        if(gameState.isThinking) {
            return;
        }
        gameState.isThinking = true;

        setTimeout(() => {
            let bestMove = calculateBestMove(gameState.boardState);
            let move = bestMove[0];
            let tempResult = this.clickFieldRaw(move.source, gameState);
            if(tempResult != GameResult.Pending) {
                alert('WTF');
            }
            
            let result = this.clickFieldRaw(move.target, gameState);
            if(result != GameResult.Pending) {
                setResult(result);
            }
            gameState.isThinking = false;
        }, 100);
    }
}