import React from "react";
import { useSelector } from "react-redux";
import { AbilityAnimator } from "../../Abilities.types";
import { getCenter } from "../../../Battlefield/Battlefield.utils";
import { UnitAnimator } from "./Move.unit-animator";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";
import { animatedUnits as animatedUnitsSelector } from "../../../Animations/__redux/Animations.selectors";
import { Unit } from "../../../../core/Battle/Unit.types";
import { UnitTransportAnimation } from "../../../../core/Animations/Animations.types";

const MoveAnimator: AbilityAnimator = ({ animationRecords }) => {
    const animatedUnits = useSelector(animatedUnitsSelector);
    const currentTick = useSelector(tick);

    return (
        <>
            {animationRecords
                .filter(record => record.tick === currentTick)
                .map((record, index) => {
                    const { targetUnitId, destination, departure } = record.animation as UnitTransportAnimation;

                    const unit = animatedUnits.find(innerUnit => innerUnit.id === targetUnitId) as Unit | undefined;

                    if (unit) {
                        const center = getCenter(departure.x, departure.y);
                        const nextCenter = getCenter(destination.x, destination.y);

                        return <UnitAnimator key={unit.id} from={center} to={nextCenter} unit={unit} />;
                    }

                    return null;
                })}
            ;
        </>
    );
};

export default MoveAnimator;
