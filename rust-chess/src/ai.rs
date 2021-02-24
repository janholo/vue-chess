use std::cmp;
use web_sys::console;

use crate::core::{
    Move,
    BoardState,
    Piece,
    is_same_color,
    Color,
    get_kind,
    Kind,
    is_same_color_b,
    GameResult,
    get_coord,
    other_color
};

use crate::moves::{
    calc_possible_moves,
    move_piece,
    check_game_state
};

fn order_moves(moves: &Vec<Move>, board: &BoardState) -> Vec<Move> {
    let mut moves_and_values: Vec<(Move, i32)> = moves.into_iter().map(|m| {
        let target_value = calc_piece_value(board.fields[m.target as usize], m.target);
        let source_value = calc_piece_value(board.fields[m.source as usize], m.source);
        (m.clone(), target_value - source_value)
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

fn calc_piece_value(piece: Piece, position: u8) -> i32 {
    if piece == Piece::Empty {
        return 0;
    }
    let index = if is_same_color(piece, Color::Black) {
        // mirror position around center
        let old_x = position % 8;
        let old_y = position / 8;

        ((7 - old_y) * 8 + old_x) as usize
    } else
    {
        position as usize
    };

    let kind = get_kind(piece);
    match kind {
        Kind::None => {
            0
        }
        Kind::Pawn => {
            100 + PIECE_SQUARE_TABLE_PAWN[index]
        }
        Kind::Bishop => {
            300 + PIECE_SQUARE_TABLE_BISHOP[index]
        }
        Kind::Knight => {
            300 + PIECE_SQUARE_TABLE_KNIGHT[index]
        }
        Kind::Rook => {
            500 + PIECE_SQUARE_TABLE_ROOK[index]
        }
        Kind::Queen => {
            900 + PIECE_SQUARE_TABLE_QUEEN[index]
        }
        Kind::King => {
            0 + PIECE_SQUARE_TABLE_KING[index]
        }
    }
}

fn calc_piece_value_without_table(piece: Piece, _position: u8) -> i32 {
    let kind = get_kind(piece);
    match kind {
        Kind::None => {
            0
        }
        Kind::Pawn => {
            100
        }
        Kind::Bishop => {
            300
        }
        Kind::Knight => {
            300
        }
        Kind::Rook => {
            500
        }
        Kind::Queen => {
            900
        }
        Kind::King => {
            0
        }
    }
}

fn calc_board_value(board: &BoardState) -> i32 {
    board.fields.iter().enumerate().map(|(i, &p)| {
        let sign = if is_same_color(p, Color::Black) { 1 } else { -1 };
        return sign * calc_piece_value_without_table(p, i as u8);
    }).sum()
}

fn all_moves(board: &BoardState, color: Color) -> Vec<Move> {
    // let pieces = get_field_ids_of_pieces(color, board);

    // let all_moves = pieces.into_iter().flat_map(|field_id| {
    //     let moves = calc_possible_moves(field_id, board);
    //     wrap_moves(moves, field_id)
    // }).collect();

    // all_moves

    let filtered = board.fields.iter().enumerate().filter_map(|(i, p)| {
        if is_same_color_b(p, color)
        {
            Some(i as u8)
        }
        else
        {
            None
        }
    });
    
    let all_moves = filtered.flat_map(|field_id| {
        let moves = calc_possible_moves(field_id, board);
        moves.into_iter().map(move |m| { Move {source: field_id, target: m} })
    }).collect();

    all_moves
}

fn do_ai_move(source: u8, target: u8, board: &mut BoardState, turn: Color) -> GameResult {
    move_piece(source, target, board);

    check_game_state(board, turn)
}

pub fn calculate_best_move(board: &BoardState) -> (Move, i32) {
    let window = web_sys::window().expect("should have a window in this context");
    let performance = window
        .performance()
        .expect("performance should be available");

    let start = performance.now();
    let selected_move = calculate_best_half_move(Color::Black, board, 1, -99999, 99999);
    let end = performance.now();
    console::log_3(&"Selected move: ".into(), &get_coord(selected_move.0.source).into(), &get_coord(selected_move.0.target).into());
    console::log_2(&"Time: ${} ms".into(), &((end - start)).into());

    return selected_move;
}

fn calculate_best_half_move(turn: Color, board: &BoardState, depth: u8, _alpha: i32, _beta: i32) -> (Move, i32) {
    let window = web_sys::window().expect("should have a window in this context");
    let performance = window
    .performance()
    .expect("performance should be available");

    let n = 100;

    let mark1 = performance.now();
    for _ in 0..n 
    {
        let valid_moves = all_moves(board, turn);
    }
    let valid_moves = all_moves(board, turn);
    let mark2 = performance.now();
    for _ in 0..n 
    {
        let ordered_moves = order_moves(&valid_moves, board);
    }
    let ordered_moves = order_moves(&valid_moves, board);

    // black turn -> search highest possible score
    // white turn -> search lowest possible score
    
    let mark3 = performance.now();

    let mut real_best_move = (ordered_moves[0], if turn == Color::Black { -99999 } else { 99999 });

    for _ in 0..n 
    {
        let mut best_move: (Move, i32) = (ordered_moves[0], if turn == Color::Black { -99999 } else { 99999 });

        let mut alpha = _alpha;
        let mut beta = _beta; 

        for m in &ordered_moves {
            // do move
            // console::log_3(&"Try move".into(), &m.source.into(), &m.target.into());
            let mut new_board_state = board.clone();
            let result = do_ai_move(m.source, m.target, &mut new_board_state, turn);
            //moveCount += 1;
            if result == GameResult::WhiteWin {
                if turn == Color::Black {
                    panic!("white win while black turn")
                } else {
                    return (m.clone(), -99999);
                }
            }
            if result == GameResult::BlackWin {
                if turn == Color::Black {
                    return (m.clone(), 99999);
                } else {
                    panic!("black win while white turn")
                }
            }
            let score;
            // console::log_2(&"Depth".into(), &depth.into());
            if result == GameResult::Draw {
                score = 0;
            } else if depth > 1 {
                // console::log_1(&"Go deeper".into());
                let result = calculate_best_half_move(other_color(turn), &new_board_state, depth - 1, alpha, beta);

                score = result.1;
            } else {
                score = calc_board_value(&new_board_state);
            }
            // console::log_2(&"Score".into(), &score.into());
            if turn == Color::Black {
                if score > best_move.1 {
                    best_move = (m.clone(), score);
                }
                alpha = cmp::max(alpha, best_move.1)
            } else {
                if score < best_move.1 {
                    best_move = (m.clone(), score);
                }
                beta = cmp::min(beta, best_move.1)
            }

            real_best_move = best_move;

            if alpha >= beta {
                //console.log("cutoff")
                break;
            }
        }
    }
    let mark4 = performance.now();

    console::log_2(&"all moves".into(), &(mark2 - mark1).into());
    console::log_2(&"order moves".into(), &(mark3 - mark2).into());
    console::log_2(&"do moves".into(), &(mark4 - mark3).into());

    // console::log_4(&"Selected move".into(), &best_move.0.source.into(), &best_move.0.target.into(),  &best_move.1.into());

    return real_best_move;
}
