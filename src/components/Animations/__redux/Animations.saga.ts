import { all, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Animations.actions";

function* animateStepSaga(action: ActionType<typeof actions.animate>) {
    yield;
}

export default function* moveSaga() {
    yield all([takeEvery(getType(actions.animate), animateStepSaga)]);
}
