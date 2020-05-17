import { Hex, Hexes, HexesState } from "../Hexes.types";

export const hexes = (state: HexesState) => state.Hexes.hexes as Hexes;
export const hexUnderCursor = (state: HexesState) => state.Hexes.hexUnderCursor as Hex;
