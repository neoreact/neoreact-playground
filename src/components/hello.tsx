import React, { FC } from "react";
import { NeoReactComponentProps } from "../neoreact/src/core";

export const Hello: FC<NeoReactComponentProps> = ({ extensions }) => {
    console.log(extensions);
    return (<p>HEllo world!</p>)
};