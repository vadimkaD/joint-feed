import { createAction } from "deox";

const namespace = "[SelectedUnit]";

export const selectUnit = createAction(`${namespace} selectUnit`, resolve => (unitId: string | null) =>
    resolve(unitId),
);
