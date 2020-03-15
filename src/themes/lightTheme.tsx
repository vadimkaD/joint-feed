import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#b8b8b8",
            paper: "#e1e1e1",
        },
        text: {
            primary: "#000000",
        },
    },
});
export default responsiveFontSizes(theme);
