import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { animations as animationsSelector } from "../../Animations/__redux/Animations.selectors";
import { abilitiesDictionary } from "../../Abilities";
import {
    AnimationRecord,
    Animations,
    AnimationsTypes,
    ProjectileAnimation,
} from "../../../core/Animations/Animations.types";

const AnimatedProjectiles: React.FunctionComponent<{}> = () => {
    const animations: Animations = useSelector(animationsSelector);
    const projectileAnimations = useMemo(
        () =>
            Object.values(animations)
                .flat()
                .filter(a => a.type === AnimationsTypes.PROJECTILE) as ProjectileAnimation[],
        [animations],
    );

    return (
        <>
            {projectileAnimations.map((animation, index) => {
                const ability = abilitiesDictionary[animation.ability];
                const Animator = ability.abilityAnimator;
                const records: AnimationRecord[] = [{ tick: animation.tick, animation }];
                return <Animator key={animation.animationId} animationRecords={records} />;
            })}
        </>
    );
};

export default AnimatedProjectiles;
