import { randomNumberRange, pickColor } from './common'; 

export class BoardCell {

    value: number;
    color: string;

    isCursor: boolean;
    isFading: boolean;
    isHidden: boolean;
    isConsumed: boolean;

    constructor() {
        this.value = randomNumberRange(1,10);
        this.color = pickColor(this.value);
        this.isCursor = false;
        this.isFading = false;
        this.isHidden = false;
        this.isConsumed = false;
    }

    setAsCursor() {
        this.isCursor = true;
    }

    removeAsCursor() {
        this.isCursor = false;
        this.isConsumed = true;
        this.isHidden = true;
    }

    consume(): number {
        if ( this.isConsumed ) { console.log("already consumed",this.value); return 0; }
        console.log("consuming",this.value);
        this.isConsumed = true;
        return this.value;
    }

    fadeout() {
        this.isFading = true;
        setTimeout(()=>{this.isHidden=true;},500);
    }

}
