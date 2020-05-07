import { Coord, PreparedUnit } from "../Battle/Battle.types";
import { ABILITIES } from "../Abilities/Abilities.constants";

export interface Action {
    unitId: number;
    target: Coord | PreparedUnit;
    ability: ABILITIES;
}
