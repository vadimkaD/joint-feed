import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { battleUnits as battleUnitsSelector } from "../../BattleUnits/__redux/BattleUnits.selectors";
import { animations as animationsSelector } from "../../Animations/__redux/Animations.selectors";
import {
    AbilityAnimation,
    Animations,
    AnimationsTypes,
    UnitTransportAnimation,
} from "../../Animations/Animations.types";
import { tick } from "../../Battle/__redux/Battle.external-selectors";
import AnimatedUnit from "../AnimatedUnit/AnimatedUnit";
import { Unit } from "../../../core/Battle/Unit.types";

const AnimatedUnits: React.FunctionComponent<{}> = () => {
    const battleUnits: Unit[] = useSelector(battleUnitsSelector);
    const animations: Animations = useSelector(animationsSelector);
    const currentTick: number = useSelector(tick);
    const tickAnimations = useMemo<AbilityAnimation[]>(() => animations[currentTick] || [], [animations, currentTick]);
    const transportAnimations = useMemo(
        () => tickAnimations.filter(val => val.type === AnimationsTypes.UNIT_TRANSPORT),
        [tickAnimations],
    ) as UnitTransportAnimation[];

    return (
        <>
            {battleUnits.map(unit => (
                <AnimatedUnit key={unit.id} transportAnimations={transportAnimations} unit={unit} />
            ))}
        </>
    );
};

export default AnimatedUnits;
