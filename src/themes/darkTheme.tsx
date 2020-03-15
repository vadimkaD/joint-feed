import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#222222",
            paper: "#525252",
        },
        text: {
            primary: "#ffffff",
        },
    },
});
export default responsiveFontSizes(theme);
