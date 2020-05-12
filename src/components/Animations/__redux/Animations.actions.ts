import { createAction } from "deox";
import { AnimationRecord } from "../Animations.types";

const namespace = "[Animations]";

export const animate = createAction(`${namespace} animate`);
export const addAnimation = createAction(`${namespace} add animation`, resolve => (animationRecord: AnimationRecord) =>
    resolve(animationRecord),
);
