import { connect } from "react-redux";
import { Dispatch } from "redux";
import React from "react";
import SignSource from "../../../SignSource/SignSource";
import { signWithGoogle, signSuccess, signError } from "./__redux/GoogleSource.actions";
import { GoogleSourceDispatchProps, GoogleSourceProps } from "./GoogleSource.types";

function GoogleSource({ onClick, onSuccess, onError }: GoogleSourceProps) {
    return (
        <div>
            <SignSource
                onClick={onClick}
                x128="/images/icons/128x128/social/google+.png"
                x64="/images/icons/64x64/social/google+.png"
            />
            <div onClick={onError}>Click to error</div>
            <div onClick={onSuccess}>Click to success</div>
        </div>
    );
}

// const mapStateToProps = () => null;
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onClick: () => dispatch(signWithGoogle("1")),
        onSuccess: () => dispatch(signSuccess()),
        onError: () => dispatch(signError()),
    };
};

export default connect<any, GoogleSourceDispatchProps>(null, mapDispatchToProps)(GoogleSource);
