import { BattleUnit, PreparedUnit } from "../../Battle/Battle.types";
import { Unit } from "../../Player/Units/Units.types";

export type InfoPanelState = {
    Unit: {
        InfoPanel: {
            unit: PreparedUnit | null;
        };
    };
};

export interface InfoPanelProps {
    unit: PreparedUnit | null;
}
