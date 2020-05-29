import React from "react";
import { useSelector } from "react-redux";
import { isAnimation as isAnimationSelector } from "../../Battle/__redux/Battle.external-selectors";
import { abilitiesDictionary } from "../../Abilities";
import { animationsByAbility as animationsByAbilitySelector } from "../../Animations/__redux/Animations.selectors";
import { AnimationRecord } from "../../Animations/Animations.types";
import { ABILITIES } from "../../../core/Abilities/Abilities.constants";

const StepAnimations: React.FunctionComponent<{}> = props => {
    const isAnimation = useSelector(isAnimationSelector);
    const animationsByAbility = useSelector(animationsByAbilitySelector);

    if (!isAnimation) return null;

    return (
        <>
            {Object.keys(animationsByAbility).map((abilityKey, index) => {
                const ability = abilitiesDictionary[abilityKey as ABILITIES];
                const Animator = ability.abilityAnimator;
                const records = animationsByAbility[abilityKey as ABILITIES] as AnimationRecord[];

                return <Animator key={abilityKey} animationRecords={records} />;
            })}
        </>
    );
};

export default StepAnimations;
