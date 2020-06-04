import { Hex, Hexes } from "../../core/Battle/Battle.types";

export interface HexesState {
    Hexes: {
        hexes: Hexes;
        hexUnderCursor: Hex | null;
    };
}
