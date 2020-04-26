import { Unit } from "../Player/Units/Units.types";
import { BattleUnit } from "../Battle/Battle.types";

export interface UnitProps {
    unit: BattleUnit & Unit;
}

export interface SelectedUnitProps {
    selectedUnit: Unit | null;
}
