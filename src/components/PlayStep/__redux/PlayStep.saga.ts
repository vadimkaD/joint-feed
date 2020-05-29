import { ActionType, getType } from "deox";
import { ActionsByUnits } from "../../Battlefield/StepAnimations/StepAnimations.types";
import { all, delay, put, select, take, takeEvery } from "redux-saga/effects";
import { actionsByUnits } from "../../Battlefield/StepAnimations/__redux/StepAnimations.selectors";
import { getTickActions } from "../../ActionQueue/ActionQueue.utils";
import { tick } from "../../Battle/__redux/Battle.external-selectors";
import { abilitiesDictionary } from "../../Abilities";
import { actionComplete, nextStep, nextTick, setAnimation, setTick } from "../../Battle/__redux/Battle.actions";
import { TICK_TIMEOUT } from "../../Battle/Battle.constants";
import { playStepClick } from "./PlayStep.actions";
import { tickEffects } from "../../Effects/__redux/Effects.selectors";
import { setUnits } from "../../BattleUnits/__redux/BattleUnits.actions";
import { dumpAnimatedUnits } from "../../Animations/__redux/Animations.actions";
import { battleUnits } from "../../BattleUnits/__redux/BattleUnits.selectors";
import { TickEffects, IBattle, StepResult } from "../../../core/Battle/Battle.types";
import { ACTION_POINTS } from "../../../core/Battle/Battle.constants";
import { Battle } from "../../../core/Battle/Battle";
import { hexes as hexesSelector } from "../../Hexes/__redux/Hexes.selectors";
import { setHexes } from "../../Hexes/__redux/Hexes.actions";
import { Unit } from "../../../core/Battle/Unit.types";
import { Action } from "../../../core/Actions/Actions.types";
import { UIAbility } from "../../Abilities/Abilities.types";

function* playStepSaga(action: ActionType<typeof playStepClick>) {
    const selectedActionsByUnits: ActionsByUnits = yield select(actionsByUnits);
    const tickActionArray: Action[][] = getTickActions(selectedActionsByUnits);

    const startTick = yield select(tick);

    for (const tick of tickActionArray) {
        for (const action of tick) {
            const ability = abilitiesDictionary[action.ability] as UIAbility;
            yield put(ability.handleEffect(action));
            yield take(actionComplete);
        }
        yield put(nextTick());
    }

    const units: Unit[] = yield select(battleUnits);

    yield put(dumpAnimatedUnits(units));

    yield put(setTick(startTick));

    yield put(setAnimation(true));
    for (let i = 0; i < ACTION_POINTS; i++) {
        yield delay(TICK_TIMEOUT);
        yield put(nextTick());
    }

    yield put(setTick(startTick));
    const hexes = yield select(hexesSelector);
    const effects: TickEffects = yield select(tickEffects);

    const battle: IBattle = Battle.getInstance();

    const gameState: StepResult = yield battle.applyStepEffects({
        hexes,
        units,
        effects,
    });

    console.log("gameState", gameState);

    yield put(setUnits(gameState.units));
    yield put(setHexes(gameState.hexes));

    yield put(nextStep((gameState.step - 1) * ACTION_POINTS));
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(playStepClick), playStepSaga)]);
}
