import { createSelector } from "reselect";

import { Ability } from "../../Abilities/Abilities.types";
import { abilitiesDictionary as abilitiesConstants } from "../../Abilities";
import { BattleUnit, BattleUnitsState } from "../../BattleUnits/BattleUnits.types";
import { selectedUnit } from "../../SelectedUnit/__redux/SelectedUnit.selectors";
import { SelectedUnitState } from "../../SelectedUnit/SelectedUnit.types";

export const abilities = createSelector<SelectedUnitState & BattleUnitsState, BattleUnit | null, Ability[]>(
    [selectedUnit],
    unit => {
        if (!unit) return [];
        const result: Ability[] = [];
        unit.abilities.forEach(id => {
            const ability = abilitiesConstants[id];
            result.push(ability);
        });
        return result;
    },
);
