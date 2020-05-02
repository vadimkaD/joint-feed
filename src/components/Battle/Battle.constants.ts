import { Hexes } from "./Battle.types";

export const LEFT = -12;
export const TOP = 46;
export const HEX_WIDTH = 108;
export const HEX_HEIGHT = 94;
export const ACTION_POINTS = 4;
export const WIDTH = 13;
export const HEIGHT = 7;

const defaultHexes: Hexes = {};

export const WIDTH_ARRAY = new Array(WIDTH).fill(1).map((v, i) => i);
export const HEIGHT_ARRAY = new Array(HEIGHT).fill(1).map((v, i) => i);

for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
        defaultHexes[`${i}:${j}`] = { coord: { x: i, y: j }, isEmpty: !!(i === WIDTH - 1 && !(j % 2)) };
    }
}

export { defaultHexes };
