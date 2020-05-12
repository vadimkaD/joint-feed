import { createAction } from "deox";
import { EffectRecord } from "../Effects.types";

const namespace = "[Effects]";

export const addEffect = createAction(`${namespace} add effect`, resolve => (effectRecord: EffectRecord) =>
    resolve(effectRecord),
);
