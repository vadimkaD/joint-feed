import { SelectedAbilityState } from "../SelectedAbility.types";
import { ABILITIES } from "../../../core/Abilities/Abilities.constants";

export const selectedAbility = (state: SelectedAbilityState) =>
    state.SelectedAbility.selectedAbility as ABILITIES | null;
