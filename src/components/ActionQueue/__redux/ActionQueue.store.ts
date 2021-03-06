import { createReducer } from "deox";
import { addAction, removeAction } from "./ActionQueue.actions";
import { nextStep } from "../../Battle/__redux/Battle.actions";
import { Action } from "../../../core/Actions/Actions.types";

export const queue = createReducer([] as Action[], handleAction => [
    handleAction(addAction, (state, { payload }) => [...state, payload]),
    handleAction(removeAction, (state, { payload }) => {
        const index = state.indexOf(payload);
        console.log("index of removed action", index);
        const newState = [...state];
        if (index !== -1) {
            newState.splice(index, 1);
        }
        return newState;
    }),
    handleAction(nextStep, () => []),
]);
