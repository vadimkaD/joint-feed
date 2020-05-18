import { createAction } from "deox";

const namespace = "[Battle]";

export const mouseLeaveBoard = createAction(`${namespace} mouse leave board`);
export const setAnimation = createAction(`${namespace} set animation`, resolve => (isAnimation: boolean) =>
    resolve(isAnimation),
);
export const nextStep = createAction(`${namespace} next step`);
export const nextTick = createAction(`${namespace} next tick`);
export const setTick = createAction(`${namespace} set tick`, resolve => (tick: number) => resolve(tick));
export const actionComplete = createAction(`${namespace} action complete`);
