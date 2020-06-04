import { Coord } from "../Battle/Hexagon.types";
import { UnitTarget } from "../Battle/Battle.types";
import { ABILITIES } from "../Battle/Abilities.constants";

export type AtLeastOneCoord = {
    0: Coord;
} & Array<Coord>;

export type AtLeastOneUnitTarget = {
    0: UnitTarget;
} & Array<UnitTarget>;

export type AtLeastOneAction = {
    0: Action;
} & Array<Action>;

export type TransportActionTarget = {
    unitId: string;
    coord: Coord;
};

export type ProjectileActionTarget = {
    coord: Coord;
};

export type AtLeastOneTransportActionTarget = {
    0: TransportActionTarget;
} & Array<TransportActionTarget>;

export type AtLeastOneProjectileActionTarget = {
    0: ProjectileActionTarget;
} & Array<ProjectileActionTarget>;

export type ActionTarget = AtLeastOneTransportActionTarget | AtLeastOneProjectileActionTarget;

export interface Action {
    unitId: string;
    actionId: string;
    tickStart: number;
    target: ActionTarget;
    ability: ABILITIES;
}
