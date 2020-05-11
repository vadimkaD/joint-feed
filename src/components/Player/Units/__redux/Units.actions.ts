import { createAction } from "deox";
import { BaseUnit } from "../../../Unit/Unit.types";

const namespace = "[Units]";

export const setUnits = createAction(`${namespace} set units`, resolve => (units: BaseUnit[]) => resolve(units));
