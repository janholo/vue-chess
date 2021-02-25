mod utils;
mod core;
mod moves;
mod ai;

use crate::core::PieceFlags;
use wasm_bindgen::prelude::*;

use crate::core::{
    Move,
    GameResult,
    BoardState,
    Color,
    get_initial_board,
    get_coord,
    get_background_color
};
use crate::moves::{
    check_game_state,
    move_piece,
    calc_possible_moves
};
use crate::ai::calculate_best_move;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate bitflags;

#[wasm_bindgen]
pub fn init() {
    utils::set_panic_hook();
}

#[derive(Serialize, Deserialize, Clone)]
pub struct FieldInfo {
    background: Color,
    name: String,
}

#[derive(Serialize, Deserialize)]
pub struct FieldInfos {
    infos: Vec<FieldInfo>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct BoardStateJs {
    pub fields: Vec<u8>,
    pub taken_pieces: Vec<u8>,
}

impl BoardStateJs {
    fn to(self) -> BoardState {
        BoardState {
            fields: self.fields.into_iter().map(|p| {
                PieceFlags::from_bits(p).unwrap()
            }).collect(),
            taken_pieces: self.taken_pieces.into_iter().map(|p| {
                PieceFlags::from_bits(p).unwrap()
            }).collect(),
        }
    }
    fn from(board: BoardState) -> BoardStateJs {
        BoardStateJs {
            fields: board.fields.into_iter().map(|p| {
                p.bits()
            }).collect(),
            taken_pieces: board.taken_pieces.into_iter().map(|p| {
                p.bits()
            }).collect(),            
        }
    }
}

pub fn calc_field_infos() -> FieldInfos {
    let mut field = Vec::new();
    for field_id in 0..64 {
        field.push(FieldInfo { background: get_background_color(field_id), name: get_coord(field_id) });
    }
    FieldInfos { infos: field}
}

#[wasm_bindgen]
pub fn calc_field_infos_js() -> JsValue {
    let infos = calc_field_infos();

    JsValue::from_serde(&infos).unwrap()
}

#[wasm_bindgen]
pub fn calc_possible_moves_js(field_id: u8, board_raw: &JsValue) -> JsValue {
    let board_js: BoardStateJs = board_raw.into_serde().unwrap();
    let board = board_js.to();
    let moves = calc_possible_moves(field_id, &board);

    JsValue::from_serde(&moves).unwrap()
}

#[wasm_bindgen]
pub fn get_initial_board_js() -> JsValue {
    let board = get_initial_board();
    let board_js = BoardStateJs::from(board);
    JsValue::from_serde(&board_js).unwrap()
}

#[wasm_bindgen]
pub fn move_piece_js(from: u8, to: u8, board_raw: &JsValue) -> JsValue {
    let board_js: BoardStateJs = board_raw.into_serde().unwrap();
    let mut board = board_js.to();
    move_piece(from, to, &mut board);

    JsValue::from_serde(&BoardStateJs::from(board)).unwrap()
}

#[wasm_bindgen]
pub fn check_game_state_js(board_raw: &JsValue, turn: Color) -> GameResult {
    let board_js: BoardStateJs = board_raw.into_serde().unwrap();
    let board = board_js.to();
    let result = check_game_state(&board, turn);

    result
}

#[wasm_bindgen]
pub fn calculate_best_move_js(board_raw: &JsValue) -> Move {
    let board_js: BoardStateJs = board_raw.into_serde().unwrap();
    let board = board_js.to();
    let result = calculate_best_move(&board);

    result.0
}

#[wasm_bindgen]
pub fn other_color(color: Color) -> Color {
    color.other_color()
}

#[wasm_bindgen]
pub fn is_same_color(piece: u8, color: Color) -> bool {
    let p: PieceFlags = PieceFlags::from_bits(piece).unwrap();

    core::is_same_color(p, color)
}

#[wasm_bindgen]
pub fn is_other_color(piece: u8, color: Color) -> bool {
    let p: PieceFlags = PieceFlags::from_bits(piece).unwrap();

    core::is_other_color(p, color)
}

#[wasm_bindgen]
pub fn is_same_color_or_empty(piece: u8, color: Color) -> bool {
    let p: PieceFlags = PieceFlags::from_bits(piece).unwrap();

    core::is_same_color_or_empty(p, color)
}

#[wasm_bindgen]
pub fn is_other_color_or_empty(piece: u8, color: Color) -> bool {
    let p: PieceFlags = PieceFlags::from_bits(piece).unwrap();

    core::is_other_color_or_empty(p, color)
}
