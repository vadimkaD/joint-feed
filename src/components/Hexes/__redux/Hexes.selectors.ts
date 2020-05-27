import { HexesState } from "../Hexes.types";
import { Hex, Hexes } from "../../../core/Battle/Battle.types";

export const hexes = (state: HexesState) => state.Hexes.hexes as Hexes;
export const hexUnderCursor = (state: HexesState) => state.Hexes.hexUnderCursor as Hex;
