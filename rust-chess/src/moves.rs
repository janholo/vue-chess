
use crate::core::{
    BoardState,
    Color,
    Kind,
    Piece,
    GameResult,
    is_other_color,
    is_other_color_or_empty,
    is_same_color_or_empty,
    get_piece,
    other_color,
    get_color,
    get_kind
};

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

pub fn calc_possible_moves(field_id: u8, board: &BoardState) -> Vec<u8> {
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
        let mut pawn_moves = get_pawn_moves(field_id, board);
        moves.append(&mut pawn_moves);
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
    let forward_offset: i8 = if color == Color::White { -1 } else { 1 };
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

pub fn move_piece(from: u8, to: u8, board: &mut BoardState) {
    let mut piece = board.fields[from as usize];
    board.fields[from as usize] = Piece::Empty;
    // console::log_1(&"Piece".into());
    // console::log_1(&JsValue::from_serde(&piece).unwrap());
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

    // console::log_1(&from.into());
    // console::log_1(&to.into());
    board.fields[to as usize] = piece;
    // console::log_1(&JsValue::from_serde(&board.fields[to as usize]).unwrap());
}

pub fn check_game_state(board: &BoardState, turn: Color) -> GameResult {
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
