import React from "react";
import { connect } from "react-redux";

import { StepAnimationsProps } from "./StepAnimations.types";
import { UnitsState } from "../../Player/Units/Units.types";
import { BattleState } from "../../Battle/Battle.types";
import { hexes, unitsOnBoard } from "../../Battle/__redux/Battle.selectors";
import { isAnimation, tick } from "../../Battle/__redux/Battle.external-selectors";
import { abilitiesDictionary } from "../../Abilities";
import { animations } from "../../Animations/__redux/Animations.selectors";
import { AbilityAnimation, AnimationsState } from "../../Animations/Animations.types";

const StepAnimations: React.FunctionComponent<StepAnimationsProps> = ({
    unitsOnBoard,
    animations,
    isAnimation,
    tick,
    hexes,
}) => {
    if (!isAnimation) return null;

    const currentTickAnimations = animations[tick] as AbilityAnimation[] | undefined;

    console.log("tick", tick);
    if (currentTickAnimations) {
        return (
            <>
                {currentTickAnimations.map((animation, index) => {
                    const ability = abilitiesDictionary[animation.ability];
                    const Animator = ability.abilityAnimator;
                    return <Animator key={index} hexes={hexes} unitsOnBoard={unitsOnBoard} animation={animation} />;
                })}
            </>
        );
    }
    return null;
};

const mapStateToProps = (state: BattleState & UnitsState & AnimationsState) => ({
    isAnimation: isAnimation(state),
    animations: animations(state),
    unitsOnBoard: unitsOnBoard(state),
    hexes: hexes(state),
    tick: tick(state),
});

export default connect(mapStateToProps)(StepAnimations);
