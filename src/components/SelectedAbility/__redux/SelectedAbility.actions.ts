import { createAction } from "deox";
import { ABILITIES } from "../../../core/Abilities/Abilities.constants";

const namespace = "[SelectedAbility]";

export const selectAbility = createAction(`${namespace} select ability`, resolve => (ability: ABILITIES | null) =>
    resolve(ability),
);
