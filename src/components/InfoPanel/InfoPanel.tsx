import React from "react";
import { connect } from "react-redux";
import { Wrap, UnitImage, HpBar, HpValue, Panel } from "./InfoPanel.styled";
import { InfoPanelProps, InfoPanelState } from "./InfoPanel.types";
import * as selectors from "./__redux/InfoPanel.selectors";

class InfoPanel extends React.Component<InfoPanelProps> {
    render() {
        const { unit } = this.props;

        if (!unit) return null;

        return (
            <Wrap>
                <Panel />
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

const mapStateToProps = (state: InfoPanelState) => ({ unit: selectors.unit(state) });

export default connect(mapStateToProps)(InfoPanel);
