import { BattleUnit } from "../../BattleUnits/BattleUnits.types";
import { UnitTransportAnimation } from "../../Animations/Animations.types";

export interface AnimatedUnitProps {
    unit: BattleUnit;
    transportAnimations: UnitTransportAnimation[];
}
