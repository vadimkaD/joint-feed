import { all, put, select, take, takeEvery, delay } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Battle.actions";
import { actionComplete, nextTick, setAnimation, setTick } from "./Battle.actions";
import { unitsOnBoard } from "./Battle.selectors";
import { selectUnit } from "../../InfoPanel/__redux/InfoPanel.actions";
import { unit as selectedUnit } from "../../InfoPanel/__redux/InfoPanel.selectors";
import { getStringFromCoord, sortActionsByAbilityType } from "../Battle.utils";
import { selectedAbility } from "../../Abilities/__redux/Abilities.selectors";
import { abilitiesDictionary } from "../../Abilities";
import { ABILITIES } from "../../Abilities/Abilities.constants";
import { actionsByUnits } from "../../Battlefield/StepAnimations/__redux/StepAnimations.selectors";
import { ActionsByUnits } from "../../Battlefield/StepAnimations/StepAnimations.types";
import { getTickActions } from "../../ActionQueue/ActionQueue.utils";
import { ACTION_POINTS, TICK_TIMEOUT } from "../Battle.constants";
import { tick } from "./Battle.external-selectors";

function* hexClickSaga(action: ActionType<typeof actions.clickHex>) {
    const { payload: hex } = action;
    const boardUnits = yield select(unitsOnBoard);
    const selected = yield select(selectedUnit);
    const abilityKey: ABILITIES | null = yield select(selectedAbility);
    const key = getStringFromCoord(hex.coord);
    const boardUnit = boardUnits[key];

    if (boardUnit) {
        yield put(selectUnit(boardUnit.id));
    } else if (selected !== undefined && abilityKey) {
        const ability = abilitiesDictionary[abilityKey];
        yield put(ability.onHexClick(hex));
    }
}

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
    yield all([takeEvery(getType(actions.clickHex), hexClickSaga)]);
    yield all([takeEvery(getType(actions.playStepClick), playStepSaga)]);
}
