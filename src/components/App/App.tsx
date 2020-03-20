import React from "react";
import { Paper } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContainer } from "./App.styled";
import SignIn from "../SignIn";

export function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/sign-in"}>
                    <SignIn />
                </Route>
                <Route exact path={"/"}>
                    <Paper elevation={0} square>
                        <AppContainer>123</AppContainer>
                    </Paper>
                </Route>
            </Switch>
        </Router>
    );
}
