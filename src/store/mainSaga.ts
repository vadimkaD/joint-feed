import { all, call, spawn } from "redux-saga/effects";
import { FilenameConventionError } from "./FilenameConventionError";
import { Exported } from "./types";
import { NoDefaultSagaError } from "./NoDefaultSagaError";

const allSagas = require.context("../components", true, /__redux\/.*\.saga\.tsx?$/);

const sagas: any = [];

allSagas.keys().forEach(function(key) {
    const mod = allSagas(key);

    const splited = key.split("/").filter(key => key !== ".");
    const filename = splited[splited.length - 1];
    const path = splited
        .slice(0, -1)
        .filter(key => key !== "__redux")
        .join(".");
    const prepared = filename.split(".");
    const fNamespace = prepared[0];
    const dNamespace = path.split(".").pop();
    if (fNamespace !== dNamespace) {
        throw new FilenameConventionError(filename, path, "saga");
    }
    const extended: Exported = { ...mod };
    console.log("extended", extended);
    console.log("key", key);

    if (!extended.default) {
        throw new NoDefaultSagaError(filename, path);
    }

    sagas.push(extended.default);
});

export default function* mainSaga() {
    console.log("mainSaga called");

    yield all(
        sagas.map((saga: any) =>
            spawn(function*() {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }),
        ),
    );
}
