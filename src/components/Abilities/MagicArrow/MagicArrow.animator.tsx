import React, { useState } from "react";
import { AbilityAnimator } from "../Abilities.types";
import { ArrowCircle } from "./MagicArrow.styled";
import { MagicArrowAnimationParams } from "./MagicArrow.types";
import { getCenter } from "../../Battlefield/Battlefield.utils";

const MagicArrowAnimator: AbilityAnimator = ({ animation, hexes, unitsOnBoard }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    console.log("MagicArrowAnimator animation:", animation);
    const params = animation.params as MagicArrowAnimationParams;
    const center = getCenter(params.from.x, params.from.y);
    const coord = params.to;

    const nextCenter = getCenter(params.to.x, params.to.y);
    setTimeout(() => {
        setTranslateX(Math.floor(nextCenter.x - center.x));
        setTranslateY(Math.floor(nextCenter.y - center.y));
    }, 0);
    return (
        <ArrowCircle cx={center.x} cy={center.y} r={15} translateX={translateX} translateY={translateY}></ArrowCircle>
    );
};

export default MagicArrowAnimator;
