use std::cmp;
use web_sys::console;

use crate::core::{
    Move,
    BoardState,
    is_same_color,
    Color,
    get_coord,
    PieceFlags
};

use crate::moves::{
    move_piece,
    calc_possible_moves_raw,
    undo_move_piece
};

fn order_moves(moves: Vec<Move>, board: &BoardState) -> Vec<Move> {
    let mut moves_and_values: Vec<(Move, i32)> = moves.into_iter().map(|m| {
        let target_value = calc_piece_value(board.fields[m.target as usize], m.target);
        let source_value = calc_piece_value(board.fields[m.source as usize], m.source);
        (m, target_value - source_value)
    }).collect();

    moves_and_values.sort_unstable_by(|(_, v1), (_, v2)| {
         v2.cmp(v1)
    });

    return moves_and_values.into_iter().map(|(m, _v)| { m }).collect();
}

const PIECE_SQUARE_TABLE_PAWN: [i32; 64] = [ 
    0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0
];

const PIECE_SQUARE_TABLE_KNIGHT: [i32; 64] = [
    -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50,
];

const PIECE_SQUARE_TABLE_BISHOP: [i32; 64] = [
    -20,-10,-10,-10,-10,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -10,  0,  5, 10, 10,  5,  0,-10,
    -10,  5,  5, 10, 10,  5,  5,-10,
    -10,  0, 10, 10, 10, 10,  0,-10,
    -10, 10, 10, 10, 10, 10, 10,-10,
    -10,  5,  0,  0,  0,  0,  5,-10,
    -20,-10,-10,-10,-10,-10,-10,-20,
];

const PIECE_SQUARE_TABLE_ROOK: [i32; 64] = [
    0,  0,  0,  0,  0,  0,  0,  0,
    5, 10, 10, 10, 10, 10, 10,  5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
    0,  0,  0,  5,  5,  0,  0,  0
];

const PIECE_SQUARE_TABLE_QUEEN: [i32; 64] = [
    -20,-10,-10, -5, -5,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -10,  0,  5,  5,  5,  5,  0,-10,
     -5,  0,  5,  5,  5,  5,  0, -5,
      0,  0,  5,  5,  5,  5,  0, -5,
    -10,  5,  5,  5,  5,  5,  0,-10,
    -10,  0,  5,  0,  0,  0,  0,-10,
    -20,-10,-10, -5, -5,-10,-10,-20
];

const PIECE_SQUARE_TABLE_KING: [i32; 64] = [
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -20,-30,-30,-40,-40,-30,-30,-20,
    -10,-20,-20,-20,-20,-20,-20,-10,
    20, 20,  0,  0,  0,  0, 20, 20,
    20, 30, 10,  0,  0, 10, 30, 20
];

fn calc_piece_value(piece: PieceFlags, position: u8) -> i32 {
    if piece.is_empty() {
        return 0;
    }
    let index = if piece.contains(PieceFlags::BLACK) {
        // mirror position around center
        let old_x = position % 8;
        let old_y = position / 8;

        ((7 - old_y) * 8 + old_x) as usize
    } else
    {
        position as usize
    };

    if piece.contains(PieceFlags::PAWN) {
        100 + PIECE_SQUARE_TABLE_PAWN[index]
    }
    else if piece.contains(PieceFlags::BISHOP) {
        300 + PIECE_SQUARE_TABLE_BISHOP[index]
    }
    else if piece.contains(PieceFlags::KNIGHT) {
        300 + PIECE_SQUARE_TABLE_KNIGHT[index]
    }
    else if piece.contains(PieceFlags::ROOK) {
        500 + PIECE_SQUARE_TABLE_ROOK[index]
    }
    else if piece.contains(PieceFlags::QUEEN) {
        900 + PIECE_SQUARE_TABLE_QUEEN[index]
    }
    else if piece.contains(PieceFlags::KING) {
        10000 + PIECE_SQUARE_TABLE_KING[index]
    }
    else {
        panic!("No piece left - this should not happen")
    }
}

fn calc_board_value(board: &BoardState) -> i32 {
    board.fields.iter().enumerate().map(|(i, &p)| {
        let sign = if is_same_color(p, Color::Black) { 1 } else { -1 };
        return sign * calc_piece_value(p, i as u8);
    }).sum()
}

fn all_moves(board: &BoardState, color: Color) -> Vec<Move> {
    let filtered = board.fields.iter().enumerate().filter_map(|(i, p)| {
        if is_same_color(*p, color)
        {
            Some(i as u8)
        }
        else
        {
            None
        }
    });
    
    let all_moves = filtered.flat_map(|field_id| {
        let moves = calc_possible_moves_raw(field_id, board);
        moves.into_iter().map(move |m| { Move {source: field_id, target: m} })
    }).collect();

    all_moves
}

pub fn calculate_best_move(board: &BoardState) -> (Move, i32) {
    let window = web_sys::window().expect("should have a window in this context");
    let performance = window
        .performance()
        .expect("performance should be available");

    let start = performance.now();

    let mut board_to_calculate = board.clone();

    let wrapped_selected_move = calculate_best_half_move(Color::Black, &mut board_to_calculate, 6, -99999, 99999);
    // This should never panic
    let selected_move = wrapped_selected_move.unwrap();
    let end = performance.now();
    console::log_3(&"Selected move: ".into(), &get_coord(selected_move.0.source).into(), &get_coord(selected_move.0.target).into());
    console::log_2(&"Time: ${} ms".into(), &((end - start)).into());

    return selected_move;
}

fn calculate_best_half_move(turn: Color, board: &mut BoardState, depth: u8, _alpha: i32, _beta: i32) -> Option<(Move, i32)> {
    let valid_moves = all_moves(board, turn);
    let ordered_moves = order_moves(valid_moves, board);

    if ordered_moves.len() < 1 {
        return None
    }

    // black turn -> search highest possible score
    // white turn -> search lowest possible score

    let mut best_move: (Move, i32) = (ordered_moves[0], if turn == Color::Black { -99999 } else { 99999 });

    let mut alpha = _alpha;
    let mut beta = _beta; 

    for m in &ordered_moves {
        // do move
        // console::log_3(&"Try move".into(), &m.source.into(), &m.target.into());
        let undo_info = move_piece(m.source, m.target, board);

        //moveCount += 1;
        let score;
        // console::log_2(&"Depth".into(), &depth.into());
        if depth > 1 {
            // console::log_1(&"Go deeper".into());
            let result = calculate_best_half_move(turn.other_color(), board, depth - 1, alpha, beta);

            match result {
                Some(r) => score = r.1,
                None => {
                    undo_move_piece(undo_info, board);
                    continue;
                }
            }
        } else {
            score = calc_board_value(&board);
        }

        undo_move_piece(undo_info, board);

        // console::log_2(&"Score".into(), &score.into());
        if turn == Color::Black {
            if score > best_move.1 {
                best_move = (*m, score);
            }
            alpha = cmp::max(alpha, best_move.1)
        } else {
            if score < best_move.1 {
                best_move = (*m, score);
            }
            beta = cmp::min(beta, best_move.1)
        }

        if alpha >= beta {
            //console.log("cutoff")
            break;
        }
    }
    // console::log_4(&"Selected move".into(), &best_move.0.source.into(), &best_move.0.target.into(),  &best_move.1.into());

    Some(best_move)
}
