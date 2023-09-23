import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board';
import { pickColor, randomNumberRange } from '../../models/common';

@Component({
  selector: 'greed-title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.css']
})


export class TitleScreenComponent implements OnInit{

  @Output() onBeginGame = new EventEmitter<string>();

  bgNumbers: any;
  numBG = 1840;
  showHelpDialog = false;
  constructor() {
    this.bgNumbers = [];
    for ( let i = 0; i < this.numBG; ++i )
    {
      this.bgNumbers.push(new BGNumber());
    }
  }

  ngOnInit() {
    setInterval(this.animateBG.bind(this), 10);
  }

  animateBG() {
    let i = randomNumberRange(0,this.numBG-100);
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

  toggleHelpDialog() {
    this.showHelpDialog = !this.showHelpDialog;
  }
  closeHelpDialog() {
    this.showHelpDialog = false;
  }
}

class BGNumber {
  val: number;
  col: string;
  constructor() {
    this.val = randomNumberRange(1,10);
    this.col = pickColor(this.val);
  }
  randomize() {
    this.val = randomNumberRange(1,10);
    this.col = pickColor(this.val);
  }
}