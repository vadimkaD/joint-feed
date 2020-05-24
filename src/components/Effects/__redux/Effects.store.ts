import { createReducer } from "deox";
import { TickEffects } from "../Effects.types";
import { addEffect } from "./Effects.actions";
import { nextStep } from "../../Battle/__redux/Battle.actions";

export const tickEffects = createReducer({} as TickEffects, handleAction => [
    handleAction(addEffect, (state, { payload }) => {
        const { tick, effect } = payload;
        const tickRecord = state[tick] ? [...state[tick]] : [];

        if (!tickRecord.find(innerEffect => effect.effectId === innerEffect.effectId)) {
            tickRecord.push(effect);
        }

        return { ...state, [tick]: tickRecord };
    }),
    handleAction(nextStep, (state, { payload }) => {
        return Object.keys(state)
            .filter(tickNumber => +tickNumber > payload)
            .reduce((obj, tick) => {
                obj[+tick] = state[+tick];
                return obj;
            }, {} as TickEffects);
    }),
]);
