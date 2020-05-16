import { ABILITIES } from "../Abilities.constants";
import { Coord, PreparedUnit } from "../../Battle/Battle.types";

export interface MoveIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}

export interface MoveAnimationParams {
    from: Coord;
    to: Coord;
    unitId: string;
}

export interface UnitAnimatorProps {
    from: Coord;
    to: Coord;
    unit: PreparedUnit;
}
