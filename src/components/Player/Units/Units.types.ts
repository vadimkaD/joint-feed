export interface Unit {
    id: number;
    currentHp: number;
    maxHp: number;
    abilities: number[];
    name: string;
    damage: number;
    image: string;
}

export interface UnitsState {
    Player: {
        Units: {
            units: Unit[];
        };
    };
}
