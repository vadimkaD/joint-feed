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
    isInRange,
    isSameCoord,
} from "../../../Battle/Hexagons";
import { AnimationsTypes, TransportAnimationProps } from "../../../Animations/Animations.types";
import { Obstacles } from "../../../Battle/Hexagons/hexagons.types";
import { getUnitUpdatedByTransportPrediction } from "../../index";

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

    canCreateEffect: function(unit: Unit, action: Action) {
        const coord = action.target[0].coord;
        return isInRange(unit.coord, coord, CAST_RANGE);
    },

    getEffect: function(action: Action, unit: Unit, units: Unit[], hexes: Hexes, tick: number) {
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
        const obstacles: Obstacles = getAsObstacles({ hexes, units });

        const updUnit = getUnitUpdatedByTransportPrediction(unit, queue);

        return getAreaWithObstacles(updUnit.coord, unit.currentActionPoints, hexes, obstacles);
    },

    getAnimation: function(props) {
        const { action, departure, destination, targetUnitId } = props as TransportAnimationProps;

        return {
            animationId: action.actionId,
            targetUnitId: targetUnitId,
            departure: departure,
            destination: destination,
            ability: ABILITIES.MOVE,
            type: AnimationsTypes.UNIT_TRANSPORT,
            tick: action.tickStart + DELAY,
        };
    },

    castRange: CAST_RANGE,
    castTime: CAST_TIME,
    castType: AbilityType.CAST,
    delay: DELAY,
    id: ABILITIES.MOVE,
    target: Target.AREA,
    effectType: EffectType.TRANSPORT,
};
