import React, { useState } from "react";
import { AbilityAnimator } from "../Abilities.types";
import { PreparedUnit } from "../../Battle/Battle.types";
import { getCenter } from "../../Battlefield/Battlefield.utils";
import { UNIT_SIZE } from "../../Battlefield/Units/Units.constants";
import { UnitImageWithTransition } from "./Move.styled";
import { MoveAnimationParams } from "./Move.types";

const MoveAnimator: AbilityAnimator = ({ hexes, unitsOnBoard, animation }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const params = animation.params as MoveAnimationParams;

    const unit = Object.values(unitsOnBoard).find(innerUnit => innerUnit.id === params.unitId) as
        | PreparedUnit
        | undefined;

    if (unit) {
        const center = getCenter(params.from.x, params.from.y);
        const coord = params.to;

        const nextCenter = getCenter(coord.x, coord.y);
        setTimeout(() => {
            setTranslateX(Math.floor(nextCenter.x - UNIT_SIZE / 2 - (center.x - UNIT_SIZE / 2)));
            setTranslateY(Math.floor(nextCenter.y - UNIT_SIZE / 2 - (center.y - UNIT_SIZE / 2)));
        }, 0);
        return (
            <UnitImageWithTransition
                translateX={translateX}
                translateY={translateY}
                xlinkHref={unit.image}
                x={center.x - UNIT_SIZE / 2}
                y={center.y - UNIT_SIZE / 2}
            />
        );
    }

    return null;
};

export default MoveAnimator;
