import { createReducer } from "deox";

import { lightTheme } from "../../../themes";
import * as actions from "./Theme.actions";

export const theme = createReducer(lightTheme, handleAction => [
    handleAction(actions.setTheme, (state, { payload }) => payload),
]);
