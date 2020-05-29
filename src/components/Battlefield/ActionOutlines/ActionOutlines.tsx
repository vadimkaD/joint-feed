import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { abilitiesDictionary } from "../../Abilities";
import { findLastIndex } from "../../../utils/findLastIndex";
import { playerActions as playerActionsSelector } from "../../ActionQueue/__redux/ActionQueue.selectors";
import { playerUnitsOnBoard as playerUnitsOnBoardSelector } from "../../Battle/__redux/Battle.selectors";
import { Action } from "../../../core/Actions/Actions.types";

const ActionOutlines: FunctionComponent<{}> = props => {
    const playerActions = useSelector(playerActionsSelector);
    const playerUnitsOnBoard = useSelector(playerUnitsOnBoardSelector);

    return (
        <>
            {playerActions.map((action, key) => {
                const ability = abilitiesDictionary[action.ability];
                const Outline = ability.actionOutline;
                const lastIndex = findLastIndex<Action>(
                    playerActions,
                    innerAction => action.ability === innerAction.ability && innerAction.unitId === action.unitId,
                );
                return (
                    <Outline
                        key={key}
                        action={action}
                        playerUnitsOnBoard={playerUnitsOnBoard}
                        isLastInChain={lastIndex === key}
                    />
                );
            })}
        </>
    );
};

export default ActionOutlines;
