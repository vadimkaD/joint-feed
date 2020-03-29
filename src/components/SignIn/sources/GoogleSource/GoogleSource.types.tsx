export type GoogleSourceDispatchProps = {
    onClick: () => void;
    onSuccess: () => void;
    onError: () => void;
};

export type GoogleSourceStateProps = {};

export type GoogleSourceProps = GoogleSourceDispatchProps & GoogleSourceStateProps;
