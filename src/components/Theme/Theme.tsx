import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Theme as ThemeType } from "@material-ui/core/styles/createMuiTheme";

import * as selectors from "./__redux/Theme.selectors";
import { ThemeState } from "./Theme.types";

function Theme(props: { children: React.ReactNode; theme: ThemeType }) {
    const { theme } = props;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
}

const mapStateToProps = (state: ThemeState) => ({ theme: selectors.theme(state) });

export default connect(mapStateToProps)(Theme);
