import { PreparedUnit } from "../Battle/Battle.types";

export type InfoPanelState = {
    InfoPanel: {
        unit: PreparedUnit | null;
    };
};

export interface InfoPanelProps {
    unit: PreparedUnit | null;
}

export interface HpValueProps {
    maxHp: number;
    currentHp: number;
}
