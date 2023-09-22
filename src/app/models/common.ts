
export function randomNumberRange(min: number, max: number) {
    return min + Math.floor(Math.random()*(max-min));
}



export enum MoveValidity {
    VALID = 1,
    INVALID_OOB = 2,
    INVALID_EMPTY_SPACE = 3
}

export class MoveResult {
    result: MoveValidity;
    score:  number;
    count:  number;
    constructor(result: MoveValidity, score: number, count: number) {
        this.result = result; this.score = score, this.count = count;
    }
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