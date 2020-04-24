import { createReducer } from "deox";

import * as actions from "./Battle.actions";
import { Unit } from "../Battle.types";

export const units = createReducer([] as Unit[], handleAction => [
    handleAction(actions.addUnit, (state, { payload }) => [...state, payload]),
]);
