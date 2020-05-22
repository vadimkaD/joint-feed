import React, { useState } from "react";
import { MagicArrowProjectileProps } from "../MagicArrow.types";
import { ArrowCircle } from "../MagicArrow.styled";
import { getCenter } from "../../../Battlefield/Battlefield.utils";
import { CAST_TIME } from "../MagicArrow.constants";
import { ProjectileAnimation } from "../../../Animations/Animations.types";

export const MagicArrowProjectile: React.FunctionComponent<MagicArrowProjectileProps> = ({ record, currentTick }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const { departure, destination } = record.animation as ProjectileAnimation;
    const center = getCenter(departure.x, departure.y);
    const nextCenter = getCenter(destination.x, destination.y);

    if (currentTick === record.tick) {
        setTimeout(() => {
            setTranslateX(Math.floor(nextCenter.x - center.x));
            setTranslateY(Math.floor(nextCenter.y - center.y));
        }, 0);
    }

    return (
        <ArrowCircle
            isHidden={currentTick < record.tick || currentTick >= record.tick + CAST_TIME - 1}
            cx={center.x}
            cy={center.y}
            r={15}
            translateX={translateX}
            translateY={translateY}
        />
    );
};
