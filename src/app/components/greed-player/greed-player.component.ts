import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { GreedPlayer } from '../../models/greed-player';
import { randomNumberRange, MoveValidity, MoveResult, Direction, GameState } from '../../models/common';

@Component({
  selector: 'greed-player',
  templateUrl: './greed-player.component.html',
  styleUrls: ['./greed-player.component.css']
})
export class GreedPlayerComponent implements OnInit {

  player: any;
  showQuitDialog: boolean = false;
  fadeIn: boolean = true;

  @Output() onStateChange = new EventEmitter<GameState>();

  constructor() {}
  
  ngOnInit() {
    this.player = new GreedPlayer();
  }

  startNewGame() {
    console.log("starting new game");
    this.fadeIn = true;
    this.showQuitDialog = false;
    this.player.startNewGame();
  }

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
      default: return;
    }
    this.player.attemptMove(dir);

    if ( this.player.gameover ) {
      this.triggerGameOver();
    }
  }

  toggleQuitDialog() {
    this.showQuitDialog = !this.showQuitDialog;
  }

  triggerGameOver() {
    this.player.gameover = true;
    this.showQuitDialog = false;
  }

  emitStateChangeRequest() {
    this.onStateChange.emit(GameState.MAIN_SCREEN);
  }
}
