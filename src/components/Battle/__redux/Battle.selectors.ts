import { createSelector } from "reselect";

import { BattleState, HightlightedHexes } from "../Battle.types";
import { abilitiesDictionary } from "../../Abilities";
import { isAnimation } from "./Battle.external-selectors";
import { ActionQueueState } from "../../ActionQueue/ActionQueue.types";
import { queue } from "../../ActionQueue/__redux/ActionQueue.external-selectors";
import { getStringFromCoord } from "../../../core/Battle/Hexagons";
import { HexesState } from "../../Hexes/Hexes.types";
import { hexes, hexUnderCursor } from "../../Hexes/__redux/Hexes.selectors";
import { BattleUnitsState } from "../../BattleUnits/BattleUnits.types";
import { battleUnits } from "../../BattleUnits/__redux/BattleUnits.selectors";
import { selectedUnit } from "../../SelectedUnit/__redux/SelectedUnit.selectors";
import { SelectedUnitState } from "../../SelectedUnit/SelectedUnit.types";
import { selectedAbility } from "../../SelectedAbility/__redux/SelectedAbility.selectors";
import { SelectedAbilityState } from "../../SelectedAbility/SelectedAbility.types";
import { Hex, Hexes } from "../../../core/Battle/Battle.types";
import { Owner, Unit, UnitsOnBoard } from "../../../core/Battle/Unit.types";
import { Action } from "../../../core/Actions/Actions.types";
import { ABILITIES } from "../../../core/Battle/Abilities.constants";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { owner } from "../../Player/__redux/Player.selectors";
import { PlayerState } from "../../Player/Player.types";

export const unitsOnBoard = createSelector<BattleUnitsState, Unit[], UnitsOnBoard>(battleUnits, units => {
    return units.reduce((onBoard: UnitsOnBoard, unit) => {
        onBoard[getStringFromCoord(unit.coord)] = unit;
        return onBoard;
    }, {});
});

export const highlightedHexes = createSelector<
    BattleState & SelectedUnitState & BattleUnitsState & SelectedAbilityState & ActionQueueState & HexesState,
    Hexes,
    Unit | null,
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

export const playerUnitsOnBoard = createSelector<
    BattleUnitsState & PlayerState,
    UnitsOnBoard,
    Owner | null,
    UnitsOnBoard
>(unitsOnBoard, owner, (units, owner) => {
    const ownUnits: UnitsOnBoard = {};

    if (!owner) return ownUnits;

    for (const coord in units) {
        const unit = units[coord];
        if (unit.owner === owner) {
            ownUnits[coord] = unit;
        }
    }
    return ownUnits;
});
