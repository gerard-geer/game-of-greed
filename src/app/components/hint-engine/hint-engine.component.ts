import { Component, Input, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GreedPlayer } from 'src/app/models/greed-player';
import { Direction, MoveResult, MoveValidity } from 'src/app/models/common';

@Component({
  selector: 'greed-hint-engine',
  templateUrl: './hint-engine.component.html',
  styleUrls: ['./hint-engine.component.css']
})
export class HintEngineComponent implements OnInit{

  /**
   * Whether or not to show a direct hint as to what can be done.
   */
  showDirectHint: boolean = false;

  /**
   * The text of the direct hint, programmatically generated.
   */
  directHintText: string = "Hey buddy you doing okay?";

  /**
   * A differ keeping track of whether or not the board state has changed.
   * This is how the "do we show the direct hint" timer is managed.
   */
  boardDiffer: any;

  /**
   * A timer counting down from when the last move (board state change) occurred to 
   * when we pull up the direct hint.
   */
  hintTimer: any;

  /**
   * The player object.
   */
  @Input('player') player!: GreedPlayer;

  /**
   * Constructor.
   * @param differs The KV differ used to track the board. This punk means that the board always needs to exist. 
   */
  constructor(private differs: KeyValueDiffers) {
  }

  /**
   * Lifecycle hook. 
   */
  ngOnInit() {
    // Generates initial hint text.
    this.generateHintText();
    // Creates the board difffer.
    this.boardDiffer = this.differs.find(this.player.board).create(); // Should move this to a game start thing.
  }

  /**
   * Programmatically generates hint text based on the remaining available moves.
   */
  generateHintText() {
    
    let validMoves = [];
    if ( this.player.board.checkMoveValidity(Direction.N)  == MoveValidity.VALID ) validMoves.push('north');
    if ( this.player.board.checkMoveValidity(Direction.S)  == MoveValidity.VALID ) validMoves.push('south');
    if ( this.player.board.checkMoveValidity(Direction.E)  == MoveValidity.VALID ) validMoves.push('east');
    if ( this.player.board.checkMoveValidity(Direction.W)  == MoveValidity.VALID ) validMoves.push('west');
    if ( this.player.board.checkMoveValidity(Direction.NE) == MoveValidity.VALID ) validMoves.push('NE');
    if ( this.player.board.checkMoveValidity(Direction.NW) == MoveValidity.VALID ) validMoves.push('NW');
    if ( this.player.board.checkMoveValidity(Direction.SE) == MoveValidity.VALID ) validMoves.push('SE');
    if ( this.player.board.checkMoveValidity(Direction.SW) == MoveValidity.VALID ) validMoves.push('SW');
    
    if (validMoves.length == 0 ) this.directHintText = 'GAME OVER';

    else if (validMoves.length == 1 ) this.directHintText = "You can still move "+validMoves[0]+".";
    else if (validMoves.length == 2 ) this.directHintText = "You can still move "+validMoves.join(" and ")+".";
    else {
      let last = validMoves.pop();
      this.directHintText = "You can still move "+validMoves.join(", ")+", and "+last+".";
    }

  }

  /**
   * Creates the timer for displaying the direct hint.
   */
  scheduleDirectHint() {
    this.hintTimer = setTimeout(()=>{this.showDirectHint=true}, 10000);
  }

  /**
   * Cancels the direct hint timer.
   */
  cancelDirectHint() {
    this.showDirectHint = false;
  }

  /**
   * Angular lifecycle hook. Occurs when a change is detected on the player board.
   * @returns 
   */
  ngDoCheck(): void {
    if (!this.player.board) return;
    let changes = this.boardDiffer.diff(this.player.board);
    if(changes) {
      this.cancelDirectHint(); // Cancel stale hint.
      this.generateHintText(); // Generate hint based on new state.
      this.scheduleDirectHint(); // Schedule it.
    }
  }

  
  
}
