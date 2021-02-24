use wasm_bindgen::prelude::*;

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

bitflags! {
    struct PieceFlags: u8 {
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

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Copy, Clone, PartialEq)]
pub enum Color {
    Black,
    White
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
pub fn is_same_color(piece: Piece, color: Color) -> bool {
    let piece_color = get_color(piece);

    match piece_color {
        None => false,
        Some(c) => c == color,
    }
}

pub fn is_same_color_b(piece: &Piece, color: Color) -> bool {
    let piece_color = get_color_b(&piece);

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
pub fn is_other_color_or_empty(piece: Piece, color: Color) -> bool {
    let piece_color = get_color(piece);

    match piece_color {
        None => true,
        Some(c) => c != color,
    } 
}

#[wasm_bindgen]
#[derive(PartialEq, Serialize, Deserialize, Clone, Copy)]
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

#[wasm_bindgen]
#[derive(PartialEq, Serialize, Deserialize, Clone, Copy)]
pub struct Move {
    pub source: u8,
    pub target: u8,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct BoardState {
    pub fields: Vec<Piece>,
    pub taken_pieces: Vec<Piece>,
}

pub fn get_piece(color: Color, kind: Kind) -> Piece {
    match (color, kind) {
        (Color::White, Kind::Pawn) => Piece::WhitePawn,
        (Color::White, Kind::Bishop) => Piece::WhiteBishop,
        (Color::White, Kind::Knight) => Piece::WhiteKnight,
        (Color::White, Kind::King) => Piece::WhiteKing,
        (Color::White, Kind::Queen) => Piece::WhiteQueen,
        (Color::White, Kind::Rook) => Piece::WhiteRook,
        (Color::Black, Kind::Pawn) => Piece::BlackPawn,
        (Color::Black, Kind::Bishop) => Piece::BlackBishop,
        (Color::Black, Kind::Knight) => Piece::BlackKnight,
        (Color::Black, Kind::King) => Piece::BlackKing,
        (Color::Black, Kind::Queen) => Piece::BlackQueen,
        (Color::Black, Kind::Rook) => Piece::BlackRook,
        (_, Kind::None) => Piece::Empty,
    }
}

pub fn get_color (piece: Piece) -> Option<Color> {
    match piece {
        Piece::WhitePawn => Some(Color::White),
        Piece::WhiteBishop => Some(Color::White),
        Piece::WhiteKnight => Some(Color::White),
        Piece::WhiteKing => Some(Color::White),
        Piece::WhiteQueen => Some(Color::White),
        Piece::WhiteRook => Some(Color::White),
        Piece::BlackPawn => Some(Color::Black),
        Piece::BlackBishop => Some(Color::Black),
        Piece::BlackKnight => Some(Color::Black),
        Piece::BlackKing => Some(Color::Black),
        Piece::BlackQueen => Some(Color::Black),
        Piece::BlackRook => Some(Color::Black),
        Piece::Empty => None,
    }
}

pub fn get_color_b (piece: &Piece) -> Option<Color> {
    match piece {
        Piece::WhitePawn => Some(Color::White),
        Piece::WhiteBishop => Some(Color::White),
        Piece::WhiteKnight => Some(Color::White),
        Piece::WhiteKing => Some(Color::White),
        Piece::WhiteQueen => Some(Color::White),
        Piece::WhiteRook => Some(Color::White),
        Piece::BlackPawn => Some(Color::Black),
        Piece::BlackBishop => Some(Color::Black),
        Piece::BlackKnight => Some(Color::Black),
        Piece::BlackKing => Some(Color::Black),
        Piece::BlackQueen => Some(Color::Black),
        Piece::BlackRook => Some(Color::Black),
        Piece::Empty => None,
    }
}

#[wasm_bindgen]
pub fn get_kind(piece: Piece) -> Kind {
    match piece {
        Piece::WhitePawn => Kind::Pawn,
        Piece::WhiteBishop => Kind::Bishop,
        Piece::WhiteKnight => Kind::Knight,
        Piece::WhiteKing => Kind::King,
        Piece::WhiteQueen => Kind::Queen,
        Piece::WhiteRook => Kind::Rook,
        Piece::BlackPawn => Kind::Pawn,
        Piece::BlackBishop => Kind::Bishop,
        Piece::BlackKnight => Kind::Knight,
        Piece::BlackKing => Kind::King,
        Piece::BlackQueen => Kind::Queen,
        Piece::BlackRook => Kind::Rook,
        Piece::Empty => Kind::None,
    }
}

pub fn get_initial_board() -> BoardState {
    let fields = get_initial_fields();
    let taken_pieces = Vec::new();
    BoardState { fields, taken_pieces }
}

fn get_initial_fields() -> Vec<Piece> {
    let mut fields = Vec::new();
    for y in (0..8).rev() {
        for x in 0..8 {
            let black_piece = 
            if y == 7 || y == 0 {
                let inner = if x == 0 || x == 7 {
                    Piece::BlackRook
                } else if x == 1 || x == 6 {
                    Piece::BlackKnight
                } else if x == 2 || x == 5 {
                    Piece::BlackBishop
                } else if x == 3 {
                    Piece::BlackQueen
                } else if x == 4 {
                    Piece::BlackKing
                } else {
                    panic!("This cannot happen")
                };
                inner
            } else if y == 6 || y == 1 {
                Piece::BlackPawn
            } else {
                Piece::Empty
            };
            let piece = 
            if y == 1 || y == 0 {
                match black_piece {
                    Piece::BlackBishop => Piece::WhiteBishop,
                    Piece::BlackKing => Piece::WhiteKing,
                    Piece::BlackKnight => Piece::WhiteKnight,
                    Piece::BlackPawn => Piece::WhitePawn,
                    Piece::BlackQueen => Piece::WhiteQueen,
                    Piece::BlackRook => Piece::WhiteRook,
                    _default => Piece::Empty
                }
            } else {
                black_piece
            };

            fields.push(piece)
        }
    }

    fields
}
