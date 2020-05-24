import { createReducer } from "deox";
import { Animations } from "../Animations.types";
import { addAnimation } from "./Animations.actions";
import { nextStep } from "../../Battle/__redux/Battle.actions";

export const animations = createReducer({} as Animations, handleAction => [
    handleAction(addAnimation, (state, { payload }) => {
        const { tick, animation } = payload;

        const tickRecord = state[tick] ? [...state[tick]] : [];

        if (!tickRecord.find(innerAnimation => animation.animationId === innerAnimation.animationId)) {
            tickRecord.push(animation);
        }

        return { ...state, [tick]: tickRecord };
    }),
    handleAction(nextStep, () => ({})),
]);
