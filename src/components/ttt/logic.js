
export const X = "X"
export const O = "O"
export const EMPTY = null;

class MinimaxObj {
    /**
     * 
     * @param {Number} value 
     * @param {Array} move structured as `[i, j]`
     */
    constructor(value, move) {
        this.value = value;
        this.move = move;
    }

    getValue() {
        return this.value;
    }

    getMove() {
        return this.move;
    }
}

/**
 * Accepts no argument and returns starting state of the board.
 */
export function initial_state() {
    return [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
    ]
}

/**
 * Returns the player who has the next turn on a board.
 * @param {Array} board 
 */
export function player(board) {
    let xCounter = 0;
    let oCounter = 0;

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] === X) {
                xCounter++;
            } else if (board[i][j] === O) {
                oCounter++;
            }
        }
    }

    if (xCounter > oCounter) {
        return O;
    } else {
        return X;
    }

}

/**
 * Returns set of all possible actions [i, j] available on the board.
 * @param {Array} board 
 */
export function actions(board) {
    let possibleActions = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === EMPTY) {
                possibleActions.push([i, j]);
            }
        }
    }
    return possibleActions;
}

/**
 * 
 * @param {Array} board 
 * @param {Array} action structured as `[i, j]`
 * @returns 
 */
export function result(board, action) {
    let result = [[], [], []];
    // deepcopying the board
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            result[i][j] = board[i][j]
        }
    }
    result[action[0]][action[1]] = player(board);
    return result;
}

/**
 * Returns the winner of the game, if there is one, and null otherwise.
 * @param {Array} board 
 */
export function winner(board) {
    const h = check_horizontally(board);
    const v = check_vertically(board);
    const d = check_diagonally(board);
    if (not_null(h, v, d)) {
        if (h === X || v === X || d === X) {
            return X;
        } else {
            return O;
        }
    } else {
        return null;
    }
}

/**
 * Returns `true` if the game is over, `false` otherwise.
 * @param {Array} board 
 */
export function terminal(board) {
    return (winner(board) !== null || full(board));
}

/**
 * Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
 * @param {Array} board 
 * @returns `1 || 0 || -1`
 */
export function utility(board) {
    if (winner(board) === X) {
        return 1;
    } else if (winner(board) === O) {
        return -1;
    } else {
        return 0;
    }
}

/**
 * Returns the optimal action for the current player on the board.
 * @param {Array} board 
 */
export function minimax(board) {
    const curr_player = player(board);
    if (terminal(board)) {
        return null;
    } 
    if (curr_player === X) {
        const optimal = max_value(board);
        return optimal.getMove();
    } else {
        const optimal = min_value(board);
        return optimal.getMove();
    }
    
}

/**
 * Gets the move with highest value for the given board
 * @param {Array} board 
 */
export function max_value(board) {
    if (terminal(board)) {
        return new MinimaxObj(utility(board), null);
    } 
    let curr_best = Number.NEGATIVE_INFINITY;
    let optimal_move = null;

    const possibleActions = actions(board);
    for (let i = 0; i < possibleActions.length; i++) {
        let action = possibleActions[i];
        let buffer = min_value(result(board, action));
        let v = buffer.getValue();
        if (v > curr_best) {
            curr_best = v;
            optimal_move = action;
            if (curr_best === 1) {
                return new MinimaxObj(curr_best, optimal_move);
            }
        }
    }
    return new MinimaxObj(curr_best, optimal_move);
}

/**
 * Gets the move with lowest value for the given board
 * @param {Array} board 
 */
 export function min_value(board) {
    if (terminal(board)) {
        return new MinimaxObj(utility(board), null);
    } 
    let curr_best = Number.POSITIVE_INFINITY;
    let optimal_move = null;

    const possibleActions = actions(board);
    for (let i = 0; i < possibleActions.length; i++) {
        let action = possibleActions[i];
        let buffer = max_value(result(board, action));
        let v = buffer.getValue();
        if (v < curr_best) {
            curr_best = v;
            optimal_move = action;
            if (curr_best === -1) {
                return new MinimaxObj(curr_best, optimal_move);
            }
        }
    }
    return new MinimaxObj(curr_best, optimal_move);
}

/**
 * Returns `true` if the board is full, and `false` otherwise
 * @param {Array} board 
 */
export function full(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}


/* ====================================================================== */
                    /* Below are some helper export functions */

/**
 * Checks for any three-in-a-row horizontally, return the winner if there is one, null otherwise
 * @param {Array} board 
 */
export function check_horizontally(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== EMPTY) {
            if (board[i][0] === X) {
                return X;
            } else {
                return O;
            }
        }
    }
    return null;
}

/**
 * Checks for any three-in-a-row vertically, return the winner if there is one, null otherwise
 * @param {Array} board 
 */
export function check_vertically(board) {
    for (var k = 0; k < board.length; k++) {
        if (board[0][k] === board[1][k] && board[1][k] === board[2][k] && board[0][k] !== EMPTY) {
            if (board[0][k] === X) {
                return X;
            } else {
                return O;
            }
        }
    }
    return null;
}

/**
 * Checks for any three-in-a-row diagonally, return the winner if there is one, null otherwise
 * @param {Array} board 
 */
 export function check_diagonally(board) {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== EMPTY) {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[2][0] === board[0][2] && board[0][2] !== EMPTY) {
        return board[0][2];
    }
    return null;
}


function not_null(a, b, c) {
    const args = [a, b, c];
    for (var i = 0; i < args.length; i++) {
        if (args[i] !== null) {
            return true;
        }
    }
    return false;
}
