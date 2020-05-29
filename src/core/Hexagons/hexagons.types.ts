import { Coord } from "../Battle/Hexagon.types";

export interface Cube {
    x: number;
    y: number;
    z: number;
}

export interface Coords {
    [coordinates: string]: Coord;
}

export interface Obstacles {
    [coordinates: string]: boolean;
}
