import { createAction } from "deox";
import { Unit } from "../Units.types";
import { PreparedUnit } from "../../../Battle/Battle.types";

const namespace = "[Units]";

export const setUnits = createAction(`${namespace} set units`, resolve => (units: Unit[]) => resolve(units));
export const updateUnit = createAction(`${namespace} update unit`, resolve => (unit: PreparedUnit) => resolve(unit));
