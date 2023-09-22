import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../../models/board';

@Component({
  selector: 'greed-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  @Input("board")board: any;

  constructor() {
  };

  ngOnInit() {
  }

}