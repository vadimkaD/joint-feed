import { createReducer } from "deox";
import { BattleUnit, Hex, Hexes } from "../Battle.types";
import * as actions from "./Battle.actions";
import { defaultHexes } from "../../Battlefield/Battlefield.constants";

//TODO:
export const battleUnits = createReducer([] as BattleUnit[], handleAction => [
    handleAction(actions.setUnits, (state, { payload }) => payload),
    handleAction(actions.addUnit, (state, { payload }) => [...state, payload]),
    handleAction(actions.updateUnit, (state, { payload }) =>
        state.map(unit => (unit.id === payload.id ? { ...unit, ...payload } : unit)),
    ),
]);

export const hexes = createReducer(defaultHexes as Hexes, handleAction => []);
export const hexUnderCursor = createReducer(null as Hex | null, handleAction => [
    handleAction(actions.mouseEnterHex, (state, { payload }) => payload),
]);
