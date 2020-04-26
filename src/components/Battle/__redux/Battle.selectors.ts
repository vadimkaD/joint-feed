import { createSelector } from "reselect";

import { BattleUnit, BattleState, PreparedUnit, Hexes } from "../Battle.types";
import { units as playerUnits } from "../../Player/Units/__redux/Units.selectors";
import { Unit } from "../../Player/Units/Units.types";
import { UnitsState } from "../../Player/Units/Units.types";

export const units = (state: BattleState) => state.Battle.battleUnits as BattleUnit[];
export const hexes = (state: BattleState) => state.Battle.hexes as Hexes;

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
