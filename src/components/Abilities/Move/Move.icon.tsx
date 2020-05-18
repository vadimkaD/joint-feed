import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AbilityIcon } from "../../InfoPanel/InfoPanel.styled";
import { ABILITIES } from "../Abilities.constants";
import { AbilityIconProps } from "../Abilities.types";
import { ICON_PATH } from "./Move.constants";
import { selectAbility } from "../../SelectedAbility/__redux/SelectedAbility.actions";
import { selectedAbility } from "../../SelectedAbility/__redux/SelectedAbility.selectors";
import { SelectedAbilityState } from "../../SelectedAbility/SelectedAbility.types";

const MoveIcon: React.FunctionComponent<AbilityIconProps> = ({ selectAbility, selectedAbility }) => {
    const onClick = (e: React.SyntheticEvent) => selectAbility(ABILITIES.MOVE);

    return <AbilityIcon icon={ICON_PATH} isSelected={selectedAbility === ABILITIES.MOVE} onClick={onClick} />;
};

const mapStateToProps = (state: SelectedAbilityState) => ({
    selectedAbility: selectedAbility(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectAbility: (ability: ABILITIES | null) => dispatch(selectAbility(ability)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveIcon);
