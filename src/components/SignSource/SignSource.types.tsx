import { SyntheticEvent } from "react";

export type SignSourceProps = {
    x64: string;
    x128: string;
    onClick?: (event: SyntheticEvent) => void;
};
