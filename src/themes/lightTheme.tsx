import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        background: {
            default: "rgb(245, 245, 245)",
            paper: "#ffffff",
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
        },
    },
});
export default responsiveFontSizes(theme, {
    breakpoints: [],
});
