import { all, takeEvery, put, take, call, fork } from "redux-saga/effects";
import io from "socket.io-client";
import { ActionType, getType } from "deox";
import * as actions from "./Battle.actions";
import { Owner } from "../../../core/Battle/Unit.types";
import { Action } from "../../../core/Actions/Actions.types";
import { receiveActions, receiveComplete } from "./Battle.actions";

let socket: any;

const connect = (owner: string) => {
    socket = io("http://localhost:3000");
    return new Promise(resolve => {
        socket.on("connect", () => {
            socket.emit("register", { owner });
            resolve(socket);
        });
    });
};

const listenStep = () => {
    return new Promise(resolve => {
        socket.on("step", (data: string) => {
            console.log("on step called");
            const allActions = JSON.parse(data) as Action[];
            resolve(allActions);
        });
    });
};

const listenStepSaga = function*() {
    while (true) {
        const actions = yield call(listenStep);
        yield put(receiveActions(actions));
    }
};

function* connectSaga(action: ActionType<typeof actions.connectPlayer>) {
    const owner = action.payload as Owner;
    console.log("connectSaga", owner);
    socket = yield connect(owner);

    yield fork(listenStepSaga);
}

function* receiveActionsSaga(action: ActionType<typeof actions.receiveActions>) {
    console.log("receiveActionsSaga", receiveActionsSaga);
    yield put(receiveComplete());
}

function* sendActionsSaga(action: ActionType<typeof actions.sendActions>) {
    const playerActions = action.payload as Action[];
    socket.emit("actions", JSON.stringify(playerActions));
    yield;
}

export default function* moveSaga() {
    yield all([takeEvery(getType(actions.connectPlayer), connectSaga)]);
    yield all([takeEvery(getType(actions.sendActions), sendActionsSaga)]);
    yield all([takeEvery(getType(actions.receiveActions), receiveActionsSaga)]);
}
