import React from "react";
import { AbilityAnimator } from "../../Abilities.types";
import { MagicArrowProjectile } from "./MagicArrow.projectile-animator";

const MagicArrowAnimator: AbilityAnimator = ({ animationRecords, hexes, unitsOnBoard, currentTick }) => {
    return (
        <>
            {animationRecords.map((record, index) => {
                return <MagicArrowProjectile key={index} record={record} currentTick={currentTick} />;
            })}
        </>
    );
};

export default MagicArrowAnimator;
