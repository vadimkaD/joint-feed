import { UnitTransportAnimation } from "../../Animations/Animations.types";
import { Unit } from "../../../core/Battle/Unit.types";

export interface AnimatedUnitProps {
    unit: Unit;
    transportAnimations: UnitTransportAnimation[];
}
