import { randomNumberRange, MoveValidity, MoveResult, Direction } from './common';
import { BoardCell } from './board-cell'; 
import { Board } from './board';
import { ScoreBoard } from './scoreboard';

export class GreedPlayer {

    board!: any;
    scoreboard!: any;
    gameover: boolean;

    constructor() {
        this.board = new Board(68,21);
        this.scoreboard = new ScoreBoard(this.board);
        this.gameover = true;
    }

    startNewGame() {
        this.board = new Board(68,21);
        this.scoreboard = new ScoreBoard(this.board);
        this.gameover = false;
    }

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

        if ( this.gameover ) console.log("Game over!");
        return this.gameover;
    }

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