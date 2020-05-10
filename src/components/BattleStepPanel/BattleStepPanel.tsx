import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import { Wrap } from "./BattleStepPanel.styled";
import { playStepClick } from "../Battle/__redux/Battle.actions";
import { BattleStepPanelProps } from "./BattleStepPanel.types";

const BattleStepPanel: React.FunctionComponent<BattleStepPanelProps> = ({ playStepClick }) => {
    return (
        <Wrap onClick={playStepClick}>
            <PlayCircleOutlineIcon />
        </Wrap>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        playStepClick: () => dispatch(playStepClick()),
    };
};

export default connect(null, mapDispatchToProps)(BattleStepPanel);
