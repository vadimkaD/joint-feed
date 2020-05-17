import { Action } from "../ActionQueue/ActionQueue.types";
import { abilitiesDictionary } from "../Abilities";
import { EffectType } from "../Effects/Effects.types";
import { getStringFromCoord } from "../../hexagons";
import { Hex, Hexes } from "../Hexes/Hexes.types";

export function hexArrToObj(hexes: Hex[]): Hexes {
    return hexes.reduce((total: Hexes, hex) => {
        total[getStringFromCoord(hex.coord)] = hex;
        return total;
    }, {});
}

export function sortActionsByAbilityType(actions: Action[]): Action[] {
    const DEFENCE_AND_HEAL: Action[] = actions.filter(action => {
        const ability = abilitiesDictionary[action.ability];
        return ability.effectType === EffectType.DEFENCE_AND_HEAL;
    });

    const TRANSPORT: Action[] = actions.filter(action => {
        const ability = abilitiesDictionary[action.ability];
        return ability.effectType === EffectType.TRANSPORT;
    });

    const DAMAGE_AND_FIELD_EFFECT: Action[] = actions.filter(action => {
        const ability = abilitiesDictionary[action.ability];
        return ability.effectType === EffectType.DAMAGE_AND_FIELD_EFFECT;
    });

    return [...DEFENCE_AND_HEAL, ...TRANSPORT, ...DAMAGE_AND_FIELD_EFFECT];
}
