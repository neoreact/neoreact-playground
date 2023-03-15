import React, { FC, useCallback, useEffect, useState } from 'react';
import { Extension } from './neoreact/src/core'

export const MyComponent: FC<{ extensions?: { [key: string]: Extension } }> = (props) => {
    const [me, setMe] = useState<number>(0);
    console.log(props.extensions?.reduxSaga.func({ stateHandler: () => { console.log("called") }, }));

    // useEffect(() => {
    //     const interval = setInterval((time) => setMe(me + 1), 1000);
    //     return () => clearInterval(interval);
    // });


    return <p>Time: {me}</p>;
};