import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AbilityIcon } from "../../InfoPanel/InfoPanel.styled";
import { MoveIconProps } from "./Move.types";
import { selectAbility } from "../__redux/Abilities.actions";
import { ABILITIES } from "../Abilities.constants";
import { AbilitiesState } from "../Abilities.types";
import { selectedAbility } from "../__redux/Abilities.selectors";

const MoveIcon: React.FunctionComponent<MoveIconProps> = ({ selectAbility, selectedAbility }) => {
    const onClick = (e: React.SyntheticEvent) => selectAbility(ABILITIES.MOVE);

    return (
        <AbilityIcon
            icon="/images/abilities/move/move.png"
            isSelected={selectedAbility === ABILITIES.MOVE}
            onClick={onClick}
        />
    );
};

const mapStateToProps = (state: AbilitiesState) => ({
    selectedAbility: selectedAbility(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectAbility: (ability: ABILITIES | null) => dispatch(selectAbility(ability)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveIcon);
