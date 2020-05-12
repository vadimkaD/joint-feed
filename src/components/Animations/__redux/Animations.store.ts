import { createReducer } from "deox";

export const reducer = createReducer(null, handleAction => [handleAction(action, (state, { payload }) => payload)]);
