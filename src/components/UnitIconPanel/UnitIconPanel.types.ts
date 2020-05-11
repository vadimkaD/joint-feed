import { PreparedUnit, UnitsOnBoard } from "../Battle/Battle.types";

export interface UnitIconProps {
    unit: PreparedUnit;
}

export interface UnitIconPanelProps {
    unitsOnBoard: UnitsOnBoard;
    selectUnit: (unitId: string | null) => void;
}
