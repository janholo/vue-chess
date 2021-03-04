use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Copy, Clone, PartialEq)]
pub enum Color {
    Black,
    White
}

impl Color {
    pub fn from_flag(piece: PieceFlags) -> Option<Color> {
        if piece.contains(PieceFlags::BLACK) {
            Some(Color::Black)
        }
        else if piece.contains(PieceFlags::WHITE) {
            Some(Color::White)
        }
        else {
            None
        }
    }
    pub fn to_flag(&self) -> PieceFlags {
        if *self == Color::Black {
            PieceFlags::BLACK
        }
        else {
            PieceFlags::WHITE
        }
    }
    pub fn other_color(&self) -> Color {
        if *self == Color::Black {
            Color::White
        } else {
            Color::Black
        }
    }
}

bitflags! {
    pub struct PieceFlags: u8 {
        const PAWN = 1;
        const KNIGHT = 2;
        const BISHOP = 4;
        const ROOK = 8;
        const QUEEN = 16;
        const KING = 32;
        const WHITE = 64;
        const BLACK = 128;
    }
}

pub fn is_same_color(piece: PieceFlags, color: Color) -> bool {
    (color.to_flag() & piece) != PieceFlags::empty()
}

pub fn is_other_color(piece: PieceFlags, color: Color) -> bool {
    (color.to_flag() | piece).contains(PieceFlags::BLACK | PieceFlags::WHITE)
}

pub fn is_same_color_or_empty(piece: PieceFlags, color: Color) -> bool {
    !is_other_color(piece, color)
}

pub fn is_other_color_or_empty(piece: PieceFlags, color: Color) -> bool {
    !is_same_color(piece, color)
}

pub fn get_background_color(field_id: u8) -> Color {
    if (field_id / 8) % 2 != 0 {
        if field_id % 2 == 0 { Color::White } else { Color::Black }
    }
    else {
        if field_id % 2 == 0 { Color::Black } else { Color::White }
    }
}

pub fn get_coord(field_id: u8) -> String {
    const COORDS: &'static str = "A1A2A3A4A5A6A7A8B1B2B3B4B5B6B7B8C1C2C3C4C5C6C7C8D1D2D3D4D5D6D7D8E1E2E3E4E5E6E7E8F1F2F3F4F5F6F7F8G1G2G3G4G5G6G7G8H1H2H3H4H5H6H7H8iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii";
    COORDS[(field_id*2) as usize..(field_id*2) as usize + 2].to_string()
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum GameResult {
  Pending,
  WhiteWin,
  BlackWin,
  Draw
}

#[wasm_bindgen]
#[derive(PartialEq, Serialize, Deserialize, Clone, Copy)]
pub struct Move {
    pub source: u8,
    pub target: u8,
}

#[derive(Clone)]
pub struct BoardState {
    pub fields: Vec<PieceFlags>,
    pub taken_pieces: Vec<PieceFlags>,
}

pub fn get_initial_board() -> BoardState {
    let fields = get_initial_fields();
    let taken_pieces = Vec::with_capacity(32);
    BoardState { fields, taken_pieces }
}

fn get_initial_fields() -> Vec<PieceFlags> {
    let mut fields = Vec::new();

    fields.push(PieceFlags::BLACK | PieceFlags::ROOK);
    fields.push(PieceFlags::BLACK | PieceFlags::KNIGHT);
    fields.push(PieceFlags::BLACK | PieceFlags::BISHOP);
    fields.push(PieceFlags::BLACK | PieceFlags::QUEEN);
    fields.push(PieceFlags::BLACK | PieceFlags::KING);
    fields.push(PieceFlags::BLACK | PieceFlags::BISHOP);
    fields.push(PieceFlags::BLACK | PieceFlags::KNIGHT);
    fields.push(PieceFlags::BLACK | PieceFlags::ROOK);

    for _ in 0..8 {
        fields.push(PieceFlags::BLACK | PieceFlags::PAWN);
    }

    for _ in 0..32 {
        fields.push(PieceFlags::empty());
    }

    for _ in 0..8 {
        fields.push(PieceFlags::WHITE | PieceFlags::PAWN);
    }

    fields.push(PieceFlags::WHITE | PieceFlags::ROOK);
    fields.push(PieceFlags::WHITE | PieceFlags::KNIGHT);
    fields.push(PieceFlags::WHITE | PieceFlags::BISHOP);
    fields.push(PieceFlags::WHITE | PieceFlags::QUEEN);
    fields.push(PieceFlags::WHITE | PieceFlags::KING);
    fields.push(PieceFlags::WHITE | PieceFlags::BISHOP);
    fields.push(PieceFlags::WHITE | PieceFlags::KNIGHT);
    fields.push(PieceFlags::WHITE | PieceFlags::ROOK);

    fields
}
