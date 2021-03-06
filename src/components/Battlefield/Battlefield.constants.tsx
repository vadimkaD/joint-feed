import { Hexes } from "../../core/Battle/Battle.types";
import { HEIGHT, WIDTH } from "../../core/Battle/Hexagons/hexagons.constants";

export const HEX_SIZE = 40;
export const WIDTH_ARRAY = new Array(WIDTH).fill(1).map((v, i) => i);
export const HEIGHT_ARRAY = new Array(HEIGHT).fill(1).map((v, i) => i);
export const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
export const HEX_HEIGHT = 2 * HEX_SIZE;
export const CENTER_STEP = HEX_HEIGHT / 4;
export const BATTLEFIELD_WIDTH = Math.ceil(HEX_WIDTH * WIDTH_ARRAY.length + HEX_WIDTH / 2) - HEX_WIDTH / 2;
export const BATTLEFIELD_HEIGHT = Math.ceil(CENTER_STEP * 3 * HEIGHT_ARRAY.length + CENTER_STEP);
export const BORDER_SIZE = 1;
const defaultHexes: Hexes = {};

for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
        defaultHexes[`${i}:${j}`] = {
            coord: { x: i, y: j },
            isEmpty:
                !!(i === WIDTH - 1 && !(j % 2)) || ((i === 1 || i === 2 || i === 3 || i === 4 || i === 5) && j === 4),
        };
    }
}

export { defaultHexes };

export enum Highlight {
    HOVER = "HOVER",
    MOVE = "MOVE",
    SELECTED_UNIT = "SELECTED_UNIT",
    MAGIC_ARROW = "MAGIC_ARROW",
}
