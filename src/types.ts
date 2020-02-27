import { getInitialFields } from './chessRules';
import { calcFieldInfos, FieldInfo } from './wasmWrapper';
import { Piece, Color } from "rust-chess"

var cloneDeep = require('lodash.clonedeep');

export class BoardState {
  fields: Piece[] = [];
  takenPieces: Piece[] = []; 
  constructor(field: Piece[]) {
    this.fields = field;
    this.takenPieces = [];
  }
  copy(): BoardState {
    return cloneDeep(this);
  }
}

export class GameState {
  fieldInfos: FieldInfo[] = [];
  boardState: BoardState = new BoardState([]);
  oldPieceAndPosition?: [number, Piece];
  timerWhite: number = 0;
  timerBlack: number = 0;
  selectedPiece: number = -1;
  possibleMoves: number[] = [];
  turn: Color = Color.White;
  isThinking: boolean = false;

  constructor() {
    this.timerWhite = 0;
    this.timerBlack = 0;
    this.selectedPiece = -1;
    this.possibleMoves = [];
    this.fieldInfos = calcFieldInfos();
    this.turn = Color.White;
    this.isThinking = false;
    this.boardState = new BoardState(getInitialFields());
    this.oldPieceAndPosition = undefined;
  }

  copy(): GameState {
    return cloneDeep(this);
  }
}

export class Move {
  source: number = 0;
  target: number = 0;
  constructor(source: number, target: number) {
    this.source = source;
    this.target = target;
  }
}