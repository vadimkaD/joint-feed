import { createAction } from "deox";
import { BattleUnit } from "../Battle.types";

const namespace = "[Battle]";

export const setUnits = createAction(`${namespace} set units`, resolve => (units: BattleUnit[]) => resolve(units));
export const addUnit = createAction(`${namespace} add unit`, resolve => (unit: BattleUnit) => resolve(unit));
export const mouseLeaveBoard = createAction(`${namespace} mouse leave board`);
export const updateUnit = createAction(`${namespace} update unit`, resolve => (unit: Partial<BattleUnit>) =>
    resolve(unit),
);
export const playStepClick = createAction(`${namespace} click play step`);
export const setAnimation = createAction(`${namespace} set animation`, resolve => (isAnimation: boolean) =>
    resolve(isAnimation),
);
export const nextStep = createAction(`${namespace} next step`);
export const nextTick = createAction(`${namespace} next tick`);
export const setTick = createAction(`${namespace} set tick`, resolve => (tick: number) => resolve(tick));
export const actionComplete = createAction(`${namespace} action complete`);
