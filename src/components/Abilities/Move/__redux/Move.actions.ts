import { createAction } from "deox";
import { Hex } from "../../../Battle/Battle.types";
import { Action } from "../../../ActionQueue/ActionQueue.types";

const namespace = "[Move]";

export const onHexClick = createAction(`${namespace} on hex click`, resolve => (a: Hex) => resolve(a));
export const handleEffect = createAction(`${namespace} handle effect`, resolve => (a: Action) => resolve(a));
