import { Unit } from "../../core/Battle/Unit.types";
import { Action } from "../../core/Actions/Actions.types";
import { Ability } from "../../core/Abilities/Abilities.types";

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
