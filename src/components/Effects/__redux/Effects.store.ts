import { createReducer } from "deox";
import { TickEffects } from "../Effects.types";
import { addEffect } from "./Effects.actions";

export const tickEffects = createReducer({} as TickEffects, handleAction => [
    handleAction(addEffect, (state, { payload }) => {
        const { tick, effect } = payload;
        const tickRecord = state[tick] ? [...state[tick]] : [];

        if (!tickRecord.find(innerEffect => effect.effectId === innerEffect.effectId)) {
            tickRecord.push(effect);
        }

        return { ...state, [tick]: tickRecord };
    }),
]);
