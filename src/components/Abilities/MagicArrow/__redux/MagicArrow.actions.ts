import { createAction } from "deox";
import { Hex } from "../../../../core/Battle/Battle.types";
import { Action } from "../../../../core/Actions/Actions.types";

const namespace = "[MagicArrow]";

export const onHexClick = createAction(`${namespace} on hex click`, resolve => (a: Hex) => resolve(a));
export const handleEffect = createAction(`${namespace} handle effect`, resolve => (a: Action) => resolve(a));
