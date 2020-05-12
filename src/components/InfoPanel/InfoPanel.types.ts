import { PreparedUnit } from "../Battle/Battle.types";
import { Ability } from "../Abilities/Abilities.types";
import { Action } from "../ActionQueue/ActionQueue.types";

export type InfoPanelState = {
    InfoPanel: {
        unitId: string | null;
    };
};

export interface UnitProps {
    unit: PreparedUnit | null;
}

export interface InfoPanelProps extends UnitProps {
    abilities: Ability[];
    unitActions: Action[];
}

export interface HpValueProps {
    maxHp: number;
    currentHp: number;
}

export interface AbilityIconProps {
    icon: string;
    isSelected: boolean;
}
