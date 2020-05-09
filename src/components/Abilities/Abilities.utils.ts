import { abilitiesDictionary } from "./index";
import { Action } from "../ActionQueue/ActionQueue.types";
import { PreparedUnit, UnitsOnBoard } from "../Battle/Battle.types";
import { AbilityEffect } from "./Abilities.types";

export const getEffectsForSelectedUnit = (
    queue: Action[],
    unitsOnBoard: UnitsOnBoard,
    selectedUnit: PreparedUnit,
): AbilityEffect[] => {
    return queue
        .map(action => {
            const ability = abilitiesDictionary[action.ability];
            return ability.effector(action, unitsOnBoard);
        })
        .flat()
        .filter(effect => effect.id === selectedUnit.id);
};

export const getEffectedUnit = (effects: AbilityEffect[], unit: PreparedUnit): PreparedUnit => {
    return effects.reduce(
        (total, effect) => {
            Object.assign(total, effect);
            return total;
        },
        { ...unit },
    ) as PreparedUnit;
};
