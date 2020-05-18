import { ABILITIES } from "../Abilities/Abilities.constants";

export interface SelectedAbilityState {
    SelectedAbility: {
        selectedAbility: ABILITIES | null;
    };
}
