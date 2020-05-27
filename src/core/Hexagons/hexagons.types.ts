export type Coord = {
    x: number;
    y: number;
};

export interface Cube {
    x: number;
    y: number;
    z: number;
}

export interface Coords {
    [coordinates: string]: Coord;
}
