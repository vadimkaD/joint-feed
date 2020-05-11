import { all, put, select, takeEvery, delay } from "redux-saga/effects";
import { ActionType, getType } from "deox";
import * as actions from "./Battle.actions";
import { unitsOnBoard } from "./Battle.selectors";
import { selectUnit } from "../../InfoPanel/__redux/InfoPanel.actions";
import { unit as selectedUnit } from "../../InfoPanel/__redux/InfoPanel.selectors";
import { getStringFromCoord } from "../Battle.utils";
import { selectedAbility } from "../../Abilities/__redux/Abilities.selectors";
import { abilitiesDictionary } from "../../Abilities";
import { ABILITIES } from "../../Abilities/Abilities.constants";
import { actionsByUnits } from "../../Battlefield/StepAnimations/__redux/StepAnimations.selectors";
import { ActionsByUnits } from "../../Battlefield/StepAnimations/StepAnimations.types";
import { removeAction } from "../../ActionQueue/__redux/ActionQueue.actions";
import { Action } from "../../ActionQueue/ActionQueue.types";
import { ACTION_POINTS, TICK_TIMEOUT } from "../Battle.constants";
import { BattleUnit, UnitsOnBoard } from "../Battle.types";

function* hexClickSaga(action: ActionType<typeof actions.clickHex>) {
    const { payload: hex } = action;
    const boardUnits = yield select(unitsOnBoard);
    const selected = yield select(selectedUnit);
    const abilityKey: ABILITIES | null = yield select(selectedAbility);
    const key = getStringFromCoord(hex.coord);
    const boardUnit = boardUnits[key];

    if (boardUnit) {
        yield put(selectUnit(boardUnit.id));
    } else if (selected !== undefined && abilityKey) {
        const ability = abilitiesDictionary[abilityKey];
        yield put(ability.onHexClick(hex));
    }
}

function* playStepSaga(action: ActionType<typeof actions.playStepClick>) {
    console.log("start step");
    const selectedActionsByUnits: ActionsByUnits = yield select(actionsByUnits);
    console.log("selectedActionsByUnits", selectedActionsByUnits);
    const allActions = Object.values(selectedActionsByUnits);
    const stepActionArray: Action[][] = [];
    for (const actions of allActions) {
        for (let i = 0; i < ACTION_POINTS; i++) {
            const action = actions[i];
            if (action) {
                stepActionArray[i] ? stepActionArray[i].push(action) : (stepActionArray[i] = [action]);
            }
        }
    }

    const selectedUnitsOnBoard: UnitsOnBoard = yield select(unitsOnBoard);
    yield put(actions.setAnimation(true));
    console.log("stepActionArray", stepActionArray);

    for (const step of stepActionArray) {
        yield delay(TICK_TIMEOUT);
        const tick: Action[] = [];
        for (const action of step) {
            tick.push(action);
            yield put(removeAction(action));
        }
        let tickAction;

        //TODO: приоритет применения эффектов на основании порядка queue
        while ((tickAction = tick.pop())) {
            console.log("tickAction:", tickAction);
            const ability = abilitiesDictionary[tickAction.ability];
            const effects = ability.effector(tickAction, selectedUnitsOnBoard);
            console.log("effects:", effects);
            const units = Object.values(selectedUnitsOnBoard);
            for (const unit of units) {
                const effectForUnit = effects.find(effect => effect.id === unit.id);
                if (effectForUnit) {
                    yield put(actions.updateUnit(effectForUnit as BattleUnit));
                }
            }
        }
    }
    yield put(actions.setAnimation(false));
    yield put(actions.nextStep());
}

export default function* googleSourceSaga() {
    yield all([takeEvery(getType(actions.clickHex), hexClickSaga)]);
    yield all([takeEvery(getType(actions.playStepClick), playStepSaga)]);
}
