import { ABILITIES } from "../Abilities.constants";
import { Coord } from "../../../hexagons/hexagons.types";
import { BattleUnit } from "../../BattleUnits/BattleUnits.types";

export interface MoveIconProps {
    selectAbility: (ability: ABILITIES | null) => void;
    selectedAbility: ABILITIES | null;
}

export interface UnitAnimatorProps {
    from: Coord;
    to: Coord;
    unit: BattleUnit;
}
