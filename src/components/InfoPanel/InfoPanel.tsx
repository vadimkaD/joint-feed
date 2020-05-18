import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
    Wrap,
    UnitImage,
    HpBar,
    HpValue,
    Panel,
    TickBar,
    Tick,
    AbilityPanel,
    AbilityIconWrap,
} from "./InfoPanel.styled";
import { InfoPanelProps, InfoPanelState } from "./InfoPanel.types";
import * as selectors from "./__redux/InfoPanel.selectors";
import ForwardIcon from "@material-ui/icons/Forward";
import { ACTION_POINTS_ARR } from "../Battle/Battle.constants";
import { unitActions } from "../ActionQueue/__redux/ActionQueue.selectors";
import { ActionQueueState } from "../ActionQueue/ActionQueue.types";
import { BattleUnitsState } from "../BattleUnits/BattleUnits.types";

class InfoPanel extends React.Component<InfoPanelProps> {
    render() {
        const { unit, abilities, unitActions } = this.props;

        if (!unit) return null;

        return (
            <Wrap>
                <Panel>
                    <TickBar>
                        {ACTION_POINTS_ARR.map((v, i) => {
                            return (
                                <Fragment key={i}>
                                    <Tick>{unitActions[i] ? unitActions[i].ability : null}</Tick>
                                    {i < ACTION_POINTS_ARR.length - 1 && <ForwardIcon />}
                                </Fragment>
                            );
                        })}
                    </TickBar>

                    <AbilityPanel>
                        {abilities.map((ability, i) => {
                            const Component = ability.iconComponent;
                            return (
                                <AbilityIconWrap key={i}>
                                    <Component />
                                </AbilityIconWrap>
                            );
                        })}
                    </AbilityPanel>
                </Panel>
                <UnitImage unit={unit}>
                    <HpBar>
                        <HpValue currentHp={unit?.currentHp} maxHp={unit?.maxHp}></HpValue>
                    </HpBar>
                </UnitImage>
                <Panel />
            </Wrap>
        );
    }
}

const mapStateToProps = (state: InfoPanelState & BattleUnitsState & ActionQueueState) => {
    const unit = selectors.unit(state);

    return {
        unit: unit,
        abilities: selectors.abilities(state),
        unitActions: unit ? unitActions(unit.id)(state) : [],
    };
};

export default connect(mapStateToProps)(InfoPanel);
