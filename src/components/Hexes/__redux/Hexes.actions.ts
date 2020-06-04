import { createAction } from "deox";
import { Hex, Hexes } from "../../../core/Battle/Battle.types";

const namespace = "[Hexes]";

export const clickHex = createAction(`${namespace} click hex`, resolve => (hex: Hex) => resolve(hex));
export const mouseEnterHex = createAction(`${namespace} mouse enter hex`, resolve => (hex: Hex) => resolve(hex));
export const setHexes = createAction(`${namespace} set hexes`, resolve => (hexes: Hexes) => resolve(hexes));
