import {
    Effect,
    EffectType,
    IBattle,
    StepParams,
    StepResult,
    TickParams,
    TickResult,
    TransportTargetAndValue,
} from "./Battle.types";
import { ACTION_POINTS } from "./Battle.constants";

export class Battle implements IBattle {
    private static instance: IBattle;
    private step = 1;

    static getInstance(): IBattle {
        if (Battle.instance) {
            return Battle.instance;
        }

        Battle.instance = new Battle();
        return Battle.instance;
    }

    reset() {
        this.step = 1;
    }

    async applyTickEffects(params: TickParams): Promise<TickResult> {
        const { hexes, tick, units, effects } = params;

        let newUnits = [...units];

        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i];
            if (effect.type === EffectType.TRANSPORT) {
                const [unit, val] = effect.targetAndValue as TransportTargetAndValue;

                newUnits = newUnits.map(newUnit => {
                    if (newUnit.id === unit.id) {
                        return { ...newUnit, coord: val.coord };
                    }
                    return newUnit;
                });
            }

            if (effect.type === EffectType.DAMAGE_AND_HEX_EFFECT) {
            }
        }

        return Promise.resolve({
            tick: tick + 1,
            hexes,
            units: newUnits,
        });
    }

    async applyStepEffects(params: StepParams): Promise<StepResult> {
        const { effects, hexes, units } = params;
        const newResult: StepResult = {
            hexes,
            step: this.step + 1,
            units,
        };

        for (let i = 1; i <= ACTION_POINTS; i++) {
            const tick = (this.step - 1) * ACTION_POINTS + i;
            const tickEffects = (effects[tick] || []) as Effect[];
            const result = await this.applyTickEffects({
                tick,
                effects: tickEffects,
                units: newResult.units,
                hexes: newResult.hexes,
            });

            Object.assign(newResult, { units: result.units, hexes: result.hexes });
        }

        newResult.units.forEach(unit => (unit.currentActionPoints = ACTION_POINTS));

        this.step += 1;

        return Promise.resolve(newResult);
    }
}
