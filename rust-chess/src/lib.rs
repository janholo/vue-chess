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
pub fn is_other_color_or_empty(piece: Piece, color: Color) -> bool {
    let piece_color = get_color(piece);

    match piece_color {
        None => true,
        Some(c) => c != color,
    } 
}

#[wasm_bindgen]
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

#[wasm_bindgen]
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
pub struct Move {
    pub source: u8,
    pub target: u8,
}

#[wasm_bindgen]
pub fn new_move(source: u8, target: u8) -> Move {
    Move {source, target}
}

#[derive(Serialize, Deserialize, Clone)]
pub struct BoardState {
    pub fields: Vec<Piece>,
    pub taken_pieces: Vec<Piece>,
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

#[wasm_bindgen]
pub fn get_initial_board_js() -> JsValue {
    let board = get_initial_board();

    JsValue::from_serde(&board).unwrap()
}

fn get_field_ids_of_pieces(color: Color, board: &BoardState) -> Vec<u8> {
    let mut ids = Vec::new();

    for field_id in 0..64 {
        let piece = board.fields[field_id];
        if is_same_color(piece, color) {
            ids.push(field_id as u8);
        }
    }

    ids
}

fn is_opponent_in_check(color: Color, board: &BoardState) -> bool {
    let check = board.fields.iter().enumerate().any(|(i, &f)| {
        if is_other_color_or_empty(f, color) { 
            false
        }
        else {
            let moves = calc_possible_moves_raw(i as u8, &board);
            let color_king = get_piece(other_color(color), Kind::King);
            moves.into_iter().any(|m| {
                let p = board.fields[m as usize];
                p == color_king
            })
        }
    });
    
    check
}

fn calc_possible_moves(field_id: u8, board: &BoardState) -> Vec<u8> {
    let moves = calc_possible_moves_raw(field_id, board);

    let piece = board.fields[field_id as usize];
    let color = get_color(piece).unwrap();

    let mut valid_moves = Vec::new();

    // check for each move if it result in check
    for m in moves {
        let mut new_board = board.clone();
        
        move_piece(field_id, m, &mut new_board);

        if !is_opponent_in_check(other_color(color), &new_board) {
            valid_moves.push(m);
        }
    }

    return valid_moves;
}

fn calc_possible_moves_raw(field_id: u8, board: &BoardState) -> Vec<u8> {
    let piece = board.fields[field_id as usize];
    let kind = get_kind(piece);

    let mut moves = Vec::new();

    if kind == Kind::Pawn {
        moves.append(&mut get_pawn_moves(field_id, board));
    }
    if kind == Kind::Bishop || kind == Kind::Queen {
        moves.append(&mut get_standard_moves(field_id, board, DIAGONAL_DIRS.to_vec(), 8));
    }
    if kind == Kind::Rook || kind == Kind::Queen {
        moves.append(&mut get_standard_moves(field_id, board, VERTICAL_DIRS.to_vec(), 8));
    }
    if kind == Kind::King {
        moves.append(&mut get_standard_moves(field_id, board, DIAGONAL_DIRS.to_vec(), 1));
        moves.append(&mut get_standard_moves(field_id, board, VERTICAL_DIRS.to_vec(), 1));
    }
    if kind == Kind::Knight {
        moves.append(&mut get_standard_moves(field_id, board, KNIGHT_MOVES.to_vec(), 1));
    }

    return moves;
}

fn get_pawn_moves(field_id: u8, board: &BoardState) -> Vec<u8> {
    let mut moves = Vec::new();
    let piece = board.fields[field_id as usize];
    let color = get_color(piece).unwrap();

    //normal move forward
    let forward_offset: i8 = if color == Color::White { 1 } else { -1 };
    let forward_id = (field_id as i8) + 8 * forward_offset;
    if board.fields[forward_id as usize] == Piece::Empty {
        moves.push(forward_id as u8);

        //check double forward
        if (color == Color::White && field_id >= 8 * 6) || (color == Color::Black && field_id < 2 * 8) {
            let double_forward_id = (field_id as i8) + 16 * forward_offset;
            if board.fields.get(double_forward_id as usize) == Some(&Piece::Empty) {
                moves.push(double_forward_id as u8);
            }
        }
    }

    //take to the right
    let take_left = get_position(field_id, -1, forward_offset);
    if can_take(take_left, color, &board) {
        moves.push(take_left.unwrap());
    }
    let take_right = get_position(field_id, 1, forward_offset);
    if can_take(take_right, color, &board) {
        moves.push(take_right.unwrap());
    }

    return moves;
}

const VERTICAL_DIRS: [(i8,i8); 4] = [(1,0),(0,1),(-1,0),(0,-1)];
const DIAGONAL_DIRS: [(i8,i8); 4] = [(1,1),(1,-1),(-1,1),(-1,-1)];
const KNIGHT_MOVES: [(i8,i8); 8] = [(2,1),(2,-1),(-2,1),(-2,-1),(1,2),(1,-2),(-1,2),(-1,-2)];

fn get_standard_moves(field_id: u8, board: &BoardState, dirs: Vec<(i8, i8)>, max_steps: u8) -> Vec<u8> {
    let mut moves = Vec::new();

    let piece = board.fields[field_id  as usize];
    let color = get_color(piece).unwrap();

    for (x,y) in dirs.into_iter() {
        let mut count = 1;
        while count <= max_steps {
            let pos = get_position(field_id, x * count as i8, y * count as i8);
            if pos.is_none() {
                break;
            }
            let unwrapped_pos = pos.unwrap();

            let p = board.fields[unwrapped_pos as usize];
            if p == Piece::Empty {
                moves.push(unwrapped_pos);
            } else if can_take(pos, color, board) {
                moves.push(unwrapped_pos);
                break;
            } else {
                break;
            }
            count = count + 1;
        }
    }

    moves
}


fn can_take(pos: Option<u8>, turn: Color, board: &BoardState) -> bool {
    match pos {
        None => false,
        Some(p) => {
            let p = board.fields[p as usize];
            is_other_color(p, turn)
        }
    }
}

fn get_position(field_id: u8, x: i8, y: i8) -> Option<u8> {
    let target_x = (field_id % 8) as i8 + x;
    let target_y = (field_id / 8) as i8 + y;
    if target_x < 0 || target_x >= 8 || target_y < 0 || target_y >= 8 {
        None
    } else {
        let pos = target_y * 8 + target_x;
        Some(pos as u8)
    }
}

fn move_piece(from: u8, to: u8, board: &mut BoardState) {
    let mut piece = board.fields[from as usize];
    board.fields[from as usize] = Piece::Empty;
    // add "to" piece to taken pieces
    let old_piece = board.fields[to as usize];
    if old_piece != Piece::Empty {
        board.taken_pieces.push(old_piece);
    }

    // transform pawns to queens
    if to / 8 == 0 && piece == Piece::WhitePawn {
        piece = Piece::WhiteQueen;
    }
    
    if to / 8 == 7 && piece == Piece::BlackPawn {
        piece = Piece::BlackQueen;
    }

    board.fields[to as usize] = piece;
}

fn check_game_state(board: &BoardState, turn: Color) -> GameResult {
    let check = is_opponent_in_check(turn, board);

    let moves_possible = board.fields.iter().enumerate().any(|(i, &f)| {
        if is_same_color_or_empty(f, turn) { 
            false
        } else {
            let moves = calc_possible_moves(i as u8, board);
            moves.len() > 0
        }
    });

    if !moves_possible {
        if check {
            if turn == Color::White { 
                GameResult::WhiteWin
            } else { 
                GameResult::BlackWin
            }
        } else {
            GameResult::Draw
        }
    } else {
        GameResult::Pending
    }
}
