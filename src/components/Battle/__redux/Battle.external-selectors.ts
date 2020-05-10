import { createSelector } from "reselect";
import { Unit, UnitsState } from "../../Player/Units/Units.types";
import { BattleState, BattleUnit, PreparedUnit } from "../Battle.types";
import { units as playerUnits } from "../../Player/Units/__redux/Units.selectors";

export const units = (state: BattleState) => state.Battle.battleUnits as BattleUnit[];
export const isAnimation = (state: BattleState) => state.Battle.isAnimation as boolean;
export const preparedUnits = createSelector<UnitsState & BattleState, Unit[], BattleUnit[], PreparedUnit[]>(
    playerUnits,
    units,
    (playerUnits: Unit[], battleUnits: BattleUnit[]) => {
        return battleUnits.map(battleUnit => {
            return {
                ...playerUnits.find(playerUnit => playerUnit.id === battleUnit.id),
                ...battleUnit,
            };
        }) as PreparedUnit[];
    },
);
