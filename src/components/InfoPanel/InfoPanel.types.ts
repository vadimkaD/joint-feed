import { PreparedUnit } from "../Battle/Battle.types";
import { Ability } from "../Abilities/Abilities.types";

export type InfoPanelState = {
    InfoPanel: {
        unitId: number | null;
    };
};

export interface UnitProps {
    unit: PreparedUnit | null;
}

export interface InfoPanelProps extends UnitProps {
    abilities: Ability[];
}

export interface HpValueProps {
    maxHp: number;
    currentHp: number;
}

export interface AbilityIconProps {
    icon: string;
    isSelected: boolean;
}
