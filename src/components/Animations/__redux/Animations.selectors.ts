import { AnimationsState } from "../Animations.types";
import { createSelector } from "reselect";
import { Unit } from "../../../core/Battle/Unit.types";
import { AnimationRecord, Animations, AnimationsByAbility } from "../../../core/Animations/Animations.types";

export const animations = (state: AnimationsState): Animations => state.Animations.animations;
export const animationsByAbility = createSelector<AnimationsState, Animations, AnimationsByAbility>(
    animations,
    animations => {
        const abilityRecords: AnimationRecord[] = Object.keys(animations)
            .sort((a, b) => +a - +b)
            .map(tick => {
                return animations[+tick].map(animation => {
                    return {
                        tick: +tick,
                        animation,
                    };
                });
            })
            .flat();

        const record: AnimationsByAbility = {};

        abilityRecords.forEach(inner => {
            const value = record[inner.animation.ability];
            if (value) {
                value.push(inner);
                record[inner.animation.ability] = value;
            } else {
                record[inner.animation.ability] = [inner];
            }
        });

        return record;
    },
);

export const animatedUnits = (state: AnimationsState): Unit[] => state.Animations.animatedUnits;
