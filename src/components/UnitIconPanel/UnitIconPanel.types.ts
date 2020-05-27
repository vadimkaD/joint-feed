import { UnitsOnBoard } from "../Battle/Battle.types";
import { Unit } from "../../core/Battle/Battle.types";

export interface UnitIconProps {
    unit: Unit;
}

export interface UnitIconPanelProps {
    unitsOnBoard: UnitsOnBoard;
    selectUnit: (unitId: string | null) => void;
}
