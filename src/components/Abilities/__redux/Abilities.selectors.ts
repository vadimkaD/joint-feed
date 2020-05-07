import { AbilitiesState } from "../Abilities.types";
import { ABILITIES } from "../Abilities.constants";

export const selectedAbility = (state: AbilitiesState) => state.Abilities.selectedAbility as ABILITIES | null;
