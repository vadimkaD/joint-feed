import React from "react";
import Paper from "@material-ui/core/Paper";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import { connect } from "react-redux";
import { Wrap, Image, UnitInfoWrap, HpBar, HpValue, DamageIcon, Damage } from "./InfoPanel.styled";
import { InfoPanelProps, InfoPanelState } from "./InfoPanel.types";
import * as selectors from "./__redux/InfoPanel.selectors";

class InfoPanel extends React.Component<InfoPanelProps> {
    render() {
        const { unit } = this.props;

        if (!unit) return null;

        return (
            <Wrap>
                <Paper elevation={3}>
                    <Image image={unit?.image}></Image>
                    <UnitInfoWrap>
                        <HpBar>
                            <HpValue maxHp={unit?.maxHp} currentHp={unit?.currentHp}></HpValue>
                            {unit?.maxHp}/{unit?.currentHp}
                        </HpBar>
                        <div>
                            <Damage>
                                {unit?.damage}
                                <DamageIcon></DamageIcon>
                            </Damage>
                        </div>
                        <div>
                            {new Array(unit?.currentActionPoints).fill(1).map((_, i) => (
                                <BrightnessHighIcon key={i}></BrightnessHighIcon>
                            ))}
                        </div>
                    </UnitInfoWrap>
                </Paper>
            </Wrap>
        );
    }
}

const mapStateToProps = (state: InfoPanelState) => ({ unit: selectors.unit(state) });

export default connect(mapStateToProps)(InfoPanel);
