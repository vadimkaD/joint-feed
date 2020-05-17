import { PreparedUnit } from "../Battle/Battle.types";
import { select } from "redux-saga/effects";
import { tick } from "../Battle/__redux/Battle.external-selectors";
import { Effect, EffectType, TickEffects, UnitTargetAndValue } from "../Effects/Effects.types";
import { tickEffects } from "../Effects/__redux/Effects.selectors";
import { abilitiesDictionary } from "./index";
import { Coord } from "../../hexagons/hexagons.types";

export function* getCoordOfUnitForCurrentTick(unit: PreparedUnit) {
    const tickNumber: number = yield select(tick);
    const effects: TickEffects = yield select(tickEffects);
    const allPreviousTicks: number[] = Object.keys(effects)
        .filter(tick => +tick <= tickNumber)
        .map(i => +i);
    const transportEffectsForPreviousTickForThisUnit = allPreviousTicks
        .map((tick: number) =>
            effects[tick]
                .filter(effect => {
                    const ability = abilitiesDictionary[effect.abilityId];
                    return ability.effectType === EffectType.TRANSPORT;
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
    return unitCoord;
}
