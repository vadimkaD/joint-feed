import { createAction } from "deox";
import { Owner } from "../../../core/Battle/Unit.types";
import { Action } from "../../../core/Actions/Actions.types";

const namespace = "[Battle]";

export const mouseLeaveBoard = createAction(`${namespace} mouse leave board`);
export const setAnimation = createAction(`${namespace} set animation`, resolve => (isAnimation: boolean) =>
    resolve(isAnimation),
);
export const nextStep = createAction(`${namespace} next step`, resolve => (lastTick: number) => resolve(lastTick));
export const nextTick = createAction(`${namespace} next tick`);
export const setTick = createAction(`${namespace} set tick`, resolve => (tick: number) => resolve(tick));
export const actionComplete = createAction(`${namespace} action complete`);
export const receiveComplete = createAction(`${namespace} receive complete`);
export const connectPlayer = createAction(`${namespace} connect player`, resolve => (player: Owner) => resolve(player));
export const sendActions = createAction(`${namespace} send actions`, resolve => (actions: Action[]) =>
    resolve(actions),
);
export const receiveActions = createAction(`${namespace} receive actions`, resolve => (actions: Action[]) =>
    resolve(actions),
);
