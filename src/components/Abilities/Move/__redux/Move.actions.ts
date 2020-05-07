import { createAction } from "deox";
import { Hex } from "../../../Battle/Battle.types";

const namespace = "[Move]";

export const onHexClick = createAction(`${namespace} on hex click`, resolve => (a: Hex) => resolve(a));
