import { createReducer } from "deox";
import { addAnimation, dumpAnimatedUnits } from "./Animations.actions";
import { nextStep } from "../../Battle/__redux/Battle.actions";
import { Unit } from "../../../core/Battle/Unit.types";
import { Animations } from "../../../core/Animations/Animations.types";

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

export const animatedUnits = createReducer([] as Unit[], handleAction => [
    handleAction(dumpAnimatedUnits, (state, { payload }) => [...payload]),
]);
