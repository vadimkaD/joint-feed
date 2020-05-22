import { ActionType, getType } from "deox";
import { ActionsByUnits } from "../../Battlefield/StepAnimations/StepAnimations.types";
import { all, delay, put, select, take, takeEvery } from "redux-saga/effects";
import { actionsByUnits } from "../../Battlefield/StepAnimations/__redux/StepAnimations.selectors";
import { getTickActions } from "../../ActionQueue/ActionQueue.utils";
import { tick } from "../../Battle/__redux/Battle.external-selectors";
import { sortActionsByAbilityType } from "../../Battle/Battle.utils";
import { abilitiesDictionary } from "../../Abilities";
import { actionComplete } from "../../Battle/__redux/Battle.actions";
import { nextTick } from "../../Battle/__redux/Battle.actions";
import { setTick } from "../../Battle/__redux/Battle.actions";
import { setAnimation } from "../../Battle/__redux/Battle.actions";
import { ACTION_POINTS, TICK_TIMEOUT } from "../../Battle/Battle.constants";
import { playStepClick } from "./PlayStep.actions";
import { Ability } from "../../Abilities/Abilities.types";
import { tickEffects } from "../../Effects/__redux/Effects.selectors";

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

    const effects = yield select(tickEffects);
    console.log("effects", effects);

    yield put(setTick(startTick));

    yield put(setAnimation(true));
    for (let i = 0; i < ACTION_POINTS; i++) {
        yield delay(TICK_TIMEOUT);
        yield put(nextTick());
    }
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(playStepClick), playStepSaga)]);
}
