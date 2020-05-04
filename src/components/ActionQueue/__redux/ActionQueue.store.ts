import { createReducer } from "deox";
import { Action } from "../ActionQueue.types";
import { addAction } from "./ActionQueue.actions";

export const queue = createReducer([] as Action[], handleAction => [
    handleAction(addAction, (state, { payload }) => [...state, payload]),
]);
