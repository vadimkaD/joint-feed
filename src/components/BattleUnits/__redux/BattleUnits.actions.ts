import { createAction } from "deox";
import { Unit } from "../../../core/Battle/Battle.types";

const namespace = "[BattleUnits]";

export const setUnits = createAction(`${namespace} set units`, resolve => (units: Unit[]) => resolve(units));
export const addUnit = createAction(`${namespace} add unit`, resolve => (unit: Unit) => resolve(unit));
export const updateUnit = createAction(`${namespace} update unit`, resolve => (unit: Partial<Unit>) => resolve(unit));
