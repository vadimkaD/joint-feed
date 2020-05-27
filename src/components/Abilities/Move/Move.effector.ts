import { AbilityEffect, AbilityEffector } from "../Abilities.types";
import { Coord } from "../../../core/Hexagons/hexagons.types";
import { Unit, EffectType } from "../../../core/Battle/Battle.types";

export const moveEffector: AbilityEffector = (action, unitsOnBoard) => {
    const effects: AbilityEffect[] = [];

    const unit = Object.values(unitsOnBoard).find(unit => unit.id === action.unitId) as Unit | null;

    if (unit) {
        const coord = action.target[0] as Coord | undefined;
        if (coord) {
            effects.push({ type: EffectType.TRANSPORT, effect: { id: unit.id, coord } });
        }
    }

    return effects;
};
