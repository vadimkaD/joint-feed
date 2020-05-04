import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Battle.actions";
import { preparedUnits, highlightedHexes } from "./Battle.selectors";
import { selectUnit } from "../../Unit/InfoPanel/__redux/InfoPanel.actions";
import { PreparedUnit } from "../Battle.types";
import { unit as selectedUnit } from "../../Unit/InfoPanel/__redux/InfoPanel.selectors";
import { getStringFromCoord, getUnitInHexOrNull } from "../Battle.utils";
import { addAction } from "../../ActionQueue/__redux/ActionQueue.actions";
import { ActionType as QueueActionType } from "../../ActionQueue/ActionQueue.types";

function* hexClickSaga(action: ActionType<typeof actions.clickHex>) {
    const { payload: hex } = action;
    const prepared: PreparedUnit[] = yield select(preparedUnits);
    const selected = yield select(selectedUnit);
    const highlighted = yield select(highlightedHexes);
    const key = getStringFromCoord(hex.coord);
    if (selected && highlighted[key]) {
        yield put(addAction({ unitId: selected.id, actionType: QueueActionType.MOVE, target: hex }));
    } else {
        const unitInHex = yield call(getUnitInHexOrNull, hex, prepared);
        yield put(selectUnit(unitInHex));
    }
}

function* mouseEnterHexSaga(action: ActionType<typeof actions.mouseEnterHex>) {
    yield;
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.clickHex), hexClickSaga)]);
    yield all([takeEvery(getType(actions.mouseEnterHex), mouseEnterHexSaga)]);
}
