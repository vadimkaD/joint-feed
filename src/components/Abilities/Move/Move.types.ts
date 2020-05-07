import { ABILITIES } from "../Abilities.constants";

export interface MoveIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}
