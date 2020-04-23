import React from "react";
import { Paper } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContainer } from "./App.styled";
import SignIn from "../SignIn";
import Battle from "../Battle";

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
                <Route exact path={"/battle"}>
                    <Battle width={12} height={8} />
                </Route>
            </Switch>
        </Router>
    );
}
