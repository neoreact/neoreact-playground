import React, { FC, useEffect, useState } from 'react';
import { Extension } from './neoreact/src/core'

export const ServiceComponent: FC<{ extensions?: { [key: string]: Extension } }> = (props) => {
    const [me, setMe] = useState<string>("");
    console.log(props);

    useEffect(() => {
        fetch('https://dummyjson.com/products/1')
            .then(res => res.json())
            .then(json => setMe(JSON.stringify(json)))
            .catch(() => setMe("Unknown error"));
    });


    return <></>;
};