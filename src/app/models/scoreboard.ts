import { MoveResult, MoveValidity } from './common';
import { Board } from './board'
export class ScoreBoard {

    /**
     * Max number of cells possible to clear. Calculated by board width * board height.
     */
    maxCount: number;

    /**
     * Current number of cells cleared.
     */
    curCount: number;

    /**
     * Number of moves taken so far.
     */
    numMoves: number;

    /**
     * Current score, or the sum of the values of the cells cleared.
     */
    score: number;

    /**
     * Last move. For the status line.
     */
    lastMove: any;

    /**
     * Constructor.
     * @param board The Board being scored.
     */
    constructor( board: Board ) {
        this.maxCount = board.width * board.height;
        this.curCount = 0;
        this.numMoves = 0;
        this.score = 0;
    }

    /**
     * Submits a MoveResult to the board. Ideally even invalid moves should be
     * submitted so the status bar can display hints.
     * @param move The move to tally.
     */
    submitMove(move: MoveResult) {
        this.lastMove = move;
        if ( move.result == MoveValidity.VALID) {
            this.curCount += move.count;
            this.score    += move.score;
            this.numMoves ++;
        }
    }
}