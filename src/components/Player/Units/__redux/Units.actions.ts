import { createAction } from "deox";
import { Unit } from "../Units.types";

const namespace = "[Units]";

export const setUnits = createAction(`${namespace} set units`, resolve => (units: Unit[]) => resolve(units));
