import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AbilityIcon } from "../../InfoPanel/InfoPanel.styled";
import { ICON_PATH } from "./MagicArrow.constants";
import { selectAbility } from "../../SelectedAbility/__redux/SelectedAbility.actions";
import { selectedAbility as selectedAbilitySelector } from "../../SelectedAbility/__redux/SelectedAbility.selectors";
import { ABILITIES } from "../../../core/Battle/Abilities.constants";

const MagicArrowIcon: React.FunctionComponent<{}> = props => {
    const dispatch = useDispatch();
    const selectedAbility = useSelector(selectedAbilitySelector);

    const onClick = (e: React.SyntheticEvent) => dispatch(selectAbility(ABILITIES.MAGIC_ARROW));

    return <AbilityIcon icon={ICON_PATH} isSelected={selectedAbility === ABILITIES.MAGIC_ARROW} onClick={onClick} />;
};

export default MagicArrowIcon;
