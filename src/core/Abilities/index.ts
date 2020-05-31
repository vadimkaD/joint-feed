import { Abilities } from "./Abilities.types";
import { Move } from "./abilities/Move/Move";
import { ABILITIES } from "../Battle/Abilities.constants";
import { Unit } from "../Battle/Unit.types";
import { Action, AtLeastOneTransportActionTarget } from "../Actions/Actions.types";
import { EffectType } from "../Battle/Battle.types";
import { Coord } from "../Battle/Hexagon.types";

export const abilities: Abilities = {
    [ABILITIES.MOVE]: Move,
    [ABILITIES.MAGIC_ARROW]: Move,
};

export function getUnitUpdatedByTransportPrediction(unit: Unit, queue: Action[]): Unit {
    const transportActionsForUnit: Action[] = queue
        .filter(action => {
            const ability = abilities[action.ability];
            return ability.effectType === EffectType.TRANSPORT;
        })
        .filter(action => {
            const target = action.target as AtLeastOneTransportActionTarget;
            return target.some(t => t.unitId === unit.id);
        });

    const newCoord: Coord = { ...unit.coord };

    transportActionsForUnit.forEach(action => {
        const target = action.target as AtLeastOneTransportActionTarget;
        target.forEach(t => {
            newCoord.x = t.coord.x;
            newCoord.y = t.coord.y;
        });
    });

    return { ...unit, coord: newCoord };
}
