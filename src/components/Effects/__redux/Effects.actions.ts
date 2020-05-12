import { createAction } from "deox";

const namespace = "[Effects]";

export const action = createAction(`${namespace} action`, resolve => (null) => resolve(null));
