import React, { FunctionComponent } from "react";
import { IconPanel, UnitIcon } from "./UnitIconPanel.styled";
import { UnitIconPanelProps } from "./UnitIconPanel.types";
import { UnitsState } from "../Player/Units/Units.types";
import { BattleState } from "../Battle/Battle.types";
import { unitsOnBoard } from "../Battle/__redux/Battle.selectors";
import { Dispatch } from "redux";
import { selectUnit } from "../InfoPanel/__redux/InfoPanel.actions";
import { connect } from "react-redux";

const UnitIconPanel: FunctionComponent<UnitIconPanelProps> = ({ unitsOnBoard, selectUnit }) => {
    const keys = Object.keys(unitsOnBoard);

    const onClick = (unitId: number | null) => (e: React.SyntheticEvent) => selectUnit(unitId);

    return (
        <IconPanel>
            {keys.map((key, i) => (
                <UnitIcon unit={unitsOnBoard[key]} key={i} onClick={onClick(unitsOnBoard[key]?.id || null)} />
            ))}
        </IconPanel>
    );
};

const mapStateToProps = (state: UnitsState & BattleState) => ({
    unitsOnBoard: unitsOnBoard(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectUnit: (unitId: number | null) => dispatch(selectUnit(unitId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitIconPanel);
