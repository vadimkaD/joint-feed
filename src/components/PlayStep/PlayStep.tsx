import React from "react";
import { useDispatch } from "react-redux";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import { Wrap } from "./PlayStep.styled";
import { PlayStepProps } from "./PlayStep.types";
import { playStepClick } from "./__redux/PlayStep.actions";

const PlayStep: React.FunctionComponent<PlayStepProps> = props => {
    const dispatch = useDispatch();
    const onClick = (e: React.SyntheticEvent) => dispatch(playStepClick());

    return (
        <Wrap onClick={onClick}>
            <PlayCircleOutlineIcon />
        </Wrap>
    );
};

export default PlayStep;
