import { createSelector } from "reselect";

import { BattleState, HightlightedHexes, Owner, PreparedUnit, UnitsOnBoard } from "../Battle.types";
import { UnitsState } from "../../Player/Units/Units.types";
import { unit as selectedUnit } from "../../InfoPanel/__redux/InfoPanel.selectors";
import { InfoPanelState } from "../../InfoPanel/InfoPanel.types";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { selectedAbility } from "../../Abilities/__redux/Abilities.selectors";
import { ABILITIES } from "../../Abilities/Abilities.constants";
import { AbilitiesState } from "../../Abilities/Abilities.types";
import { abilitiesDictionary } from "../../Abilities";
import { isAnimation, preparedUnits } from "./Battle.external-selectors";
import { Action, ActionQueueState } from "../../ActionQueue/ActionQueue.types";
import { queue } from "../../ActionQueue/__redux/ActionQueue.external-selectors";
import { getStringFromCoord } from "../../../hexagons";
import { Hex, Hexes, HexesState } from "../../Hexes/Hexes.types";
import { hexes, hexUnderCursor } from "../../Hexes/__redux/Hexes.selectors";

export const unitsOnBoard = createSelector<BattleState & UnitsState, PreparedUnit[], UnitsOnBoard>(
    preparedUnits,
    units => {
        return units.reduce((onBoard: UnitsOnBoard, unit) => {
            onBoard[getStringFromCoord(unit.coord)] = unit;
            return onBoard;
        }, {});
    },
);
export const highlightedHexes = createSelector<
    BattleState & InfoPanelState & UnitsState & AbilitiesState & ActionQueueState & HexesState,
    Hexes,
    PreparedUnit | null,
    Hex | null,
    UnitsOnBoard,
    ABILITIES | null,
    Action[],
    boolean,
    HightlightedHexes
>(
    hexes,
    selectedUnit,
    hexUnderCursor,
    unitsOnBoard,
    selectedAbility,
    queue,
    isAnimation,

    (hexes, selectedUnit, hexUnderCursor, unitsOnBoard, selectedAbility, queue, isAnimation) => {
        const highlights: HightlightedHexes = {};
        if (hexUnderCursor) {
            highlights[getStringFromCoord(hexUnderCursor.coord)] = Highlight.HOVER;
        }

        if (isAnimation) return highlights;

        if (selectedUnit) {
            const key = getStringFromCoord(selectedUnit.coord);
            highlights[key] = Highlight.SELECTED_UNIT;
            if (selectedAbility) {
                const ability = abilitiesDictionary[selectedAbility];
                Object.assign(
                    highlights,
                    ability.getHighlights(hexes, selectedUnit, unitsOnBoard, hexUnderCursor, queue),
                );
            }
        }

        return highlights;
    },
);

export const playerUnitsOnBoard = createSelector<BattleState & UnitsState, UnitsOnBoard, UnitsOnBoard>(
    unitsOnBoard,
    units => {
        const ownUnits: UnitsOnBoard = {};
        for (const coord in units) {
            const unit = units[coord];
            if (unit.owner === Owner.PLAYER) {
                ownUnits[coord] = unit;
            }
        }
        return ownUnits;
    },
);
