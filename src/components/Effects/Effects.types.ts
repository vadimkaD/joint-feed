import { BattleUnit, Coord, Hex } from "../Battle/Battle.types";
import { ABILITIES } from "../Abilities/Abilities.constants";

export enum EffectType {
    DEFENCE_AND_HEAL = "DEFENCE_AND_HEAL",
    TRANSPORT = "TRANSPORT",
    DAMAGE_AND_FIELD_EFFECT = "DAMAGE_AND_FIELD_EFFECT",
}

export interface UnitTarget {
    id: string;
}

export interface HexTarget {
    coord: Coord;
}

export type EffectValueUnit = Partial<BattleUnit>;
export type EffectValueHex = Partial<Hex>;

export type UnitTargetAndValue = [UnitTarget, EffectValueUnit];
export type HexTargetAndValue = [HexTarget, EffectValueHex | EffectValueUnit];

export interface Effect {
    effectId: string;
    sourceUnitId: string;
    abilityId: ABILITIES;
    targetAndValue: UnitTargetAndValue | HexTargetAndValue;
}

export type TickEffects = {
    [tick: number]: Effect[];
};

export interface EffectRecord {
    tick: number;
    effect: Effect;
}

export type EffectsState = {
    Effects: {
        tickEffects: TickEffects;
    };
};
