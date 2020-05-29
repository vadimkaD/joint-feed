import { createReducer } from "deox";
import { selectUnit } from "../../SelectedUnit/__redux/SelectedUnit.actions";
import { selectAbility } from "./SelectedAbility.actions";
import { ABILITIES } from "../../../core/Abilities/Abilities.constants";

export const selectedAbility = createReducer(null as ABILITIES | null, handleAction => [
    handleAction(selectAbility, (state, { payload }) => payload),
    handleAction(selectUnit, (state, { payload }) => null),
]);
