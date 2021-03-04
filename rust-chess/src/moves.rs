
use crate::core::{
    BoardState,
    Color,
    GameResult,
    PieceFlags,
    is_other_color,
    is_other_color_or_empty,
    is_same_color_or_empty,
};

fn is_opponent_in_check(color: Color, board: &BoardState) -> bool {
    let other_king = color.other_color().to_flag() | PieceFlags::KING;
    
    board.fields.iter().enumerate().any(|(i, &f)| {
        if is_other_color_or_empty(f, color) { 
            false
        }
        else {
            let moves = calc_possible_moves_raw(i as u8, &board);
            moves.into_iter().any(|m| {
                let p = board.fields[m as usize];
                p == other_king
            })
        }
    })
}

pub fn calc_possible_moves(field_id: u8, board: &BoardState) -> Vec<u8> {
    let moves = calc_possible_moves_raw(field_id, board);

    let piece = board.fields[field_id as usize];
    let color = Color::from_flag(piece).unwrap();

    let mut valid_moves = Vec::new();

    // check for each move if it results in check
    for m in moves {
        let mut new_board = board.clone();
        
        move_piece(field_id, m, &mut new_board);

        // TODO optimise this away in AI - use raw method in AI

        if !is_opponent_in_check(color.other_color(), &new_board) {
            valid_moves.push(m);
        }
    }

    return valid_moves;
}

pub fn calc_possible_moves_raw(field_id: u8, board: &BoardState) -> Vec<u8> {
    let piece = board.fields[field_id as usize];

    let mut moves = Vec::new();

    if piece.contains(PieceFlags::PAWN) {
        let mut pawn_moves = get_pawn_moves(field_id, board);
        moves.append(&mut pawn_moves);
    }
    if piece.intersects(PieceFlags::BISHOP | PieceFlags::QUEEN) {
        moves.append(&mut get_standard_moves(field_id, board, DIAGONAL_DIRS.iter(), 8));
    }
    if piece.intersects(PieceFlags::ROOK | PieceFlags::QUEEN) {
        moves.append(&mut get_standard_moves(field_id, board, VERTICAL_DIRS.iter(), 8));
    }
    if piece.contains(PieceFlags::KING) {
        moves.append(&mut get_standard_moves(field_id, board, DIAGONAL_DIRS.iter(), 1));
        moves.append(&mut get_standard_moves(field_id, board, VERTICAL_DIRS.iter(), 1));
    }
    if piece.contains(PieceFlags::KNIGHT) {
        moves.append(&mut get_standard_moves(field_id, board, KNIGHT_MOVES.iter(), 1));
    }

    return moves;
}

fn get_pawn_moves(field_id: u8, board: &BoardState) -> Vec<u8> {
    let mut moves = Vec::new();
    let piece = board.fields[field_id as usize];
    let color = Color::from_flag(piece).unwrap();

    //normal move forward
    let forward_offset: i8 = if color == Color::White { -1 } else { 1 };
    let forward_id = (field_id as i8) + 8 * forward_offset;
    if board.fields[forward_id as usize].is_empty() {
        moves.push(forward_id as u8);

        //check double forward
        if (color == Color::White && field_id >= 8 * 6) || (color == Color::Black && field_id < 2 * 8) {
            let double_forward_id = (field_id as i8) + 16 * forward_offset;
            if board.fields[double_forward_id as usize].is_empty() {
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

fn get_standard_moves(field_id: u8, board: &BoardState, dirs: std::slice::Iter<(i8, i8)>, max_steps: i8) -> Vec<u8> {
    let mut moves = Vec::new();

    let piece = board.fields[field_id  as usize];
    let color = Color::from_flag(piece).unwrap();

    for (x,y) in dirs {
        let mut count : i8 = 1;
        while count <= max_steps {
            let pos = get_position(field_id, x * count, y * count);
            
            if pos.is_none() {
                break;
            }
            let unwrapped_pos = pos.unwrap();

            let p = board.fields[unwrapped_pos as usize];
            if p.is_empty() {
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

pub fn move_piece(from: u8, to: u8, board: &mut BoardState) -> (u8, PieceFlags, u8, PieceFlags) {
    let piece = board.fields[from as usize];
    board.fields[from as usize] = PieceFlags::empty();
    // add "to" piece to taken pieces
    let old_piece = board.fields[to as usize];
    if !old_piece.is_empty() {
        board.taken_pieces.push(old_piece);
    }

    let mut transformed_piece = piece;
    // transform pawns to queens
    if transformed_piece.contains(PieceFlags::PAWN)
    {
        if (to <= 7 && transformed_piece.contains(PieceFlags::WHITE)) || (to >= 7*8 && transformed_piece.contains(PieceFlags::BLACK)) {
            transformed_piece.remove(PieceFlags::PAWN);
            transformed_piece.insert(PieceFlags::QUEEN);
        }
    }
    board.fields[to as usize] = piece;

    (from, piece, to, old_piece)
}

pub fn undo_move_piece(undo_info: (u8, PieceFlags, u8, PieceFlags), board: &mut BoardState) {
    if !undo_info.3.is_empty() {
        board.taken_pieces.pop();
    }

    board.fields[undo_info.0 as usize] = undo_info.1;
    board.fields[undo_info.2 as usize] = undo_info.3;
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
