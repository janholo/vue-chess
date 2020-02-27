mod utils;

use wasm_bindgen::prelude::*;

#[macro_use]
extern crate serde_derive;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn init() {
    utils::set_panic_hook();
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Copy, Clone, PartialEq)]
pub enum Color {
    Black,
    White
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

#[wasm_bindgen]
pub fn get_coord(x: u8, y: u8) -> String {
    get_coord_from_id((7 - y) * 8 + x)
}

#[wasm_bindgen]
pub fn get_coord_from_id(field_id: u8) -> String {
    const COORDS: &'static str = "A1A2A3A4A5A6A7A8B1B2B3B4B5B6B7B8C1C2C3C4C5C6C7C8D1D2D3D4D5D6D7D8E1E2E3E4E5E6E7E8F1F2F3F4F5F6F7F8G1G2G3G4G5G6G7G8H1H2H3H4H5H6H7H8iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii";
    COORDS[(field_id*2) as usize..(field_id*2) as usize + 2].to_string()
}

pub fn get_background_color(x: u8, y: u8) -> Color {
    if y % 2 != 0 {
        if x % 2 == 0 { Color::White } else { Color::Black }
    }
    else {
        if x % 2 == 0 { Color::Black } else { Color::White }
    }
}


pub fn calc_field_infos() -> FieldInfos {
    let mut field = Vec::new();
    for y in (0..8).rev() {
        for x in 0..8 {
            field.push(FieldInfo { background: get_background_color(x as u8, y as u8), name: get_coord(x as u8, y as u8) });
        }
    }
    FieldInfos { infos: field}
}

#[wasm_bindgen]
pub fn calc_field_infos_js() -> JsValue {
    let infos = calc_field_infos();

    JsValue::from_serde(&infos).unwrap()
}

#[wasm_bindgen]
pub fn other_color(color: Color) -> Color {
    if color == Color::Black {
        Color::White
    } else {
        Color::Black
    }
}

#[wasm_bindgen]
pub fn get_color(piece: Piece) -> Option<Color> {
    if piece == Piece::Empty {
        None
    } else if piece == Piece::BlackBishop ||
        piece == Piece::BlackKing ||
        piece == Piece::BlackKnight ||
        piece == Piece::BlackPawn ||
        piece == Piece::BlackQueen ||
        piece == Piece::BlackRook {
            Some(Color::Black)
    } else {
        Some(Color::White)
    }
}

#[wasm_bindgen]
pub fn is_same_color(piece: Piece, color: Color) -> bool {
    let piece_color = get_color(piece);

    match piece_color {
        None => false,
        Some(c) => c == color,
    }
}

#[wasm_bindgen]
pub fn is_other_color(piece: Piece, color: Color) -> bool {
    let piece_color = get_color(piece);

    match piece_color {
        None => false,
        Some(c) => c != color,
    }
}

#[wasm_bindgen]
pub fn is_same_color_or_empty(piece: Piece, color: Color) -> bool {
    let piece_color = get_color(piece);

    match piece_color {
        None => true,
        Some(c) => c == color,
    } 
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Piece {
    WhiteKing,
    WhiteQueen,
    WhiteRook,
    WhiteBishop,
    WhiteKnight,
    WhitePawn,
    Empty,
    BlackKing,
    BlackQueen,
    BlackRook,
    BlackBishop,
    BlackKnight,
    BlackPawn,
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Kind {
    None,
    King,
    Queen,
    Rook,
    Bishop,
    Knight,
    Pawn
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum GameResult {
  Pending,
  WhiteWin,
  BlackWin,
  Draw
}

// #[wasm_bindgen]
// pub fn get_pieces() -> [Piece; 2] {
//     [Piece::BlackKing; 2]
// }

// #[wasm_bindgen]
// pub enum Kind {
//     None,
//     King,
//     Queen,
//     Rook,
//     Bishop,
//     Knight,
//     Pawn
// }

// #[wasm_bindgen]
// pub enum GameResult {
//   Pending,
//   WhiteWin,
//   BlackWin,
//   Draw
// }

// #[wasm_bindgen]
// pub struct Move {
//   source: i8,
//   target: i8,
// }

// #[wasm_bindgen]
// pub fn create_piece() -> Pieces {
//     Pieces::Hello
// }

// #[wasm_bindgen]
// pub fn return_named_struct(inner: u32) -> ExportedNamedStruct {
//     ExportedNamedStruct { inner }
// }

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet(val: &ExportedNamedStruct) {
//     let msg = &format!("Hello, {}!", val.inner);
//     alert(msg);
// }
