import { createAction } from "deox";
import { BattleUnit, Hex } from "../Battle.types";

const namespace = "[Battle]";

export const setUnits = createAction(`${namespace} set units`, resolve => (units: BattleUnit[]) => resolve(units));
export const addUnit = createAction(`${namespace} add unit`, resolve => (unit: BattleUnit) => resolve(unit));
export const clickHex = createAction(`${namespace} click hex`, resolve => (hex: Hex) => resolve(hex));
export const mouseEnterHex = createAction(`${namespace} mouse enter hex`, resolve => (hex: Hex) => resolve(hex));
