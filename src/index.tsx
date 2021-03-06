//import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "typeface-roboto";

import "./index.css";
import App from "./components/App";
import Theme from "./components/Theme";
import * as serviceWorker from "./serviceWorker";
import store from "./store/";

ReactDOM.render(
    <Provider store={store}>
        <Theme>
            <App />
        </Theme>
    </Provider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
