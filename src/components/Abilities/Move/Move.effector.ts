import { AbilityEffect, AbilityEffector } from "../Abilities.types";
import { EffectType } from "../../Effects/Effects.types";
import { Coord } from "../../../hexagons/hexagons.types";
import { BattleUnit } from "../../BattleUnits/BattleUnits.types";

export const moveEffector: AbilityEffector = (action, unitsOnBoard) => {
    const effects: AbilityEffect[] = [];

    const unit = Object.values(unitsOnBoard).find(unit => unit.id === action.unitId) as BattleUnit | null;

    if (unit) {
        const coord = action.target[0] as Coord | undefined;
        if (coord) {
            effects.push({ type: EffectType.TRANSPORT, effect: { id: unit.id, coord } });
        }
    }

    return effects;
};
