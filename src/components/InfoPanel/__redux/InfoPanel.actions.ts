import { createAction } from "deox";

const namespace = "[InfoPanel]";

export const selectUnit = createAction(`${namespace} selectUnit`, resolve => (unitId: string | null) =>
    resolve(unitId),
);
