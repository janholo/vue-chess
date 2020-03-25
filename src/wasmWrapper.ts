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
    // Todo
    return wasm.Piece.BlackBishop;
}

export function getInitialBoard() {
    let boardStateWasm = wasm.get_initial_board_js();
    let boardState: BoardState = {
        fields: boardStateWasm.fields.map(castPiece),
        takenPieces: boardStateWasm.takenPieces.map(castPiece),
    }

    return boardState
}

export function calcPossibleMoves(fieldId: number, boardState: BoardState): number[] {
    // Todo
    return []
}

export function movePiece(from: number, to: number, boardState: BoardState) {
    // Todo
}

export function checkGameState(boardState: BoardState, turn: wasm.Color) {
    // Todo
    return wasm.GameResult.Pending;
}

export function calculateBestMove(boardState: BoardState): [wasm.Move, number] {
    return [wasm.new_move(0,1), 0];
}
