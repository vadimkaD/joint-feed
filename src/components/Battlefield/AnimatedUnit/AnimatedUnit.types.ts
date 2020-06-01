import { Unit } from "../../../core/Battle/Unit.types";
import { UnitTransportAnimation } from "../../../core/Animations/Animations.types";

export interface AnimatedUnitProps {
    unit: Unit;
    transportAnimations: UnitTransportAnimation[];
}
