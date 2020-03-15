import { createAction } from "deox";
import { Theme } from "@material-ui/core";

const namespace = "[Theme]";

export const setTheme = createAction(`${namespace} set theme`, resolve => (theme: Theme) => resolve(theme));
