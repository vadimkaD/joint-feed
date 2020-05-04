enum Target {
    Unit,
    Area,
}

export interface Ability {
    id: number;
    castTime: number;
    delay: number;
    target: Target;
    castRange: number;
    image: string;
}

export const Archery: Ability = {
    id: 1,
    castTime: 1,
    delay: 2,
    target: Target.Area,
    castRange: 6,
    image: "/images/abilities/archery/archery.png",
};

export default {
    [Archery.id]: Archery,
};
