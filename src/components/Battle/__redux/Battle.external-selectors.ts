import { createSelector } from "reselect";
import { battleUnits } from "../../BattleUnits/__redux/BattleUnits.selectors";
import { BattleState } from "../Battle.types";
import { BattleUnit, BattleUnitsState } from "../../BattleUnits/BattleUnits.types";

export const tick = (state: BattleState): number => state.Battle.tickNumber;
export const getUnitById = (unitId: string) =>
    createSelector<BattleUnitsState, BattleUnit[], BattleUnit | null>(battleUnits, units => {
        const unit = units.find(unit => unit.id === unitId) as BattleUnit | undefined;
        return unit ? unit : null;
    });
export const isAnimation = (state: BattleState) => state.Battle.isAnimation as boolean;
