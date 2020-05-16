import React, { useState } from "react";
import { MagicArrowAnimationParams, MagicArrowProjectileProps } from "../MagicArrow.types";
import { ArrowCircle } from "../MagicArrow.styled";
import { getCenter } from "../../../Battlefield/Battlefield.utils";
import { CAST_TIME } from "../MagicArrow.constants";

export const MagicArrowProjectile: React.FunctionComponent<MagicArrowProjectileProps> = ({ record, currentTick }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const params = record.animation.params as MagicArrowAnimationParams;
    const center = getCenter(params.from.x, params.from.y);
    const coord = params.to;
    const nextCenter = getCenter(coord.x, coord.y);

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
        ></ArrowCircle>
    );
};
