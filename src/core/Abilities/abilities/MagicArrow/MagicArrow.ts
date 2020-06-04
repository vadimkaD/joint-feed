import { Ability, AbilityType, Target } from "../../Abilities.types";
import { ABILITIES } from "../../../Battle/Abilities.constants";
import { EffectType, Hex, Hexes } from "../../../Battle/Battle.types";
import { CAST_RANGE, CAST_TIME, DELAY } from "./MagicArrow.constants";
import { Unit } from "../../../Battle/Unit.types";
import { Action, AtLeastOneProjectileActionTarget } from "../../../Actions/Actions.types";
import { ProjectileAnimationProps, AnimationsTypes, ProjectileAnimation } from "../../../Animations/Animations.types";
import { getArea, isInRange } from "../../../Battle/Hexagons";
import { ACTION_POINTS } from "../../../Battle/Battle.constants";
import { v4 as uuidv4 } from "uuid";
import { Coord } from "../../../Battle/Hexagon.types";

export const MagicArrow: Ability = {
    canCast: function(unit: Unit, targetHex: Hex, units: Unit[], hexes: Hexes) {
        if (unit.currentActionPoints < CAST_TIME) {
            return false;
        }

        return isInRange(unit.coord, targetHex.coord, CAST_RANGE);
    },
    canCreateEffect: function(unit: Unit, action: Action) {
        const coord = action.target[0].coord;
        return isInRange(unit.coord, coord, CAST_RANGE);
    },
    getActions: function(unit: Unit, targetHex: Hex, units: Unit[], hexes: Hexes, queue: Action[], tick: number) {
        const actions: Action[] = [];
        const actionId = uuidv4();

        for (let i = 0; i < CAST_TIME; i++) {
            const target: AtLeastOneProjectileActionTarget = [{ coord: targetHex.coord }];

            actions.push({
                tickStart: tick + (ACTION_POINTS - unit.currentActionPoints),
                actionId: actionId,
                unitId: unit.id,
                target,
                ability: ABILITIES.MAGIC_ARROW,
            });
        }

        return actions;
    },
    getAnimation: function(props) {
        const { action, departure, destination } = props as ProjectileAnimationProps;

        const a = {
            animationId: action.actionId,
            departure,
            destination,
            ability: ABILITIES.MAGIC_ARROW,
            type: AnimationsTypes.PROJECTILE,
            tick: action.tickStart,
        } as ProjectileAnimation;

        return a;
    },
    getEffect: function(a: Action, unit, units: Unit[], hexes: Hexes, tick: number) {
        const coord: Coord = a.target[0].coord;

        return {
            type: EffectType.DAMAGE_AND_HEX_EFFECT,
            sourceUnitId: a.unitId,
            effectId: a.actionId,
            ability: ABILITIES.MAGIC_ARROW,
            targetAndValue: [{ coord: coord }, { currentHp: -unit.damage }],
        };
    },
    getSelectionArea: function(sourceUnit: Unit, hexes: Hexes, units: Unit[], queue: Action[]) {
        return getArea(sourceUnit.coord, CAST_RANGE);
    },
    castRange: CAST_RANGE,
    castTime: CAST_TIME,
    castType: AbilityType.CAST,
    delay: DELAY,
    id: ABILITIES.MAGIC_ARROW,
    target: Target.AREA,
    effectType: EffectType.TRANSPORT,
};
