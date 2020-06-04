import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Move.actions";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { actionComplete } from "../../../Battle/__redux/Battle.actions";
import { unitsOnBoard } from "../../../Battle/__redux/Battle.selectors";
import { battleUnits } from "../../../BattleUnits/__redux/BattleUnits.selectors";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";
import { addEffect } from "../../../Effects/__redux/Effects.actions";
import { addAnimation } from "../../../Animations/__redux/Animations.actions";
import { getStringFromCoord } from "../../../../core/Hexagons";
import { updateUnit } from "../../../BattleUnits/__redux/BattleUnits.actions";
import { selectedUnit as unit } from "../../../SelectedUnit/__redux/SelectedUnit.selectors";
import { selectAbility } from "../../../SelectedAbility/__redux/SelectedAbility.actions";
import { selectUnit } from "../../../SelectedUnit/__redux/SelectedUnit.actions";
import { hexes as hexesSelector } from "../../../Hexes/__redux/Hexes.selectors";
import { getEffectsByTick, tickEffects } from "../../../Effects/__redux/Effects.selectors";
import { Effect } from "../../../../core/Battle/Battle.types";
import { Unit } from "../../../../core/Battle/Unit.types";
import { Action } from "../../../../core/Actions/Actions.types";

import {
    abilities,
    getTransportEffectedUnit,
    getUnitUpdatedByTransportPrediction,
    isOccupationPredicted,
} from "../../../../core/Abilities";
import { queue as queueSelector } from "../../../ActionQueue/__redux/ActionQueue.external-selectors";
import { UnitTransportAnimation } from "../../../../core/Animations/Animations.types";

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    const moveAbility = abilities.MOVE;
    const selectedUnit: Unit = { ...(yield select(unit)) };
    const preparedUnitsOnBoard = yield select(unitsOnBoard);
    const units = yield select(battleUnits);
    const hexes = yield select(hexesSelector);
    const queue = yield select(queueSelector);

    const coordKey = getStringFromCoord(hex.coord);
    const boardUnit = preparedUnitsOnBoard[coordKey];
    if (boardUnit && boardUnit.id !== selectedUnit.id) {
        yield put(selectUnit(boardUnit.id));
        return;
    }

    const updatedUnit = getUnitUpdatedByTransportPrediction(selectedUnit, queue);

    const canCast = moveAbility.canCast(updatedUnit, hex, units, hexes);

    if (!canCast) {
        console.log("cant go there");
        return;
    }

    const tickNumber: number = yield select(tick);

    const movingActions = moveAbility.getActions(updatedUnit, hex, units, hexes, queue, tickNumber);

    for (const a of movingActions) {
        yield put(addAction(a));
        selectedUnit.currentActionPoints = selectedUnit.currentActionPoints - moveAbility.castTime;
        yield put(updateUnit(selectedUnit));
    }

    yield put(selectAbility(null));
}

function* handleEffectSaga(reduxAction: ActionType<typeof actions.handleEffect>) {
    const action = reduxAction.payload as Action;
    const units: Unit[] = yield select(battleUnits);
    const hexes = yield select(hexesSelector);
    const unit = units.find(unit => unit.id === action.unitId) as Unit | null;
    const moveAbility = abilities.MOVE;

    if (!unit) return;

    const allEffects = yield select(tickEffects);
    const currentTick = yield select(tick);
    const effects = yield select(getEffectsByTick(currentTick));
    const affectedUnit = getTransportEffectedUnit(unit, allEffects, currentTick);

    const coord = action.target[0].coord;

    if (!moveAbility.canCreateEffect(affectedUnit, action)) {
        console.log("cant apply Move effect", affectedUnit.coord, coord);
        return;
    }

    const occupied = isOccupationPredicted(effects, coord);

    if (occupied) {
        console.log("FIZZLE! Already occupied");
        return;
    }

    const effect: Effect = moveAbility.getEffect(action, unit, units, hexes, currentTick);

    yield put(
        addEffect({
            tick: action.tickStart + moveAbility.delay,
            effect: effect,
        }),
    );

    const animation = moveAbility.getAnimation({
        action,
        targetUnitId: unit.id,
        departure: affectedUnit.coord,
        destination: coord,
    }) as UnitTransportAnimation;

    yield put(
        addAnimation({
            tick: action.tickStart,
            animation,
        }),
    );

    yield put(actionComplete());
}

export default function* moveSaga() {
    yield all([takeEvery(getType(actions.onHexClick), hexClickSaga)]);
    yield all([takeEvery(getType(actions.handleEffect), handleEffectSaga)]);
}
