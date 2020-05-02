import { createSelector } from "reselect";

import { BattleState, BattleUnit, Hex, Hexes, HightlightedHexes, PreparedUnit, UnitsOnBoard } from "../Battle.types";
import { units as playerUnits } from "../../Player/Units/__redux/Units.selectors";
import { Unit, UnitsState } from "../../Player/Units/Units.types";
import { unit as selectedUnit } from "../../Unit/InfoPanel/__redux/InfoPanel.selectors";
import { InfoPanelState } from "../../Unit/InfoPanel/InfoPanel.types";
import { getAreaCoords, getStringFromCoord } from "../Battle.utils";

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

export const hexUnderCursor = (state: BattleState) => state.Battle.hexUnderCursor as Hex;
export const highlightedHexes = createSelector<
    BattleState & InfoPanelState,
    Hexes,
    PreparedUnit | null,
    HightlightedHexes
>(hexes, selectedUnit, (hexes, selectedUnit) => {
    if (selectedUnit) {
        const coords = getAreaCoords(selectedUnit.currentActionPoints, selectedUnit.coord);
        return coords.reduce((total: HightlightedHexes, coord) => {
            const key = getStringFromCoord(coord);
            total[key] = true;
            return total;
        }, {});
    }

    return {};
});

export const unitsOnBoard = createSelector<BattleState & UnitsState, PreparedUnit[], UnitsOnBoard>(
    preparedUnits,
    units => {
        return units.reduce((onBoard: UnitsOnBoard, unit) => {
            onBoard[getStringFromCoord(unit.coord)] = unit;
            return onBoard;
        }, {});
    },
);
