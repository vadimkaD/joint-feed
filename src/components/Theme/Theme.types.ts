import { Theme as ThemeType } from "@material-ui/core/styles/createMuiTheme";
import React from "react";

export type ThemeState = {
    Theme: {
        theme: ThemeType;
    };
};

export type ThemeProps = { children: React.ReactNode; theme: ThemeType };
