import { createSelector } from "reselect";

import { abilitiesDictionary as abilitiesConstants } from "../../Abilities";
import { BattleUnitsState } from "../../BattleUnits/BattleUnits.types";
import { selectedUnit } from "../../SelectedUnit/__redux/SelectedUnit.selectors";
import { SelectedUnitState } from "../../SelectedUnit/SelectedUnit.types";
import { Unit } from "../../../core/Battle/Unit.types";
import { UIAbility } from "../../Abilities/Abilities.types";

export const abilities = createSelector<SelectedUnitState & BattleUnitsState, Unit | null, UIAbility[]>(
    [selectedUnit],
    unit => {
        if (!unit) return [];
        const result: UIAbility[] = [];
        unit.abilities.forEach(id => {
            const ability = abilitiesConstants[id];
            result.push(ability);
        });
        return result;
    },
);
