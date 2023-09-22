import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board';

@Component({
  selector: 'greed-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  board: any;

  constructor() {
  };

  ngOnInit() {
    this.board = new Board(68,21);
  }

}