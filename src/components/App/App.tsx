import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Battle from "../Battle";

export function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"}>
                    <Battle />
                </Route>
            </Switch>
        </Router>
    );
}
