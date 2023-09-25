
/**
 * Color packs!
 */
let original_colorpack = ["white","peru","crimson","green","navy","darkorchid","gold","salmon","chartreuse","aqua"];

/**
 * Current game state.
 */
export enum GameState {
    MAIN_SCREEN = 1,
    GAMEPLAY = 2
}

/**
 * Move validity / error codes.
 */
export enum MoveValidity {
    VALID = 1,
    INVALID_OOB = 2,
    INVALID_EMPTY_SPACE = 3
}

/**
 * Directions, powers of 2 just in case I want to do some nasty button combo optimizations.
 */
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

/**
 * The result of a move. Contains move validity, points earned and spots cleared.
 */
export class MoveResult {
    result: MoveValidity;
    score:  number;
    count:  number;
    constructor(result: MoveValidity, score: number, count: number) {
        this.result = result; this.score = score, this.count = count;
    }
}

/**
 * Returns a random integer in the range [min - max).
 * @param min Minimum value that can be returned.
 * @param max Max value to return, not inclusive.
 * @returns An integer in the range specified.
 */
export function randomIntRange(min: number, max: number) {
    return min + Math.floor(Math.random()*(max-min));
}

/**
 * Picks a color for a cell, given its value, based on the current color pack.
 * @param value The value of the cell to color.
 * @returns The CSS color descriptor for that value.
 */
export function pickColor(value: number) {
    let colorpack = original_colorpack;
    value %= colorpack.length;
    return colorpack[value];
}