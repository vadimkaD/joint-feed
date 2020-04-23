import { createMuiTheme, responsiveFontSizes, TypographyStyle } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

const headingsDefault: TypographyStyle = {
    color: "#FFFFFF",
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamily: "Zilla Slab",
};

console.log(breakpoints);

const theme = createMuiTheme({
    breakpoints,
    typography: {
        h1: {
            ...headingsDefault,
            fontSize: "44px",
            lineHeight: 1.27,
        },
        h2: {
            ...headingsDefault,
            fontSize: "32px",
            lineHeight: 1.12,
        },
        h3: {
            ...headingsDefault,
            fontSize: "24px",
            lineHeight: 1.17,
        },
        h4: {
            ...headingsDefault,
            fontSize: "19px",
            lineHeight: 1.26,
        },
        h5: {
            ...headingsDefault,
            fontSize: "17px",
            fontStyle: "italic",
            lineHeight: 1.29,
        },
        h6: {
            ...headingsDefault,
            fontSize: "10px",
            lineHeight: 1.8,
            textTransform: "uppercase",
        },
        body1: {
            ...headingsDefault,
            fontSize: "14px",
            lineHeight: 1.57,
        },
    },
    palette: {
        type: "dark",
        primary: {
            main: "#F27A54",
        },
        secondary: { main: "#A154F2" },
        background: {
            default: "#30363D",
            paper: "#3C444D",
        },
        text: {
            primary: "#ffffff",
        },
    },
    overrides: {
        MuiCard: {
            root: {
                background: "#3C444D",
            },
        },
    },
});
export default responsiveFontSizes(theme);
