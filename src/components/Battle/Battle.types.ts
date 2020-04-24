export interface BattleViewProps {
    width: number;
    height: number;
    units: Unit[];
    onHexClick(x: number, y: number): void;
}

export interface Hex {
    x: number;
    y: number;
}

export interface BattleProps {
    units: Unit[];
    init(): void;
}

export interface LineContainerProps {
    notFirst?: boolean;
    width: number;
}

export interface Unit {
    x: number;
    y: number;
    currentHp: number;
    id: number;
}

export type BattleState = {
    Battle: {
        units: Unit[];
    };
};
