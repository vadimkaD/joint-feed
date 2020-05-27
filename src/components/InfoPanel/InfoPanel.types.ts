import { Ability } from "../Abilities/Abilities.types";
import { Action } from "../ActionQueue/ActionQueue.types";
import { Unit } from "../../core/Battle/Battle.types";

export interface UnitProps {
    unit: Unit | null;
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
