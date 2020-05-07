import React from "react";
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
import { BattleState } from "../Battle/Battle.types";
import { UnitsState } from "../Player/Units/Units.types";

class InfoPanel extends React.Component<InfoPanelProps> {
    render() {
        const { unit, abilities } = this.props;

        if (!unit) return null;

        console.log("abilities", abilities);

        return (
            <Wrap>
                <Panel>
                    <TickBar>
                        <Tick />
                        <ForwardIcon />
                        <Tick />
                        <ForwardIcon />
                        <Tick />
                        <ForwardIcon />
                        <Tick />
                        <ForwardIcon />
                        <Tick />
                        <ForwardIcon />
                        <Tick />
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
                        <AbilityIconWrap></AbilityIconWrap>
                        <AbilityIconWrap></AbilityIconWrap>
                        <AbilityIconWrap></AbilityIconWrap>
                        <AbilityIconWrap></AbilityIconWrap>
                        <AbilityIconWrap></AbilityIconWrap>
                        <AbilityIconWrap></AbilityIconWrap>
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

const mapStateToProps = (state: InfoPanelState & BattleState & UnitsState) => ({
    unit: selectors.unit(state),
    abilities: selectors.abilities(state),
});

export default connect(mapStateToProps)(InfoPanel);
