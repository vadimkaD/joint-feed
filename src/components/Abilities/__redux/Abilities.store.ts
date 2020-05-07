import { createReducer } from "deox";
import * as actions from "./Abilities.actions";
import { ABILITIES } from "../Abilities.constants";
import { selectUnit } from "../../InfoPanel/__redux/InfoPanel.actions";

export const selectedAbility = createReducer(null as ABILITIES | null, handleAction => [
    handleAction(actions.selectAbility, (state, { payload }) => payload),
    handleAction(selectUnit, (state, { payload }) => null),
]);
