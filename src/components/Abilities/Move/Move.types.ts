import { ABILITIES } from "../Abilities.constants";
import { Coord } from "../../Battle/Battle.types";

export interface MoveIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}

export interface MoveAnimationParams {
    from: Coord;
    to: Coord;
    unitId: string;
}
