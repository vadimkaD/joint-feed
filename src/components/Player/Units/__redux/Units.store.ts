import { createReducer } from "deox";
import { Unit } from "../Units.types";
import * as actions from "./Units.actions";
import { units as defaultUnits } from "../Units.constants";

export const units = createReducer(defaultUnits as Unit[], handleAction => [
    handleAction(actions.setUnits, (state, { payload }) => payload),
    handleAction(actions.updateUnit, (state, { payload }) =>
        state.map(unit => (unit.id === payload.id ? { ...unit, ...payload } : unit)),
    ),
]);
