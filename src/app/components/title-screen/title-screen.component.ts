import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board';
import { pickColor, randomIntRange, GameState } from '../../models/common';

@Component({
  selector: 'greed-title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.css']
})


export class TitleScreenComponent implements OnInit{

  @Output() onBeginGame = new EventEmitter<GameState>();

  /**
   * An array of BGNumbers instances, used for the background.
   */
  bgNumbers: any;

  /**
   * Memoized number of background number elements.
   */
  numBG = 1840;

  /**
   * Flag for displaying the how-to-play text.
   */
  showHelpDialog = false;

  /**
   * Flag for adding the fade-out css animation classes to the DOM.
   */
  fadeOut = false

  /**
   * Constructor. Creates all the BG numbers.
   */
  constructor() {
    this.bgNumbers = [];
    for ( let i = 0; i < this.numBG; ++i )
    {
      this.bgNumbers.push(new BGNumber());
    }
  }

  /**
   * Creates an interval timer for animating the background.
   */
  ngOnInit() {
    setInterval(this.animateBG.bind(this), 10);
  }

  /**
   * Animates the background by selecting several elements to have
   * their values and colors changed.
   */
  animateBG() {
    // Memoized a second source of random, so now we don't have a random() call
    // to determine each index.
    let i = randomIntRange(0,this.numBG-100);
    this.bgNumbers[i].randomize();
    this.bgNumbers[i+5].randomize();
    this.bgNumbers[i+10].randomize();
    this.bgNumbers[i+18].randomize();
    this.bgNumbers[i+25].randomize();
    this.bgNumbers[i+30].randomize();
    this.bgNumbers[i+38].randomize();
    this.bgNumbers[i+44].randomize();
    this.bgNumbers[i+56].randomize();
    this.bgNumbers[i+60].randomize();
    this.bgNumbers[i+63].randomize();
    this.bgNumbers[i+70].randomize();
    this.bgNumbers[i+71].randomize();
    this.bgNumbers[i+80].randomize();
    this.bgNumbers[i+85].randomize();
    this.bgNumbers[i+90].randomize();
    this.bgNumbers[i+97].randomize();
    this.bgNumbers[i+100].randomize();
  }

  /**
   * Show/hide the how-to-play text.
   */
  toggleHelpDialog() {
    this.showHelpDialog = !this.showHelpDialog;
  }

  /**
   * Close the how-to-play text. (Exclusively for the close button.)
   */
  closeHelpDialog() {
    this.showHelpDialog = false;
  }

  /**
   * Emits a game state change request up to the larger app.
   * @returns None.
   */
  emitGameStartEvent() {
    if (this.fadeOut) return;
    this.fadeOut = true;
    setTimeout(()=>{ this.onBeginGame.emit(GameState.GAMEPLAY), this.fadeOut = false; }, 3000);
  }
}

class BGNumber {
  val: number;
  col: string;
  constructor() {
    this.val = randomIntRange(1,10);
    this.col = pickColor(this.val);
  }
  randomize() {
    this.val = randomIntRange(1,10);
    this.col = pickColor(this.val);
  }
}