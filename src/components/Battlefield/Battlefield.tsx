import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BATTLEFIELD_HEIGHT, BATTLEFIELD_WIDTH, HEIGHT_ARRAY } from "./Battlefield.constants";
import BattlefieldLine from "./BattlefieldLine/BattlefieldLine";
import Units from "./Units/Units";
import ActionOutlines from "./ActionOutlines/ActionOutlines";
import StepAnimations from "./StepAnimations/StepAnimations";
import { mouseLeaveBoard } from "../Battle/__redux/Battle.actions";
import { isAnimation as isAnimationSelector } from "../Battle/__redux/Battle.external-selectors";
import AnimatedUnits from "./AnimatedUnits/AnimatedUnits";
import AnimatedProjectiles from "./AnimatedProjectiles/AnimatedProjectiles";

const Battlefield: React.FunctionComponent<{}> = props => {
    const dispatch = useDispatch();
    const isAnimation = useSelector(isAnimationSelector);

    const onMouseLeaveBoard = useCallback((e: React.SyntheticEvent) => dispatch(mouseLeaveBoard()), [dispatch]);

    return (
        <svg
            version="1.1"
            baseProfile="full"
            width={BATTLEFIELD_WIDTH}
            height={BATTLEFIELD_HEIGHT}
            xmlns="http://www.w3.org/2000/svg"
            onMouseLeave={onMouseLeaveBoard}
        >
            {HEIGHT_ARRAY.map((i, j) => (
                <BattlefieldLine key={i} lineNumber={j} />
            ))}
            {isAnimation ? <AnimatedUnits /> : <Units />}
            {isAnimation ? null : <ActionOutlines />}
            {isAnimation ? <AnimatedProjectiles /> : null}
            {false ? <StepAnimations /> : null}
        </svg>
    );
};

export default Battlefield;
