import { createAction } from "deox";
import { ABILITIES } from "../../../core/Battle/Abilities.constants";

const namespace = "[SelectedAbility]";

export const selectAbility = createAction(`${namespace} select ability`, resolve => (ability: ABILITIES | null) =>
    resolve(ability),
);
