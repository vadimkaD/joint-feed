import React from "react";
import { AbilityAnimator } from "../../Abilities.types";
import { PreparedUnit } from "../../../Battle/Battle.types";
import { getCenter } from "../../../Battlefield/Battlefield.utils";
import { MoveAnimationParams } from "../Move.types";
import { UnitAnimator } from "./Move.unit-animator";

const MoveAnimator: AbilityAnimator = ({ hexes, unitsOnBoard, animationRecords, currentTick }) => {
    return (
        <>
            {animationRecords
                .filter(record => record.tick === currentTick)
                .map((record, index) => {
                    const params = record.animation.params as MoveAnimationParams;

                    const unit = Object.values(unitsOnBoard).find(innerUnit => innerUnit.id === params.unitId) as
                        | PreparedUnit
                        | undefined;

                    if (unit) {
                        const center = getCenter(params.from.x, params.from.y);
                        const coord = params.to;
                        const nextCenter = getCenter(coord.x, coord.y);

                        return <UnitAnimator key={index} from={center} to={nextCenter} unit={unit} />;
                    }

                    return null;
                })}
            ;
        </>
    );
};

export default MoveAnimator;
