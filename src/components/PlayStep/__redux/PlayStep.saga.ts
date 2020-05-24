import { ActionType, getType } from "deox";
import { ActionsByUnits } from "../../Battlefield/StepAnimations/StepAnimations.types";
import { all, delay, put, select, take, takeEvery } from "redux-saga/effects";
import { actionsByUnits } from "../../Battlefield/StepAnimations/__redux/StepAnimations.selectors";
import { getTickActions } from "../../ActionQueue/ActionQueue.utils";
import { tick } from "../../Battle/__redux/Battle.external-selectors";
import { sortActionsByAbilityType } from "../../Battle/Battle.utils";
import { abilitiesDictionary } from "../../Abilities";
import { actionComplete, nextStep, nextTick, setAnimation, setTick } from "../../Battle/__redux/Battle.actions";
import { ACTION_POINTS, TICK_TIMEOUT } from "../../Battle/Battle.constants";
import { playStepClick } from "./PlayStep.actions";
import { Ability } from "../../Abilities/Abilities.types";
import { tickEffects } from "../../Effects/__redux/Effects.selectors";
import { Effect, EffectType, TickEffects, UnitTargetAndValue } from "../../Effects/Effects.types";
import { updateUnit } from "../../BattleUnits/__redux/BattleUnits.actions";

function* playStepSaga(action: ActionType<typeof playStepClick>) {
    console.log("start step");
    const selectedActionsByUnits: ActionsByUnits = yield select(actionsByUnits);
    const tickActionArray = getTickActions(selectedActionsByUnits);

    const startTick = yield select(tick);

    for (const tick of tickActionArray) {
        const sorted = sortActionsByAbilityType(tick);
        for (const action of sorted) {
            const ability = abilitiesDictionary[action.ability] as Ability;
            yield put(ability.handleEffect(action));
            yield take(actionComplete);
        }
        yield put(nextTick());
    }

    const effects: TickEffects = yield select(tickEffects);
    console.log("effects", effects);

    yield put(setTick(startTick));

    yield put(setAnimation(true));
    for (let i = 0; i < ACTION_POINTS; i++) {
        yield delay(TICK_TIMEOUT);
        yield put(nextTick());
    }

    yield put(setTick(startTick));

    for (let i = 0; i < ACTION_POINTS; i++) {
        const currentTick = yield select(tick);
        const tickEffects = (effects[currentTick] || []) as Effect[];
        for (let i = 0; i < tickEffects.length; i++) {
            const effect = tickEffects[i];
            const ability = abilitiesDictionary[effect.abilityId];
            if (ability.effectType === EffectType.TRANSPORT) {
                const [unit, val] = effect.targetAndValue as UnitTargetAndValue;
                console.log("unit", unit);
                console.log("val", val);
                yield put(updateUnit({ id: unit.id, coord: val.coord }));
            }
        }
        yield put(nextTick());
    }

    const currentTick = yield select(tick);
    yield put(nextStep(currentTick));
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(playStepClick), playStepSaga)]);
}
