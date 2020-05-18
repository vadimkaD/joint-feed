import React from "react";
import { useSelector } from "react-redux";
import { AbilityAnimator } from "../../Abilities.types";
import { MagicArrowProjectile } from "./MagicArrow.projectile-animator";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";

const MagicArrowAnimator: AbilityAnimator = ({ animationRecords }) => {
    const currentTick = useSelector(tick);

    return (
        <>
            {animationRecords.map((record, index) => {
                return <MagicArrowProjectile key={index} record={record} currentTick={currentTick} />;
            })}
        </>
    );
};

export default MagicArrowAnimator;
