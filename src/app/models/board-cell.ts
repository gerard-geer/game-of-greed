import { randomNumberRange } from './common'; 

export class BoardCell {

    value: number;
    color: string;

    isCursor: boolean;
    isFading: boolean;
    isHidden: boolean;
    isConsumed: boolean;

    constructor() {
    this.value = randomNumberRange(1,10);
    this.color = this.pickColor(this.value);
    this.isCursor = false;
    this.isFading = false;
    this.isHidden = false;
    this.isConsumed = false;
    }

    pickColor(value: number) {
    switch(value) {
        case 1: return "peru";
        case 2: return "crimson";
        case 3: return "green";
        case 4: return "navy";
        case 5: return "darkorchid";
        case 6: return "gold";
        case 7: return "salmon";
        case 8: return "chartreuse";
        case 9: return "aqua";
        default: return "white";
    }
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
