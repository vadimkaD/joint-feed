import React from "react";
import { connect } from "react-redux";
import BattleView from "./Battle.view";
import { BattleProps, BattleState, BattleUnit, Hex, Owner, PreparedUnit } from "./Battle.types";
import { Dispatch } from "redux";
import { selectUnit } from "../Unit/InfoPanel/__redux/InfoPanel.actions";
import { InfoPanelState } from "../Unit/InfoPanel/InfoPanel.types";
import { hexes, preparedUnits } from "./__redux/Battle.selectors";
import { UnitsState } from "../Player/Units/Units.types";
import { addUnit, clickHex } from "./__redux/Battle.actions";
import { ACTION_POINTS, HEIGHT, WIDTH } from "./Battle.constants";

class Battle extends React.Component<BattleProps> {
    componentDidMount(): void {
        const { addUnit } = this.props;
        addUnit({
            id: 1,
            x: 0,
            y: 1,
            owner: Owner.PLAYER,
            currentActionPoints: ACTION_POINTS,
            maxActionPoints: ACTION_POINTS,
        });
    }

    onHexClick = (hex: Hex) => {
        const { preparedUnits, selectUnit } = this.props;
        try {
            const unit = preparedUnits.find(unit => unit.y === hex.y && unit.x === hex.x) as PreparedUnit | null;
            selectUnit(unit ? unit : null);
        } catch (e) {}
    };

    render() {
        const { preparedUnits, hexes, onHexClick } = this.props;

        return (
            <BattleView
                width={WIDTH}
                height={HEIGHT}
                hexes={hexes}
                preparedUnits={preparedUnits}
                onHexClick={onHexClick}
            />
        );
    }
}

const mapStateToProps = (state: UnitsState & BattleState & InfoPanelState) => ({
    preparedUnits: preparedUnits(state),
    hexes: hexes(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectUnit: (unit: PreparedUnit | null) => dispatch(selectUnit(unit)),
        addUnit: (unit: BattleUnit) => dispatch(addUnit(unit)),
        onHexClick: (hex: Hex) => dispatch(clickHex(hex)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
