import { createSelector } from "reselect";
import { UnitsState } from "../../Player/Units/Units.types";
import { BaseUnit } from "../../Unit/Unit.types";
import { BattleState, BattleUnit, PreparedUnit } from "../Battle.types";
import { units as playerUnits } from "../../Player/Units/__redux/Units.selectors";

export const units = (state: BattleState): BattleUnit[] => state.Battle.battleUnits;
export const tick = (state: BattleState): number => state.Battle.tickNumber;
export const getUnitById = (unitId: string) =>
    createSelector<BattleState, BattleUnit[], BattleUnit | null>(units, units => {
        const unit = units.find(unit => unit.id === unitId) as BattleUnit | undefined;
        return unit ? unit : null;
    });
export const isAnimation = (state: BattleState) => state.Battle.isAnimation as boolean;
export const preparedUnits = createSelector<UnitsState & BattleState, BaseUnit[], BattleUnit[], PreparedUnit[]>(
    playerUnits,
    units,
    (playerUnits: BaseUnit[], battleUnits: BattleUnit[]) => {
        return battleUnits.map(battleUnit => {
            return {
                ...playerUnits.find(playerUnit => playerUnit.id === battleUnit.id),
                ...battleUnit,
            };
        }) as PreparedUnit[];
    },
);
