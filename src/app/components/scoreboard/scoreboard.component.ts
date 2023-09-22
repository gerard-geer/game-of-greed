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

  @Input("scoreboard") sb: any;

  constructor() {}

  ngOnInit() {
    if (this.sb == null) this.sb = new ScoreBoard(new Board(68,21));
    //this.sb.submitMove(new MoveResult(MoveValidity.INVALID_OOB,0,0));
  }
}
