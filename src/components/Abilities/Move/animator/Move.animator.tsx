import React from "react";
import { useSelector } from "react-redux";
import { AbilityAnimator } from "../../Abilities.types";
import { getCenter } from "../../../Battlefield/Battlefield.utils";
import { UnitAnimator } from "./Move.unit-animator";
import { BattleUnit } from "../../../BattleUnits/BattleUnits.types";
import { unitsOnBoard as unitsOnBoardSelector } from "../../../Battle/__redux/Battle.selectors";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";
import { UnitTransportAnimation } from "../../../Animations/Animations.types";

const MoveAnimator: AbilityAnimator = ({ animationRecords }) => {
    const unitsOnBoard = useSelector(unitsOnBoardSelector);
    const currentTick = useSelector(tick);

    return (
        <>
            {animationRecords
                .filter(record => record.tick === currentTick)
                .map((record, index) => {
                    const { targetUnitId, destination, departure } = record.animation as UnitTransportAnimation;

                    const unit = Object.values(unitsOnBoard).find(innerUnit => innerUnit.id === targetUnitId) as
                        | BattleUnit
                        | undefined;

                    if (unit) {
                        const center = getCenter(departure.x, departure.y);
                        const nextCenter = getCenter(destination.x, destination.y);

                        return <UnitAnimator key={unit.id} from={center} to={nextCenter} unit={unit} />;
                    }

                    return null;
                })}
            ;
        </>
    );
};

export default MoveAnimator;
