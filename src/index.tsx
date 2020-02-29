import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { NeoReact } from './neoreact';
import { Extension } from './neoreact/src/core';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/** example of redux saga implementation (doesnt work) */
const SagaSupport: Extension = {
	name: 'redux-saga',
	lifecycleDesired: 'pre-creation',
	type: 'stateHandler',
	func: (instance: any) => {
		instance.stateHandler = (state: any[]) => state.filter(({ type }) => type === 'redux-saga');
		console.log(instance.stateHandler);
	},
};

const conductor = new NeoReact<any>({
	services: [
		{
			name: 'oh shit whaddup',
			component: <div>Hello world</div>,
			state: {
				type: 'redux-saga',
				props: {
					reducers: [],
					sagas: [],
				}
			},
			zones: [
				{
					name: 'my-zone',
					target: '.hello',
					component: <p>This is a zone!</p>,
					order: 0
				}
			],
			communicationMethod: 'redux-saga',
			required: false,
		}
	],
	to: '#root',
	extensions: {
		reduxSaga: SagaSupport,
	},
	// Maybe?
	debug: true,
	component: <App />
}, ReactDOM.render);


(window as any).conductor = conductor;
console.log(conductor);
conductor.render();