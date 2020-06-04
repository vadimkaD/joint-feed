import { createAction } from "deox";
import { Action } from "../../../core/Actions/Actions.types";

const namespace = "[ActionQueue]";

export const addAction = createAction(`${namespace} add action`, resolve => (action: Action) => resolve(action));
export const removeAction = createAction(`${namespace} remove action`, resolve => (action: Action) => resolve(action));
