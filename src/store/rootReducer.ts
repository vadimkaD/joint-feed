import { combineReducers } from "redux";
import { set, merge } from "lodash";
import { StoreFilenameConventionError } from "./StoreFilenameConventionError";

const allStores = require.context("../components", true, /__redux\/.*\.store\.tsx?$/);

interface IExported {
    [key: string]: IExported | any;
}

const reducers: IExported = {};

function combineNested(reducer: IExported): any {
    const keys = Object.keys(reducer);

    if (keys.every(key => typeof reducer[key] === "function")) {
        return combineReducers(reducer);
    }

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (typeof reducer[key] === "object") {
            reducer[key] = combineNested(reducer[key]);
        }
    }

    return combineNested(reducer);
}

allStores.keys().forEach(function(key) {
    const mod = allStores(key);

    const splited = key.split("/").filter(key => key !== ".");
    const filename = splited[splited.length - 1];
    const path = splited
        .slice(0, -1)
        .filter(key => key !== "__redux")
        .join(".");
    const extended: IExported = {};
    const prepared = filename.split(".");
    const fNamespace = prepared[0];
    const dNamespace = path.split(".").pop();
    if (fNamespace !== dNamespace) {
        throw new StoreFilenameConventionError(filename, path);
    }
    set(extended, path, { ...mod });
    merge(reducers, extended);
});

export default combineNested(reducers);
