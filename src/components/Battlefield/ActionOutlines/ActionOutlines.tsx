import React, { FunctionComponent } from "react";
import { Action } from "../../ActionQueue/ActionQueue.types";
import { abilitiesDictionary } from "../../Abilities";
import { UnitsOnBoard } from "../../Battle/Battle.types";
import { findLastIndex } from "../../../utils/findLastIndex";

interface ActionOutlinesProps {
    playerActions: Action[];
    playerUnitsOnBoard: UnitsOnBoard;
}

const ActionOutlines: FunctionComponent<ActionOutlinesProps> = ({ playerActions, playerUnitsOnBoard }) => {
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
