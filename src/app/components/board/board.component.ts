import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../../models/board';

@Component({
  selector: 'greed-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  /**
   * The board for this view to represent.
   */
  @Input("board")board: any;

  constructor() {
  };

  ngOnInit() {
  }

}