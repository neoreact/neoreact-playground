import React, { FC } from 'react';

export const TextComponent: FC<{ text: string }> = ({ text = "Hello" }) => {
    return <p>{text}</p>;
};