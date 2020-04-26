import { createReducer } from "deox";

import { PreparedUnit } from "../../../Battle/Battle.types";
import * as actions from "./InfoPanel.actions";

export const unit = createReducer(null as PreparedUnit | null, handleAction => [
    handleAction(actions.selectUnit, (state, { payload }) => payload),
]);
