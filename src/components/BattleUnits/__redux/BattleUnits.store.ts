import { createReducer } from "deox";
import * as actions from "./BattleUnits.actions";
import { ACTION_POINTS } from "../../Battle/Battle.constants";
import { BattleUnit } from "../BattleUnits.types";
import { nextStep } from "../../Battle/__redux/Battle.actions";

export const battleUnits = createReducer([] as BattleUnit[], handleAction => [
    handleAction(actions.setUnits, (state, { payload }) => payload),
    handleAction(actions.addUnit, (state, { payload }) => [...state, payload]),
    handleAction(actions.updateUnit, (state, { payload }) =>
        state.map(unit => (unit.id === payload.id ? { ...unit, ...payload } : unit)),
    ),
    handleAction(nextStep, state => {
        return state.map(unit => ({ ...unit, currentActionPoints: ACTION_POINTS }));
    }),
]);
