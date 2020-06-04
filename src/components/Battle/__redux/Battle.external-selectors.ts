import { createSelector } from "reselect";
import { battleUnits } from "../../BattleUnits/__redux/BattleUnits.selectors";
import { BattleState } from "../Battle.types";
import { BattleUnitsState } from "../../BattleUnits/BattleUnits.types";
import { Unit } from "../../../core/Battle/Unit.types";

export const tick = (state: BattleState): number => state.Battle.tickNumber;
export const stepNumber = (state: BattleState): number => state.Battle.stepNumber;
export const getUnitById = (unitId: string) =>
    createSelector<BattleUnitsState, Unit[], Unit | null>(battleUnits, units => {
        const unit = units.find(unit => unit.id === unitId) as Unit | undefined;
        return unit ? unit : null;
    });
export const isAnimation = (state: BattleState) => state.Battle.isAnimation as boolean;
