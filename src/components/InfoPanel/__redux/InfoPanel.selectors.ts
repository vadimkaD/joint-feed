import { createSelector } from "reselect";

import { InfoPanelState } from "../InfoPanel.types";
import { BattleState, PreparedUnit } from "../../Battle/Battle.types";
import { Ability } from "../../Abilities/Abilities.types";
import { abilitiesDictionary as abilitiesConstants } from "../../Abilities";
import { UnitsState } from "../../Player/Units/Units.types";
import { preparedUnits } from "../../Battle/__redux/Battle.external-selectors";

export const unitId = (state: InfoPanelState) => state.InfoPanel.unitId as string | null;
export const unit = createSelector<
    InfoPanelState & BattleState & UnitsState,
    string | null,
    PreparedUnit[],
    PreparedUnit | null
>(unitId, preparedUnits, (unitId, units) => {
    if (unitId === null) return null;
    const foundUnit = units.find(unit => unit.id === unitId);
    return foundUnit ? foundUnit : null;
});
export const abilities = createSelector<InfoPanelState & BattleState & UnitsState, PreparedUnit | null, Ability[]>(
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
