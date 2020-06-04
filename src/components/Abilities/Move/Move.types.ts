import { Unit } from "../../../core/Battle/Unit.types";
import { Coord } from "../../../core/Battle/Hexagon.types";
import { ABILITIES } from "../../../core/Battle/Abilities.constants";

export interface MoveIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}

export interface UnitAnimatorProps {
    from: Coord;
    to: Coord;
    unit: Unit;
}
