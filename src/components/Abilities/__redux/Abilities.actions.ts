import { createAction } from "deox";
import { ABILITIES } from "../Abilities.constants";

const namespace = "[Abilities]";

export const selectAbility = createAction(`${namespace} select ability`, resolve => (ability: ABILITIES | null) =>
    resolve(ability),
);
