import { createSelector } from "reselect";

import { EffectsState } from "../Effects.types";
import { Effect, TickEffects } from "../../../core/Battle/Battle.types";

export const tickEffects = (state: EffectsState): TickEffects => state.Effects.tickEffects as TickEffects;
export const getEffectsByTick = (tick: number) =>
    createSelector<EffectsState, TickEffects, Effect[] | null>(tickEffects, tickEffects => {
        const effects = tickEffects[tick];
        if (effects) return effects;
        return null;
    });
