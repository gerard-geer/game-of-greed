import { Component, Input, OnInit } from '@angular/core';
import { ScoreBoard } from '../../models/scoreboard';
import { Board } from '../../models/board';
import { MoveValidity, MoveResult } from '../../models/common'

@Component({
  selector: 'greed-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  /**
   * The scoreboard model to wrap this view around.
   */
  @Input("scoreboard") sb: any;

  /**
   * Constructor.
   */
  constructor() {}

  /**
   * Angular lifecycle hook.
   */
  ngOnInit() {
    // Create a scoreboard instance just in case there isn't one yet so references
    // in the dom aren't broken.
    if (this.sb == null) this.sb = new ScoreBoard(new Board(1,1));
  }
}
