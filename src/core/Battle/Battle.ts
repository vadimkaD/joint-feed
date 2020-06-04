import {
    Effect,
    EffectType,
    IBattle,
    ProjectileTargetAndValue,
    StepParams,
    StepResult,
    TickParams,
    TickResult,
    TransportTargetAndValue,
} from "./Battle.types";
import { ACTION_POINTS } from "./Battle.constants";
import { Unit } from "./Unit.types";
import { isSameCoord } from "./Hexagons";

export class Battle implements IBattle {
    private static instance: IBattle;

    static getInstance(): IBattle {
        if (Battle.instance) {
            return Battle.instance;
        }

        Battle.instance = new Battle();
        return Battle.instance;
    }

    async applyTickEffects(params: TickParams): Promise<TickResult> {
        const { hexes, tick, units, effects } = params;

        let newUnits = [...units];

        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i];
            const sourceUnit = newUnits.find(unit => unit.id === effect.sourceUnitId) as Unit;

            if (effect.type === EffectType.TRANSPORT) {
                const [unit, val] = effect.targetAndValue as TransportTargetAndValue;

                newUnits = newUnits.map(newUnit => {
                    if (newUnit.id === unit.id && !newUnit.isDead) {
                        return { ...newUnit, coord: val.coord };
                    }
                    return newUnit;
                });
            }

            if (effect.type === EffectType.DAMAGE_AND_HEX_EFFECT) {
                const [hex, val] = effect.targetAndValue as ProjectileTargetAndValue;
                const unit: Unit | undefined = newUnits.find(unit => isSameCoord(unit.coord, hex.coord));
                if (unit && unit.owner !== sourceUnit.owner) {
                    const newUnit = {
                        ...unit,
                        currentHp: val.currentHp ? unit.currentHp + val.currentHp : unit.currentHp,
                    };

                    if (newUnit.currentHp <= 0) {
                        newUnit.isDead = true;
                    }

                    newUnits = newUnits.map(innerUnit => {
                        if (newUnit.id === innerUnit.id) {
                            return { ...newUnit };
                        }
                        return innerUnit;
                    });
                }
            }
        }

        return Promise.resolve({
            tick: tick + 1,
            hexes,
            units: newUnits,
        });
    }

    async applyStepEffects(params: StepParams): Promise<StepResult> {
        const { effects, hexes, units, step } = params;
        const newResult: StepResult = {
            hexes,
            step: step + 1,
            units,
        };

        for (let i = 1; i <= ACTION_POINTS; i++) {
            const tick = (step - 1) * ACTION_POINTS + i;
            const tickEffects = (effects[tick] || []) as Effect[];
            const result = await this.applyTickEffects({
                tick,
                effects: tickEffects,
                units: newResult.units,
                hexes: newResult.hexes,
            });

            Object.assign(newResult, { units: result.units, hexes: result.hexes });
        }

        newResult.units = newResult.units.filter(unit => !unit.isDead);
        newResult.units.forEach(unit => (unit.currentActionPoints = ACTION_POINTS));

        return Promise.resolve(newResult);
    }
}
