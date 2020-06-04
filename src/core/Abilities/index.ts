import { Abilities } from "./Abilities.types";
import { Move } from "./abilities/Move/Move";
import { ABILITIES } from "../Battle/Abilities.constants";
import { Unit } from "../Battle/Unit.types";
import { Action, AtLeastOneTransportActionTarget } from "../Actions/Actions.types";
import { Effect, EffectType, TickEffects, UnitTargetAndValue } from "../Battle/Battle.types";
import { Coord } from "../Battle/Hexagon.types";
import { isSameCoord } from "../Battle/Hexagons";
import { MagicArrow } from "./abilities/MagicArrow/MagicArrow";

export const abilities: Abilities = {
    [ABILITIES.MOVE]: Move,
    [ABILITIES.MAGIC_ARROW]: MagicArrow,
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

export function getTransportEffectedUnit(unit: Unit, effects: TickEffects, tickNumber: number): Unit {
    const allPreviousTicks: number[] = Object.keys(effects)
        .filter(tick => +tick <= tickNumber)
        .map(i => +i);

    const transportEffectsForPreviousTickForThisUnit = allPreviousTicks
        .map((tick: number) =>
            effects[tick]
                .filter(effect => {
                    return effect.type === EffectType.TRANSPORT;
                })
                .filter(effect => {
                    const [target] = effect.targetAndValue as UnitTargetAndValue;
                    return target.id === unit.id;
                }),
        )
        .flat() as Effect[];
    const lastEffect = transportEffectsForPreviousTickForThisUnit.pop();
    const unitCoord: Coord = { ...unit.coord };
    if (lastEffect) {
        const [, lastEffectValue] = lastEffect.targetAndValue as UnitTargetAndValue;
        if (lastEffectValue.coord) {
            unitCoord.x = lastEffectValue.coord.x;
            unitCoord.y = lastEffectValue.coord.y;
        }
    }
    return { ...unit, coord: unitCoord };
}

export function isOccupationPredicted(tickEffects: Effect[], coord: Coord): boolean {
    let alreadyOccupied = false;

    if (tickEffects) {
        const transportEffects = tickEffects.filter((effect: Effect) => {
            return effect.type === EffectType.TRANSPORT;
        });

        alreadyOccupied = transportEffects.reduce((occupied: boolean, effect: Effect) => {
            if (occupied) return occupied;
            const [, value] = effect.targetAndValue as UnitTargetAndValue;
            if (value.coord) {
                return isSameCoord(value.coord, coord);
            }
            return false;
        }, alreadyOccupied);
    }

    return alreadyOccupied;
}
