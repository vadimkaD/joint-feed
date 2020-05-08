import { AbilityEffect, AbilityEffector } from "../Abilities.types";
import { Coord, PreparedUnit } from "../../Battle/Battle.types";

export const moveEffector: AbilityEffector = (action, unitsOnBoard) => {
    const effects: AbilityEffect[] = [];

    const unit = Object.values(unitsOnBoard).find(unit => unit.id === action.unitId) as PreparedUnit | null;

    if (unit) {
        const coord = action.target as Coord;
        effects.push({ id: unit.id, coord });
    }

    return effects;
};
