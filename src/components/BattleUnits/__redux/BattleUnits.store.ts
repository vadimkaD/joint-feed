import { createReducer } from "deox";
import * as actions from "./BattleUnits.actions";
import { nextStep } from "../../Battle/__redux/Battle.actions";
import { ACTION_POINTS } from "../../../core/Battle/Battle.constants";
import { Unit } from "../../../core/Battle/Unit.types";

export const battleUnits = createReducer([] as Unit[], handleAction => [
    handleAction(actions.setUnits, (state, { payload }) => payload),
    handleAction(actions.addUnit, (state, { payload }) => [...state, payload]),
    handleAction(actions.updateUnit, (state, { payload }) =>
        state.map(unit => (unit.id === payload.id ? { ...unit, ...payload } : unit)),
    ),
    handleAction(nextStep, state => {
        return state.map(unit => ({ ...unit, currentActionPoints: ACTION_POINTS }));
    }),
]);
