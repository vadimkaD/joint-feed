import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StepAnimationsProps } from "./StepAnimations.types";
import { UnitsState } from "../../Player/Units/Units.types";
import { BattleState } from "../../Battle/Battle.types";
import { InfoPanelState } from "../../InfoPanel/InfoPanel.types";
import { AbilitiesState } from "../../Abilities/Abilities.types";
import { Action, ActionQueueState } from "../../ActionQueue/ActionQueue.types";
import { hexes, unitsOnBoard } from "../../Battle/__redux/Battle.selectors";
import { actionsByUnits } from "./__redux/StepAnimations.selectors";
import { isAnimation } from "../../Battle/__redux/Battle.external-selectors";
import { abilitiesDictionary } from "../../Abilities";

const StepAnimations: React.FunctionComponent<StepAnimationsProps> = ({
    hexes,
    actionsByUnits,
    isAnimation,
    unitsOnBoard,
}) => {
    if (!isAnimation) return null;
    return (
        <>
            {Object.keys(actionsByUnits).map((unitId, index) => {
                const actions = actionsByUnits[unitId] as Action[];
                const action = actions[0];
                if (action) {
                    const ability = abilitiesDictionary[action.ability];
                    const Animator = ability.abilityAnimator;
                    return <Animator key={index} unitsOnBoard={unitsOnBoard} hexes={hexes} action={action} />;
                }
                return null;
            })}
        </>
    );
};

const mapStateToProps = (state: UnitsState & BattleState & InfoPanelState & AbilitiesState & ActionQueueState) => ({
    actionsByUnits: actionsByUnits(state),
    unitsOnBoard: unitsOnBoard(state),
    hexes: hexes(state),
    isAnimation: isAnimation(state),
});

export default connect(mapStateToProps)(StepAnimations);
