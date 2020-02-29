```ts
interface ReduxSagaState {
	type: 'redux-saga';
	reducers: Reducer[];
	sagas: Saga[];
}

// TODO: Add more
type State = ReduxSagaState | any;

type DOMElementIdentifier = string;

interface Zone {
	name: string;
	target: DOMElementIdentifier;
	component: JSX.Element;
	order: number;
}

interface Service {
	// TODO: Should this just be part of the zones & we add routes?
	component: JSX.Element;
	// State object
	state: State;
	// Zones. Things we'll render into
	zones: Zone[];
	// How this service will communicate with others (eg/ maybe it is via some third party extension just to allow some kind of encrypted message channel etc. Just allows user freedom if it's able to be modified per service & globally)
	communicationMethod?: 'redux-saga' | 'other';
	required: boolean;
}

type LifeCycleHooks = "pre-creation" | "post-creation" | "pre-render" | "post-render";

interface Extension {
	name: string;
	lifecycleDesired: LifeCycleHooks;
	func: (instance: NeoExtension) => void;
}

interface Configuration {
	services: Service[];
	to: DOMElementIdentifier;
	extensions?: { [key: string]: Extension };
}

interface NeoExtension {
	// This is only exposed to the extensions
	public stateHandler: (state: State[]) => void;
}

interface NeoReact {
	// Add a service dynamically.
	add: (service: Service) => void;
	// Conduct the creation of the app. (?)
	create: () => void;
	// Initialize the application, this should pretty much run at the ReactDOM.render() time.
	initialize: (config: Configuration) => void | Error;
	debug?: boolean;
}
```

```tsx
import { render } from 'react-dom';
import NeoReact from '@neoreact/core';
import { SagaSupport } from '@neoreact/redux-saga';

/** example of redux saga implementation (doesnt work) */
const SagaSupport = {
	name: 'redux-saga',
	lifecycleDesired: 'pre-creation',
	func: (instance: NeoExtension) => {
		instance.stateHandler = (state: State[]) => {
			const reduxSagaStates = state.filter(({ type }) => type === 'redux-saga');
			// do the thing
		}
	};
}

NeoReact.initialize({
	services: [
		{
			name: 'oh shit whaddup',
			component: <div>Hello world</div>,
			state: {
				type: 'redux-saga',
				reducers: [],
				sagas: [],
			},
			zones: [
				{
					name: 'my-zone',
					target: '.hello',
					component: <Zone name="my-zone" />,
					order: 0
				}
			]
			communicationMethod: 'redux-saga',
		}
	],
	to: '.root',
	extensions: {
		reduxSaga: SagaSupport,
	},
	// Maybe?
	render,
	debug: true,
});
```

```tsx
import NeoReact from '@neoreact/core';

const MyComponent = <div>Hello world</div>;

NeoReact.add({
	name: 'neoreact test',
	component: MyComponent,
	state: {
		type: 'redux-saga',
		reducers: [],
		sagas: [],
	},
	zones: [
		{
			name: 'my-zone',
			target: '.hello',
			component: <Zone name="my-zone" />,
			order: 0
		}
	]
	communicationMethod: 'redux-saga',
});

NeoReact.create();
```