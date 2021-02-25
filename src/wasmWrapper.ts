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
    fields: [number],
    taken_pieces: [number],
}

export const PAWN = 1;
export const KNIGHT = 2;
export const BISHOP = 4;
export const ROOK = 8;
export const QUEEN = 16;
export const KING = 32;
export const WHITE = 64;
export const BLACK = 128;

export function getInitialBoard() {
    let boardStateWasm = wasm.get_initial_board_js();
    let boardState: BoardState = fromWasm(boardStateWasm)
    return boardState
}

function fromWasm(boardState: any): BoardState {
    return boardState as BoardState
}

export function calcPossibleMoves(fieldId: number, boardState: BoardState): number[] {
    let moves = wasm.calc_possible_moves_js(fieldId, boardState)
    return moves
}

export function movePiece(from: number, to: number, boardState: BoardState) {
    let newState = wasm.move_piece_js(from, to, boardState)

    return fromWasm(newState)
}

export function checkGameState(boardState: BoardState, turn: wasm.Color) {
    return wasm.check_game_state_js(boardState, turn);
}

export function calculateBestMove(boardState: BoardState): wasm.Move {
    return wasm.calculate_best_move_js(boardState);
}
