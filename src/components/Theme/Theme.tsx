import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";

import * as selectors from "./__redux/Theme.selectors";
import { ThemeProps, ThemeState } from "./Theme.types";

function Theme(props: ThemeProps) {
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
