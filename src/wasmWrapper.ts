import * as wasm from "rust-chess";

wasm.init();

export type FieldInfo = {
  background: wasm.Color,
  name: string
}

export function calcFieldInfos() {
    let fields = wasm.calc_field_infos_js();
    for (const info of fields.infos) {
        if(info.background === "White") {
            info.background = wasm.Color.White;
        } else {
            info.background = wasm.Color.Black;
        }
    }

    return fields.infos as FieldInfo[]
}

export type BoardState = {
    fields: [wasm.Piece],
    takenPieces: [wasm.Piece],
}

function castPiece(pieceString: any): wasm.Piece {
    return wasm.Piece[pieceString] as unknown as wasm.Piece;
}

export function getInitialBoard() {
    let boardStateWasm = wasm.get_initial_board_js();
    let boardState: BoardState = fromWasm(boardStateWasm)
    return boardState
}

function fromWasm(boardState: any): BoardState {
    return {
        fields: boardState.fields.map(castPiece),
        takenPieces: boardState.taken_pieces.map(castPiece),
    }
}

function toWasm(boardState: BoardState): any {
    let pieces = [        
        "WhiteKing",
        "WhiteQueen",
        "WhiteRook",
        "WhiteBishop",
        "WhiteKnight",
        "WhitePawn",
        "Empty",
        "BlackKing",
        "BlackQueen",
        "BlackRook",
        "BlackBishop",
        "BlackKnight",
        "BlackPawn",
      ];

    return { fields: boardState.fields.map(p => pieces[p]), taken_pieces: boardState.takenPieces.map(p => pieces[p])}
}

export function calcPossibleMoves(fieldId: number, boardState: BoardState): number[] {
    let boardStateWasm = toWasm(boardState);

    let moves = wasm.calc_possible_moves_js(fieldId, boardStateWasm)
    return moves
}

export function movePiece(from: number, to: number, boardState: BoardState) {
    let boardStateWasm = toWasm(boardState);
    
    let newState = wasm.move_piece_js(from, to, boardStateWasm)

    return fromWasm(newState)
}

export function checkGameState(boardState: BoardState, turn: wasm.Color) {
    let boardStateWasm = toWasm(boardState);

    return wasm.check_game_state_js(boardStateWasm, turn);
}

export function calculateBestMove(boardState: BoardState): wasm.Move {
    let boardStateWasm = toWasm(boardState);
    
    return wasm.calculate_best_move_js(boardStateWasm);
}
