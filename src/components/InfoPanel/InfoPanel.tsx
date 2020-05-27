import React, { Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
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
import ForwardIcon from "@material-ui/icons/Forward";
import { unitActions as unitActionsSelector } from "../ActionQueue/__redux/ActionQueue.selectors";
import { selectedUnit } from "../SelectedUnit/__redux/SelectedUnit.selectors";
import { abilities as abilitiesSelector } from "./__redux/InfoPanel.selectors";
import { ACTION_POINTS_ARR } from "../../core/Battle/Battle.constants";

const InfoPanel: FunctionComponent<{}> = props => {
    const unit = useSelector(selectedUnit);
    const abilities = useSelector(abilitiesSelector);
    const unitActions = useSelector(unitActionsSelector(unit?.id || ""));

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
                    <HpValue currentHp={unit?.currentHp} maxHp={unit?.maxHp} />
                </HpBar>
            </UnitImage>
            <Panel />
        </Wrap>
    );
};

export default InfoPanel;
