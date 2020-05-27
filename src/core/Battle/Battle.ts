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
import { abilitiesDictionary } from "../../components/Abilities";
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

    async applyTickEffects(params: TickParams): Promise<TickResult> {
        const { hexes, tick, units, effects } = params;

        let newUnits = [...units];

        for (let i = 0; i < effects.length; i++) {
            console.log("effects", effects);
            const effect = effects[i];
            const ability = abilitiesDictionary[effect.abilityId];
            if (ability.effectType === EffectType.TRANSPORT) {
                const [unit, val] = effect.targetAndValue as TransportTargetAndValue;
                console.log("unit", unit);
                console.log("val", val);

                newUnits = newUnits.map(newUnit => {
                    if (newUnit.id === unit.id) {
                        console.log("done", val.coord);
                        return { ...newUnit, coord: val.coord };
                    }
                    return newUnit;
                });
            }

            if (ability.effectType === EffectType.DAMAGE_AND_HEX_EFFECT) {
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
        console.log("effects", effects);
        const newResult: StepResult = {
            hexes,
            step: this.step + 1,
            units,
        };

        for (let i = 1; i <= ACTION_POINTS; i++) {
            const tick = (this.step - 1) * ACTION_POINTS + i;
            console.log("tick", tick);
            const tickEffects = (effects[tick] || []) as Effect[];
            console.log("tickEffects", tickEffects);
            const result = await this.applyTickEffects({
                tick,
                effects: tickEffects,
                units: newResult.units,
                hexes: newResult.hexes,
            });

            console.log("result in applyStepEffects", result);

            Object.assign(newResult, { units: result.units, hexes: result.hexes });
            console.log("newResult", newResult);
        }

        newResult.units.forEach(unit => (unit.currentActionPoints = ACTION_POINTS));

        this.step += 1;

        return Promise.resolve(newResult);
    }
}
