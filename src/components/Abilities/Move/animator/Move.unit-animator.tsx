import React, { useState } from "react";
import { UnitImageWithTransition } from "../Move.styled";
import { UNIT_SIZE } from "../../../Battlefield/Units/Units.constants";
import { UnitAnimatorProps } from "../Move.types";

export const UnitAnimator: React.FunctionComponent<UnitAnimatorProps> = ({ unit, from, to }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    setTimeout(() => {
        setTranslateX(Math.floor(to.x - UNIT_SIZE / 2 - (from.x - UNIT_SIZE / 2)));
        setTranslateY(Math.floor(to.y - UNIT_SIZE / 2 - (from.y - UNIT_SIZE / 2)));
    }, 0);

    return (
        <UnitImageWithTransition
            translateX={translateX}
            translateY={translateY}
            xlinkHref={unit.image}
            x={from.x - UNIT_SIZE / 2}
            y={from.y - UNIT_SIZE / 2}
        />
    );
};
