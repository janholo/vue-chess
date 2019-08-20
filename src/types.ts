export class GameState {
  fields: Field[] = [];
  takenPieces: Piece[] = [];
  timerWhite: number = 0;
  timerBlack: number = 0;
  selectedPiece: number = -1;
  possibleMoves: number[] = [];
  turn: Color = Color.White;
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
