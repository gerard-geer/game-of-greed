import { randomNumberRange, MoveValidity, MoveResult } from './common';
import { BoardCell } from './board-cell'; 

export enum Direction {
    N = 1,
    S = 2,
    W = 4,
    E = 8,
    NW = 16,
    NE = 32,
    SW = 64,
    SE = 128
}

export class Board {

    cells:   BoardCell[][] = [];
    cursorX: number;
    cursorY: number;
    width:   number;
    height:  number;
  
    constructor(width: number, height: number) {

        // Cache our width and height.
        this.width = width;
        this.height = height;
  
        // Go through each row...
        for( let r = 0; r < height; r++ ) {
            // Create a list for that row.
            let row = [];
            for ( let c = 0; c < width; c++) {
            row.push(new BoardCell());
            }
            this.cells.push(row);
        }
        console.log("NEW TABLE");
        console.table(this.cells);
    
        // Pick a random position (x,y) less than (width,height) as our
        // starting cursor position.
        this.cursorX = 12;randomNumberRange(0,width);
        this.cursorY = 12;randomNumberRange(0,height);
    
        // Go to that cell and set as the cursor.
        console.log("Setting cursor to",this.cursorX,",",this.cursorY);
        this.cells[this.cursorY][this.cursorX].setAsCursor();

        console.log(this.jogCursor(Direction.W));
    }

    checkMoveValidity(d: Direction) : MoveValidity {
        
        let dirSampleX = 0, dirSampleY = 0; // Coordinates of the cell containing our jog distance
        let dx = 0, dy = 0;                 // Our unit direction vector.
        let dist = 0;                       // Jog distance, grabbed from the board.

        // Determine our unit direction vector.
        switch (d) {
            case (Direction.N):  dx =  0; dy =  1; break;
            case (Direction.S):  dx =  0; dy = -1; break;
            case (Direction.E):  dx =  1; dy =  0; break;
            case (Direction.W):  dx = -1; dy =  0; break;
            case (Direction.NW): dx = -1; dy =  1; break;
            case (Direction.NE): dx =  1; dy =  1; break;
            case (Direction.SW): dx = -1; dy = -1; break;
            case (Direction.SE): dx =  1; dy = -1; break;
        }

        console.log("dx:",dx,"dy:",dy);

        // Sample in that direction to get our jog distance.
        dirSampleX = this.cursorX + dx;
        dirSampleY = this.cursorY + dy;

        // Do move checks.

        // First we check to see if we're sampling within bounds of the array.
        if ( dirSampleX < 0 || dirSampleX >= this.width
          || dirSampleY < 0 || dirSampleY >= this.height ) {
            return MoveValidity.INVALID_OOB;
        }

        // Now we grab the jog distance value.
        dist = this.cells[dirSampleY][dirSampleX].value; // Row major.

        // Now we need to make sure that our move will keep us in the array.
        let endX = this.cursorX + dx * (dist); 
        let endY = this.cursorY + dy * (dist);
        if ( endX < 0 || endX >= this.width
          || endY < 0 || endY >= this.height ) {
            MoveValidity.INVALID_OOB;
        }

        // Now that we know if we jog, we won't fall off the edge of the board.
        // But we still need to check to make sure no cell along the way has yet been consumed.
        for ( let i = 1; i < dist+1; ++i ) {
            let curX = this.cursorX+(i*dx);
            let curY = this.cursorY+(i*dy);
            if ( this.cells[curY][curX].isConsumed ) MoveValidity.INVLAID_EMPTY_SPACE;
        }

        // If All that passes, we can do the move!
        return MoveValidity.VALID;
    }

    jogCursor(d: Direction) : MoveResult {

        let dx = 0, dy = 0;                 // Our unit direction vector.

        // Determine our unit direction vector.
        switch (d) {
            case (Direction.N):  dx =  0; dy =  1; break;
            case (Direction.S):  dx =  0; dy = -1; break;
            case (Direction.E):  dx =  1; dy =  0; break;
            case (Direction.W):  dx = -1; dy =  0; break;
            case (Direction.NW): dx = -1; dy =  1; break;
            case (Direction.NE): dx =  1; dy =  1; break;
            case (Direction.SW): dx = -1; dy = -1; break;
            case (Direction.SE): dx =  1; dy = -1; break;
        }

        // Do move checks.
        let validity = this.checkMoveValidity(d);
        console.log("validity",validity)
        if ( validity != MoveValidity.VALID ) return new MoveResult(validity,0,0);

        // Oh boy, looks like we can make the move!

        let dirSampleX = 0, dirSampleY = 0; // Coordinates of the cell containing our jog distance
        let dist = 0;                       // Jog distance, grabbed from the board.

        // Sample in the given direction to get our jog distance.
        dirSampleX = this.cursorX + dx;
        dirSampleY = this.cursorY + dy;
        dist = this.cells[dirSampleY][dirSampleX].value;
        console.log("Distance",dist);

        let move = new MoveResult(MoveValidity.VALID,0,0); // Accumulate move results in the instance we're returning
        let curX = this.cursorX;                        // Current cell location along our jogging route.
        let curY = this.cursorY;                        //  
        let curCell = this.cells[curY][curX];              // Current cell we're in.

        // Walk our current position to the destination.
        for ( let i = 0; i < dist; ++i ) {   // 1-indexed, since our journey begins at the next cell, not our current cell.
            curX += dx;                      // Update our current position.
            curY += dy;                      // 
            curCell = this.cells[curY][curX] // Grab our current cell. Row major.
            move.count += 1;                 // Increment how many cells we've consumed.
            move.score += curCell.consume(); // Incrememt how many points we've collected.
            curCell.fadeout();               // Fade out the current cell. Nice lil animation.
        }

        // And now, at long last we set the new cursor.
        this.cells[this.cursorY][this.cursorX].removeAsCursor();
        this.cursorX = curX;
        this.cursorY = curY;
        this.cells[this.cursorY][this.cursorX].setAsCursor();

        return move;

        

    }
}