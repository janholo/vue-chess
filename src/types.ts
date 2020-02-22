import { calcFieldInfos, getInitialFields } from './chessRules';

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

export class FieldInfo {
  background: Color = Color.White;
  name: string = "A8";
}

export enum Piece {
  WhiteKing = -1,
  WhiteQueen = -2,
  WhiteRook = -3,
  WhiteBishop = -4,
  WhiteKnight = -5,
  WhitePawn = -6,
  Empty = 0,
  BlackKing = 1,
  BlackQueen = 2,
  BlackRook = 3,
  BlackBishop = 4,
  BlackKnight = 5,
  BlackPawn = 6,
}

export enum Kind {
    None = 0,
    King = 1,
    Queen = 2,
    Rook = 3,
    Bishop = 4,
    Knight = 5,
    Pawn = 6
  }
  
export enum Color {
    Black = 0,
    White = 1
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