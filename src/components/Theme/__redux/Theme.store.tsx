import { createReducer } from "deox";

import { darkTheme } from "../../../themes";
import * as actions from "./Theme.actions";

export const theme = createReducer(darkTheme, handleAction => [
    handleAction(actions.setTheme, (state, { payload }) => payload),
]);
