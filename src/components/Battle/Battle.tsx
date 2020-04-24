import React from "react";
import { connect } from "react-redux";
import BattleView from "./Battle.view";
import * as selectors from "./__redux/Battle.selectors";
import { BattleProps, BattleState, Unit as StateUnit } from "./Battle.types";
import { Dispatch } from "redux";
import { addUnit } from "./__redux/Battle.actions";

class Battle extends React.Component<BattleProps> {
    componentDidMount(): void {
        const { init } = this.props;
        init();
    }

    onHexClick = (x: number, y: number) => {
        const { units } = this.props;
        console.log("x", x, "y", y);
        try {
            const unit = units.find(unit => unit.y === y && unit.x === x) as StateUnit;
            console.log("unit found:", unit);
        } catch (e) {}
    };

    render() {
        const { units } = this.props;

        return <BattleView width={9} height={6} units={units} onHexClick={this.onHexClick} />;
    }
}

const mapStateToProps = (state: BattleState) => ({ units: selectors.units(state) });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        init: () =>
            dispatch(
                addUnit({
                    x: 1,
                    y: 2,
                    currentHp: 25,
                    id: 1,
                }),
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
