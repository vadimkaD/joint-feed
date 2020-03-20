import React from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { SignSourceProps } from "./SignSource.types";
import { useTheme } from "@material-ui/core/styles";
import { useMedia } from "../../hooks/useMedia";

const useStyles = makeStyles(({ breakpoints, spacing }: Theme) => ({
    root: {
        borderRadius: 0,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        overflow: "visible",
        maxWidth: "64px",
        cursor: "pointer",
    },
    media: {
        display: "inline-block",
        borderRadius: 0,
        backgroundColor: "rgba(0,0,0,0)",
        minHeight: "64px",
        minWidth: "64px",
        width: "64px",
        height: "64px",
    },
    content: {
        width: "100%",
        fontSize: "32px",
    },
}));

function SignSource({ x64, x128 }: SignSourceProps) {
    const styles = useStyles();
    const isRetina = useMedia(["(-webkit-min-device-pixel-ratio: 1.3)"], [true], false); //useMediaQuery("(-webkit-min-device-pixel-ratio: 1.3)");
    const image = isRetina ? x128 : x64;

    return (
        <Card className={styles.root} square elevation={0}>
            <CardMedia className={styles.media} image={image} />
        </Card>
    );
}

export default SignSource;
