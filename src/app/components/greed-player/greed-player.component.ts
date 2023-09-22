import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { GreedPlayer } from '../../models/greed-player';
import { randomNumberRange, MoveValidity, MoveResult, Direction } from '../../models/common';

@Component({
  selector: 'greed-player',
  templateUrl: './greed-player.component.html',
  styleUrls: ['./greed-player.component.css']
})
export class GreedPlayerComponent implements OnInit {

  player: any;

  @Output() onGameOver = new EventEmitter<string>();

  constructor() {}
  
  ngOnInit() {
    this.player = new GreedPlayer();
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
      this.onGameOver.emit("game over");
    }
  }
}
