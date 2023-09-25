import { randomIntRange, pickColor } from './common'; 

export class BoardCell {

    /**
     * The value of this current cell. Ranges from 1-9 inclusive.
     */
    value: number;

    /**
     * CSS color descriptor. TODO: Add text shadow as well.
     */
    color: string;

    /**
     * Whether or not this cell is the current cursor.
     */
    isCursor: boolean;

    /**
     * Whether or not this cell's fading animation is triggered. Animation
     * state transitions are as follows:
     * 
     * consume() -> isConsumed=true; isFading=true; -> isHidden=true;
     */
    isFading: boolean;

    /**
     * Whether or not this cell is currently hidden. (Used for display)
     */
    isHidden: boolean;

    /**
     * Flag designating that this cell is consumed and is no longer suitable for
     * traversal.
     */
    isConsumed: boolean;

    /**
     * Constructor.
     */
    constructor() {
        this.value = randomIntRange(1,10);
        this.color = pickColor(this.value);
        this.isCursor = false;
        this.isFading = false;
        this.isHidden = false;
        this.isConsumed = false;
    }

    /**
     * Flags this cell as the current cursor cell.
     */
    setAsCursor() {
        this.isCursor = true;
    }

    /**
     * Removes this cell as the current cursor.
     */
    removeAsCursor() {
        this.isCursor = false;
        this.isConsumed = true;
        this.isHidden = true;
    }

    /**
     * Consumes this cell and returns its value. Does not fade out the cell
     * to separate visual effects with game state changes.
     * @returns the value of this cell.
     */
    consume(): number {
        if ( this.isConsumed ) { console.log("already consumed",this.value); return 0; }
        console.log("consuming",this.value);
        this.isConsumed = true;
        return this.value;
    }

    /**
     * Triggers the fade-out animation of this cell. TODO: revise this to use 
     * permanent css animations.
     */
    fadeout() {
        this.isFading = true;
        setTimeout(()=>{this.isHidden=true;},500);
    }

}
