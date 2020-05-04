import { connect } from "react-redux";
import React from "react";
import Card from "@material-ui/core/Card";
import MeetingRoomRoundedIcon from "@material-ui/icons/MeetingRoomRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { SignInWrap } from "./SignIn.styled";
import SignSource from "../SignSource/SignSource";
import Divider from "@material-ui/core/Divider";
import GoogleSource from "./sources/GoogleSource/GoogleSource";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100vh",
        },
        title: {
            padding: "15px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    }),
);

function SignIn(props: any) {
    const classes = useStyles();

    return (
        <Grid container spacing={0} direction="row" alignItems="center" justify="center" className={classes.root}>
            <Grid item>
                <Card>
                    <div className={classes.title}>
                        <MeetingRoomRoundedIcon /> &nbsp;
                        <Typography variant="h3">Sign in</Typography>
                    </div>
                    <Divider />
                    <SignInWrap>
                        <Grid container spacing={3} direction="row" alignItems="center" justify="center">
                            <Grid item xs={4}>
                                <GoogleSource />
                            </Grid>
                            <Grid item xs={4}>
                                <SignSource
                                    x128="/images/icons/128x128/social/vk.png"
                                    x64="/images/icons/64x64/social/vk.png"
                                ></SignSource>
                            </Grid>
                            <Grid item xs={4}>
                                <SignSource
                                    x128="/images/icons/128x128/social/twitter.png"
                                    x64="/images/icons/64x64/social/twitter.png"
                                ></SignSource>
                            </Grid>
                        </Grid>
                    </SignInWrap>
                </Card>
            </Grid>
        </Grid>
    );
}

// const mapStateToProps = () => null;

export default connect(null)(SignIn);
