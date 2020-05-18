import { ABILITIES } from "../../Abilities/Abilities.constants";
import { SelectedAbilityState } from "../SelectedAbility.types";

export const selectedAbility = (state: SelectedAbilityState) =>
    state.SelectedAbility.selectedAbility as ABILITIES | null;
