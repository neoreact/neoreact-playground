import React, { FC } from "react";
import { NeoReactComponentProps } from "../neoreact/src/core";

export const Generic: FC<NeoReactComponentProps> = ({ extensions, children }) => {
    console.log(extensions);
    return <>{children}</>
};