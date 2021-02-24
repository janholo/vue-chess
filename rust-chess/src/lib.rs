mod utils;
mod core;
mod moves;
mod ai;

use crate::core::Move;
use crate::ai::calculate_best_move;
use crate::moves::check_game_state;
use crate::core::GameResult;
use crate::moves::move_piece;
use crate::core::get_initial_board;
use crate::moves::calc_possible_moves;
use crate::core::BoardState;
use crate::core::get_coord;
use crate::core::get_background_color;
use crate::core::Color;
use wasm_bindgen::prelude::*;

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
pub fn calc_possible_moves_js(field_id: u8, board: &JsValue) -> JsValue {
    let b: BoardState = board.into_serde().unwrap();
    let moves = calc_possible_moves(field_id, &b);

    JsValue::from_serde(&moves).unwrap()
}

#[wasm_bindgen]
pub fn get_initial_board_js() -> JsValue {
    let board = get_initial_board();

    JsValue::from_serde(&board).unwrap()
}

#[wasm_bindgen]
pub fn move_piece_js(from: u8, to: u8, board: &JsValue) -> JsValue {
    let mut b: BoardState = board.into_serde().unwrap();
    
    move_piece(from, to, &mut b);

    JsValue::from_serde(&b).unwrap()
}

#[wasm_bindgen]
pub fn check_game_state_js(board: &JsValue, turn: Color) -> GameResult {
    let b: BoardState = board.into_serde().unwrap();
    let result = check_game_state(&b, turn);

    result
}

#[wasm_bindgen]
pub fn calculate_best_move_js(board: &JsValue) -> Move {
    let b: BoardState = board.into_serde().unwrap();
    let result = calculate_best_move(&b);

    result.0
}