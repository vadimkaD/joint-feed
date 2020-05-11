import { createReducer } from "deox";
import { BaseUnit } from "../../../Unit/Unit.types";
import * as actions from "./Units.actions";
import { units as defaultUnits } from "../Units.constants";

export const units = createReducer(defaultUnits as BaseUnit[], handleAction => [
    handleAction(actions.setUnits, (state, { payload }) => payload),
]);
