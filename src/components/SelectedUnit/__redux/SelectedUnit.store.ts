import { createReducer } from "deox";
import { selectUnit } from "./SelectedUnit.actions";

export const unitId = createReducer(null as string | null, handleAction => [
    handleAction(selectUnit, (state, { payload }) => payload),
]);
