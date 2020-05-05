import { createAction } from "deox";
import { PreparedUnit } from "../../Battle/Battle.types";

const namespace = "[InfoPanel]";

export const selectUnit = createAction(`${namespace} selectUnit`, resolve => (unit: PreparedUnit | null) =>
    resolve(unit),
);
