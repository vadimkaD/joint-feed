import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AbilityIcon } from "../../InfoPanel/InfoPanel.styled";
import { ICON_PATH } from "./Move.constants";
import { selectAbility } from "../../SelectedAbility/__redux/SelectedAbility.actions";
import { selectedAbility as selectedAbilitySelector } from "../../SelectedAbility/__redux/SelectedAbility.selectors";
import { ABILITIES } from "../../../core/Battle/Abilities.constants";

const MoveIcon: React.FunctionComponent<{}> = () => {
    const dispatch = useDispatch();
    const selectedAbility = useSelector(selectedAbilitySelector);
    const onClick = useCallback((e: React.SyntheticEvent) => dispatch(selectAbility(ABILITIES.MOVE)), [dispatch]);

    return <AbilityIcon icon={ICON_PATH} isSelected={selectedAbility === ABILITIES.MOVE} onClick={onClick} />;
};

export default MoveIcon;
