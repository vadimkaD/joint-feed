import { createAction } from "deox";
import { AnimationRecord } from "../Animations.types";
import { Unit } from "../../../core/Battle/Unit.types";

const namespace = "[Animations]";

export const animate = createAction(`${namespace} animate`);
export const addAnimation = createAction(`${namespace} add animation`, resolve => (animationRecord: AnimationRecord) =>
    resolve(animationRecord),
);
export const dumpAnimatedUnits = createAction(`${namespace} dump animated units`, resolve => (units: Unit[]) =>
    resolve(units),
);
