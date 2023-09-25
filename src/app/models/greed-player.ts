import { randomIntRange, MoveValidity, MoveResult, Direction } from './common';
import { BoardCell } from './board-cell'; 
import { Board } from './board';
import { ScoreBoard } from './scoreboard';

export class GreedPlayer {

    /**
     * Instance of the Board model object. Created JIT at game start.
     */
    board!: any;// Memoize a second source of random and reduce random() calls.

    /**
     * Instance of the ScoreBoard model object. Created JIT at game start.
     */
    scoreboard!: any;

    /**
     * Whether or not the player is in a gameover state. Prevents moves from being submitted,
     * used as a state flag for the view components.
     */
    gameover: boolean;

    /**
     * Constructor. Simply starts off the player in gameover. Since none of the other
     * model members are constructed yet, this prevents any interaction with undefined 
     * objects.
     */
    constructor() {
        this.board = new Board(1,1);  // TODO: can optimize memory usage by not instantiating dummy instances.
        this.scoreboard = new ScoreBoard(this.board);
        this.gameover = true;
    }

    /**
     * Starts a new game, creating a new board and scoreboard for the occasion.
     */
    startNewGame() {
        this.board = new Board(68,21);
        this.scoreboard = new ScoreBoard(this.board);
        this.gameover = false;
    }

    /**
     * Checks to see if there are any valid moves from the current configuration. If not, the gameover
     * flag is set and true is returned. False otherwise.
     * @returns Whether or not the player is in a gameover state.
     */
    checkForGameOver() {
        // Shortcut out if we don't need to check.
        if ( this.gameover ) return this.gameover;

        // OR all possibilities together. Sum Of Products, or whatever.
        let hasValidMove = false;
        hasValidMove = hasValidMove || this.board.checkMoveValidity(Direction.N)  == MoveValidity.VALID;
        hasValidMove = hasValidMove || this.board.checkMoveValidity(Direction.S)  == MoveValidity.VALID;
        hasValidMove = hasValidMove || this.board.checkMoveValidity(Direction.E)  == MoveValidity.VALID;
        hasValidMove = hasValidMove || this.board.checkMoveValidity(Direction.W)  == MoveValidity.VALID;
        hasValidMove = hasValidMove || this.board.checkMoveValidity(Direction.NE) == MoveValidity.VALID;
        hasValidMove = hasValidMove || this.board.checkMoveValidity(Direction.NW) == MoveValidity.VALID;
        hasValidMove = hasValidMove || this.board.checkMoveValidity(Direction.SE) == MoveValidity.VALID;
        hasValidMove = hasValidMove || this.board.checkMoveValidity(Direction.SW) == MoveValidity.VALID;
        this.gameover = !hasValidMove;

        return this.gameover;
    }

    /**
     * Attempts a move on the board. This is typically called from the view/controller hybrid known
     * as an angular frontend component... (greed-player-component)
     * @param d The Direction to attempt to travel.
     */
    attemptMove(d: Direction) {

        // Just in case.
        if ( this.gameover ) return;
        
        // Try to jog in the given direction.
        let result = this.board.jogCursor(d);

        // Submit the result to the scoreboard.
        this.scoreboard.submitMove(result);

        // See if this is game over or not.
        this.checkForGameOver();

    }




    
}