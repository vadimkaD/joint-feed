import React, { FunctionComponent } from "react";
import { IconPanel, UnitIcon } from "./UnitIconPanel.styled";
import { unitsOnBoard as unitsOnBoardSelector } from "../Battle/__redux/Battle.selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectUnit } from "../SelectedUnit/__redux/SelectedUnit.actions";
import { Owner } from "../../core/Battle/Unit.types";

const UnitIconPanel: FunctionComponent<{}> = props => {
    const dispatch = useDispatch();
    const unitsOnBoard = useSelector(unitsOnBoardSelector);
    const keys = Object.keys(unitsOnBoard);

    const onClick = (unitId: string | null) => (e: React.SyntheticEvent) => dispatch(selectUnit(unitId));

    return (
        <IconPanel>
            {keys
                .filter(key => unitsOnBoard[key].owner === Owner.PLAYER)
                .map((key, i) => (
                    <UnitIcon unit={unitsOnBoard[key]} key={i} onClick={onClick(unitsOnBoard[key]?.id || null)} />
                ))}
        </IconPanel>
    );
};

export default UnitIconPanel;
