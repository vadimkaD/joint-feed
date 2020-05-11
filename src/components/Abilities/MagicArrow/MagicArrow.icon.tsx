import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AbilityIcon } from "../../InfoPanel/InfoPanel.styled";
import { selectAbility } from "../__redux/Abilities.actions";
import { ABILITIES } from "../Abilities.constants";
import { AbilitiesState, AbilityIconProps } from "../Abilities.types";
import { selectedAbility } from "../__redux/Abilities.selectors";
import { ICON_PATH } from "./MagicArrow.constants";

const MagicArrowIcon: React.FunctionComponent<AbilityIconProps> = ({ selectAbility, selectedAbility }) => {
    const onClick = (e: React.SyntheticEvent) => selectAbility(ABILITIES.MAGIC_ARROW);

    return <AbilityIcon icon={ICON_PATH} isSelected={selectedAbility === ABILITIES.MAGIC_ARROW} onClick={onClick} />;
};

const mapStateToProps = (state: AbilitiesState) => ({
    selectedAbility: selectedAbility(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectAbility: (ability: ABILITIES | null) => dispatch(selectAbility(ability)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MagicArrowIcon);
