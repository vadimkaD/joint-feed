import React, { useState, useEffect } from "react";
import { UnitImageWithTransition } from "../Move.styled";
import { UNIT_SIZE, UNIT_IMAGES, FORM_FACTORS } from "../../../Battlefield/Units/Units.constants";
import { UnitAnimatorProps } from "../Move.types";

export const UnitAnimator: React.FunctionComponent<UnitAnimatorProps> = ({ unit, from, to }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const translateX = Math.floor(to.x - UNIT_SIZE / 2 - (from.x - UNIT_SIZE / 2));
        const translateY = Math.floor(to.y - UNIT_SIZE / 2 - (from.y - UNIT_SIZE / 2));
        setTranslateX(translateX);
        setTranslateY(translateY);
    }, [unit, from, to]);

    const x = from.x - UNIT_SIZE / 2;
    const y = from.y - UNIT_SIZE / 2;

    return (
        <UnitImageWithTransition
            translateX={translateX}
            translateY={translateY}
            xlinkHref={UNIT_IMAGES[unit.formFactor as FORM_FACTORS]}
            x={x}
            y={y}
        />
    );
};
