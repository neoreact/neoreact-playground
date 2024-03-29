import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { NeoReact } from "./neoreact";
import { ComponentType, Extension, NeoExtension } from "./neoreact/src/core";
import { MyComponent } from "./Component";
import { TextComponent } from "./Generic";
import { ServiceComponent } from "./ServiceComponent";
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/** example of redux saga implementation (doesnt work) */
const SagaSupport: Extension = {
  name: "redux-saga",
  lifecycleDesired: "pre-creation",
  type: "stateHandler",
  func: (instance: NeoExtension) => {
    instance.stateHandler = (state: any[]) => {
      state.filter(({ type }) => type === "redux-saga");
      console.log(state);
    }
    console.log("yeah");
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
            component: <TextComponent text="Marketing - Zone 1 (order 0)" />,
            order: 0
          },
          {
            name: "my-zone-2",
            target: ".service2",
            component: <TextComponent text="Finance - Zone 2 (order 1)" />,
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
            component: <TextComponent text="Finance - Zone 1" />,
            order: 1
          },
          {
            name: "my-zone-2",
            target: ".service1",
            component: <TextComponent text="Marketing - Zone 2 (order 2)" />,
            order: 2
          },
          {
            name: "my-zone-3",
            target: ".service1",
            component: <MyComponent />,
            order: 3
          }
        ],
        communicationMethod: "redux-saga",
        required: true
      },
      {
        name: "services",
        required: true,
        state: {
          type: "redux-saga",
          props: {
            reducers: [],
            sagas: []
          }
        },
        zones: [
          {
            name: "test",
            target: ".services",
            component: <ServiceComponent />,
            order: 1,
          }
        ]
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
conductor.render();
