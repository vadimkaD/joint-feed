import { createAction } from "deox";
import { Unit } from "../Battle.types";

const namespace = "[Battle]";

export const addUnit = createAction(`${namespace} add unit`, resolve => (unit: Unit) => resolve(unit));
