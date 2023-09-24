
export enum GameState {
    MAIN_SCREEN = 1,
    GAMEPLAY = 2
}
export enum MoveValidity {
    VALID = 1,
    INVALID_OOB = 2,
    INVALID_EMPTY_SPACE = 3
}

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

export class MoveResult {
    result: MoveValidity;
    score:  number;
    count:  number;
    constructor(result: MoveValidity, score: number, count: number) {
        this.result = result; this.score = score, this.count = count;
    }
}

export function randomNumberRange(min: number, max: number) {
    return min + Math.floor(Math.random()*(max-min));
}

export function pickColor(value: number) {
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