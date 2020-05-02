import { Hexes, Hex } from "./Battle.types";

export const LEFT = -12;
export const TOP = 46;
export const HEX_WIDTH = 108;
export const HEX_HEIGHT = 94;
export const ACTION_POINTS = 4;
export const WIDTH = 11;
export const HEIGHT = 7;

const defaultHexes: Hexes = {};

for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
        defaultHexes[`${i}:${j}`] = { coord: { x: i, y: j }, isEmpty: !!(i === 10 && j % 2) };
    }
}

export { defaultHexes };
