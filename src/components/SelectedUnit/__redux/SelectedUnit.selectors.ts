import { SelectedUnitState } from "../SelectedUnit.types";
import { createSelector } from "reselect";
import { BattleUnit, BattleUnitsState } from "../../BattleUnits/BattleUnits.types";
import { battleUnits } from "../../BattleUnits/__redux/BattleUnits.selectors";

export const unitId = (state: SelectedUnitState) => state.SelectedUnit.unitId as string | null;
export const selectedUnit = createSelector<
    SelectedUnitState & BattleUnitsState,
    string | null,
    BattleUnit[],
    BattleUnit | null
>(unitId, battleUnits, (unitId, units) => {
    if (unitId === null) return null;
    const foundUnit = units.find(unit => unit.id === unitId);
    return foundUnit ? foundUnit : null;
});
