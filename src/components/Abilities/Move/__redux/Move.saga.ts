import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Move.actions";
import { getRoute, isSameCoord } from "../../../Battle/Battle.utils";
import { unit } from "../../../InfoPanel/__redux/InfoPanel.selectors";
import { PreparedUnit } from "../../../Battle/Battle.types";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { ABILITIES } from "../../Abilities.constants";
import { updateUnit } from "../../../Player/Units/__redux/Units.actions";

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    console.log("hexClickSaga", hex);
    const selectedUnit: PreparedUnit = { ...(yield select(unit)) };
    const route = getRoute(hex.coord, selectedUnit.coord).filter(coord => !isSameCoord(selectedUnit.coord, coord));
    console.log("route", route);
    for (const coord of route) {
        yield put(addAction({ unitId: selectedUnit.id, target: coord, ability: ABILITIES.MOVE }));
        selectedUnit.currentActionPoints = selectedUnit.currentActionPoints - 1;
        yield put(updateUnit(selectedUnit));
    }
    yield;
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.onHexClick), hexClickSaga)]);
}
