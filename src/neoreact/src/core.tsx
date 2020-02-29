export interface State<Type, PassedProps> {
    type: Type;
    props: PassedProps;
}

export type DOMElementIdentifier = string;

export interface Zone {
    name: string;
    target: DOMElementIdentifier;
    component: JSX.Element;
    order: number;
}

export interface Service<StateProps> {
    name: string;
    // TODO: Should this just be part of the zones & we add routes?
    component: JSX.Element;
    // State object
    state: State<string, StateProps>;
    // Zones. Things we'll render into
    zones: Zone[];
    // How this service will communicate with others (eg/ maybe it is via some third party extension just to allow some kind of encrypted message channel etc. Just allows user freedom if it's able to be modified per service & globally)
    communicationMethod?: 'redux-saga' | 'other' | string;
    required: boolean;
}

type LifeCycleHooks = "pre-creation" | "post-creation" | "pre-render" | "post-render";

export interface Extension {
    name: string;
    lifecycleDesired: LifeCycleHooks;
    type: keyof NeoExtension;
    func: (instance: NeoExtension) => void;
}

export interface Configuration<StateProps> {
    services: Service<StateProps>[];
    to: DOMElementIdentifier;
    extensions?: { [key: string]: Extension };
    debug?: boolean;
    component: JSX.Element;
}

export interface NeoExtension {
    // This is only exposed to the extensions
    // This only supports ONE state handler. Do we want to support multiple?
    stateHandler?: (state: State<string, any>[]) => void;
}

export interface NeoReact<StateProps> {
    // Add a service dynamically.
    add: (service: Service<StateProps>) => void;
    // Conduct the creation of the app. (?)
    create: () => void;
    // Initialize the application, this should pretty much run at the ReactDOM.render() time.
    // constructor: (config: Configuration<StateProps>) => NeoReact<StateProps>;
    debug?: boolean;
}