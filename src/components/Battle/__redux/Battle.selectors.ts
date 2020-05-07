import { createSelector } from "reselect";

import { BattleState, Hex, Hexes, HightlightedHexes, PreparedUnit, UnitsOnBoard } from "../Battle.types";
import { UnitsState } from "../../Player/Units/Units.types";
import { unit as selectedUnit } from "../../InfoPanel/__redux/InfoPanel.selectors";
import { InfoPanelState } from "../../InfoPanel/InfoPanel.types";
import { getStringFromCoord } from "../Battle.utils";
import { Highlight } from "../../Battlefield/Battlefield.constants";
import { selectedAbility } from "../../Abilities/__redux/Abilities.selectors";
import { ABILITIES } from "../../Abilities/Abilities.constants";
import { AbilitiesState } from "../../Abilities/Abilities.types";
import { abilitiesDictionary } from "../../Abilities";
import { preparedUnits } from "./Battle.external-selectors";

export const hexes = (state: BattleState) => state.Battle.hexes as Hexes;

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
    BattleState & InfoPanelState & UnitsState & AbilitiesState,
    Hexes,
    PreparedUnit | null,
    Hex | null,
    UnitsOnBoard,
    ABILITIES | null,
    HightlightedHexes
>(
    hexes,
    selectedUnit,
    hexUnderCursor,
    unitsOnBoard,
    selectedAbility,
    (hexes, selectedUnit, hexUnderCursor, unitsOnBoard, selectedAbility) => {
        const highlights: HightlightedHexes = {};

        console.log("selectedUnit", selectedUnit);

        if (hexUnderCursor) {
            highlights[getStringFromCoord(hexUnderCursor.coord)] = Highlight.HOVER;
        }

        if (selectedUnit) {
            const key = getStringFromCoord(selectedUnit.coord);
            highlights[key] = Highlight.SELECTED_UNIT;
            if (selectedAbility) {
                const ability = abilitiesDictionary[selectedAbility];
                Object.assign(highlights, ability.getHighlights(hexes, selectedUnit, unitsOnBoard, hexUnderCursor));
            }
        }

        return highlights;
    },
);
