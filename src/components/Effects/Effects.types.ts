import { Effect, TickEffects } from "../../core/Battle/Battle.types";

export interface EffectRecord {
    tick: number;
    effect: Effect;
}

export type EffectsState = {
    Effects: {
        tickEffects: TickEffects;
    };
};
