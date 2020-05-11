import React, { useState } from "react";
import { AbilityAnimator } from "../Abilities.types";
import { Coord, PreparedUnit } from "../../Battle/Battle.types";
import { getCenter } from "../../Battlefield/Battlefield.utils";
import { UNIT_SIZE } from "../../Battlefield/Units/Units.constants";
import { UnitImageWithTransition } from "./Move.styled";

const MoveAnimator: AbilityAnimator = ({ hexes, unitsOnBoard, action }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const unit = Object.values(unitsOnBoard).find(innerUnit => innerUnit.id === action.unitId) as
        | PreparedUnit
        | undefined;

    if (unit) {
        const center = getCenter(unit.coord.x, unit.coord.y);
        const coord = action.target as Coord;
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
