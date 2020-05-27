import { ABILITIES } from "../Abilities.constants";
import { Coord } from "../../../core/Hexagons/hexagons.types";
import { Unit } from "../../../core/Battle/Battle.types";

export interface MoveIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}

export interface UnitAnimatorProps {
    from: Coord;
    to: Coord;
    unit: Unit;
}
