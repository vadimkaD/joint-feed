import { createReducer } from "deox";
import * as actions from "./Battle.actions";

export const isAnimation = createReducer(false as boolean, handleAction => [
    handleAction(actions.setAnimation, (state, { payload }) => payload),
    handleAction(actions.nextStep, () => false),
]);

export const stepNumber = createReducer(1 as number, handleAction => [
    handleAction(actions.nextStep, state => state + 1),
]);

export const tickNumber = createReducer(1 as number, handleAction => [
    handleAction(actions.nextTick, state => state + 1),
    handleAction(actions.setTick, (state, { payload }) => payload),
]);
