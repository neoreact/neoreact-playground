import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { NeoReact } from "./neoreact";
import { Extension } from "./neoreact/src/core";
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/** example of redux saga implementation (doesnt work) */
const SagaSupport: Extension = {
  name: "redux-saga",
  lifecycleDesired: "pre-creation",
  type: "stateHandler",
  func: (instance: any) => {
    instance.stateHandler = (state: any[]) =>
      state.filter(({ type }) => type === "redux-saga");
  }
};

const conductor = new NeoReact<any>(
  {
    services: [
      {
        name: "marketing",
        state: {
          type: "redux-saga",
          props: {
            reducers: [],
            sagas: []
          }
        },
        zones: [
          {
            name: "my-zone",
            target: ".service1",
            component: props => <p>Marketing - Zone 1</p>,
            order: 0
          },
          {
            name: "my-zone-2",
            target: ".service2",
            component: props => <p>Finance - Zone 2</p>,
            order: 1
          }
        ],
        communicationMethod: "redux-saga",
        required: true
      },
      {
        name: "finance",
        state: {
          type: "redux-saga",
          props: {
            reducers: [],
            sagas: []
          }
        },
        zones: [
          {
            name: "my-zone-1",
            target: ".service2",
            component: props => <p>Finance - Zone 1</p>,
            order: 1
          },
          {
            name: "my-zone-2",
            target: ".service1",
            component: props => <div>Marketing - Zone 2 {JSON.stringify(props)}</div>,
            order: 2
          },
          {
            name: "my-zone-3",
            target: ".service1",
            component: props => <div>Marketing - Zone 3</div>,
            order: 1
          }
        ],
        communicationMethod: "redux-saga",
        required: true
      }
    ],
    target: "#root",
    extensions: {
      reduxSaga: SagaSupport
    },
    // Maybe?
    debug: true,
    component: <App />
  },
  ReactDOM.render
);

(window as any).conductor = conductor;
console.log(conductor);
conductor.render();
