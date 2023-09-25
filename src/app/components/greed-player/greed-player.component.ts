import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { GreedPlayer } from '../../models/greed-player';
import { randomIntRange, MoveValidity, MoveResult, Direction, GameState } from '../../models/common';

@Component({
  selector: 'greed-player',
  templateUrl: './greed-player.component.html',
  styleUrls: ['./greed-player.component.css']
})
export class GreedPlayerComponent implements OnInit {

  /**
   * Player model instance.
   */
  player: any;

  /**
   * Whether or not we're displaying the quit dialog.
   */
  showQuitDialog: boolean = false;
  
  /**
   * Flag for running the fade-in animation, e.g., adding the animation css class
   * to the root element :).
   */
  fadeIn: boolean = true;

  /**
   * Output emitter for signalling to the app at large to change game state.
   */
  @Output() onStateChange = new EventEmitter<GameState>();

  /**
   * Constructor.
   */
  constructor() {}
  
  /**
   * Angular lifestyle hook. Creates our GreedPlayer instance when the module initializes.
   */
  ngOnInit() {
    this.player = new GreedPlayer();
  }

  /**
   * Starts a new game by resetting all player state.
   */
  startNewGame() {

    // Trigger fade-in.
    this.fadeIn = true;

    // Don't show the quit dialog.
    this.showQuitDialog = false;

    // Tell the model we're ready to start.
    this.player.startNewGame();
  }

  /**
   * Captures keyboard key-down events for manipulating the model.
   * @param event The keydown event.
   * @returns none.
   */
  @HostListener('document:keydown', ['$event'])
  handleInput(event: KeyboardEvent) { 

    // Decide which way to go. 
    // We could back this up and choose keys directly in the host listener decorator.
    let dir = null;
    switch ( event.key ) {
      case 'q': dir = Direction.NW; break;
      case 'w': dir = Direction.N;  break;
      case 'e': dir = Direction.NE; break;
      case 'a': dir = Direction.W;  break;
      case 's': dir = Direction.S;  break;
      case 'd': dir = Direction.E;  break;
      case 'z': dir = Direction.SW; break;
      case 'c': dir = Direction.SE; break;
      default: return; // Shortcut out if we're not seeing a key we care about.
    }

    // Attempt the move.
    this.player.attemptMove(dir);

    // If this move leaves the player in a gameover state, we trigger gameover functionality.
    if ( this.player.gameover ) {
      this.triggerGameOver();
    }
  }

  /**
   * Shows/hides the quit dialog.
   */
  toggleQuitDialog() {
    this.showQuitDialog = !this.showQuitDialog;
  }

  /**
   * Triggers gameover functionality.
   */
  triggerGameOver() {
    // This function can be called by more than the model changing state, so
    // we keep the model in the loop. This also brings up the game over dialog.
    this.player.gameover = true;

    // Hide the quit dialog if it's up.
    this.showQuitDialog = false;
  }

  /**
   * Tells the controller to emit a state change request back up to the app.
   */
  emitStateChangeRequest() {
    this.onStateChange.emit(GameState.MAIN_SCREEN);
  }
}
