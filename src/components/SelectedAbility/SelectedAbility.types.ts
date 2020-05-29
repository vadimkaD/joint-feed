import { ABILITIES } from "../../core/Abilities/Abilities.constants";

export interface SelectedAbilityState {
    SelectedAbility: {
        selectedAbility: ABILITIES | null;
    };
}
