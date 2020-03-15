import React from "react";
import { Container, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContainer } from "./App.styled";

export function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"}>
                    <Container>
                        <Paper elevation={0} square>
                            <AppContainer>123</AppContainer>
                        </Paper>
                    </Container>
                </Route>
            </Switch>
        </Router>
    );
}
