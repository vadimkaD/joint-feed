import { ABILITIES } from "../../core/Battle/Abilities.constants";

export interface SelectedAbilityState {
    SelectedAbility: {
        selectedAbility: ABILITIES | null;
    };
}
