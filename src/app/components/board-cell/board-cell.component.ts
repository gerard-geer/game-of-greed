import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'greed-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.css']
})
export class BoardCellComponent implements OnInit{

  @Input("cell") cell: any;

  constructor() {
  }

  ngOnInit() {}
}
