import React from "react";
import { connect } from "react-redux";

import { StepAnimationsProps } from "./StepAnimations.types";
import { BattleState } from "../../Battle/Battle.types";
import { unitsOnBoard } from "../../Battle/__redux/Battle.selectors";
import { isAnimation, tick } from "../../Battle/__redux/Battle.external-selectors";
import { abilitiesDictionary } from "../../Abilities";
import { animationsByAbility } from "../../Animations/__redux/Animations.selectors";
import { AnimationRecord, AnimationsState } from "../../Animations/Animations.types";
import { ABILITIES } from "../../Abilities/Abilities.constants";
import { hexes } from "../../Hexes/__redux/Hexes.selectors";
import { HexesState } from "../../Hexes/Hexes.types";
import { BattleUnitsState } from "../../BattleUnits/BattleUnits.types";

const StepAnimations: React.FunctionComponent<StepAnimationsProps> = ({
    unitsOnBoard,
    animationsByAbility,
    isAnimation,
    tick,
    hexes,
}) => {
    if (!isAnimation) return null;

    console.log("animationsByAbility", animationsByAbility);

    return (
        <>
            {Object.keys(animationsByAbility).map((abilityKey, index) => {
                const ability = abilitiesDictionary[abilityKey as ABILITIES];
                const Animator = ability.abilityAnimator;
                return (
                    <Animator
                        key={index}
                        hexes={hexes}
                        unitsOnBoard={unitsOnBoard}
                        animationRecords={animationsByAbility[abilityKey as ABILITIES] as AnimationRecord[]}
                        currentTick={tick}
                    />
                );
            })}
        </>
    );
};

const mapStateToProps = (state: BattleUnitsState & HexesState & BattleState & AnimationsState) => ({
    isAnimation: isAnimation(state),
    animationsByAbility: animationsByAbility(state),
    unitsOnBoard: unitsOnBoard(state),
    hexes: hexes(state),
    tick: tick(state),
});

export default connect(mapStateToProps)(StepAnimations);
