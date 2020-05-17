import { createAction } from "deox";
import { Action } from "../../../ActionQueue/ActionQueue.types";
import { Hex } from "../../../Hexes/Hexes.types";

const namespace = "[MagicArrow]";

export const onHexClick = createAction(`${namespace} on hex click`, resolve => (a: Hex) => resolve(a));
export const handleEffect = createAction(`${namespace} handle effect`, resolve => (a: Action) => resolve(a));
