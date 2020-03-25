import { calcFieldInfos, FieldInfo, BoardState, getInitialBoard } from './wasmWrapper';
import { Piece, Color } from "rust-chess"

var cloneDeep = require('lodash.clonedeep');

export class GameState {
  fieldInfos: FieldInfo[] = calcFieldInfos();
  boardState: BoardState = getInitialBoard();
  oldPieceAndPosition?: [number, Piece] = undefined;
  timerWhite: number = 0;
  timerBlack: number = 0;
  selectedPiece: number = -1;
  possibleMoves: number[] = [];
  turn: Color = Color.White;
  isThinking: boolean = false;

  constructor() {
  }
}
