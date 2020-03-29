import { createAction } from "deox";

const namespace = "[GoogleSource]";

export const signWithGoogle = createAction(`${namespace} sign with google`, resolve => (s: string) => resolve(s));
export const signError = createAction(`${namespace} sign with google: error`);
export const signSuccess = createAction(`${namespace} sign with google: success`);
