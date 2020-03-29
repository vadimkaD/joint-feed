import { all, takeEvery } from "redux-saga/effects";
import { getType, ActionType } from "deox";
import * as actions from "./GoogleSource.actions";

function* signSaga(action: ActionType<typeof actions.signSuccess>) {
    console.log("signSaga called");
    console.log("action ", action);
    yield;
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.signWithGoogle), signSaga)]);
}
