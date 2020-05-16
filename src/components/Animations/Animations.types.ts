import { Coord } from "../Battle/Battle.types";
import { ABILITIES } from "../Abilities/Abilities.constants";
import { AnyObject } from "../../types";

export interface AbilityAnimation {
    animationId: string;
    params: AnyObject;
    ability: ABILITIES;
}

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
export interface AnimationsState {
    Animations: {
        animations: Animations;
    };
}
