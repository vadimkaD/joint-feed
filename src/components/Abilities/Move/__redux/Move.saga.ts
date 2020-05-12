import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import { v4 as uuidv4 } from "uuid";
import * as actions from "./Move.actions";
import { getRoute, isInRange, isSameCoord, offsetDistance } from "../../../Battle/Battle.utils";
import { unit } from "../../../InfoPanel/__redux/InfoPanel.selectors";
import { Coord, PreparedUnit, UnitsOnBoard } from "../../../Battle/Battle.types";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { ABILITIES } from "../../Abilities.constants";
import { actionComplete, updateUnit } from "../../../Battle/__redux/Battle.actions";
import { selectAbility } from "../../__redux/Abilities.actions";
import { queue } from "../../../ActionQueue/__redux/ActionQueue.external-selectors";
import { getEffectedUnit, getEffectsForSelectedUnit } from "../../Abilities.utils";
import { unitsOnBoard } from "../../../Battle/__redux/Battle.selectors";
import { Action } from "../../../ActionQueue/ActionQueue.types";
import { Effect } from "../../../Effects/Effects.types";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";
import { CAST_RANGE, CAST_TIME, DELAY } from "../Move.constants";
import { addEffect } from "../../../Effects/__redux/Effects.actions";
import { getCoordOfUnitForCurrentTick } from "../../Abilities.saga";
import { ACTION_POINTS } from "../../../Battle/Battle.constants";
import { addAnimation } from "../../../Animations/__redux/Animations.actions";
import { AbilityAnimation } from "../../../Animations/Animations.types";

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    const selectedUnit: PreparedUnit = { ...(yield select(unit)) };
    const actionQueue: Action[] = yield select(queue);
    const preparedUnitsOnBoard = yield select(unitsOnBoard);
    const effects = getEffectsForSelectedUnit(actionQueue, preparedUnitsOnBoard, selectedUnit);
    const effectedUnit = getEffectedUnit(effects, selectedUnit);
    const distance = offsetDistance(effectedUnit.coord, hex.coord);
    console.log("distance", distance);
    if (distance > selectedUnit.currentActionPoints) {
        console.log("You cant go this way");
        return;
    }
    const route = getRoute(hex.coord, effectedUnit.coord).filter(coord => !isSameCoord(effectedUnit.coord, coord));
    const tickNumber: number = yield select(tick);
    for (const coord of route) {
        yield put(
            addAction({
                tickStart: tickNumber + (ACTION_POINTS - selectedUnit.currentActionPoints),
                actionId: uuidv4(),
                unitId: effectedUnit.id,
                target: [coord],
                ability: ABILITIES.MOVE,
            }),
        );
        selectedUnit.currentActionPoints = selectedUnit.currentActionPoints - CAST_TIME;
        yield put(updateUnit(selectedUnit));
    }
    yield put(selectAbility(null));
}

function* handleEffectSaga(reduxAction: ActionType<typeof actions.handleEffect>) {
    const action = reduxAction.payload as Action;
    const units: UnitsOnBoard = yield select(unitsOnBoard);
    const unit = Object.values(units).find(unit => unit.id === action.unitId) as PreparedUnit | null;
    if (unit) {
        const unitCoord = yield getCoordOfUnitForCurrentTick(unit);

        const coord = action.target[0] as Coord | undefined;

        if (coord) {
            if (isInRange(unitCoord, coord, CAST_RANGE)) {
                const effect: Effect = {
                    sourceUnitId: unit.id,
                    effectId: action.actionId,
                    abilityId: ABILITIES.MOVE,
                    targetAndValue: [{ id: unit.id }, { coord }],
                };

                yield put(
                    addEffect({
                        tick: action.tickStart + DELAY,
                        effect: effect,
                    }),
                );

                const animation: AbilityAnimation = {
                    animationId: action.actionId,
                    params: { from: unitCoord, to: coord, unitId: unit.id },
                    ability: ABILITIES.MOVE,
                };

                yield put(
                    addAnimation({
                        tick: action.tickStart,
                        animation,
                    }),
                );

                console.log("Move.saga [unitCoord, coord]:", [JSON.stringify(unitCoord), JSON.stringify(coord)]);
            } else {
                console.log("FIZZLE! Not enough range", unitCoord, coord);
            }
        }
    }

    yield put(actionComplete());
}

export default function* moveSaga() {
    yield all([takeEvery(getType(actions.onHexClick), hexClickSaga)]);
    yield all([takeEvery(getType(actions.handleEffect), handleEffectSaga)]);
}
