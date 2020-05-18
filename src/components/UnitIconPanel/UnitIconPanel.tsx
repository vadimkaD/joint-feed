import React, { FunctionComponent } from "react";
import { IconPanel, UnitIcon } from "./UnitIconPanel.styled";
import { UnitIconPanelProps } from "./UnitIconPanel.types";
import { unitsOnBoard } from "../Battle/__redux/Battle.selectors";
import { Dispatch } from "redux";
import { selectUnit } from "../InfoPanel/__redux/InfoPanel.actions";
import { connect } from "react-redux";
import { BattleUnitsState } from "../BattleUnits/BattleUnits.types";

const UnitIconPanel: FunctionComponent<UnitIconPanelProps> = ({ unitsOnBoard, selectUnit }) => {
    const keys = Object.keys(unitsOnBoard);

    const onClick = (unitId: string | null) => (e: React.SyntheticEvent) => selectUnit(unitId);

    return (
        <IconPanel>
            {keys.map((key, i) => (
                <UnitIcon unit={unitsOnBoard[key]} key={i} onClick={onClick(unitsOnBoard[key]?.id || null)} />
            ))}
        </IconPanel>
    );
};

const mapStateToProps = (state: BattleUnitsState) => ({
    unitsOnBoard: unitsOnBoard(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectUnit: (unitId: string | null) => dispatch(selectUnit(unitId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitIconPanel);
