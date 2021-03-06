import { Unit } from "./Unit.types";
import { Coord } from "./Hexagon.types";
import { ABILITIES } from "./Abilities.constants";

export interface IBattle {
    applyTickEffects(result: TickParams): Promise<TickResult>;
    applyStepEffects(result: StepParams): Promise<StepResult>;
}

export interface Hex {
    coord: Coord;
    isEmpty?: boolean;
}

export interface Hexes {
    [coordinates: string]: Hex;
}

export interface TickResult {
    tick: number;
    hexes: Hexes;
    units: Unit[];
}

export interface TickParams {
    tick: number;
    hexes: Hexes;
    units: Unit[];
    effects: Effect[];
}

export interface StepResult {
    step: number;
    hexes: Hexes;
    units: Unit[];
}

export interface StepParams {
    step: number;
    hexes: Hexes;
    units: Unit[];
    effects: TickEffects;
}

export enum EffectType {
    DEFENCE_AND_HEAL = "DEFENCE_AND_HEAL",
    TRANSPORT = "TRANSPORT",
    DAMAGE_AND_HEX_EFFECT = "DAMAGE_AND_HEX_EFFECT",
}

export interface UnitTarget {
    id: string;
}

export interface HexTarget {
    coord: Coord;
}

export type EffectValueUnit = Partial<Unit>;
export type EffectValueHex = Partial<Hex>;
export type TransportEffectValue = {
    coord: Coord;
};

export type UnitTargetAndValue = [UnitTarget, EffectValueUnit];
export type TransportTargetAndValue = [UnitTarget, TransportEffectValue];
export type ProjectileTargetAndValue = [HexTarget, EffectValueUnit];

export type TargetAndValue = UnitTargetAndValue | TransportTargetAndValue | ProjectileTargetAndValue;

export interface Effect {
    effectId: string;
    sourceUnitId: string;
    ability: ABILITIES;
    type: EffectType;
    targetAndValue: TargetAndValue;
}

export type TickEffects = {
    [tick: number]: Effect[];
};
