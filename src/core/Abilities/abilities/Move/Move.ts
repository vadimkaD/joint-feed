import { v4 as uuidv4 } from "uuid";
import { Ability, AbilityType, Target } from "../../Abilities.types";
import { CAST_RANGE, CAST_TIME, DELAY } from "./Move.constants";
import { Effect, EffectType, Hex, Hexes } from "../../../Battle/Battle.types";
import { ABILITIES } from "../../../Battle/Abilities.constants";
import { Unit } from "../../../Battle/Unit.types";
import { Action, TransportActionTarget } from "../../../Actions/Actions.types";
import { Coord } from "../../../Battle/Hexagon.types";
import {
    coordArrToObj,
    getAreaWithObstacles,
    getAsObstacles,
    getPathWithObstacles,
    getStringFromCoord,
    isSameCoord,
} from "../../../Hexagons";

export const Move: Ability = {
    canCast: function(unit: Unit, targetHex: Hex, units: Unit[], hexes: Hexes) {
        if (isSameCoord(unit.coord, targetHex.coord)) return false;

        const obstacles = getAsObstacles({ units, hexes });

        const whereCanGo = getAreaWithObstacles(unit.coord, unit.currentActionPoints, hexes, obstacles);
        const objToGo = coordArrToObj(whereCanGo);

        if (!objToGo[getStringFromCoord(targetHex.coord)]) {
            console.log("cant go there");
            return false;
        }
        return true;
    },

    getActions: function(
        unit: Unit,
        targetHex: Hex,
        units: Unit[],
        hexes: Hexes,
        queue: Action[],
        tick: number,
    ): Action[] {
        const actions: Action[] = [];
        const coord: Coord = targetHex.coord;

        const obstacles = getAsObstacles({ units, hexes });

        const route = getPathWithObstacles(unit.coord, coord, hexes, obstacles).filter(
            coord => !isSameCoord(unit.coord, coord),
        );

        let currentTick = tick + queue.filter(action => action.unitId === unit.id).length;

        for (const coord of route) {
            const target: TransportActionTarget = {
                unitId: unit.id,
                coord: coord,
            };

            actions.push({
                tickStart: currentTick++,
                actionId: uuidv4(),
                unitId: unit.id,
                target: [target],
                ability: ABILITIES.MOVE,
            });
        }

        return actions;
    },

    canApplyEffect: function() {
        return false;
    },

    getEffect: function(action: Action, units: Unit[], hexes: Hexes, tick: number) {
        const effect: Effect = {
            effectId: uuidv4(),
            sourceUnitId: action.unitId,
            ability: action.ability,
            type: EffectType.TRANSPORT,
            targetAndValue: [{ id: action.unitId }, { coord: action.target[0].coord }],
        };

        return effect;
    },
    getSelectionArea: function(unit: Unit, hexes: Hexes, units: Unit[], queue: Action[]) {
        return [];
    },
    castRange: CAST_RANGE,
    castTime: CAST_TIME,
    castType: AbilityType.CAST,
    delay: DELAY,
    id: ABILITIES.MOVE,
    target: Target.AREA,
    effectType: EffectType.TRANSPORT,
};
