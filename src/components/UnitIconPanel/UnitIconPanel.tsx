import React, { FunctionComponent } from "react";
import { IconPanel, UnitIcon } from "./UnitIconPanel.styled";
import { unitsOnBoard as unitsOnBoardSelector } from "../Battle/__redux/Battle.selectors";
import { useSelector, useDispatch } from "react-redux";
import { selectUnit } from "../SelectedUnit/__redux/SelectedUnit.actions";

const UnitIconPanel: FunctionComponent<{}> = props => {
    const dispatch = useDispatch();
    const unitsOnBoard = useSelector(unitsOnBoardSelector);

    const keys = Object.keys(unitsOnBoard);

    const onClick = (unitId: string | null) => (e: React.SyntheticEvent) => dispatch(selectUnit(unitId));

    return (
        <IconPanel>
            {keys.map((key, i) => (
                <UnitIcon unit={unitsOnBoard[key]} key={i} onClick={onClick(unitsOnBoard[key]?.id || null)} />
            ))}
        </IconPanel>
    );
};

export default UnitIconPanel;
