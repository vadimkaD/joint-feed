import { createAction } from "deox";
import { Owner } from "../../../core/Battle/Unit.types";

const namespace = "[Player]";

export const setPlayer = createAction(`${namespace} set player`, resolve => (owner: Owner | null) => resolve(owner));
