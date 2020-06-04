import { all, put, select, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./MagicArrow.actions";
import { addAction } from "../../../ActionQueue/__redux/ActionQueue.actions";
import { actionComplete } from "../../../Battle/__redux/Battle.actions";
import { unitsOnBoard } from "../../../Battle/__redux/Battle.selectors";
import { tick } from "../../../Battle/__redux/Battle.external-selectors";
import { addEffect } from "../../../Effects/__redux/Effects.actions";
import { addAnimation } from "../../../Animations/__redux/Animations.actions";
import { updateUnit } from "../../../BattleUnits/__redux/BattleUnits.actions";
import { selectedUnit as unit } from "../../../SelectedUnit/__redux/SelectedUnit.selectors";
import { selectAbility } from "../../../SelectedAbility/__redux/SelectedAbility.actions";
import { Effect } from "../../../../core/Battle/Battle.types";
import { Unit, UnitsOnBoard } from "../../../../core/Battle/Unit.types";
import { Coord } from "../../../../core/Battle/Hexagon.types";
import { Action } from "../../../../core/Actions/Actions.types";
import { ProjectileAnimation } from "../../../../core/Animations/Animations.types";
import { abilities, getTransportEffectedUnit, getUnitUpdatedByTransportPrediction } from "../../../../core/Abilities";
import { battleUnits } from "../../../BattleUnits/__redux/BattleUnits.selectors";
import { hexes as hexesSelector } from "../../../Hexes/__redux/Hexes.selectors";
import { queue as queueSelector } from "../../../ActionQueue/__redux/ActionQueue.external-selectors";
import { tickEffects } from "../../../Effects/__redux/Effects.selectors";

const maAbility = abilities.MAGIC_ARROW;

function* hexClickSaga(action: ActionType<typeof actions.onHexClick>) {
    const { payload: hex } = action;
    console.log("hexClickSaga", hex);
    const selectedUnit: Unit = { ...(yield select(unit)) };
    const units = yield select(battleUnits);
    const hexes = yield select(hexesSelector);
    const queue = yield select(queueSelector);

    const updatedUnit = getUnitUpdatedByTransportPrediction(selectedUnit, queue);

    if (!maAbility.canCast(updatedUnit, hex, units, hexes)) {
        console.log("You cant cast MagiArrow");
        return;
    }

    const tickNumber: number = yield select(tick);

    const maActions = maAbility.getActions(updatedUnit, hex, units, hexes, queue, tickNumber);

    for (const a of maActions) {
        yield put(addAction(a));
    }

    selectedUnit.currentActionPoints = selectedUnit.currentActionPoints - maAbility.castTime;
    yield put(updateUnit(selectedUnit));
    yield put(selectAbility(null));
}

function* handleEffectSaga(reduxAction: ActionType<typeof actions.handleEffect>) {
    const action = reduxAction.payload as Action;
    const units: UnitsOnBoard = yield select(unitsOnBoard);
    const unit = Object.values(units).find(unit => unit.id === action.unitId) as Unit | null;

    if (!unit) return;

    const allEffects = yield select(tickEffects);
    const currentTick = yield select(tick);
    const hexes = yield select(hexesSelector);
    const affectedUnit = getTransportEffectedUnit(unit, allEffects, currentTick);

    const coord: Coord = action.target[0].coord;

    if (!maAbility.canCreateEffect(affectedUnit, action)) {
        console.log("FIZZLE! Cant create Magic Arrow effect", affectedUnit, coord);
        return;
    }

    const effect: Effect = maAbility.getEffect(action, unit, Object.values(units), hexes, currentTick);

    yield put(
        addEffect({
            tick: action.tickStart + maAbility.delay,
            effect: effect,
        }),
    );

    const animation = maAbility.getAnimation({
        action,
        departure: affectedUnit.coord,
        destination: coord,
    }) as ProjectileAnimation;

    yield put(
        addAnimation({
            tick: action.tickStart,
            animation,
        }),
    );

    yield put(actionComplete());
}

export default function* magicArrowSaga() {
    yield all([takeEvery(getType(actions.onHexClick), hexClickSaga)]);
    yield all([takeEvery(getType(actions.handleEffect), handleEffectSaga)]);
}
