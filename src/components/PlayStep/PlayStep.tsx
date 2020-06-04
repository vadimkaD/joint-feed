import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import BlockIcon from "@material-ui/icons/Block";

import { StepNumber, Wrap } from "./PlayStep.styled";
import { PlayStepProps } from "./PlayStep.types";
import { playStepClick } from "./__redux/PlayStep.actions";
import { isAnimation as isAnimationSelector, stepNumber, tick } from "../Battle/__redux/Battle.external-selectors";
import { ACTION_POINTS } from "../../core/Battle/Battle.constants";

const PlayStep: React.FunctionComponent<PlayStepProps> = props => {
    const dispatch = useDispatch();
    const step = useSelector(stepNumber);
    const currentTick = useSelector(tick);
    const isAnimation = useSelector(isAnimationSelector);
    const onClick = (e: React.SyntheticEvent) => !isAnimation && dispatch(playStepClick());

    return (
        <Wrap onClick={onClick}>
            <StepNumber>
                Step: {step}
                <br />
                Tick: {currentTick === 1 && !isAnimation ? 0 : currentTick - (step - 1) * ACTION_POINTS}
            </StepNumber>
            {isAnimation ? <BlockIcon /> : <PlayCircleOutlineIcon />}
        </Wrap>
    );
};

export default PlayStep;
