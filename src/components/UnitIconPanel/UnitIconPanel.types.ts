import { UnitsOnBoard } from "../Battle/Battle.types";
import { BattleUnit } from "../BattleUnits/BattleUnits.types";

export interface UnitIconProps {
    unit: BattleUnit;
}

export interface UnitIconPanelProps {
    unitsOnBoard: UnitsOnBoard;
    selectUnit: (unitId: string | null) => void;
}
