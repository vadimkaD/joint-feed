import { Unit, UnitsOnBoard } from "../../core/Battle/Unit.types";

export interface UnitIconProps {
    unit: Unit;
}

export interface UnitIconPanelProps {
    unitsOnBoard: UnitsOnBoard;
    selectUnit: (unitId: string | null) => void;
}
