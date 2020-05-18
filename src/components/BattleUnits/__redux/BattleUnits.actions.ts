import { createAction } from "deox";
import { BattleUnit } from "../BattleUnits.types";

const namespace = "[BattleUnits]";

export const setUnits = createAction(`${namespace} set units`, resolve => (units: BattleUnit[]) => resolve(units));
export const addUnit = createAction(`${namespace} add unit`, resolve => (unit: BattleUnit) => resolve(unit));
export const updateUnit = createAction(`${namespace} update unit`, resolve => (unit: Partial<BattleUnit>) =>
    resolve(unit),
);
