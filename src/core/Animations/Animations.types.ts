import { Coord } from "../Battle/Hexagon.types";
import { ABILITIES } from "../Battle/Abilities.constants";
import { Action } from "../Actions/Actions.types";

export enum AnimationsTypes {
    UNIT_TRANSPORT = "UNIT_TRANSPORT",
    PROJECTILE = "PROJECTILE",
}

interface BaseAbilityAnimation {
    animationId: string;
    ability: ABILITIES;
    tick: number;
}

export interface UnitTransportAnimation extends BaseAbilityAnimation {
    targetUnitId: string;
    departure: Coord;
    destination: Coord;
    type: AnimationsTypes.UNIT_TRANSPORT;
}

export interface ProjectileAnimation extends BaseAbilityAnimation {
    departure: Coord;
    destination: Coord;
    type: AnimationsTypes.PROJECTILE;
}

export type AbilityAnimation = UnitTransportAnimation | ProjectileAnimation;

export interface Animations {
    [tick: number]: AbilityAnimation[];
}

export type AnimationsByAbility = {
    [key in ABILITIES]?: AnimationRecord[];
};

export interface AnimationRecord {
    tick: number;
    animation: AbilityAnimation;
}

export interface BaseAnimationProps {
    action: Action;
}

export interface TransportAnimationProps extends BaseAnimationProps {
    destination: Coord;
    departure: Coord;
    targetUnitId: string;
}

export type AnimationProps = TransportAnimationProps;
