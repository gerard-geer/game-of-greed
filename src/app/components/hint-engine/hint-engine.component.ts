import { Component, Input, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GreedPlayer } from 'src/app/models/greed-player';
import { Direction, MoveResult, MoveValidity } from 'src/app/models/common';

@Component({
  selector: 'greed-hint-engine',
  templateUrl: './hint-engine.component.html',
  styleUrls: ['./hint-engine.component.css']
})
export class HintEngineComponent implements OnInit{

  showDirectHint: boolean = false;
  directHintText: string = "Hey buddy you doing okay?";
  boardDiffer: any;
  hintTimer: any;

  @Input('player') player!: GreedPlayer;
  @Input('mostRecentMove') mostRecentMove!: MoveResult;

  constructor(private differs: KeyValueDiffers) {
  }

  ngOnInit() {
    this.generateHintText();
    this.boardDiffer = this.differs.find(this.player.board).create();
  }

  generateHintText() {
    
    let validMoves = [];
    if ( this.player.board.checkMoveValidity(Direction.N)  == MoveValidity.VALID ) validMoves.push('north');
    if ( this.player.board.checkMoveValidity(Direction.S)  == MoveValidity.VALID ) validMoves.push('south');
    if ( this.player.board.checkMoveValidity(Direction.E)  == MoveValidity.VALID ) validMoves.push('east');
    if ( this.player.board.checkMoveValidity(Direction.W)  == MoveValidity.VALID ) validMoves.push('west');
    if ( this.player.board.checkMoveValidity(Direction.NE) == MoveValidity.VALID ) validMoves.push('NE');
    if ( this.player.board.checkMoveValidity(Direction.NW) == MoveValidity.VALID ) validMoves.push('NW');
    if ( this.player.board.checkMoveValidity(Direction.SE) == MoveValidity.VALID ) validMoves.push('SE');
    if ( this.player.board.checkMoveValidity(Direction.SW) == MoveValidity.VALID ) validMoves.push('SW');
    
    if (validMoves.length == 0 ) this.directHintText = 'GAME OVER';

    else if (validMoves.length == 1 ) this.directHintText = "You can still move "+validMoves[0]+".";
    else if (validMoves.length == 2 ) this.directHintText = "You can still move "+validMoves.join(" and ")+".";
    else {
      let last = validMoves.pop();
      this.directHintText = "You can still move "+validMoves.join(", ")+", and "+last+".";
    }

  }
  scheduleDirectHint() {
    this.hintTimer = setTimeout(()=>{this.showDirectHint=true}, 10000);
  }
  cancelDirectHint() {
    this.showDirectHint = false;
  }


  ngDoCheck(): void {
    let changes = this.boardDiffer.diff(this.player.board);
    if(changes) {
      this.cancelDirectHint();
      this.generateHintText();
      this.scheduleDirectHint();
    }
  }

  
  
}
