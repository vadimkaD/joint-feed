import { Coord } from "../../hexagons/hexagons.types";

export interface Hex {
    coord: Coord;
    isEmpty?: boolean;
}

export interface Hexes {
    [coordinates: string]: Hex;
}

export interface HexesState {
    Hexes: {
        hexes: Hexes;
    };
}
