import { createSelector } from "reselect";

import { InfoPanelState } from "../InfoPanel.types";
import { Ability } from "../../Abilities/Abilities.types";
import { abilitiesDictionary as abilitiesConstants } from "../../Abilities";
import { BattleUnit, BattleUnitsState } from "../../BattleUnits/BattleUnits.types";
import { battleUnits } from "../../BattleUnits/__redux/BattleUnits.selectors";

export const unitId = (state: InfoPanelState) => state.InfoPanel.unitId as string | null;
export const unit = createSelector<InfoPanelState & BattleUnitsState, string | null, BattleUnit[], BattleUnit | null>(
    unitId,
    battleUnits,
    (unitId, units) => {
        if (unitId === null) return null;
        const foundUnit = units.find(unit => unit.id === unitId);
        return foundUnit ? foundUnit : null;
    },
);
export const abilities = createSelector<InfoPanelState & BattleUnitsState, BattleUnit | null, Ability[]>(
    [unit],
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
