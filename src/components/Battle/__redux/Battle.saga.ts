import { all, put, select, take, takeEvery, delay } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Battle.actions";
import { actionComplete, nextTick, setAnimation, setTick } from "./Battle.actions";
import { sortActionsByAbilityType } from "../Battle.utils";
import { abilitiesDictionary } from "../../Abilities";
import { actionsByUnits } from "../../Battlefield/StepAnimations/__redux/StepAnimations.selectors";
import { ActionsByUnits } from "../../Battlefield/StepAnimations/StepAnimations.types";
import { getTickActions } from "../../ActionQueue/ActionQueue.utils";
import { ACTION_POINTS, TICK_TIMEOUT } from "../Battle.constants";
import { tick } from "./Battle.external-selectors";

function* playStepSaga(action: ActionType<typeof actions.playStepClick>) {
    console.log("start step");
    const selectedActionsByUnits: ActionsByUnits = yield select(actionsByUnits);
    const tickActionArray = getTickActions(selectedActionsByUnits);

    const startTick = yield select(tick);

    for (const tick of tickActionArray) {
        const sorted = sortActionsByAbilityType(tick);
        for (const action of sorted) {
            const ability = abilitiesDictionary[action.ability];
            yield put(ability.handleEffect(action));
            yield take(actionComplete);
        }
        yield put(nextTick());
    }

    yield put(setTick(startTick));

    yield put(setAnimation(true));
    for (let i = 0; i < ACTION_POINTS; i++) {
        yield delay(TICK_TIMEOUT);
        yield put(nextTick());
    }
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.playStepClick), playStepSaga)]);
}
