import { AbilityEffect, AbilityEffector } from "../Abilities.types";
import { PreparedUnit } from "../../Battle/Battle.types";
import { EffectType } from "../../Effects/Effects.types";
import { Coord } from "../../../hexagons/hexagons.types";

export const moveEffector: AbilityEffector = (action, unitsOnBoard) => {
    const effects: AbilityEffect[] = [];

    const unit = Object.values(unitsOnBoard).find(unit => unit.id === action.unitId) as PreparedUnit | null;

    if (unit) {
        const coord = action.target[0] as Coord | undefined;
        if (coord) {
            effects.push({ type: EffectType.TRANSPORT, effect: { id: unit.id, coord } });
        }
    }

    return effects;
};
