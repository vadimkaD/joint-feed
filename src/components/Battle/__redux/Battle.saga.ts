import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Battle.actions";
import { highlightedHexes, unitsOnBoard } from "./Battle.selectors";
import { selectUnit } from "../../InfoPanel/__redux/InfoPanel.actions";
import { unit as selectedUnit } from "../../InfoPanel/__redux/InfoPanel.selectors";
import { getStringFromCoord } from "../Battle.utils";
import { addAction } from "../../ActionQueue/__redux/ActionQueue.actions";
import { ActionType as QueueActionType } from "../../ActionQueue/ActionQueue.types";

function* hexClickSaga(action: ActionType<typeof actions.clickHex>) {
    const { payload: hex } = action;
    console.log("hex click saga", hex.coord);
    const boardUnits = yield select(unitsOnBoard);
    const selected = yield select(selectedUnit);
    const highlighted = yield select(highlightedHexes);
    const key = getStringFromCoord(hex.coord);
    const boardUnit = boardUnits[key];

    if (boardUnit) {
        yield put(selectUnit(boardUnit));
    } else if (selected && highlighted[key]) {
        yield put(addAction({ unitId: selected.id, actionType: QueueActionType.MOVE, target: hex }));
    }
}

function* mouseEnterHexSaga(action: ActionType<typeof actions.mouseEnterHex>) {
    yield;
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.clickHex), hexClickSaga)]);
    yield all([takeEvery(getType(actions.mouseEnterHex), mouseEnterHexSaga)]);
}
