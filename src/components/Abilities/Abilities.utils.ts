import { abilitiesDictionary } from "./index";
import { Action } from "../ActionQueue/ActionQueue.types";
import { UnitsOnBoard } from "../Battle/Battle.types";
import { AbilityEffect } from "./Abilities.types";
import { BattleUnit } from "../BattleUnits/BattleUnits.types";

export const getEffectsForSelectedUnit = (
    queue: Action[],
    unitsOnBoard: UnitsOnBoard,
    selectedUnit: BattleUnit,
): AbilityEffect[] => {
    return queue
        .map(action => {
            const ability = abilitiesDictionary[action.ability];
            return ability.effector(action, unitsOnBoard);
        })
        .flat()
        .filter(effect => effect.effect.id === selectedUnit.id);
};

export const getEffectedUnit = (effects: AbilityEffect[], unit: BattleUnit): BattleUnit => {
    return effects.reduce(
        (total, effect) => {
            Object.assign(total, effect.effect);
            return total;
        },
        { ...unit },
    ) as BattleUnit;
};
