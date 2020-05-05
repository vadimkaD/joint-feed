import { createSelector } from "reselect";

import { BattleState, BattleUnit, Hex, Hexes, HightlightedHexes, PreparedUnit, UnitsOnBoard } from "../Battle.types";
import { units as playerUnits } from "../../Player/Units/__redux/Units.selectors";
import { Unit, UnitsState } from "../../Player/Units/Units.types";
import { unit as selectedUnit } from "../../InfoPanel/__redux/InfoPanel.selectors";
import { InfoPanelState } from "../../InfoPanel/InfoPanel.types";
import {
    coordArrToObj,
    getAreaCoords,
    getHighlightsForRoute,
    getRoute,
    getStringFromCoord,
    isSameCoord,
} from "../Battle.utils";
import { Highlight } from "../../Battlefield/Battlefield.constants";

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
export const unitsOnBoard = createSelector<BattleState & UnitsState, PreparedUnit[], UnitsOnBoard>(
    preparedUnits,
    units => {
        return units.reduce((onBoard: UnitsOnBoard, unit) => {
            onBoard[getStringFromCoord(unit.coord)] = unit;
            return onBoard;
        }, {});
    },
);
export const hexUnderCursor = (state: BattleState) => state.Battle.hexUnderCursor as Hex;
export const highlightedHexes = createSelector<
    BattleState & InfoPanelState & UnitsState,
    Hexes,
    PreparedUnit | null,
    Hex | null,
    UnitsOnBoard,
    HightlightedHexes
>(hexes, selectedUnit, hexUnderCursor, unitsOnBoard, (hexes, selectedUnit, hexUnderCursor, unitsOnBoard) => {
    let highlights: HightlightedHexes = {};
    if (selectedUnit) {
        const coords = getAreaCoords(selectedUnit.currentActionPoints, selectedUnit.coord);
        const areaObj = coordArrToObj(coords);
        if (
            hexUnderCursor &&
            !unitsOnBoard[getStringFromCoord(hexUnderCursor.coord)] &&
            areaObj[getStringFromCoord(hexUnderCursor.coord)]
        ) {
            const route = getRoute(selectedUnit.coord, hexUnderCursor.coord);
            highlights = getHighlightsForRoute(route);
        }

        return coords.reduce((total: HightlightedHexes, coord) => {
            const key = getStringFromCoord(coord);
            total[key] = highlights[key] !== undefined ? highlights[key] : Highlight.HOVER;
            if (isSameCoord(coord, selectedUnit.coord)) {
                total[key] = Highlight.SELECTED_UNIT;
            }
            return total;
        }, {});
    } else if (hexUnderCursor) {
        highlights[getStringFromCoord(hexUnderCursor.coord)] = Highlight.HOVER;
    }

    return highlights;
});
