var cloneDeep = require('lodash.clonedeep');

export class GameState {
  fields: Field[] = [];
  takenPieces: Piece[] = [];
  timerWhite: number = 0;
  timerBlack: number = 0;
  selectedPiece: number = -1;
  possibleMoves: number[] = [];
  turn: Color = Color.White;
  isThinking: boolean = false;

  constructor(initialBoard: Field[]) {
    this.timerWhite = 0;
    this.timerBlack = 0;
    this.takenPieces = [];
    this.selectedPiece = -1;
    this.possibleMoves = [];
    this.fields = initialBoard;
    this.turn = Color.White;
    this.isThinking = false;
}
  copy(): GameState {
    return cloneDeep(this);
  }
}

export class Field {
  background: Color = Color.White;
  piece?: Piece = new Piece();
  name: string = "A8";
}

export class Piece {
  color: Color = Color.White;
  kind: Kind = Kind.Queen;
}

export enum Kind {
    King,
    Queen,
    Rook,
    Bishop,
    Knight,
    Pawn
  }
  
export enum Color {
    Black,
    White
  }

export enum GameResult {
  Pending,
  WhiteWin,
  BlackWin,
  Draw
}

export class Move {
  source: number = 0;
  target: number = 0;
  constructor(source: number, target: number) {
    this.source = source;
    this.target = target;
  }
}