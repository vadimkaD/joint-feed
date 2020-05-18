import React from "react";
import { useSelector } from "react-redux";
import { AbilityAnimator } from "../../Abilities.types";
import { getCenter } from "../../../Battlefield/Battlefield.utils";
import { MoveAnimationParams } from "../Move.types";
import { UnitAnimator } from "./Move.unit-animator";
import { BattleUnit } from "../../../BattleUnits/BattleUnits.types";
import { unitsOnBoard as unitsOnBoardSelector } from "../../../Battle/__redux/Battle.selectors";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";

const MoveAnimator: AbilityAnimator = ({ animationRecords }) => {
    const unitsOnBoard = useSelector(unitsOnBoardSelector);
    const currentTick = useSelector(tick);

    return (
        <>
            {animationRecords
                .filter(record => record.tick === currentTick)
                .map((record, index) => {
                    const params = record.animation.params as MoveAnimationParams;

                    const unit = Object.values(unitsOnBoard).find(innerUnit => innerUnit.id === params.unitId) as
                        | BattleUnit
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
