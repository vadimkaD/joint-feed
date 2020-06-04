import React, { FunctionComponent } from "react";
import { IconPanel, UnitIcon } from "./UnitIconPanel.styled";
import { playerUnitsOnBoard } from "../Battle/__redux/Battle.selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectUnit } from "../SelectedUnit/__redux/SelectedUnit.actions";

const UnitIconPanel: FunctionComponent<{}> = props => {
    const dispatch = useDispatch();
    const unitsOnBoard = useSelector(playerUnitsOnBoard);
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
