import React, { useEffect } from "react";
import { connect } from "react-redux";
import BattleView from "./Battle.view";
import { BattleProps, BattleState, BattleUnit, Hex, Owner, PreparedUnit } from "./Battle.types";
import { Dispatch } from "redux";
import { selectUnit } from "../InfoPanel/__redux/InfoPanel.actions";
import { InfoPanelState } from "../InfoPanel/InfoPanel.types";
import { hexes, highlightedHexes, unitsOnBoard } from "./__redux/Battle.selectors";
import { UnitsState } from "../Player/Units/Units.types";
import { addUnit, clickHex, mouseEnterHex } from "./__redux/Battle.actions";
import { ACTION_POINTS } from "./Battle.constants";
import { AbilitiesState } from "../Abilities/Abilities.types";
import { preparedUnits } from "./__redux/Battle.external-selectors";

function Battle(props: BattleProps) {
    const { preparedUnits, hexes, onHexClick, onMouseEnterHex, unitsOnBoard, highlightedHexes, addUnit } = props;

    useEffect(() => {
        addUnit({
            id: 1,
            coord: { x: 0, y: 1 },
            owner: Owner.PLAYER,
            currentActionPoints: ACTION_POINTS,
            maxActionPoints: ACTION_POINTS,
        });

        addUnit({
            id: 2,
            coord: { x: 12, y: 3 },
            owner: Owner.PLAYER,
            currentActionPoints: ACTION_POINTS,
            maxActionPoints: ACTION_POINTS,
        });
    }, [addUnit]);

    return (
        <BattleView
            onMouseEnterHex={onMouseEnterHex}
            hexes={hexes}
            unitsOnBoard={unitsOnBoard}
            highlightedHexes={highlightedHexes}
            preparedUnits={preparedUnits}
            onHexClick={onHexClick}
        />
    );
}

const mapStateToProps = (state: UnitsState & BattleState & InfoPanelState & AbilitiesState) => ({
    preparedUnits: preparedUnits(state),
    hexes: hexes(state),
    unitsOnBoard: unitsOnBoard(state),
    highlightedHexes: highlightedHexes(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectUnit: (unitId: number | null) => dispatch(selectUnit(unitId)),
        addUnit: (unit: BattleUnit) => dispatch(addUnit(unit)),
        onHexClick: (hex: Hex) => dispatch(clickHex(hex)),
        onMouseEnterHex: (hex: Hex) => dispatch(mouseEnterHex(hex)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
