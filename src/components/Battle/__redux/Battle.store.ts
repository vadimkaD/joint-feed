import { createReducer } from "deox";
import { BattleUnit, Hex, Hexes } from "../Battle.types";
import * as actions from "./Battle.actions";
import { defaultHexes } from "../../Battlefield/Battlefield.constants";

export const battleUnits = createReducer([] as BattleUnit[], handleAction => [
    handleAction(actions.setUnits, (state, { payload }) => payload),
    handleAction(actions.addUnit, (state, { payload }) => [...state, payload]),
    handleAction(actions.updateUnit, (state, { payload }) =>
        state.map(unit => (unit.id === payload.id ? { ...unit, ...payload } : unit)),
    ),
    handleAction(actions.nextStep, state => {
        return state.map(unit => ({ ...unit, currentActionPoints: unit.maxActionPoints }));
    }),
]);

export const hexes = createReducer(defaultHexes as Hexes, handleAction => []);
export const hexUnderCursor = createReducer(null as Hex | null, handleAction => [
    handleAction(actions.mouseEnterHex, (state, { payload }) => payload),
    handleAction(actions.mouseLeaveBoard, () => null),
]);

export const isAnimation = createReducer(false as boolean, handleAction => [
    handleAction(actions.setAnimation, (state, { payload }) => payload),
]);

export const stepNumber = createReducer(1 as number, handleAction => [
    handleAction(actions.nextStep, state => state + 1),
]);

export const tickNumber = createReducer(1 as number, handleAction => [
    handleAction(actions.nextTick, state => state + 1),
    handleAction(actions.setTick, (state, { payload }) => payload),
]);
