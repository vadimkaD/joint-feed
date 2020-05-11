import { createReducer } from "deox";

import * as actions from "./InfoPanel.actions";

export const unitId = createReducer(null as string | null, handleAction => [
    handleAction(actions.selectUnit, (state, { payload }) => payload),
]);
