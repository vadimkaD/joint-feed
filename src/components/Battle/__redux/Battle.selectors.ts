import { createSelector } from "reselect";

import { BattleState, HightlightedHexes, Owner, UnitsOnBoard } from "../Battle.types";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { selectedAbility } from "../../Abilities/__redux/Abilities.selectors";
import { ABILITIES } from "../../Abilities/Abilities.constants";
import { AbilitiesState } from "../../Abilities/Abilities.types";
import { abilitiesDictionary } from "../../Abilities";
import { isAnimation } from "./Battle.external-selectors";
import { Action, ActionQueueState } from "../../ActionQueue/ActionQueue.types";
import { queue } from "../../ActionQueue/__redux/ActionQueue.external-selectors";
import { getStringFromCoord } from "../../../hexagons";
import { Hex, Hexes, HexesState } from "../../Hexes/Hexes.types";
import { hexes, hexUnderCursor } from "../../Hexes/__redux/Hexes.selectors";
import { BattleUnit, BattleUnitsState } from "../../BattleUnits/BattleUnits.types";
import { battleUnits } from "../../BattleUnits/__redux/BattleUnits.selectors";
import { selectedUnit } from "../../SelectedUnit/__redux/SelectedUnit.selectors";
import { SelectedUnitState } from "../../SelectedUnit/SelectedUnit.types";

export const unitsOnBoard = createSelector<BattleUnitsState, BattleUnit[], UnitsOnBoard>(battleUnits, units => {
    return units.reduce((onBoard: UnitsOnBoard, unit) => {
        onBoard[getStringFromCoord(unit.coord)] = unit;
        return onBoard;
    }, {});
});

export const highlightedHexes = createSelector<
    BattleState & SelectedUnitState & BattleUnitsState & AbilitiesState & ActionQueueState & HexesState,
    Hexes,
    BattleUnit | null,
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

export const playerUnitsOnBoard = createSelector<BattleUnitsState, UnitsOnBoard, UnitsOnBoard>(unitsOnBoard, units => {
    const ownUnits: UnitsOnBoard = {};
    for (const coord in units) {
        const unit = units[coord];
        if (unit.owner === Owner.PLAYER) {
            ownUnits[coord] = unit;
        }
    }
    return ownUnits;
});
