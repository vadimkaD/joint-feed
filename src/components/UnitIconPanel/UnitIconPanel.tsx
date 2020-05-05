import React, { FunctionComponent } from "react";
import { IconPanel, UnitIcon } from "./UnitIconPanel.styled";
import { UnitIconPanelProps } from "./UnitIconPanel.types";
import { UnitsState } from "../Player/Units/Units.types";
import { BattleState, PreparedUnit } from "../Battle/Battle.types";
import { unitsOnBoard } from "../Battle/__redux/Battle.selectors";
import { Dispatch } from "redux";
import { selectUnit } from "../InfoPanel/__redux/InfoPanel.actions";
import { connect } from "react-redux";

const UnitIconPanel: FunctionComponent<UnitIconPanelProps> = ({ unitsOnBoard, selectUnit }) => {
    const keys = Object.keys(unitsOnBoard);

    const onClick = (unit: PreparedUnit | null) => (e: React.SyntheticEvent) => selectUnit(unit);

    return (
        <IconPanel>
            {keys.map((key, i) => (
                <UnitIcon unit={unitsOnBoard[key]} key={i} onClick={onClick(unitsOnBoard[key])} />
            ))}
        </IconPanel>
    );
};

const mapStateToProps = (state: UnitsState & BattleState) => ({
    unitsOnBoard: unitsOnBoard(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectUnit: (unit: PreparedUnit | null) => dispatch(selectUnit(unit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitIconPanel);
