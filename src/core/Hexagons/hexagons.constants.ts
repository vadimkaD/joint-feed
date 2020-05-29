import { getLeft, getLeftBottom, getLeftTop, getRight, getRightBottom, getRightTop } from "./index";
import { Coord } from "../Battle/Hexagon.types";

export enum DIRECTION {
    LEFT_TOP = 0,
    LEFT = 1,
    LEFT_BOTTOM = 2,
    RIGHT_BOTTOM = 3,
    RIGHT = 4,
    RIGHT_TOP = 5,
}

export const byDirection = {
    [DIRECTION.LEFT_TOP]: getLeftTop,
    [DIRECTION.LEFT]: getLeft,
    [DIRECTION.LEFT_BOTTOM]: getLeftBottom,
    [DIRECTION.RIGHT_BOTTOM]: getRightBottom,
    [DIRECTION.RIGHT]: getRight,
    [DIRECTION.RIGHT_TOP]: getRightTop,
};

export const getByDirection = (coord: Coord, dir: DIRECTION): Coord | null => {
    return byDirection[dir](coord);
};
export const WIDTH = 13;
export const HEIGHT = 7;
